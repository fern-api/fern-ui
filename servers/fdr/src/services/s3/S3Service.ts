import {
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  APIV1Write,
  DocsV1Write,
  DocsV2Write,
  FdrAPI,
} from "@fern-api/fdr-sdk";
import { v4 as uuidv4 } from "uuid";
import { Cache } from "../../Cache";
import { FernRegistry } from "../../api/generated";
import { InvalidFileUploadError } from "../../api/generated/api";
import type { FdrConfig } from "../../app";

const ONE_WEEK_IN_SECONDS = 604800;

const ALLOWED_FILE_TYPES = new Set<string>([
  // image files
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/tiff",
  "image/x-icon",
  // video files
  "video/quicktime",
  "video/mp4",
  "video/webm",
  // audio files
  "audio/mpeg",
  "audio/ogg",
  "audio/wav",
  // document files
  "application/pdf",
  "application/xml",
  // font files
  "font/woff",
  "font/woff2",
  "font/otf",
  "font/ttf",
]);

export interface S3DocsFileInfo {
  presignedUrl: DocsV1Write.FileS3UploadUrl;
  key: string;
  imageMetadata:
    | {
        width: number;
        height: number;
        blurDataUrl: string | undefined;
        alt: string | undefined;
      }
    | undefined;
}

export interface S3ApiDefinitionSourceFileInfo {
  presignedUrl: string;
  key: string;
}

export interface S3Service {
  getPresignedDocsAssetsUploadUrls({
    domain,
    filepaths,
    images,
    isPrivate,
  }: {
    domain: string;
    filepaths: DocsV1Write.FilePath[];
    images: DocsV2Write.ImageFilePath[];
    isPrivate: boolean;
  }): Promise<Record<DocsV1Write.FilePath, S3DocsFileInfo>>;

  getPresignedDocsAssetsDownloadUrl({
    key,
    isPrivate,
  }: {
    key: string;
    isPrivate: boolean;
  }): Promise<FdrAPI.Url>;

  getPresignedApiDefinitionSourceUploadUrls({
    orgId,
    apiId,
    sources,
  }: {
    orgId: FernRegistry.OrgId;
    apiId: FernRegistry.ApiId;
    sources: Record<APIV1Write.SourceId, APIV1Write.Source>;
  }): Promise<Record<APIV1Write.SourceId, S3ApiDefinitionSourceFileInfo>>;

  getPresignedApiDefinitionSourceDownloadUrl({
    key,
  }: {
    key: string;
  }): Promise<string>;
}

export class S3ServiceImpl implements S3Service {
  private publicDocsCDNUrl: string;
  private publicDocsS3: S3Client;
  private privateDocsS3: S3Client;
  private privateApiDefinitionSourceS3: S3Client;
  private presignedDownloadUrlCache = new Cache<string>(
    10_000,
    ONE_WEEK_IN_SECONDS
  );

  constructor(private readonly config: FdrConfig) {
    this.publicDocsCDNUrl = config.cdnPublicDocsUrl;
    this.publicDocsS3 = new S3Client({
      ...(config.publicDocsS3.urlOverride != null
        ? { endpoint: config.publicDocsS3.urlOverride }
        : {}),
      region: config.publicDocsS3.bucketRegion,
      credentials: {
        accessKeyId: config.awsAccessKey,
        secretAccessKey: config.awsSecretKey,
      },
    });
    this.privateDocsS3 = new S3Client({
      ...(config.privateDocsS3.urlOverride != null
        ? { endpoint: config.privateDocsS3.urlOverride }
        : {}),
      region: config.privateDocsS3.bucketRegion,
      credentials: {
        accessKeyId: config.awsAccessKey,
        secretAccessKey: config.awsSecretKey,
      },
    });
    this.privateApiDefinitionSourceS3 = new S3Client({
      ...(config.privateApiDefinitionSourceS3.urlOverride != null
        ? { endpoint: config.privateApiDefinitionSourceS3.urlOverride }
        : {}),
      region: config.privateApiDefinitionSourceS3.bucketRegion,
      credentials: {
        accessKeyId: config.awsAccessKey,
        secretAccessKey: config.awsSecretKey,
      },
    });
  }

  async getPresignedDocsAssetsDownloadUrl({
    key,
    isPrivate,
  }: {
    key: string;
    isPrivate: boolean;
  }): Promise<FdrAPI.Url> {
    if (isPrivate) {
      // presigned url for private
      const cachedUrl = this.presignedDownloadUrlCache.get(key);
      if (cachedUrl != null && typeof cachedUrl === "string") {
        return FdrAPI.Url(cachedUrl);
      }
      const command = new GetObjectCommand({
        Bucket: this.config.privateDocsS3.bucketName,
        Key: key,
      });
      const signedUrl = await getSignedUrl(this.privateDocsS3, command, {
        expiresIn: 604800,
      });
      this.presignedDownloadUrlCache.set(key, signedUrl);
      return FdrAPI.Url(signedUrl);
    }

    return FdrAPI.Url(`${this.publicDocsCDNUrl}/${key}`);
  }

  async getPresignedDocsAssetsUploadUrls({
    domain,
    filepaths,
    images,
    isPrivate,
    filesizes,
    mimeTypes,
  }: {
    domain: string;
    filepaths: DocsV1Write.FilePath[];
    images: DocsV2Write.ImageFilePath[];
    isPrivate: boolean;
    filesizes?: number[];
    mimeTypes?: string[];
  }): Promise<Record<DocsV1Write.FilePath, S3DocsFileInfo>> {
    const result: Record<DocsV1Write.FilePath, S3DocsFileInfo> = {};
    const time: string = new Date().toISOString();

    const fileUploadErrors: any[] = [];

    for (let i = 0; i < filepaths.length; i++) {
      const filepath = filepaths[i];
      const filesize =
        typeof filesizes === "undefined" ? undefined : filesizes[i];
      const mimeType =
        typeof mimeTypes === "undefined" ? undefined : mimeTypes[i];
      if (typeof filepath === "undefined") continue;

      try {
        const { url, key } =
          await this.createPresignedDocsAssetsUploadUrlWithClient({
            domain,
            time,
            filepath,
            isPrivate,
            filesize,
            mimeType,
          });
        result[filepath] = {
          presignedUrl: {
            fileId: APIV1Write.FileId(uuidv4()),
            uploadUrl: url,
          },
          key,
          imageMetadata: undefined,
        };
      } catch (e) {
        fileUploadErrors.push({
          filepath,
          filesize,
          mimeType,
        });
      }
    }
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      // expected sizes for images + files are concatenated in the filesize/mimeType array
      const filesize =
        typeof filesizes === "undefined"
          ? undefined
          : filesizes[i + filepaths.length];
      const mimeType =
        typeof mimeTypes === "undefined"
          ? undefined
          : mimeTypes[i + filepaths.length];
      if (typeof image === "undefined") continue;

      try {
        const { url, key } =
          await this.createPresignedDocsAssetsUploadUrlWithClient({
            domain,
            time,
            filepath: image.filePath,
            isPrivate,
            filesize,
            mimeType,
          });
        result[image.filePath] = {
          presignedUrl: {
            fileId: APIV1Write.FileId(uuidv4()),
            uploadUrl: url,
          },
          key,
          imageMetadata: {
            width: image.width,
            height: image.height,
            blurDataUrl: image.blurDataUrl,
            alt: image.alt,
          },
        };
      } catch (e) {
        fileUploadErrors.push({
          filepath: image.filePath,
          filesize,
          mimeType,
        });
      }
    }

    if (fileUploadErrors.length > 0) {
      throw new InvalidFileUploadError(
        "Invalid files: " + JSON.stringify(fileUploadErrors)
      );
    }
    return result;
  }

  async createPresignedDocsAssetsUploadUrlWithClient({
    domain,
    time,
    filepath,
    isPrivate,
    filesize,
    mimeType,
  }: {
    domain: string;
    time: string;
    filepath: DocsV1Write.FilePath;
    isPrivate: boolean;
    filesize?: number | undefined;
    mimeType?: string | undefined;
  }): Promise<{ url: string; key: string }> {
    const s3Client = isPrivate ? this.privateDocsS3 : this.publicDocsS3;
    const bucketName = isPrivate
      ? this.config.privateDocsS3.bucketName
      : this.config.publicDocsS3.bucketName;
    const key = this.constructS3DocsKey({ domain, time, filepath });

    let conditions: any[] | undefined = [];
    if (typeof filesize !== "undefined") {
      conditions.push(["content-length-range", filesize, filesize]);
    }
    if (typeof mimeType !== "undefined") {
      if (!ALLOWED_FILE_TYPES.has(mimeType)) {
        throw new InvalidFileUploadError(
          "Filepath: " + filepath + ", Invalid MIME Type: " + mimeType
        );
      }
      conditions.push(["eq", "$Content-Type", mimeType]);
    }
    if (conditions.length === 0) {
      conditions = undefined;
    }

    const { url } = await createPresignedPost(s3Client, {
      Bucket: bucketName,
      Key: key,
      Conditions: conditions,
      Expires: 3600,
    });

    return {
      url,
      key,
    };
  }

  async getPresignedApiDefinitionSourceDownloadUrl({
    key,
  }: {
    key: string;
  }): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.config.privateApiDefinitionSourceS3.bucketName,
      Key: key,
    });
    return await getSignedUrl(this.privateDocsS3, command, {
      expiresIn: 604800,
    });
  }

  async getPresignedApiDefinitionSourceUploadUrls({
    orgId,
    apiId,
    sources,
  }: {
    orgId: FernRegistry.OrgId;
    apiId: FernRegistry.ApiId;
    sources: Record<APIV1Write.SourceId, APIV1Write.Source>;
  }): Promise<Record<APIV1Write.SourceId, S3ApiDefinitionSourceFileInfo>> {
    const result: Record<APIV1Write.SourceId, S3ApiDefinitionSourceFileInfo> =
      {};
    const time: string = new Date().toISOString();
    for (const [sourceId, _source] of Object.entries(sources)) {
      const { url, key } =
        await this.createPresignedApiDefinitionSourceUploadUrlWithClient({
          orgId,
          apiId,
          time,
          sourceId: APIV1Write.SourceId(sourceId),
        });
      result[APIV1Write.SourceId(sourceId)] = {
        presignedUrl: url,
        key,
      };
    }
    return result;
  }

  async createPresignedApiDefinitionSourceUploadUrlWithClient({
    orgId,
    apiId,
    time,
    sourceId,
  }: {
    orgId: FernRegistry.OrgId;
    apiId: FernRegistry.ApiId;
    time: string;
    sourceId: APIV1Write.SourceId;
  }): Promise<{ url: string; key: string }> {
    const key = this.constructS3ApiDefinitionSourceKey({
      orgId,
      apiId,
      time,
      sourceId,
    });
    const bucketName = this.config.privateApiDefinitionSourceS3.bucketName;
    const input: PutObjectCommandInput = {
      Bucket: bucketName,
      Key: key,
    };
    const command = new PutObjectCommand(input);
    return {
      url: await getSignedUrl(this.privateApiDefinitionSourceS3, command, {
        expiresIn: 3600,
      }),
      key,
    };
  }

  constructS3DocsKey({
    domain,
    time,
    filepath,
  }: {
    domain: string;
    time: string;
    filepath: DocsV1Write.FilePath;
  }): string {
    return `${domain}/${time}/${filepath}`;
  }

  constructS3ApiDefinitionSourceKey({
    orgId,
    apiId,
    time,
    sourceId,
  }: {
    orgId: FernRegistry.OrgId;
    apiId: FernRegistry.ApiId;
    time: string;
    sourceId: APIV1Write.SourceId;
  }): string {
    return `${orgId}/${apiId}/${time}/${sourceId}`;
  }
}

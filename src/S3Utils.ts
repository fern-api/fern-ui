import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import { FdrConfig } from "./config";
import { FilePath, FileS3UploadUrl } from "./generated/api/resources/docs/resources/v1/resources/write";

export interface S3FileInfo {
    presignedUrl: FileS3UploadUrl;
    key: string;
}

export interface S3Utils {
    getPresignedUploadUrls({
        domain,
        filepaths,
    }: {
        domain: string;
        filepaths: FilePath[];
    }): Promise<Record<FilePath, S3FileInfo>>;

    getPresignedDownloadUrl({ key }: { key: string }): Promise<string>;
}

export class S3UtilsImpl implements S3Utils {
    private config: FdrConfig;
    private client: S3Client;

    constructor(config: FdrConfig) {
        this.config = config;
        if (config.s3UrlOverride != null) {
            this.client = new S3Client({
                endpoint: config.s3UrlOverride,
                region: config.s3BucketRegion,
                credentials: {
                    accessKeyId: config.awsAccessKey,
                    secretAccessKey: config.awsSecretKey,
                },
            });
        } else {
            this.client = new S3Client({
                region: config.s3BucketRegion,
                credentials: {
                    accessKeyId: config.awsAccessKey,
                    secretAccessKey: config.awsSecretKey,
                },
            });
        }
    }

    async getPresignedDownloadUrl({ key }: { key: string }): Promise<string> {
        const command = new GetObjectCommand({
            Bucket: this.config.s3BucketName,
            Key: key,
        });
        return getSignedUrl(this.client, command, { expiresIn: 3600 });
    }

    async getPresignedUploadUrls({
        domain,
        filepaths,
    }: {
        domain: string;
        filepaths: FilePath[];
    }): Promise<Record<FilePath, S3FileInfo>> {
        const result: Record<FilePath, S3FileInfo> = {};
        const time: string = new Date().toISOString();
        for (const filepath of filepaths) {
            const { url, key } = await this.createPresignedUploadUrlWithClient({ domain, time, filepath });
            result[filepath] = {
                presignedUrl: {
                    fileId: uuidv4(),
                    uploadUrl: url,
                },
                key,
            };
        }
        return result;
    }

    async createPresignedUploadUrlWithClient({
        domain,
        time,
        filepath,
    }: {
        domain: string;
        time: string;
        filepath: FilePath;
    }): Promise<{ url: string; key: string }> {
        const key = this.constructS3Key({ domain, time, filepath });
        const command = new PutObjectCommand({
            Bucket: this.config.s3BucketName,
            Key: key,
        });
        return {
            url: await getSignedUrl(this.client, command, { expiresIn: 3600 }),
            key,
        };
    }

    constructS3Key({ domain, time, filepath }: { domain: string; time: string; filepath: FilePath }): string {
        return `${domain}/${time}/${filepath}`;
    }
}

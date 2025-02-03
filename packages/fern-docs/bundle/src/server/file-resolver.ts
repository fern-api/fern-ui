import type { FernNavigation } from "@fern-api/fdr-sdk";
import type { ImageData } from "@fern-docs/utils";
import { UnreachableCaseError } from "ts-essentials";

export function createFileResolver(
  files: Record<
    string,
    {
      type: "url" | "image";
      url: string;
      width?: number;
      height?: number;
      blurDataUrl?: string;
      alt?: string;
    }
  >
): (src: string) => ImageData | undefined {
  return (src) => {
    if (src == null) {
      return undefined;
    }

    const fileId = src.startsWith("file:") ? src.slice(5) : src;
    const file = files[fileId as FernNavigation.FileId];
    if (file == null) {
      // the file is not found, so we return the src as the image data
      return { src };
    }

    if (file.type === "image") {
      return {
        src: file.url,
        width: file.width,
        height: file.height,
        blurDataURL: file.blurDataUrl,
      };
    } else if (file.type === "url") {
      return { src: file.url };
    } else {
      throw new UnreachableCaseError(file.type);
    }
  };
}

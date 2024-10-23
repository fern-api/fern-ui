/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../index";

export type FileMetadata = FernRegistry.docs.v3.FileMetadata.Image | FernRegistry.docs.v3.FileMetadata.Markdown;

export declare namespace FileMetadata {
    interface Image extends FernRegistry.docs.v3.ImageMetadata {
        type: "image";
    }

    interface Markdown extends FernRegistry.docs.v3.MarkdownMetadata {
        type: "markdown";
    }
}

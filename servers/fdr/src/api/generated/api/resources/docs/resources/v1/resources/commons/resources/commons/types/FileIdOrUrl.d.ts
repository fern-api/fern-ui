/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../../..";
export declare type FileIdOrUrl = FernRegistry.docs.v1.commons.FileIdOrUrl.FileId | FernRegistry.docs.v1.commons.FileIdOrUrl.Url;
export declare namespace FileIdOrUrl {
    interface FileId {
        type: "fileId";
        value: FernRegistry.docs.v1.commons.FileId;
    }
    interface Url {
        type: "url";
        value: FernRegistry.docs.v1.commons.Url;
    }
}

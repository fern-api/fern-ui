/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../index";

export interface FileS3UploadUrl {
    uploadUrl: string;
    /** When reading docs we will return a map<FileId, URL> that you can use to look up the docs. */
    fileId: FernRegistry.docs.v1.write.FileId;
}

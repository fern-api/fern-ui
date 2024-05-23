/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../..";

export type DbFileInfoV2 = FernRegistry.docs.v1.db.DbFileInfoV2.S3Key | FernRegistry.docs.v1.db.DbFileInfoV2.Image;

export declare namespace DbFileInfoV2 {
    interface S3Key extends FernRegistry.docs.v1.db.DbFileInfo {
        type: "s3Key";
    }

    interface Image extends FernRegistry.docs.v1.db.DbImageFileInfo {
        type: "image";
    }
}

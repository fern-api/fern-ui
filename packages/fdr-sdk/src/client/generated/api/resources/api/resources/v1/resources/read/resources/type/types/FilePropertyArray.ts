/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../..";

export interface FilePropertyArray
    extends FernRegistry.api.v1.read.WithDescription,
        FernRegistry.api.v1.read.WithAvailability {
    key: FernRegistry.api.v1.read.PropertyKey;
    isOptional: boolean;
    contentType?: FernRegistry.api.v1.read.ContentType;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../../../index";
export interface FilePropertySingle extends FernRegistry.api.v1.WithDescription, FernRegistry.api.v1.WithAvailability {
    key: FernRegistry.api.v1.PropertyKey;
    isOptional: boolean;
    contentType: FernRegistry.api.v1.register.ContentType | undefined;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../../../index";
export interface FormDataFiles extends FernRegistry.api.v1.ui.WithDescription, FernRegistry.api.v1.ui.WithAvailability {
    key: FernRegistry.api.v1.read.PropertyKey;
    isOptional: boolean;
    contentType?: FernRegistry.api.v1.ui.ContentType;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../../../index";
export interface DiscriminatedUnionVariant extends FernRegistry.api.v1.ui.WithDescription, FernRegistry.api.v1.ui.WithAvailability {
    discriminantValue: string;
    displayName?: string;
    additionalProperties: FernRegistry.api.v1.ui.ObjectType;
}

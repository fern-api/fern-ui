/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../../../index";
export interface DiscriminatedUnionVariant extends FernRegistry.api.v1.register.WithDescription, FernRegistry.api.v1.register.WithAvailability {
    discriminantValue: string;
    additionalProperties: FernRegistry.api.v1.register.ObjectType;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../../../index";
export interface ErrorDeclarationV2 extends FernRegistry.api.v1.register.WithDescription, FernRegistry.api.v1.register.WithAvailability {
    type?: FernRegistry.api.v1.register.TypeShape;
    statusCode: number;
    name?: string;
    examples?: FernRegistry.api.v1.register.ErrorExample[];
}

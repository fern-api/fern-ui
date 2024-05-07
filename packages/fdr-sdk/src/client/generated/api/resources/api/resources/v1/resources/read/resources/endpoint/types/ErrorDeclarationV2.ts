/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../..";

export interface ErrorDeclarationV2
    extends FernRegistry.api.v1.read.WithDescription,
        FernRegistry.api.v1.read.WithAvailability {
    type?: FernRegistry.api.v1.read.TypeShape;
    statusCode: number;
    name?: string;
    examples?: FernRegistry.api.v1.read.ErrorExample[];
}

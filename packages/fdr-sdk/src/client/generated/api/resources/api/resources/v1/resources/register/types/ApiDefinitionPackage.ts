/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../..";

export interface ApiDefinitionPackage {
    endpoints: FernRegistry.api.v1.register.EndpointDefinition[];
    websockets?: FernRegistry.api.v1.register.WebSocketChannel[];
    webhooks?: FernRegistry.api.v1.register.WebhookDefinition[];
    types: FernRegistry.api.v1.register.TypeId[];
    subpackages: FernRegistry.api.v1.register.SubpackageId[];
    /**
     * if present, this package should be replaced with the provided subpackage
     * in the docs navigation.
     */
    pointsTo?: FernRegistry.api.v1.register.SubpackageId;
}

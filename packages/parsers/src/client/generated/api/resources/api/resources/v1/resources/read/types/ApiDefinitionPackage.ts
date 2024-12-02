/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../index";

export interface ApiDefinitionPackage {
    endpoints: FernRegistry.api.v1.read.EndpointDefinition[];
    websockets: FernRegistry.api.v1.read.WebSocketChannel[];
    webhooks: FernRegistry.api.v1.read.WebhookDefinition[];
    types: FernRegistry.TypeId[];
    subpackages: FernRegistry.api.v1.SubpackageId[];
    /**
     * if present, this package should be replaced with the provided subpackage
     * in the docs navigation.
     */
    pointsTo: FernRegistry.api.v1.SubpackageId | undefined;
}

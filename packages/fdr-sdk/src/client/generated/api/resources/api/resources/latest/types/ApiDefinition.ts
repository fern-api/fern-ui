/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../index";

export interface ApiDefinition {
    id: FernRegistry.ApiDefinitionId;
    endpoints: Record<FernRegistry.EndpointId, FernRegistry.api.latest.EndpointDefinition>;
    websockets: Record<FernRegistry.WebSocketId, FernRegistry.api.latest.WebSocketChannel>;
    webhooks: Record<FernRegistry.WebhookId, FernRegistry.api.latest.WebhookDefinition>;
    types: Record<FernRegistry.TypeId, FernRegistry.api.latest.TypeDefinition>;
    subpackages: Record<FernRegistry.api.latest.SubpackageId, FernRegistry.api.latest.SubpackageMetadata>;
    auths: Record<FernRegistry.api.latest.AuthSchemeId, FernRegistry.api.latest.AuthScheme>;
    globalHeaders: FernRegistry.api.latest.ObjectProperty[] | undefined;
}

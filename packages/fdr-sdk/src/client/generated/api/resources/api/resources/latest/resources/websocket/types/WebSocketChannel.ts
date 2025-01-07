/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../index";

export interface WebSocketChannel
    extends FernRegistry.api.latest.WithDescription,
        FernRegistry.api.latest.WithAvailability,
        FernRegistry.api.latest.WithNamespace {
    id: FernRegistry.WebSocketId;
    displayName: string | undefined;
    operationId: string | undefined;
    path: FernRegistry.api.latest.PathPart[];
    /** The messages that can be sent and received on this channel */
    messages: FernRegistry.api.latest.WebSocketMessage[];
    auth: FernRegistry.api.latest.AuthSchemeId[] | undefined;
    defaultEnvironment: FernRegistry.EnvironmentId | undefined;
    environments: FernRegistry.api.latest.Environment[] | undefined;
    pathParameters: FernRegistry.api.latest.ObjectProperty[] | undefined;
    queryParameters: FernRegistry.api.latest.ObjectProperty[] | undefined;
    requestHeaders: FernRegistry.api.latest.ObjectProperty[] | undefined;
    examples: FernRegistry.api.latest.ExampleWebSocketSession[] | undefined;
}

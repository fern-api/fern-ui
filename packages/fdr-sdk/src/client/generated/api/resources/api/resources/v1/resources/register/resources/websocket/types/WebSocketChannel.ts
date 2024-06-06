/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../../index";

export interface WebSocketChannel
    extends FernRegistry.api.v1.register.WithDescription,
        FernRegistry.api.v1.register.WithAvailability {
    id: FernRegistry.api.v1.register.WebSocketId;
    auth: boolean;
    name?: string;
    defaultEnvironment?: FernRegistry.api.v1.register.EnvironmentId;
    environments: FernRegistry.api.v1.register.Environment[];
    path: FernRegistry.api.v1.register.EndpointPath;
    headers: FernRegistry.api.v1.register.Header[];
    queryParameters: FernRegistry.api.v1.register.QueryParameter[];
    /** The messages that can be sent and received on this channel */
    messages: FernRegistry.api.v1.register.WebSocketMessage[];
    examples: FernRegistry.api.v1.register.ExampleWebSocketSession[];
}

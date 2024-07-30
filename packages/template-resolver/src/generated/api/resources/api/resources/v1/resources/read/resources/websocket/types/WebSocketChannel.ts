/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../../index";

export interface WebSocketChannel
    extends FernRegistry.api.v1.read.WithDescription,
        FernRegistry.api.v1.read.WithAvailability {
    urlSlug: string;
    id: FernRegistry.api.v1.read.WebSocketId;
    auth: boolean;
    name?: string;
    defaultEnvironment?: FernRegistry.api.v1.read.EnvironmentId;
    environments: FernRegistry.api.v1.read.Environment[];
    path: FernRegistry.api.v1.read.EndpointPath;
    headers: FernRegistry.api.v1.read.Header[];
    queryParameters: FernRegistry.api.v1.read.QueryParameter[];
    /** The messages that can be sent and received on this channel */
    messages: FernRegistry.api.v1.read.WebSocketMessage[];
    examples: FernRegistry.api.v1.read.ExampleWebSocketSession[];
}

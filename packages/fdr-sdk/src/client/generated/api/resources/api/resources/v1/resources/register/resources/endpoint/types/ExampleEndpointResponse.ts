/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../..";

export type ExampleEndpointResponse =
    | FernRegistry.api.v1.register.ExampleEndpointResponse.Json
    | FernRegistry.api.v1.register.ExampleEndpointResponse.Filename
    | FernRegistry.api.v1.register.ExampleEndpointResponse.Stream
    | FernRegistry.api.v1.register.ExampleEndpointResponse.Sse;

export declare namespace ExampleEndpointResponse {
    interface Json {
        type: "json";
        value?: unknown;
    }

    interface Filename {
        type: "filename";
        value: string;
    }

    interface Stream {
        type: "stream";
        value: unknown[];
    }

    interface Sse {
        type: "sse";
        value: FernRegistry.api.v1.register.ExampleServerSentEvent[];
    }
}

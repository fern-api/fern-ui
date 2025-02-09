/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../../index";

export type ExampleEndpointRequest =
    | FernRegistry.api.v1.register.ExampleEndpointRequest.Json
    | FernRegistry.api.v1.register.ExampleEndpointRequest.Form
    | FernRegistry.api.v1.register.ExampleEndpointRequest.Bytes;

export declare namespace ExampleEndpointRequest {
    interface Json {
        type: "json";
        value: unknown;
    }

    interface Form {
        type: "form";
        value: Record<string, FernRegistry.api.v1.register.FormValue>;
    }

    interface Bytes {
        type: "bytes";
        value: FernRegistry.api.v1.register.BytesValue;
    }
}

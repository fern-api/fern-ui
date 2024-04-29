/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../../..";
export declare type ExampleEndpointRequest = FernRegistry.api.v1.register.ExampleEndpointRequest.Json | FernRegistry.api.v1.register.ExampleEndpointRequest.Form;
export declare namespace ExampleEndpointRequest {
    interface Json {
        type: "json";
        value?: unknown;
    }
    interface Form {
        type: "form";
        value: Record<string, FernRegistry.api.v1.register.FormValue>;
    }
}

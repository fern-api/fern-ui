/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../..";

export type HttpRequestBodyShape =
    | FernRegistry.api.v1.register.HttpRequestBodyShape.Object_
    | FernRegistry.api.v1.register.HttpRequestBodyShape.Reference
    | FernRegistry.api.v1.register.HttpRequestBodyShape.Json
    /**
     * `fileUpload` is optional only to be backwards compatible. It should be required. */
    | FernRegistry.api.v1.register.HttpRequestBodyShape.FileUpload
    | FernRegistry.api.v1.register.HttpRequestBodyShape.Bytes;

export declare namespace HttpRequestBodyShape {
    interface Object_ extends FernRegistry.api.v1.register.ObjectType {
        type: "object";
    }

    interface Reference {
        type: "reference";
        value: FernRegistry.api.v1.register.TypeReference;
    }

    interface Json extends FernRegistry.api.v1.register.JsonRequestBody {
        type: "json";
    }

    interface FileUpload {
        type: "fileUpload";
        value?: FernRegistry.api.v1.register.FileUploadRequest;
    }

    interface Bytes extends FernRegistry.api.v1.register.BytesRequest {
        type: "bytes";
    }
}

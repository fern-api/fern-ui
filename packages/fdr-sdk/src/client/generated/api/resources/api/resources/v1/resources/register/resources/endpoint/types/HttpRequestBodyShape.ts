/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../..";

export type HttpRequestBodyShape =
    | FernRegistry.api.v1.register.HttpRequestBodyShape.Json
    | FernRegistry.api.v1.register.HttpRequestBodyShape.FormData
    | FernRegistry.api.v1.register.HttpRequestBodyShape.Bytes
    | FernRegistry.api.v1.register.HttpRequestBodyShape.Object_
    | FernRegistry.api.v1.register.HttpRequestBodyShape.Reference
    /**
     * `fileUpload` is optional only to be backwards compatible. It should be required. */
    | FernRegistry.api.v1.register.HttpRequestBodyShape.FileUpload;

export declare namespace HttpRequestBodyShape {
    interface Json extends FernRegistry.api.v1.register.JsonRequestBody {
        type: "json";
    }

    interface FormData extends FernRegistry.api.v1.register.FormDataRequest {
        type: "formData";
    }

    interface Bytes extends FernRegistry.api.v1.register.BytesRequest {
        type: "bytes";
    }

    interface Object_ extends FernRegistry.api.v1.register.ObjectType {
        type: "object";
    }

    interface Reference {
        type: "reference";
        value: FernRegistry.api.v1.register.TypeReference;
    }

    interface FileUpload {
        type: "fileUpload";
        value?: FernRegistry.api.v1.register.FormDataRequest;
    }
}

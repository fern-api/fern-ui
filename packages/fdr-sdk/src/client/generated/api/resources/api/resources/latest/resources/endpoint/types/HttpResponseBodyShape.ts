/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../index";

export type HttpResponseBodyShape =
    | FernRegistry.api.latest.HttpResponseBodyShape.Object_
    | FernRegistry.api.latest.HttpResponseBodyShape.Reference
    | FernRegistry.api.latest.HttpResponseBodyShape.FileDownload
    | FernRegistry.api.latest.HttpResponseBodyShape.StreamingText
    | FernRegistry.api.latest.HttpResponseBodyShape.Stream;

export declare namespace HttpResponseBodyShape {
    interface Object_ extends FernRegistry.api.latest.ObjectType {
        type: "object";
    }

    interface Reference {
        type: "reference";
        value: FernRegistry.api.latest.TypeReference;
    }

    interface FileDownload extends FernRegistry.api.latest.FileDownloadResponseBodyShape {
        type: "fileDownload";
    }

    interface StreamingText {
        type: "streamingText";
    }

    interface Stream extends FernRegistry.api.latest.StreamResponse {
        type: "stream";
    }
}

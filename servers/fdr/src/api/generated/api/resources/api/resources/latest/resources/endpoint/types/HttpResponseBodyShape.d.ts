/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../index";
export declare type HttpResponseBodyShape = FernRegistry.api.latest.HttpResponseBodyShape.Empty | FernRegistry.api.latest.HttpResponseBodyShape.Object_ | FernRegistry.api.latest.HttpResponseBodyShape.Alias | FernRegistry.api.latest.HttpResponseBodyShape.FileDownload | FernRegistry.api.latest.HttpResponseBodyShape.StreamingText | FernRegistry.api.latest.HttpResponseBodyShape.Stream;
export declare namespace HttpResponseBodyShape {
    interface Empty {
        type: "empty";
    }
    interface Object_ extends FernRegistry.api.latest.ObjectType {
        type: "object";
    }
    interface Alias {
        type: "alias";
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

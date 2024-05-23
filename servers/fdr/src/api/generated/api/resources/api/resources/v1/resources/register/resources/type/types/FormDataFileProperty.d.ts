/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../../..";
export declare type FormDataFileProperty = FernRegistry.api.v1.register.FormDataFileProperty.File_ | FernRegistry.api.v1.register.FormDataFileProperty.FileArray;
export declare namespace FormDataFileProperty {
    interface File_ extends FernRegistry.api.v1.register.FilePropertySingle {
        type: "file";
    }
    interface FileArray extends FernRegistry.api.v1.register.FilePropertyArray {
        type: "fileArray";
    }
}

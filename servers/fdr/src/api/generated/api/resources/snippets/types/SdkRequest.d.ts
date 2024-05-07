/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../..";
export declare type SdkRequest = FernRegistry.SdkRequest.Typescript | FernRegistry.SdkRequest.Python | FernRegistry.SdkRequest.Go | FernRegistry.SdkRequest.Ruby | FernRegistry.SdkRequest.Java;
export declare namespace SdkRequest {
    interface Typescript extends FernRegistry.TypeScriptSdkRequest {
        type: "typescript";
    }
    interface Python extends FernRegistry.PythonSdkRequest {
        type: "python";
    }
    interface Go extends FernRegistry.GoSdkRequest {
        type: "go";
    }
    interface Ruby extends FernRegistry.RubySdkRequest {
        type: "ruby";
    }
    interface Java extends FernRegistry.JavaSdkRequest {
        type: "java";
    }
}

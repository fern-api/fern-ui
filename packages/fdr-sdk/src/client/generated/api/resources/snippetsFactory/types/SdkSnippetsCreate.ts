/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../index";

export type SdkSnippetsCreate =
    | FernRegistry.SdkSnippetsCreate.Typescript
    | FernRegistry.SdkSnippetsCreate.Python
    | FernRegistry.SdkSnippetsCreate.Go
    | FernRegistry.SdkSnippetsCreate.Java
    | FernRegistry.SdkSnippetsCreate.Ruby;

export declare namespace SdkSnippetsCreate {
    interface Typescript extends FernRegistry.TypescriptSdkSnippetsCreate {
        type: "typescript";
    }

    interface Python extends FernRegistry.PythonSdkSnippetCreate {
        type: "python";
    }

    interface Go extends FernRegistry.GoSdkSnippetsCreate {
        type: "go";
    }

    interface Java extends FernRegistry.JavaSdkSnippetsCreate {
        type: "java";
    }

    interface Ruby extends FernRegistry.RubySdkSnippetsCreate {
        type: "ruby";
    }
}

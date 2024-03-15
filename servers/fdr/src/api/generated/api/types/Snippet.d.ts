/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "..";
export declare type Snippet = FernRegistry.Snippet.Typescript | FernRegistry.Snippet.Python | FernRegistry.Snippet.Java | FernRegistry.Snippet.Go;
export declare namespace Snippet {
    interface Typescript extends FernRegistry.TypeScriptSnippet {
        type: "typescript";
    }
    interface Python extends FernRegistry.PythonSnippet {
        type: "python";
    }
    interface Java extends FernRegistry.JavaSnippet {
        type: "java";
    }
    interface Go extends FernRegistry.GoSnippet {
        type: "go";
    }
}

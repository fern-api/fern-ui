/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernGeneratorCli from "../../..";

/**
 * The language and its associated publish information (if any).
 *
 * This is used to generate badges, the installation guide, and determine what language to
 * use when surrounding the snippets in a code block.
 */
export type LanguageInfo =
    | FernGeneratorCli.LanguageInfo.Typescript
    | FernGeneratorCli.LanguageInfo.Python
    | FernGeneratorCli.LanguageInfo.Go
    | FernGeneratorCli.LanguageInfo.Java
    | FernGeneratorCli.LanguageInfo.Ruby
    | FernGeneratorCli.LanguageInfo.Csharp;

export declare namespace LanguageInfo {
    interface Typescript extends FernGeneratorCli.TypescriptInfo {
        type: "typescript";
    }

    interface Python extends FernGeneratorCli.PythonInfo {
        type: "python";
    }

    interface Go extends FernGeneratorCli.GoInfo {
        type: "go";
    }

    interface Java extends FernGeneratorCli.JavaInfo {
        type: "java";
    }

    interface Ruby extends FernGeneratorCli.RubyInfo {
        type: "ruby";
    }

    interface Csharp extends FernGeneratorCli.CsharpInfo {
        type: "csharp";
    }
}

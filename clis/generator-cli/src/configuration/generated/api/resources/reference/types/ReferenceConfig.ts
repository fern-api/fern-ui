/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernGeneratorCli from "../../../index";

/**
 * The information to include within the `reference.md` file generated by the CLI.
 *
 * The information here should really be all defined by the generator, and not user provided.
 * We intentionally keep this a bit flexible in the event SDKs structure their package/module
 * references in a unique way for the same API.
 */
export interface ReferenceConfig {
    rootSection?: FernGeneratorCli.RootPackageReferenceSection;
    sections: FernGeneratorCli.ReferenceSection[];
    /** Similar to in README generation, the language property is used to determine the language to use when generating code blocks in markdown. */
    language: FernGeneratorCli.Language;
}

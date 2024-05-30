/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernGeneratorCli from "../../..";

/**
 * The configuration used to generate a README.md file.
 *
 * The information described here is a combination of user-defined information
 * (i.e. specified in the generators.yml), and dynamically generated information
 * that comes from each generator (i.e. features, requirements, and more).
 */
export interface ReadmeConfig {
    language: FernGeneratorCli.LanguageInfo;
    organization: string;
    bannerLink?: string;
    docsLink?: string;
    requirements?: string[];
    /**
     * Specifies the list of features supported by a specific generator.
     * The features are rendered in the order they're specified.
     */
    features?: FernGeneratorCli.ReadmeFeature[];
}

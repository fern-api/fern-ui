/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../index";

export interface Generator {
    id: FernRegistry.generators.GeneratorId;
    displayName: string;
    generatorType: FernRegistry.generators.GeneratorType;
    generatorLanguage?: FernRegistry.generators.GeneratorLanguage;
    /** The name of the docker image to pull to run this generator. */
    dockerImage: string;
}

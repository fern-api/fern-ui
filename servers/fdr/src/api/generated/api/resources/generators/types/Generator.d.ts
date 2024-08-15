/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../..";
export interface Generator {
    id: FernRegistry.generators.GeneratorId;
    generator_type: string;
    generator_language?: string;
    /** The name of the docker image to pull to run this generator. */
    docker_image: string;
}

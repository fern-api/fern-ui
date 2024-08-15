/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../..";
export interface GeneratorRelease extends FernRegistry.generators.Release {
    generator_id: FernRegistry.generators.GeneratorId;
    ir_version: string;
    /** The TypeScript file for the migration to run when upgrading to this version. */
    migration?: string;
    /** The JSON schema (stringified) for the custom config that this generator version supports. */
    custom_config_schema?: string;
}

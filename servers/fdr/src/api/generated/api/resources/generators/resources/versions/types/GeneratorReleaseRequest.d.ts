/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../index";
export interface GeneratorReleaseRequest extends FernRegistry.generators.ReleaseRequest {
    generatorId: FernRegistry.generators.GeneratorId;
    /** The major version of the IR that this generator version consumes. */
    irVersion: number;
    /** The TypeScript file for the migration to run when upgrading to this version. Ideally this would be typed as a file, but we don't support file upload in the express generator. */
    migration?: string;
    /** The JSON schema (stringified) for the custom config that this generator version supports. */
    customConfigSchema?: string;
}

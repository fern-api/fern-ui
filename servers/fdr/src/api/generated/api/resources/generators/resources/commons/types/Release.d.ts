/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../..";
export interface Release extends FernRegistry.generators.ReleaseRequest {
    release_type: FernRegistry.generators.ReleaseType;
    major_version: number;
}

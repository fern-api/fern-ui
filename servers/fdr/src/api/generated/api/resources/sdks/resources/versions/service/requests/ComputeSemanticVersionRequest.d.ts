/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../..";
export interface ComputeSemanticVersionRequest {
    org: string;
    package: string;
    language: FernRegistry.sdks.Language;
    githubRepository?: string;
}

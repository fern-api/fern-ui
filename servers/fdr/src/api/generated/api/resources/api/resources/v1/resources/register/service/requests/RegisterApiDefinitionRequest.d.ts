/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../../index";
export interface RegisterApiDefinitionRequest {
    orgId: FernRegistry.OrgId;
    apiId: FernRegistry.ApiId;
    definition?: FernRegistry.api.v1.register.ApiDefinition;
    definitionLatest?: FernRegistry.api.latest.ApiDefinition;
    sources?: Record<FernRegistry.api.v1.register.SourceId, FernRegistry.api.v1.register.Source>;
}

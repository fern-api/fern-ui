/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../..";
export interface GetDocsConfigByIdResponse {
    docsConfig: FernRegistry.docs.v1.read.DocsConfig;
    apis: Record<FernRegistry.ApiDefinitionId, FernRegistry.api.v1.read.ApiDefinition>;
}

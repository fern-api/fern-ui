/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../index";

export interface DocsDefinition {
    algoliaSearchIndex?: FernRegistry.AlgoliaSearchIndex;
    pages: Record<FernRegistry.docs.v1.commons.PageId, FernRegistry.docs.v1.read.PageContent>;
    apis: Record<FernRegistry.ApiDefinitionId, FernRegistry.api.v1.read.ApiDefinition>;
    files: Record<FernRegistry.docs.v1.commons.FileId, FernRegistry.docs.v1.commons.Url>;
    filesV2: Record<FernRegistry.docs.v1.commons.FileId, FernRegistry.docs.v1.read.File_>;
    id?: FernRegistry.DocsConfigId;
    config: FernRegistry.docs.v1.read.DocsConfig;
    search: FernRegistry.SearchInfo;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../index";
export interface DocsDefinition {
    algoliaSearchIndex: FernRegistry.AlgoliaSearchIndex | undefined;
    pages: Record<FernRegistry.PageId, FernRegistry.docs.v1.read.PageContent>;
    apis: Record<FernRegistry.ApiDefinitionId, FernRegistry.api.v1.read.ApiDefinition>;
    apisV2: Record<FernRegistry.ApiDefinitionId, FernRegistry.api.latest.ApiDefinition>;
    files: Record<FernRegistry.FileId, FernRegistry.Url>;
    filesV2: Record<FernRegistry.FileId, FernRegistry.docs.v1.read.File_>;
    /**
     * A map of file names to their contents.
     * The key is the absolute path file name and the value is the file contents.
     */
    jsFiles: Record<string, string> | undefined;
    id: FernRegistry.DocsConfigId | undefined;
    config: FernRegistry.docs.v1.read.DocsConfig;
    search: FernRegistry.SearchInfo;
}

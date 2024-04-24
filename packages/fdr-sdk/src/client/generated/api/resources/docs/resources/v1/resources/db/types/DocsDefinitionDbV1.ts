/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../..";

export interface DocsDefinitionDbV1 {
    pages: Record<FernRegistry.docs.v1.read.PageId, FernRegistry.docs.v1.read.PageContent>;
    referencedApis: FernRegistry.ApiDefinitionId[];
    files: Record<FernRegistry.docs.v1.read.FileId, FernRegistry.docs.v1.db.DbFileInfo>;
    config: FernRegistry.docs.v1.db.DocsDbConfig;
    colors?: FernRegistry.docs.v1.read.ColorsConfig;
}

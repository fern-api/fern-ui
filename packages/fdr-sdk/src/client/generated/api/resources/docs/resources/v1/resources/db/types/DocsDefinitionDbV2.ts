/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../index";

export interface DocsDefinitionDbV2 {
    pages: Record<FernRegistry.docs.v1.commons.PageId, FernRegistry.docs.v1.read.PageContent>;
    referencedApis: FernRegistry.ApiDefinitionId[];
    files: Record<FernRegistry.docs.v1.commons.FileId, FernRegistry.docs.v1.db.DbFileInfo>;
    config: FernRegistry.docs.v1.db.DocsDbConfig;
    colors?: FernRegistry.docs.v1.commons.ColorsConfig;
    typography?: FernRegistry.docs.v1.commons.DocsTypographyConfig;
}

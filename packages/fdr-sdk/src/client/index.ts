export * as DocsV1Db from "./generated/api/resources/docs/resources/v1/resources/db";
export * as DocsV1Read from "./generated/api/resources/docs/resources/v1/resources/read";
export * as DocsV1Write from "./generated/api/resources/docs/resources/v1/resources/write";

export * as DocsV2Read from "./generated/api/resources/docs/resources/v2/resources/read";
export * as DocsV2Write from "./generated/api/resources/docs/resources/v2/resources/write";

export { visitDbNavigationConfig, visitUnversionedDbNavigationConfig } from "./visitDbNavigationConfig";
export { visitReadNavigationConfig, visitUnversionedReadNavigationConfig } from "./visitReadNavigationConfig";
export { visitUnversionedWriteNavigationConfig, visitWriteNavigationConfig } from "./visitWriteNavigationConfig";

export * as APIV1Db from "./generated/api/resources/api/resources/v1/resources/db";
export * as APIV1Read from "./generated/api/resources/api/resources/v1/resources/read";
export * as APIV1Write from "./generated/api/resources/api/resources/v1/resources/register";

export { FernRegistry as FdrAPI, FernRegistryClient as FdrClient } from "./generated";

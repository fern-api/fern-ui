import { APIV1Read, DocsV1Read, FdrAPI } from "@fern-api/fdr-sdk";
import React from "react";

export const DocsContext = React.createContext<() => DocsContextValue>(() => {
    throw new Error("DocsContextValueProvider is not present in this tree.");
});

export interface DocsContextValue {
    docsDefinition: DocsV1Read.DocsDefinition;

    resolveApi: (apiId: FdrAPI.ApiDefinitionId) => APIV1Read.ApiDefinition | undefined;
    resolvePage: (pageId: DocsV1Read.PageId) => DocsV1Read.PageContent | undefined;
    resolveFile: (fileId: DocsV1Read.FileId) => DocsV1Read.Url | undefined;
}

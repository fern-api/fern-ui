import { Algolia, DocsV1Read, FdrAPI } from "@fern-api/fdr-sdk";
import { ColorsConfig } from "@fern-ui/fdr-utils";
import React from "react";
import { PartnerLogin } from "../../next-app/DocsPage";

export const DocsContext = React.createContext<DocsContextValue>({
    logoHeight: undefined,
    logoHref: undefined,
    colors: {
        dark: undefined,
        light: undefined,
    },
    typography: undefined,
    css: undefined,
    files: {},
    resolveFile: () => undefined,
    searchInfo: undefined,
    navbarLinks: [],
    apis: [],
    partnerLogin: undefined,
});

export interface DocsContextValue {
    logoHeight: DocsV1Read.Height | undefined;
    logoHref: DocsV1Read.Url | undefined;
    colors: ColorsConfig;
    typography: DocsV1Read.DocsTypographyConfigV2 | undefined;
    css: DocsV1Read.CssConfig | undefined;
    files: Record<DocsV1Read.FileId, DocsV1Read.File_>;
    searchInfo: Algolia.SearchInfo | undefined;
    navbarLinks: DocsV1Read.NavbarLink[];
    apis: FdrAPI.ApiDefinitionId[];
    partnerLogin: PartnerLogin | undefined;

    resolveFile: (fileId: DocsV1Read.FileId) => DocsV1Read.File_ | undefined;
}

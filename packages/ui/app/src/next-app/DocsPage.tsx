import { DocsV1Read, DocsV2Read, FdrAPI } from "@fern-api/fdr-sdk";
import type { ColorsConfig, SidebarNavigation } from "@fern-ui/fdr-utils";
import { useDeepCompareMemoize } from "@fern-ui/react-commons";
import { Redirect } from "next";
import { ReactElement } from "react";
import { FeatureFlagContext, FeatureFlags } from "../contexts/FeatureFlagContext.js";
import { DocsContextProvider } from "../contexts/docs-context/DocsContextProvider.js";
import { NavigationContextProvider } from "../contexts/navigation-context/NavigationContextProvider.js";
import { BgImageGradient } from "../docs/BgImageGradient.js";
import { Docs, SearchDialog } from "../docs/Docs.js";
import { type ResolvedPath } from "../resolver/ResolvedPath.js";

export declare namespace DocsPage {
    export interface Props {
        // docs: DocsV2Read.LoadDocsForUrlResponse;
        baseUrl: DocsV2Read.BaseUrl;
        navigation: SidebarNavigation;

        title: string | undefined;
        favicon: string | undefined;
        // backgroundImage: string | undefined;
        colors: ColorsConfig;
        layout: DocsV1Read.DocsLayoutConfig | undefined;
        typography: DocsV1Read.DocsTypographyConfigV2 | undefined;
        css: DocsV1Read.CssConfig | undefined;
        js: DocsV1Read.JsConfig | undefined;
        navbarLinks: DocsV1Read.NavbarLink[];
        logoHeight: DocsV1Read.Height | undefined;
        logoHref: DocsV1Read.Url | undefined;

        search: DocsV1Read.SearchInfo;
        files: Record<DocsV1Read.FileId, DocsV1Read.File_>;
        resolvedPath: ResolvedPath;

        featureFlags: FeatureFlags;
        apis: FdrAPI.ApiDefinitionId[];
    }
}

export function DocsPage(pageProps: DocsPage.Props): ReactElement | null {
    const featureFlags = useDeepCompareMemoize(pageProps.featureFlags);

    const { baseUrl, title, layout, logoHeight, logoHref, resolvedPath } = pageProps;

    return (
        <FeatureFlagContext.Provider value={featureFlags}>
            <DocsContextProvider {...pageProps}>
                <BgImageGradient />
                <NavigationContextProvider
                    resolvedPath={resolvedPath} // this changes between pages
                    domain={baseUrl.domain}
                    basePath={baseUrl.basePath}
                    title={title}
                >
                    <SearchDialog fromHeader={layout?.searchbarPlacement === "HEADER"} />
                    <Docs logoHeight={logoHeight} logoHref={logoHref} />
                </NavigationContextProvider>
            </DocsContextProvider>
        </FeatureFlagContext.Provider>
    );
}

export type DocsPageResult<Props> =
    | { type: "props"; props: Props; revalidate?: number | boolean }
    | { type: "redirect"; redirect: Redirect; revalidate?: number | boolean }
    | { type: "notFound"; notFound: true; revalidate?: number | boolean };

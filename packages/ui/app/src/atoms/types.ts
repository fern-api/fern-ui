import type { DocsV1Read, DocsV2Read, FdrAPI } from "@fern-api/fdr-sdk/client/types";
import type * as FernDocs from "@fern-api/fdr-sdk/docs";
import type * as FernNavigation from "@fern-api/fdr-sdk/navigation";
import { ColorsConfig, SidebarTab, VersionSwitcherInfo } from "@fern-ui/fdr-utils";
import type { FernUser } from "@fern-ui/fern-docs-auth";
import type { FeatureFlags } from "@fern-ui/fern-docs-utils";
import { NextSeoProps } from "@fern-ui/next-seo";
import { CustomerAnalytics } from "../analytics/types";
import { DocsContent } from "../resolver/DocsContent";
import { FernTheme } from "../themes/ThemedDocs";

export interface NavigationProps {
    currentTabIndex: number | undefined;
    tabs: SidebarTab[];
    currentVersionId: FernNavigation.VersionId | undefined;
    versions: VersionSwitcherInfo[];
    sidebar: FernNavigation.SidebarRootNode | undefined;
    trailingSlash: boolean;
}

export interface AnnouncementConfig {
    text: string;
    mdx: FernDocs.MarkdownText;
}

export interface DocsProps {
    baseUrl: DocsV2Read.BaseUrl;
    navigation: NavigationProps;
    title: string | undefined;
    favicon: string | undefined;
    colors: ColorsConfig;
    announcement: AnnouncementConfig | undefined;
    layout: DocsV1Read.DocsLayoutConfig | undefined;
    js: DocsV1Read.JsConfig | undefined;
    navbarLinks: DocsV1Read.NavbarLink[];
    logoHeight: DocsV1Read.Height | undefined;
    logoHref: DocsV1Read.Url | undefined;
    files: Record<DocsV1Read.FileId, DocsV1Read.File_>;
    content: DocsContent;
    featureFlags: FeatureFlags;
    apis: FdrAPI.ApiDefinitionId[];
    seo: NextSeoProps;
    analytics: CustomerAnalytics | undefined; // deprecated
    analyticsConfig: DocsV1Read.AnalyticsConfig | undefined;
    fallback: Record<string, any>;
    theme: FernTheme;
    user: FernUser | undefined;
    defaultLang: DocsV1Read.ProgrammingLanguage;
    stylesheet: string;
    playground: DocsV1Read.PlaygroundConfig | undefined;
}

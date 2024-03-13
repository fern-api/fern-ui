import type { APIV1Read, DocsV1Read, FdrAPI } from "@fern-api/fdr-sdk";
import type { SerializedMdxContent } from "../mdx/mdx";

export interface ColorsConfig {
    light: DocsV1Read.ThemeConfig | undefined;
    dark: DocsV1Read.ThemeConfig | undefined;
}

export interface SidebarVersionInfo {
    id: string;
    slug: string[];
    index: number;
    availability: DocsV1Read.VersionAvailability | null;
}

export interface SidebarTab {
    title: string;
    icon: string;
    slug: string[];
}

export interface SidebarNavigation {
    currentTabIndex: number | undefined;
    tabs: SidebarTab[];
    currentVersionIndex: number | undefined;
    versions: SidebarVersionInfo[];
    sidebarNodes: SidebarNode[];
    slug: string[]; // contains basepath, current version, and tab
}

export type SidebarNodeRaw = SidebarNodeRaw.PageGroup | SidebarNodeRaw.ApiSection | SidebarNodeRaw.Section;

export declare namespace SidebarNodeRaw {
    export interface PageGroup {
        type: "pageGroup";
        slug: string[];
        pages: (Page | Link)[];
    }

    export interface ChangelogPage extends Page {
        pageType: "changelog";
        pageId: string | undefined;
        items: {
            date: string;
            pageId: string;
        }[];
    }

    export interface ApiSection {
        type: "apiSection";
        api: FdrAPI.ApiId;
        id: string;
        title: string;
        slug: string[];
        endpoints: EndpointPage[];
        webhooks: ApiPage[];
        websockets: ApiPage[];
        subpackages: ApiSection[];
        artifacts: DocsV1Read.ApiArtifacts | undefined;
        showErrors: boolean;
        changelog: ChangelogPage | undefined;
    }

    export interface Section {
        type: "section";
        title: string;
        slug: string[];
        items: SidebarNodeRaw[];
    }

    export interface Page {
        type: "page";
        id: string;
        slug: string[];
        title: string;
        description: string | undefined;
    }

    export interface Link {
        type: "link";
        title: string;
        url: string;
    }

    export interface ApiPage extends Page {
        api: FdrAPI.ApiId;
    }

    export interface EndpointPage extends ApiPage {
        method: APIV1Read.HttpMethod;
        stream?: boolean;
    }
}

export type SidebarNode = SidebarNode.PageGroup | SidebarNode.ApiSection | SidebarNode.Section;

export declare namespace SidebarNode {
    export interface PageGroup extends Omit<SidebarNodeRaw.PageGroup, "pages"> {
        pages: (Page | SidebarNodeRaw.Link)[];
    }

    export interface ChangelogPage extends Page, Omit<SidebarNodeRaw.ChangelogPage, keyof Page> {}

    export interface ApiSection
        extends Omit<SidebarNodeRaw.ApiSection, "changelog" | "endpoints" | "webhooks" | "websockets" | "subpackages"> {
        endpoints: EndpointPage[];
        webhooks: ApiPage[];
        websockets: ApiPage[];
        subpackages: ApiSection[];
        changelog: ChangelogPage | undefined;
    }

    export interface Section extends Omit<SidebarNodeRaw.Section, "items"> {
        items: SidebarNode[];
    }

    export interface Page extends Omit<SidebarNodeRaw.Page, "description"> {
        description: SerializedMdxContent | undefined;
    }

    export interface ApiPage extends Page, Omit<SidebarNodeRaw.ApiPage, keyof Page> {}

    export interface EndpointPage extends ApiPage, Omit<SidebarNodeRaw.EndpointPage, keyof ApiPage> {}
}

export const SidebarNode = {
    isPage: (node: SidebarNode.Page | SidebarNodeRaw.Link): node is SidebarNode.Page => node.type === "page",
    isApiPage: (node: SidebarNode.Page): node is SidebarNode.ApiPage => node.type === "page" && "api" in node,
    isChangelogPage: (node: SidebarNode.Page): node is SidebarNode.ChangelogPage =>
        node.type === "page" && (node as SidebarNode.ChangelogPage).pageType === "changelog",
    isEndpointPage: (node: SidebarNode.Page): node is SidebarNode.EndpointPage =>
        node.type === "page" && "method" in node,
};

export const SidebarNodeRaw = {
    isPage: (node: SidebarNodeRaw.Page | SidebarNodeRaw.Link): node is SidebarNodeRaw.Page => node.type === "page",
    isApiPage: (node: SidebarNodeRaw.Page): node is SidebarNodeRaw.ApiPage => node.type === "page" && "api" in node,
    isChangelogPage: (node: SidebarNodeRaw.Page): node is SidebarNodeRaw.ChangelogPage =>
        node.type === "page" && (node as SidebarNodeRaw.ChangelogPage).pageType === "changelog",
    isEndpointPage: (node: SidebarNodeRaw.Page): node is SidebarNodeRaw.EndpointPage =>
        node.type === "page" && "method" in node,
};

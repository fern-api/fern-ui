import { APIV1Read, DocsV1Read, FdrAPI } from "@fern-api/fdr-sdk";
import { isNonNullish, visitDiscriminatedUnion } from "@fern-ui/core-utils";
import { isUnversionedTabbedNavigationConfig, isVersionedNavigationConfig } from "./docs";
import {
    FlattenedApiDefinitionPackage,
    FlattenedApiDefinitionPackageItem,
    flattenApiDefinition,
} from "./flattenApiDefinition";
import { SidebarNodeRaw } from "./types";

function resolveSidebarNodeRawApiSection(
    api: FdrAPI.ApiId,
    id: string,
    subpackage: FlattenedApiDefinitionPackage,
    title: string,
    showErrors: boolean,
    pages: Record<string, DocsV1Read.PageContent>,
): SidebarNodeRaw.ApiSection | undefined {
    const items = subpackage.items
        .map((item) =>
            FlattenedApiDefinitionPackageItem.visit<SidebarNodeRaw.ApiPageOrSubpackage | undefined>(item, {
                endpoint: (endpoint) => ({
                    type: "page",
                    apiType: "endpoint",
                    api,
                    id: endpoint.id,
                    slug: endpoint.slug,
                    title: endpoint.name != null ? endpoint.name : stringifyEndpointPathParts(endpoint.path.parts),
                    description: endpoint.description,
                    method: endpoint.method,
                    stream: endpoint.response?.type.type === "stream",
                    icon: undefined,
                    hidden: false,
                }),
                websocket: (websocket) => ({
                    type: "page",
                    apiType: "websocket",
                    api,
                    id: websocket.id,
                    slug: websocket.slug,
                    title: websocket.name != null ? websocket.name : stringifyEndpointPathParts(websocket.path.parts),
                    description: websocket.description,
                    icon: undefined,
                    hidden: false,
                }),
                webhook: (webhook) => ({
                    type: "page",
                    apiType: "webhook",
                    api,
                    id: webhook.id,
                    slug: webhook.slug,
                    title: webhook.name != null ? webhook.name : "/" + webhook.path.join("/"),
                    description: webhook.description,
                    icon: undefined,
                    hidden: false,
                }),
                subpackage: (subpackage) => {
                    const resolvedSubpackage = resolveSidebarNodeRawApiSection(
                        api,
                        subpackage.subpackageId,
                        subpackage,
                        subpackage.name,
                        showErrors,
                        pages,
                    );

                    if (resolvedSubpackage == null) {
                        return undefined;
                    }

                    return { ...resolvedSubpackage, apiType: "subpackage" };
                },
                page: (page) => ({
                    type: "page",
                    id: page.id,
                    slug: page.slug,
                    title: page.title,
                    description: undefined,
                    icon: page.icon,
                    hidden: page.hidden,
                }),
            }),
        )
        .filter(isNonNullish);

    if (items.length === 0) {
        return;
    }

    return {
        type: "apiSection",
        api,
        id,
        title,
        slug: subpackage.slug,
        items,
        showErrors,
        artifacts: undefined,
        changelog: undefined,
        description: undefined, // TODO: add description here
        icon: undefined,
        hidden: false,
        hasSummaryPage: pages[id] != null,
    };
}

function stringifyEndpointPathParts(path: APIV1Read.EndpointPathPart[]): string {
    return "/" + path.map((part) => (part.type === "literal" ? part.value : `${part.value}`)).join("/");
}

export function resolveSidebarNodesRoot(
    nav: DocsV1Read.NavigationConfig,
    apis: Record<FdrAPI.ApiId, APIV1Read.ApiDefinition>,
    pages: Record<string, DocsV1Read.PageContent>,
    basePathSlug: string[],
): SidebarNodeRaw.Root {
    return {
        type: "root",
        slug: basePathSlug,
        items: resolveSidebarNodesRootItems(nav, apis, pages, basePathSlug),
    };
}

function resolveSidebarNodesRootItems(
    nav: DocsV1Read.NavigationConfig,
    apis: Record<FdrAPI.ApiId, APIV1Read.ApiDefinition>,
    pages: Record<string, DocsV1Read.PageContent>,
    parentSlugs: readonly string[],
): SidebarNodeRaw.Root["items"] {
    if (isVersionedNavigationConfig(nav)) {
        const toRet: SidebarNodeRaw.VersionGroup[] = [];
        nav.versions.forEach((version, index) => {
            // default version
            if (index === 0) {
                toRet.push({
                    type: "versionGroup",
                    id: version.version,
                    slug: parentSlugs,
                    index,
                    availability: version.availability ?? null,
                    items: resolveSidebarNodesVersionItems(version.config, apis, pages, parentSlugs),
                });
            }

            const versionSlug = [...parentSlugs, ...version.urlSlug.split("/")];
            toRet.push({
                type: "versionGroup",
                id: version.version,
                slug: versionSlug,
                index,
                availability: version.availability ?? null,
                items: resolveSidebarNodesVersionItems(version.config, apis, pages, versionSlug),
            });
        });

        return toRet;
    }

    return resolveSidebarNodesVersionItems(nav, apis, pages, parentSlugs);
}

function resolveSidebarNodesVersionItems(
    nav: DocsV1Read.UnversionedNavigationConfig,
    apis: Record<FdrAPI.ApiId, APIV1Read.ApiDefinition>,
    pages: Record<string, DocsV1Read.PageContent>,
    parentSlugs: readonly string[],
): SidebarNodeRaw.VersionGroup["items"] {
    if (isUnversionedTabbedNavigationConfig(nav)) {
        return nav.tabs.map((tab, index): SidebarNodeRaw.TabGroup => {
            const tabSlug = [...parentSlugs, ...tab.urlSlug.split("/")];
            return {
                type: "tabGroup",
                title: tab.title,
                icon: tab.icon,
                slug: tabSlug,
                index,
                items: resolveSidebarNodes(tab.items, apis, pages, tabSlug, parentSlugs),
            };
        });
    }

    return resolveSidebarNodes(nav.items, apis, pages, parentSlugs, parentSlugs);
}

export function resolveSidebarNodes(
    navigationItems: DocsV1Read.NavigationItem[],
    apis: Record<FdrAPI.ApiId, APIV1Read.ApiDefinition>,
    pages: Record<string, DocsV1Read.PageContent>,
    parentSlugs: readonly string[], // parent slugs that are inherited from the parent node
    fixedSlugs: readonly string[], // basepath and version slugs
): SidebarNodeRaw[] {
    const sidebarNodes: SidebarNodeRaw[] = [];

    function pushPageGroup(item: SidebarNodeRaw.PageGroup["pages"][0]) {
        const lastSidebarNode = sidebarNodes[sidebarNodes.length - 1];
        if (lastSidebarNode != null && lastSidebarNode.type === "pageGroup") {
            lastSidebarNode.pages.push(item);
        } else {
            sidebarNodes.push({
                type: "pageGroup",
                slug: parentSlugs,
                pages: [item],
            });
        }
    }

    for (const navigationItem of navigationItems) {
        visitDiscriminatedUnion(navigationItem, "type")._visit<void>({
            page: (page) => {
                const resolvedPage: SidebarNodeRaw.Page = {
                    ...page,
                    slug:
                        page.fullSlug != null
                            ? [...fixedSlugs, ...page.fullSlug]
                            : [...parentSlugs, ...page.urlSlug.split("/")],
                    type: "page",
                    description: undefined,
                    icon: page.icon,
                    hidden: page.hidden ?? false,
                };
                pushPageGroup(resolvedPage);
            },
            api: async (api) => {
                const definition = apis[api.api];
                if (definition != null) {
                    const definitionSlug =
                        api.fullSlug != null
                            ? [...fixedSlugs, ...api.fullSlug]
                            : api.skipUrlSlug
                              ? parentSlugs
                              : [...parentSlugs, ...api.urlSlug.split("/")];
                    const flattened = flattenApiDefinition(definition, definitionSlug, api.navigation);
                    const resolved = resolveSidebarNodeRawApiSection(
                        api.api,
                        api.api,
                        flattened,
                        api.title,
                        api.showErrors,
                        pages,
                    );
                    sidebarNodes.push({
                        type: "apiSection",
                        api: api.api,
                        id: api.api,
                        title: api.title,
                        slug: definitionSlug,
                        items: resolved?.items ?? [],
                        artifacts: api.artifacts,
                        showErrors: api.showErrors,
                        changelog:
                            api.changelog != null
                                ? {
                                      type: "page",
                                      pageType: "changelog",
                                      id: api.changelog.urlSlug,
                                      title: api.changelog.title ?? "Changelog",
                                      description: api.changelog.description,
                                      pageId: api.changelog.pageId,
                                      slug:
                                          api.changelog.fullSlug != null
                                              ? [...fixedSlugs, ...api.changelog.fullSlug]
                                              : [...definitionSlug, ...api.changelog.urlSlug.split("/")],
                                      items: api.changelog.items.map((item) => ({
                                          date: item.date,
                                          pageId: item.pageId,
                                      })),
                                      icon: api.changelog.icon,
                                      hidden: api.changelog.hidden ?? false,
                                  }
                                : undefined,
                        description: undefined, // TODO: add description here
                        icon: api.icon,
                        hidden: api.hidden ?? false,
                        hasSummaryPage: pages[api.api] != null,
                    });
                }
            },
            section: (section) => {
                const sectionSlug =
                    section.fullSlug != null
                        ? [...fixedSlugs, ...section.fullSlug]
                        : section.skipUrlSlug
                          ? parentSlugs
                          : [...parentSlugs, ...section.urlSlug.split("/")];
                const resolvedSection: SidebarNodeRaw.Section = {
                    type: "section",
                    title: section.title,
                    slug: sectionSlug,
                    // if section.fullSlug is defined, the child slugs will be built from that, rather than from inherited parentSlugs
                    items: resolveSidebarNodes(section.items, apis, pages, sectionSlug, fixedSlugs),
                    icon: section.icon,
                    hidden: section.hidden ?? false,
                };

                if (section.collapsed) {
                    pushPageGroup(resolvedSection);
                } else {
                    sidebarNodes.push(resolvedSection);
                }
            },
            link: (link) => {
                pushPageGroup({ ...link, icon: link.icon });
            },
            _other: () => Promise.resolve(),
        });
    }

    return sidebarNodes;
}

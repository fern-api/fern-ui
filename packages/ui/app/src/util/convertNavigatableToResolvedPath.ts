import { APIV1Read, DocsV1Read, FernNavigation } from "@fern-api/fdr-sdk";
import { isNonNullish } from "@fern-ui/core-utils";
import { captureSentryError } from "../analytics/sentry";
import { FeatureFlags } from "../atoms/flags";
import { serializeMdx } from "../mdx/bundler";
import { getFrontmatter } from "../mdx/frontmatter";
import { FernSerializeMdxOptions, type BundledMDX } from "../mdx/types";
import { ApiDefinitionResolver } from "../resolver/ApiDefinitionResolver";
import { ApiTypeResolver } from "../resolver/ApiTypeResolver";
import type { ResolvedPath } from "../resolver/ResolvedPath";
import { ResolvedRootPackage } from "../resolver/types";
import { slugToHref } from "./slugToHref";

async function getSubtitle(
    node: FernNavigation.NavigationNodeNeighbor,
    pages: Record<string, DocsV1Read.PageContent>,
): Promise<BundledMDX | undefined> {
    const pageId = FernNavigation.utils.getPageId(node);
    if (pageId == null) {
        return;
    }
    const content = pages[pageId]?.markdown;
    if (content == null) {
        return;
    }

    try {
        const { data: frontmatter } = getFrontmatter(content);
        if (frontmatter.excerpt != null) {
            return await serializeMdx(frontmatter.excerpt);
        }
        return undefined;
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Error occurred while parsing frontmatter", e);
        captureSentryError(e, {
            context: "getStaticProps",
            errorSource: "getSubtitle",
            errorDescription: "Error occurred while parsing frontmatter to get the subtitle (aka excerpt)",
            data: {
                pageTitle: node.title,
                pageId,
                route: slugToHref(node.slug),
            },
        });
        return undefined;
    }
}

export async function convertNavigatableToResolvedPath({
    found,
    apis,
    pages,
    mdxOptions,
    domain,
    featureFlags,
}: {
    found: FernNavigation.utils.Node.Found;
    apis: Record<string, APIV1Read.ApiDefinition>;
    pages: Record<string, DocsV1Read.PageContent>;
    mdxOptions?: FernSerializeMdxOptions;
    domain: string;
    featureFlags: FeatureFlags;
}): Promise<ResolvedPath | undefined> {
    const neighbors = await getNeighbors(found, pages);
    const { node, apiReference } = found;

    if (node.type === "changelog") {
        const pageIds = new Set<FernNavigation.PageId>();
        FernNavigation.utils.traverseNavigation(node, (n) => {
            if (FernNavigation.hasMarkdown(n)) {
                const pageId = FernNavigation.utils.getPageId(n);
                if (pageId != null) {
                    pageIds.add(pageId);
                }
            }
        });
        const pageRecords = (
            await Promise.all(
                [...pageIds].map(async (pageId) => {
                    const markdown = pages[pageId]?.markdown;
                    if (markdown == null) {
                        return;
                    }
                    return {
                        pageId,
                        markdown: await serializeMdx(markdown, mdxOptions),
                    };
                }),
            )
        ).filter(isNonNullish);

        return {
            type: "changelog",
            sectionTitleBreadcrumbs: found.breadcrumb,
            node,
            pages: Object.fromEntries(pageRecords.map((record) => [record.pageId, record.markdown])),
            // items: await Promise.all(itemsPromise),
            // neighbors,
            fullSlug: found.node.slug,
        };
    } else if (node.type === "changelogEntry") {
        const markdown = pages[node.pageId]?.markdown;

        const page = await serializeMdx(markdown, mdxOptions);

        const changelogNode = found.parents.find((n): n is FernNavigation.ChangelogNode => n.type === "changelog");
        if (changelogNode == null) {
            throw new Error("Changelog node not found");
        }

        return {
            type: "changelog-entry",
            changelogTitle: changelogNode.title,
            changelogSlug: changelogNode.slug,
            sectionTitleBreadcrumbs: found.breadcrumb,
            node,
            pages: { [node.pageId]: page },
            neighbors,
            fullSlug: found.node.slug,
        };
    } else if (apiReference != null) {
        const api = apis[apiReference.apiDefinitionId];
        if (api == null) {
            return;
        }
        const holder = FernNavigation.ApiDefinitionHolder.create(api);
        const typeResolver = new ApiTypeResolver(api.types);
        // const [prunedApiDefinition] = findAndPruneApiSection(fullSlug, flattenedApiDefinition);
        const apiDefinition = await ApiDefinitionResolver.resolve(
            apiReference,
            holder,
            typeResolver,
            pages,
            mdxOptions,
            featureFlags,
            domain,
        );
        return {
            type: "api-page",
            fullSlug: found.node.slug,
            api: apiReference.apiDefinitionId,
            apiDefinition,
            // artifacts: apiSection.artifacts ?? null, // TODO: add artifacts
            showErrors: apiReference.showErrors ?? false,
            neighbors,
        };
    } else if (node.type === "page" || node.type === "landingPage") {
        const pageContent = pages[node.pageId];
        if (pageContent == null) {
            return;
        }
        const mdx = await serializeMdx(pageContent.markdown, {
            ...mdxOptions,
            frontmatterDefaults: {
                title: node.title,
                breadcrumbs: found.breadcrumb,
                "edit-this-page-url": pageContent.editThisPageUrl,
                "force-toc": featureFlags.isTocDefaultEnabled,
            },
        });
        const frontmatter = typeof mdx === "string" ? {} : mdx.frontmatter;

        let apiNodes: FernNavigation.ApiReferenceNode[] = [];
        if (
            pageContent.markdown.includes("EndpointRequestSnippet") ||
            pageContent.markdown.includes("EndpointResponseSnippet")
        ) {
            apiNodes = FernNavigation.utils.collectApiReferences(found.currentVersion ?? found.root);
        }
        const resolvedApis = Object.fromEntries(
            await Promise.all(
                apiNodes.map(async (apiNode): Promise<[string, ResolvedRootPackage]> => {
                    const holder = FernNavigation.ApiDefinitionHolder.create(apis[apiNode.apiDefinitionId]);
                    const typeResolver = new ApiTypeResolver(apis[apiNode.apiDefinitionId].types);
                    return [
                        apiNode.title,
                        await ApiDefinitionResolver.resolve(
                            apiNode,
                            holder,
                            typeResolver,
                            pages,
                            mdxOptions,
                            featureFlags,
                            domain,
                        ),
                    ];
                }),
            ),
        );
        return {
            type: "custom-markdown-page",
            fullSlug: node.slug,
            title: frontmatter.title ?? node.title,
            mdx,
            neighbors,
            apis: resolvedApis,
        };
    }
    return undefined;
}

async function getNeighbor(
    node: FernNavigation.NavigationNodeNeighbor | undefined,
    pages: Record<string, DocsV1Read.PageContent>,
): Promise<ResolvedPath.Neighbor | null> {
    if (node == null) {
        return null;
    }
    const excerpt = await getSubtitle(node, pages);
    return {
        fullSlug: node.slug,
        title: node.title,
        excerpt,
    };
}

async function getNeighbors(
    node: FernNavigation.utils.Node.Found,
    pages: Record<string, DocsV1Read.PageContent>,
): Promise<ResolvedPath.Neighbors> {
    const [prev, next] = await Promise.all([getNeighbor(node.prev, pages), getNeighbor(node.next, pages)]);
    return { prev, next };
}

import type { APIV1Read, DocsV1Read } from "@fern-api/fdr-sdk";
import { buildUrl, resolveSidebarNodesRoot, visitSidebarNodeRaw } from "@fern-ui/fdr-utils";

export function getAllUrlsFromDocsConfig(
    host: string,
    basePath: string | undefined,
    docsConfig: DocsV1Read.DocsConfig,
    apis: Record<string, APIV1Read.ApiDefinition>,
): string[] {
    const root = resolveSidebarNodesRoot(docsConfig.navigation, apis, basePath);
    const visitedSlugs: string[] = [];

    visitSidebarNodeRaw(root, (node) => {
        visitedSlugs.push(node.slug.join("/"));
    });

    return Array.from(new Set(visitedSlugs.map((slug) => buildUrl({ host, pathname: slug }))));
}

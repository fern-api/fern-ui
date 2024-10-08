import { ApiDefinitionV1ToLatest } from "@fern-api/fdr-sdk/api-definition";
import type { APIV1Read, DocsV1Read } from "@fern-api/fdr-sdk/client/types";
import * as FernNavigation from "@fern-api/fdr-sdk/navigation";
import { ApiDefinitionLoader } from "@fern-ui/fern-docs-server";
import type { FeatureFlags } from "@fern-ui/fern-docs-utils";
import type { MDX_SERIALIZER } from "../mdx/bundler";
import type { FernSerializeMdxOptions } from "../mdx/types";
import type { DocsContent } from "./DocsContent";
import { resolveApiEndpointPage } from "./resolveApiEndpointPage";
import { resolveApiReferencePage } from "./resolveApiReferencePage";
import { resolveChangelogEntryPage } from "./resolveChangelogEntryPage";
import { resolveChangelogPage } from "./resolveChangelogPage";
import { resolveMarkdownPage } from "./resolveMarkdownPage";
import { resolveSubtitle } from "./resolveSubtitle";

export async function resolveDocsContent({
    host,
    found,
    apis,
    pages,
    mdxOptions,
    featureFlags,
    serializeMdx,
    engine,
}: {
    host: string;
    found: FernNavigation.utils.Node.Found;
    apis: Record<string, APIV1Read.ApiDefinition>;
    pages: Record<string, DocsV1Read.PageContent>;
    mdxOptions?: FernSerializeMdxOptions;
    featureFlags: FeatureFlags;
    serializeMdx: MDX_SERIALIZER;
    engine: string;
}): Promise<DocsContent | undefined> {
    const neighbors = await getNeighbors(found, pages, serializeMdx);
    const { node, apiReference, parents, breadcrumb, collector } = found;

    if (node.type === "changelog") {
        return resolveChangelogPage({
            node,
            breadcrumb,
            pages,
            mdxOptions,
            serializeMdx,
        });
    } else if (node.type === "changelogEntry") {
        return resolveChangelogEntryPage({
            node,
            parents,
            breadcrumb,
            pages,
            serializeMdx,
            mdxOptions,
            neighbors,
        });
    } else if (apiReference != null && apiReference.paginated && FernNavigation.hasMarkdown(node)) {
        // if long scrolling is disabled, we should render a markdown page by itself
        return resolveMarkdownPage({
            node,
            found,
            apis,
            pages,
            mdxOptions,
            featureFlags,
            serializeMdx,
            neighbors,
        });
    } else if (apiReference != null) {
        if (apiReference.paginated && FernNavigation.isApiLeaf(node)) {
            const v1 = apis[apiReference.apiDefinitionId];
            if (v1 == null) {
                // eslint-disable-next-line no-console
                console.error("API definition not found", apiReference.apiDefinitionId);
                return;
            }
            const apiDefinitionLoader = ApiDefinitionLoader.create(host, apiReference.apiDefinitionId)
                .withMdxBundler(serializeMdx, engine)
                .withFlags(featureFlags)
                .withApiDefinition(ApiDefinitionV1ToLatest.from(v1, featureFlags).migrate())
                .withEnvironment(process.env.NEXT_PUBLIC_FDR_ORIGIN)
                .withResolveDescriptions();

            return resolveApiEndpointPage({
                node,
                apiDefinitionLoader,
                mdxOptions,
                featureFlags,
                neighbors,
                serializeMdx,
                collector,
                showErrors: apiReference.showErrors,
            });
        }

        return resolveApiReferencePage({
            node,
            apis,
            apiReference,
            parents,
            pages,
            mdxOptions,
            featureFlags,
            serializeMdx,
            collector,
        });
    } else {
        return resolveMarkdownPage({
            node,
            found,
            apis,
            pages,
            mdxOptions,
            featureFlags,
            serializeMdx,
            neighbors,
        });
    }
}

async function getNeighbor(
    node: FernNavigation.NavigationNodeNeighbor | undefined,
    pages: Record<string, DocsV1Read.PageContent>,
    serializeMdx: MDX_SERIALIZER,
): Promise<DocsContent.Neighbor | null> {
    if (node == null) {
        return null;
    }
    const excerpt = await resolveSubtitle(node, pages, serializeMdx);
    return {
        slug: node.slug,
        title: node.title,
        excerpt,
    };
}

async function getNeighbors(
    node: FernNavigation.utils.Node.Found,
    pages: Record<string, DocsV1Read.PageContent>,
    serializeMdx: MDX_SERIALIZER,
): Promise<DocsContent.Neighbors> {
    const [prev, next] = await Promise.all([
        getNeighbor(node.prev, pages, serializeMdx),
        getNeighbor(node.next, pages, serializeMdx),
    ]);
    return { prev, next };
}

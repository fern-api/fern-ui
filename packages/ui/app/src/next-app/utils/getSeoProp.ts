import { APIV1Read, DocsV1Read, FernNavigation } from "@fern-api/fdr-sdk";
import { visitDiscriminatedUnion } from "@fern-ui/core-utils";
import grayMatter from "gray-matter";
import { trim } from "lodash-es";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toHast } from "mdast-util-to-hast";
import type { DefaultSeoProps, LinkTag, MetaTag, NextSeoProps } from "next-seo/lib/types";
import { visit } from "unist-util-visit";
import { stringHasMarkdown } from "../../mdx/common/util";
import { FernDocsFrontmatter } from "../../mdx/mdx";
import { ResolvedPath } from "../../resolver/ResolvedPath";
import { getFontExtension } from "./getFontVariables";

function getFile(fileOrUrl: DocsV1Read.FileIdOrUrl, files: Record<string, DocsV1Read.File_>): DocsV1Read.File_ {
    return visitDiscriminatedUnion(fileOrUrl)._visit({
        fileId: ({ value: fileId }) => files[fileId],
        url: ({ value: url }) => ({ type: "url", url }),
    });
}

function getFrontmatter(content: string): FernDocsFrontmatter {
    try {
        const gm = grayMatter(content);
        return gm.data;
    } catch (e) {
        return {};
    }
}

export function getDefaultSeoProps(
    domain: string,
    { metadata, title, favicon, typographyV2: typography }: DocsV1Read.DocsConfig,
    pages: Record<string, DocsV1Read.PageContent>,
    files: Record<string, DocsV1Read.File_>,
    apis: Record<string, APIV1Read.ApiDefinition>,
    node: FernNavigation.NavigationNodePage,
): DefaultSeoProps {
    const additionalMetaTags: MetaTag[] = [];
    const additionalLinkTags: LinkTag[] = [];
    const openGraph: DefaultSeoProps["openGraph"] = {};
    const twitter: DefaultSeoProps["twitter"] = {};
    const seo: DefaultSeoProps = {
        openGraph,
        twitter,
        additionalMetaTags,
        additionalLinkTags,
    };

    const pageId = FernNavigation.utils.getPageId(node);

    let ogMetadata: DocsV1Read.MetadataConfig = metadata ?? {};

    if (pageId != null && pages[pageId]) {
        const frontmatter = getFrontmatter(pages[pageId].markdown);
        ogMetadata = { ...ogMetadata, ...frontmatter };

        // retrofit og:image
        if (frontmatter.image != null) {
            ogMetadata["og:image"] ??= { type: "url", value: frontmatter.image };
        }

        seo.title ??= frontmatter.title;
        seo.description ??= frontmatter.description ?? frontmatter.subtitle ?? frontmatter.excerpt;
    }

    if (FernNavigation.isApiLeaf(node) && apis[node.apiDefinitionId] != null) {
        const api = FernNavigation.createApiHolder(apis[node.apiDefinitionId]);

        visitDiscriminatedUnion(node)._visit({
            endpoint: ({ endpointId }) => {
                const endpoint = api.endpoints.get(endpointId);
                if (endpoint?.description != null) {
                    seo.description ??= endpoint.description;
                }
            },
            webSocket: ({ webSocketId }) => {
                const webSocket = api.webSockets.get(webSocketId);
                if (webSocket?.description != null) {
                    seo.description ??= webSocket.description;
                }
            },
            webhook: ({ webhookId }) => {
                const webhook = api.webhooks.get(webhookId);
                if (webhook?.description != null) {
                    seo.description ??= webhook.description;
                }
            },
        });
    }

    if (seo.title != null && stringHasMarkdown(seo.title)) {
        seo.description = stripMarkdown(seo.title);
    }

    if (seo.description != null && stringHasMarkdown(seo.description)) {
        seo.description = stripMarkdown(seo.description);
    }

    openGraph.title ??= ogMetadata["og:title"];
    openGraph.description ??= ogMetadata["og:description"];
    openGraph.locale ??= ogMetadata["og:locale"];
    openGraph.url ??= ogMetadata["og:url"];
    openGraph.siteName ??= ogMetadata["og:site_name"];
    twitter.handle ??= ogMetadata["twitter:handle"];
    twitter.site ??= ogMetadata["twitter:site"];
    twitter.cardType ??= ogMetadata["twitter:card"];

    if (ogMetadata["twitter:title"] != null) {
        additionalMetaTags.push({
            name: "twitter:title",
            content: ogMetadata["twitter:title"],
        });
    }

    if (ogMetadata["twitter:description"] != null) {
        additionalMetaTags.push({
            name: "twitter:description",
            content: ogMetadata["twitter:description"],
        });
    }

    if (ogMetadata["twitter:url"] != null) {
        additionalMetaTags.push({
            name: "twitter:url",
            content: ogMetadata["twitter:url"],
        });
    }

    if (ogMetadata["twitter:image"] != null) {
        const file = getFile(ogMetadata["twitter:image"], files);
        additionalMetaTags.push({
            name: "twitter:image",
            content: file.url,
        });

        if (file.type === "image") {
            additionalMetaTags.push({
                name: "twitter:image:width",
                content: String(file.width),
            });
            additionalMetaTags.push({
                name: "twitter:image:height",
                content: String(file.height),
            });
        }
    }

    if (ogMetadata["og:image"] != null) {
        const file = getFile(ogMetadata["og:image"], files);
        openGraph.images ??= [
            {
                url: file.url,
                width: ogMetadata["og:image:width"] ?? (file.type === "image" ? file.width : undefined),
                height: ogMetadata["og:image:height"] ?? (file.type === "image" ? file.height : undefined),
            },
        ];
    }

    // defaults
    seo.title ??= node.title;
    openGraph.siteName ??= title;
    seo.defaultTitle ??= title;
    if (title != null) {
        seo.titleTemplate = `%s — ${title}`;
    }

    if (favicon != null && files[favicon] != null) {
        const image = files[favicon];
        additionalLinkTags.push({
            rel: "icon",
            href: image.url,
            crossOrigin: "anonymous",
        });
    }

    // typography
    typography?.bodyFont?.variants.forEach((variant) => {
        const tag = getPreloadedFont(variant, files);
        if (tag != null) {
            additionalLinkTags.push(tag);
        }
    });
    typography?.codeFont?.variants.forEach((variant) => {
        const tag = getPreloadedFont(variant, files);
        if (tag != null) {
            additionalLinkTags.push(tag);
        }
    });
    typography?.headingsFont?.variants.forEach((variant) => {
        const tag = getPreloadedFont(variant, files);
        if (tag != null) {
            additionalLinkTags.push(tag);
        }
    });

    // noindex, nofollow
    if (
        domain.endsWith(".docs.dev.buildwithfern.com") ||
        domain.endsWith(".docs.staging.buildwithfern.com") ||
        domain.endsWith(".docs.buildwithfern.com") ||
        process.env.NODE_ENV !== "production"
    ) {
        seo.dangerouslySetAllPagesToNoIndex = true;
        seo.dangerouslySetAllPagesToNoFollow = true;
        seo.norobots = true;
    }

    return seo;
}

export function getNextSeoProps(
    resolvedPath: ResolvedPath,
    node: FernNavigation.NavigationNodeWithMetadata | undefined,
): NextSeoProps {
    const seo: NextSeoProps = {};

    // HACKHACK: sets title on shallow navigation
    // TODO: find a better way to handle this
    if (node != null && resolvedPath.fullSlug !== node.slug) {
        seo.title ??= node.title;
    }
    return seo;
}

function getPreloadedFont(
    variant: DocsV1Read.CustomFontConfigVariant,
    files: Record<DocsV1Read.FileId, DocsV1Read.File_>,
): LinkTag | null {
    const file = files[variant.fontFile]?.url;
    if (file == null) {
        return null;
    }
    let fontExtension: string;
    try {
        fontExtension = getFontExtension(new URL(file).pathname);
    } catch (err) {
        fontExtension = getFontExtension(file);
    }
    return {
        rel: "preload",
        href: file,
        as: "font",
        type: `font/${fontExtension}`,
        crossOrigin: "anonymous",
    };
}

function stripMarkdown(markdown: string): string {
    const tree = toHast(fromMarkdown(markdown));
    let toRet = "";
    visit(tree, "text", (node) => {
        toRet += node.value + " ";
    });

    return trim(toRet);
}

import { DocsV1Read, FernNavigation } from "@fern-api/fdr-sdk";
import { JsonLd } from "@fern-ui/next-seo";
import urljoin from "url-join";
import { getFrontmatter } from "../../mdx/frontmatter";

function toUrl(domain: string, slug: FernNavigation.Slug): string {
    return urljoin(`https://${domain}`, slug);
}

export function getBreadcrumbList(
    domain: string,
    pages: Record<string, DocsV1Read.PageContent>,
    parents: FernNavigation.NavigationNode[],
    node: FernNavigation.NavigationNodePage,
): JsonLd.BreadcrumbListSchema {
    if (FernNavigation.isPage(node)) {
        const pageId = FernNavigation.utils.getPageId(node);
        if (pageId != null && pages[pageId] != null) {
            const { data: frontmatter } = getFrontmatter(pages[pageId].markdown);
            if (frontmatter["jsonld:breadcrumb"] != null) {
                const breadcrumb = JsonLd.BreadcrumbListSchema.safeParse(frontmatter["jsonld:breadcrumb"]);
                if (breadcrumb.success) {
                    return breadcrumb.data;
                } else {
                    // eslint-disable-next-line no-console
                    console.error("Invalid jsonld:breadcrumb", breadcrumb.error.toString());
                }
            }
        }
    }

    const elements: JsonLd.ListElementSchema[] = [];
    let lastSlug: string | undefined = undefined;

    parents.forEach((parent) => {
        if (FernNavigation.hasMetadata(parent)) {
            const slug =
                parent.slug === lastSlug
                    ? FernNavigation.hasRedirect(parent)
                        ? parent.pointsTo !== lastSlug
                            ? parent.pointsTo
                            : undefined
                        : undefined
                    : parent.slug;
            if (slug != null) {
                elements.push(JsonLd.listItem(elements.length + 1, parent.title, toUrl(domain, slug)));
                lastSlug = slug;
            }
        }
    });

    elements.push(JsonLd.listItem(elements.length + 1, node.title));

    return JsonLd.breadcrumbList(elements);
}

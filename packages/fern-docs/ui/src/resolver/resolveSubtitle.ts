import type * as FernDocs from "@fern-api/fdr-sdk/docs";
import * as FernNavigation from "@fern-api/fdr-sdk/navigation";
import { DocsLoader } from "@fern-docs/cache";
import { getFrontmatter } from "@fern-docs/mdx";
import type { MDX_SERIALIZER } from "../mdx/bundler";

export async function resolveSubtitle(
  node: FernNavigation.NavigationNodeNeighbor,
  loader: DocsLoader,
  serializeMdx: MDX_SERIALIZER
): Promise<FernDocs.MarkdownText | undefined> {
  const pageId = FernNavigation.getPageId(node);
  if (pageId == null) {
    return;
  }
  const content = await loader.getPage(pageId);
  if (content == null) {
    return;
  }

  try {
    const { data: frontmatter } = getFrontmatter(content.markdown);
    if (frontmatter.excerpt != null) {
      return await serializeMdx(frontmatter.excerpt);
    }
    return undefined;
  } catch (e) {
    // TODO: sentry

    console.error(
      "Error occurred while parsing frontmatter to get the subtitle (aka excerpt)",
      e
    );
    return undefined;
  }
}

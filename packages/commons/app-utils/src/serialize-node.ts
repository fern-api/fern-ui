import type { DocsNode, FdrAPI, NavigatableDocsNode } from "@fern-api/fdr-sdk";
import { serializeMdxContent, type SerializedMdxContent } from "./mdx";

export type SerializedPageNode = DocsNode.Page & {
    editThisPageUrl: string | null;
    serializedMdxContent: SerializedMdxContent;
};

export type SerializedNavigatableNode =
    | DocsNode.TopLevelEndpoint
    | DocsNode.Endpoint
    | DocsNode.TopLevelWebhook
    | DocsNode.Webhook
    | SerializedPageNode;

export async function serializePageNode({
    pageNode,
    docsDefinition,
}: {
    pageNode: DocsNode.Page;
    docsDefinition: FdrAPI.docs.v1.read.DocsDefinition;
}): Promise<SerializedPageNode> {
    const pageContent = docsDefinition.pages[pageNode.page.id];
    if (pageContent == null) {
        throw new Error(`Cannot find page content for page "${pageNode.page.id}"`);
    }
    return {
        ...pageNode,
        editThisPageUrl: pageContent.editThisPageUrl ?? null,
        serializedMdxContent: await serializeMdxContent(pageContent.markdown),
    };
}

export async function serializeNavigatableNode({
    node,
    docsDefinition,
}: {
    node: NavigatableDocsNode;
    docsDefinition: FdrAPI.docs.v1.read.DocsDefinition;
}): Promise<SerializedNavigatableNode> {
    return node.type === "page" ? await serializePageNode({ pageNode: node, docsDefinition }) : node;
}

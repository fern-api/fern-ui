import type { Element, Root } from "hast";
import type { MdxJsxAttribute, MdxJsxFlowElementHast } from "mdast-util-mdx-jsx";
import type { Highlighter } from "shiki";
import { visit } from "unist-util-visit";
import { CodeBlocks } from "../../mdx/components/CodeBlocks";
import { getHighlighterInstance, HighlightedTokens, highlightTokens } from "../../syntax-highlighting/fernShiki";
import { valueToEstree } from "./to-estree";
import { isElement, isMdxJsxFlowElement, isText, toAttribute } from "./utils";

export function rehypeFernCode(): (tree: Root) => void {
    return async function (tree: Root): Promise<void> {
        const highlighter = await getHighlighterInstance();

        visit(tree, (node, index, parent) => {
            if (index == null) {
                return;
            }

            if (isMdxJsxFlowElement(node) && node.name === "CodeBlocks") {
                const codeBlockItems = visitCodeBlockNodes(node, highlighter);
                parent?.children.splice(index, 1, {
                    type: "mdxJsxFlowElement",
                    name: "CodeBlocks",
                    attributes: [toAttribute("items", JSON.stringify(codeBlockItems), valueToEstree(codeBlockItems))],
                    children: [],
                });
            }

            if (isMdxJsxFlowElement(node) && node.name === "CodeBlock") {
                const codeBlockItems = visitCodeBlockNodes(node, highlighter);

                if (codeBlockItems.length === 1 && codeBlockItems[0] != null && codeBlockItems[0].title == null) {
                    // keep the original CodeBlock if it has no title
                } else {
                    parent?.children.splice(index, 1, {
                        type: "mdxJsxFlowElement",
                        name: "CodeBlocks",
                        attributes: [
                            toAttribute("items", JSON.stringify(codeBlockItems), valueToEstree(codeBlockItems)),
                        ],
                        children: [],
                    });
                }
            }
        });

        visit(tree, "element", (node, index, parent) => {
            if (index == null) {
                return;
            }

            if (isBlockCode(node)) {
                const head = node.children.filter(isElement).find((child) => child.tagName === "code");
                if (head != null) {
                    const highlighted = convertToHighlighted(head, highlighter);

                    if (!highlighted) {
                        return;
                    }

                    parent?.children.splice(index, 1, {
                        type: "mdxJsxFlowElement",
                        name: "CodeBlock",
                        attributes: [toAttribute("tokens", JSON.stringify(highlighted), valueToEstree(highlighted))],
                        children: [],
                    });
                }
            }
        });
    };
}

function visitCodeBlockNodes(nodeToVisit: MdxJsxFlowElementHast, highlighter: Highlighter) {
    const codeBlockItems: CodeBlocks.Item[] = [];
    visit(nodeToVisit, (node) => {
        if (isMdxJsxFlowElement(node) && node.name === "CodeBlock") {
            const jsxAttributes = node.attributes.filter(
                (attr) => attr.type === "mdxJsxAttribute",
            ) as MdxJsxAttribute[];
            const title = jsxAttributes.find((attr) => attr.name === "title");
            visit(node, "element", (child) => {
                if (child.tagName === "code") {
                    const highlighted = convertToHighlighted(child, highlighter);
                    if (highlighted != null) {
                        codeBlockItems.push({
                            tokens: highlighted,
                            title:
                                typeof title?.value === "string"
                                    ? title.value
                                    : title?.value?.type === "mdxJsxAttributeValueExpression"
                                      ? title.value.value
                                      : undefined,
                        });
                    }
                }
            });
        }
    });
    return codeBlockItems;
}

function convertToHighlighted(node: Element, highlighter: Highlighter): HighlightedTokens | undefined {
    const prefix = "language-";
    const code = node.children.find(isText)?.value;

    if (code == null) {
        return;
    }

    const classes = node.properties.className;

    let lang = `${prefix}txt`;

    if (Array.isArray(classes)) {
        lang = (classes.find((d) => typeof d === "string" && d.startsWith(prefix)) as string) ?? lang;
    }

    lang = lang.substring(prefix.length);
    return highlightTokens(highlighter, code, lang);
}

// remove leading and trailing newlines
export function trimCode(code: string): string {
    return code.replace(/^\n+|\n+$/g, "");
}

export function isBlockCode(element: Element): element is Element {
    return (
        element.tagName === "pre" &&
        Array.isArray(element.children) &&
        element.children.length === 1 &&
        isElement(element.children[0]) &&
        element.children[0].tagName === "code"
    );
}

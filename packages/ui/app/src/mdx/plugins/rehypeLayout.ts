import { clsx as cn } from "clsx";
import type { Element, ElementContent, Root } from "hast";
import { h } from "hastscript";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toHast } from "mdast-util-to-hast";
import { visit } from "unist-util-visit";
import type { VFile } from "vfile";
import { FernDocsFrontmatter } from "../mdx";
import { makeToc } from "./makeToc";
import { toAttribute } from "./utils";

export interface PageHeaderProps {
    breadcrumbs: string[];
    title: string;
    excerpt?: string;
    editThisPageUrl?: string;
}

export function rehypeFernLayout(props?: PageHeaderProps): (tree: Root, vfile: VFile) => void {
    return async (tree, vfile) => {
        const matter = vfile.data.matter as FernDocsFrontmatter | undefined;
        let layout = matter?.layout ?? "guide";

        props = mergePropsWithMatter(props, matter);

        let header: Element | null = null;
        if (props != null) {
            const heading = h(
                "div",
                {
                    type: "mdxJsxFlowElement",
                    name: "Breadcrumbs",
                    attributes: [toAttribute("breadcrumbs", props.breadcrumbs)],
                    children: [],
                },
                h("div", { class: "mt-1" }, h("h1", { class: "leading-tight" }, props.title)),
            );
            const excerpt =
                props.excerpt != null
                    ? h(
                          "div",
                          { class: "prose dark:prose-invert prose-p:t-muted prose-lg mt-2 leading-7" },
                          ...parseMarkdown(props.excerpt),
                      )
                    : undefined;
            header = h("header", { class: "mb-8" }, heading, excerpt);
        }

        const aside = collectAsideContent(tree);

        // If there is an aside, enforce reference layout
        if (aside.length > 0) {
            layout = "reference";
        }

        const footer =
            layout === "guide"
                ? h(
                      "footer",
                      { class: "mt-12" },
                      h(
                          "div",
                          { class: "flex sm:justify-between max-sm:flex-col gap-4" },
                          h("div", { type: "mdxJsxFlowElement", name: "Feedback", children: [], attributes: [] }),
                          props?.editThisPageUrl != null
                              ? h("div", {
                                    type: "mdxJsxFlowElement",
                                    name: "Button",
                                    children: [],
                                    attributes: [
                                        toAttribute("href", props?.editThisPageUrl),
                                        toAttribute("icon", "duotone pen-to-square"),
                                        toAttribute("text", "Edit this page"),
                                        toAttribute("outlined", true),
                                    ],
                                })
                              : undefined,
                      ),
                      { type: "mdxJsxFlowElement", name: "BottomNavigationButtons", children: [], attributes: [] },
                  )
                : undefined;

        const articleClassName = cn("mx-auto w-full break-words lg:ml-0 xl:mx-auto pb-20", {
            "max-w-content-width": layout === "guide",
            "max-w-content-wide-width": layout === "overview",
            "max-w-content-width md:max-w-endpoint-width": layout === "reference",
        });

        const proseClassName = "prose dark:prose-invert prose-h1:mt-[1.5em] first:prose-h1:mt-0";

        const article = h(
            "article",
            { class: articleClassName },
            header,
            aside.length === 0
                ? h("section", { class: proseClassName }, [...tree.children, footer])
                : h(
                      "div",
                      { class: "md:grid md:grid-cols-2 md:gap-8 lg:gap-12" },
                      h(
                          "section",
                          {
                              class: cn(proseClassName, "max-content-width"),
                          },
                          ...tree.children,
                          footer,
                      ),
                      h(
                          "aside",
                          {
                              class: cn(proseClassName, "max-content-width"),
                          },
                          h(
                              "div",
                              {
                                  class: "max-h-vh-minus-header scroll-mt-header-height top-header-height sticky -my-8 py-8",
                              },
                              aside,
                          ),
                      ),
                  ),
        );

        return h(
            "div",
            { class: "relative flex justify-between px-4 md:px-6 lg:pl-8 lg:pr-16 xl:pr-0" },
            h("div", { class: "z-10 w-full min-w-0 pt-8 lg:pr-8" }, article),
            layout !== "reference"
                ? h(
                      "aside",
                      { class: "top-header-height h-vh-minus-header w-sidebar-width sticky hidden shrink-0 xl:block" },
                      matter?.hideToc !== true
                          ? {
                                type: "mdxJsxFlowElement",
                                name: "ScrollArea",
                                attributes: [toAttribute("className", "px-4 pb-12 pt-8 lg:pr-8")],
                                children: [makeToc(tree)],
                            }
                          : undefined,
                  )
                : undefined,
        );
    };
}

function mergePropsWithMatter(
    props: PageHeaderProps | undefined,
    matter: FernDocsFrontmatter | undefined,
): PageHeaderProps | undefined {
    if (matter == null || props == null) {
        return props;
    }

    return {
        ...props,
        title: matter.title ?? props.title,
        excerpt: matter.excerpt ?? props.excerpt,
        editThisPageUrl: matter.editThisPageUrl ?? props.editThisPageUrl,
    };
}

function parseMarkdown(markdown: string): ElementContent[] {
    const processed = toHast(fromMarkdown(markdown));
    const elements: ElementContent[] = [];
    visit(processed, (node) => {
        if (node.type === "element" || node.type === "text") {
            elements.push(node);
            return "skip";
        }
        return true;
    });
    return elements;
}

function collectAsideContent(tree: Root): ElementContent[] {
    const elements: ElementContent[] = [];

    visit(tree, (node, index, parent) => {
        if (node.type === "mdxJsxFlowElement" && node.name === "Aside") {
            elements.push(...node.children);

            // Remove the aside node from the parent
            if (index != null) {
                parent?.children.splice(index, 1);
            }

            return "skip";
        }
        return true;
    });

    return elements;
}

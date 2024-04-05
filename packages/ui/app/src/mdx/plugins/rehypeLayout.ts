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
}

export function rehypeFernLayout(props?: PageHeaderProps): (tree: Root, vfile: VFile) => void {
    return async (tree, vfile) => {
        const matter = vfile.data.matter as FernDocsFrontmatter | undefined;
        const layout = matter?.layout ?? "guide";

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
                h("div", h("h1", { class: "my-0 inline-block leading-tight" }, props.title)),
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

        const article = h(
            "article",
            {
                class: cn(
                    "prose dark:prose-invert prose-h1:mt-[1.5em] first:prose-h1:mt-0 mx-auto w-full break-words lg:ml-0 xl:mx-auto pb-20",
                    {
                        "max-w-content-width": layout === "guide",
                        "max-w-content-wide-width": layout === "overview",
                        "max-w-content-width md:max-w-endpoint-width": layout === "reference",
                    },
                ),
            },
            header,
            ...tree.children,
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

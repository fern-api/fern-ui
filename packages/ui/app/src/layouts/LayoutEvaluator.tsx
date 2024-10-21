import type * as FernDocs from "@fern-api/fdr-sdk/docs";
import { EMPTY_FRONTMATTER } from "@fern-api/fdr-sdk/docs";
import type * as FernNavigation from "@fern-api/fdr-sdk/navigation";
import type { TableOfContentsItem } from "@fern-ui/fern-docs-mdx";
import { ReactElement } from "react";
import { MdxContent } from "../mdx/MdxContent";
import { LayoutEvaluatorContent } from "./LayoutEvaluatorContent";

export interface LayoutEvaluatorProps {
    title: FernDocs.MarkdownText;
    subtitle: FernDocs.MarkdownText | undefined;
    content: FernDocs.MarkdownText;
    breadcrumb: readonly FernNavigation.BreadcrumbItem[];
    tableOfContents: TableOfContentsItem[];
    jsxElements: string[];
    hasAside: boolean;
}

export function LayoutEvaluator({
    title,
    subtitle,
    content,
    jsxElements,
    hasAside,
    ...props
}: LayoutEvaluatorProps): ReactElement {
    return (
        <LayoutEvaluatorContent
            {...props}
            title={<MdxContent mdx={title} />}
            subtitle={subtitle ? <MdxContent mdx={subtitle} /> : undefined}
            frontmatter={typeof content === "string" ? EMPTY_FRONTMATTER : content.frontmatter}
            hasAside={hasAside}
        >
            <MdxContent mdx={content} jsxElements={jsxElements} />
        </LayoutEvaluatorContent>
    );
}

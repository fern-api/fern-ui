import type * as FernDocs from "@fern-api/fdr-sdk/docs";
import type * as FernNavigation from "@fern-api/fdr-sdk/navigation";
import clsx from "clsx";
import { ReactElement, memo, useRef } from "react";
import { useHref } from "../hooks/useHref";
import { Markdown } from "../mdx/Markdown";
import { useApiPageCenterElement } from "./useApiPageCenterElement";

interface ApiSectionMarkdownPageProps {
    node: FernNavigation.NavigationNodeWithMarkdown;
    mdx: FernDocs.MarkdownText;
}

const ApiSectionMarkdownContent = ({ node, mdx }: ApiSectionMarkdownPageProps) => {
    const ref = useRef<HTMLDivElement>(null);
    useApiPageCenterElement(ref, node.slug);

    return (
        <div
            className={clsx("scroll-mt-content", {
                "border-default border-b mb-px": true,
            })}
            ref={ref}
            id={useHref(node.slug)}
        >
            <Markdown mdx={mdx} />
        </div>
    );
};

export const ApiSectionMarkdownPage = memo(
    ({
        node,
        mdxs,
    }: {
        node: FernNavigation.NavigationNodeWithMarkdown;
        mdxs: Record<string, FernDocs.MarkdownText>;
    }): ReactElement | null => {
        const mdx = mdxs[node.id];

        if (!mdx) {
            // TODO: sentry
            // eslint-disable-next-line no-console
            console.error(`No markdown content found for node ${node.id}`);
            return null;
        }

        return <ApiSectionMarkdownContent node={node} mdx={mdx} />;
    },
);

ApiSectionMarkdownPage.displayName = "ApiSectionMarkdownPage";

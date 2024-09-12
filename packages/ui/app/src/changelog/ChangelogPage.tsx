import type { FernNavigation } from "@fern-api/fdr-sdk";
import { EMPTY_ARRAY } from "@fern-ui/core-utils";
import { usePrevious } from "@fern-ui/react-commons";
import clsx from "clsx";
import { SetStateAction, atom, useAtom, useAtomValue } from "jotai";
import { chunk } from "lodash-es";
import { Fragment, ReactElement, useEffect, useMemo } from "react";
import { IS_READY_ATOM, LOCATION_ATOM, SCROLL_BODY_ATOM, SIDEBAR_ROOT_NODE_ATOM } from "../atoms";
import { BottomNavigationButtons } from "../components/BottomNavigationButtons";
import { FernLink } from "../components/FernLink";
import { PageHeader } from "../components/PageHeader";
import { useToHref } from "../hooks/useHref";
import { Markdown } from "../mdx/Markdown";
import { BundledMDX } from "../mdx/types";
import { DocsContent } from "../resolver/DocsContent";
import { BuiltWithFern } from "../sidebar/BuiltWithFern";
import { ChangelogContentLayout } from "./ChangelogContentLayout";

function flattenChangelogEntries(page: DocsContent.ChangelogPage): FernNavigation.ChangelogEntryNode[] {
    return page.node.children.flatMap((year) => year.children.flatMap((month) => month.children));
}

const CHANGELOG_PAGE_SIZE = 10;
const CHANGELOG_PAGE_ATOM = atom(
    (get) => {
        if (!get(IS_READY_ATOM)) {
            return 1;
        }

        const hash = get(LOCATION_ATOM).hash;
        if (hash == null) {
            return 1;
        }
        const match = hash.match(/^#page-(\d+)$/)?.[1];
        if (match == null) {
            return 1;
        }
        return Math.max(parseInt(match, 10), 1);
    },
    (get, set, page: SetStateAction<number>) => {
        const newPage = typeof page === "function" ? page(get(CHANGELOG_PAGE_ATOM)) : page;
        set(LOCATION_ATOM, { hash: newPage > 1 ? `#page-${newPage}` : "" }, { replace: false });
    },
);

function getOverviewMdx(page: DocsContent.ChangelogPage): BundledMDX | undefined {
    return page.node.overviewPageId != null ? page.pages[page.node.overviewPageId] : undefined;
}

export function ChangelogPage({ content }: { content: DocsContent.ChangelogPage }): ReactElement {
    const [page, setPage] = useAtom(CHANGELOG_PAGE_ATOM);

    const overview = getOverviewMdx(content);
    const chunkedEntries = useMemo(() => chunk(flattenChangelogEntries(content), CHANGELOG_PAGE_SIZE), [content]);

    const toHref = useToHref();
    const fullWidth = useAtomValue(SIDEBAR_ROOT_NODE_ATOM) == null;

    /**
     * Reset paging when navigating between different changelog pages
     */
    const prevousNodeId = usePrevious(content.node.id);
    useEffect(() => {
        if (prevousNodeId !== content.node.id) {
            setPage(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prevousNodeId, content.node.id]);

    /**
     * Ensure that the page is within bounds
     */
    useEffect(() => {
        setPage((prev) => Math.min(prev, chunkedEntries.length));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chunkedEntries.length]);

    /**
     * Scroll to the top of the page when navigating to a new page of the changelog
     */
    const scrollBody = useAtomValue(SCROLL_BODY_ATOM);
    useEffect(() => {
        if (scrollBody instanceof Document) {
            window.scrollTo(0, 0);
        } else {
            scrollBody?.scrollTo(0, 0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const entries = chunkedEntries[page - 1] ?? EMPTY_ARRAY;

    const prev = useMemo(() => {
        if (page === 1) {
            return undefined;
        }

        return {
            title: "Newer posts",
            hint: "Next",
            href: `#page-${page - 1}`,
        };
    }, [page]);

    const next = useMemo(() => {
        if (page >= chunkedEntries.length) {
            return undefined;
        }

        return {
            title: "Older posts",
            hint: "Previous",
            href: `#page-${page + 1}`,
        };
    }, [chunkedEntries.length, page]);

    return (
        <div className="flex justify-between px-4 md:px-6 lg:px-8">
            <div className={clsx("w-full min-w-0", { "pt-12 lg:pt-24": fullWidth, "pt-8": !fullWidth })}>
                <main className={clsx("mx-auto max-w-screen-lg break-words", { "lg:ml-8": !fullWidth })}>
                    <section className="flex pb-8">
                        <ChangelogContentLayout>
                            <PageHeader
                                title={content.node.title}
                                breadcrumbs={content.breadcrumbs}
                                subtitle={typeof overview !== "string" ? overview?.frontmatter.excerpt : undefined}
                            />
                            <Markdown mdx={overview} />
                        </ChangelogContentLayout>
                    </section>

                    {entries.map((entry) => {
                        const page = content.pages[entry.pageId];
                        const title = typeof page !== "string" ? page?.frontmatter.title : undefined;
                        return (
                            <Fragment key={entry.id}>
                                <hr />
                                <article id={entry.date} className="flex items-stretch py-8 lg:py-16">
                                    <ChangelogContentLayout
                                        stickyContent={<FernLink href={toHref(entry.slug)}>{entry.title}</FernLink>}
                                    >
                                        <Markdown
                                            title={
                                                title != null ? (
                                                    <h2>
                                                        <FernLink href={toHref(entry.slug)} className="not-prose">
                                                            {title}
                                                        </FernLink>
                                                    </h2>
                                                ) : undefined
                                            }
                                            mdx={page}
                                        />
                                    </ChangelogContentLayout>
                                </article>
                            </Fragment>
                        );
                    })}

                    {(prev != null || next != null) && (
                        <div className="flex">
                            <ChangelogContentLayout>
                                <BottomNavigationButtons prev={prev} next={next} alwaysShowGrid />
                            </ChangelogContentLayout>
                        </div>
                    )}

                    <div className="h-48" />
                    <BuiltWithFern className="w-fit mx-auto my-8" />
                </main>
            </div>
        </div>
    );
}

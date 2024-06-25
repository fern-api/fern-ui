import clsx from "clsx";
import { Fragment, ReactElement } from "react";
import { FernLink } from "../components/FernLink";
import { useDocsContext } from "../contexts/docs-context/useDocsContext";
import { CustomDocsPageHeader } from "../custom-docs-page/CustomDocsPage";
import { MdxContent } from "../mdx/MdxContent";
import { ResolvedPath } from "../resolver/ResolvedPath";

export function ChangelogPage({ resolvedPath }: { resolvedPath: ResolvedPath.ChangelogPage }): ReactElement {
    const { sidebar } = useDocsContext();
    const fullWidth = sidebar == null;
    const overview =
        resolvedPath.node.overviewPageId != null ? resolvedPath.pages[resolvedPath.node.overviewPageId] : undefined;
    return (
        <div className="flex justify-between px-4 md:px-6 lg:px-8">
            <div className={clsx("w-full min-w-0 pt-8", { "sm:pt-8 lg:pt-24": fullWidth })}>
                <article className="mx-auto xl:w-fit break-words lg:ml-0 xl:mx-auto">
                    <section className="flex">
                        {fullWidth && <div className="flex-initial max-md:hidden w-64" />}
                        <div
                            className={clsx("relative mr-6 max-w-content-width flex-auto", {
                                "max-xl:mx-auto": !fullWidth,
                            })}
                        >
                            <CustomDocsPageHeader
                                title={resolvedPath.node.title}
                                sectionTitleBreadcrumbs={resolvedPath.sectionTitleBreadcrumbs}
                                excerpt={typeof overview !== "string" ? overview?.frontmatter.excerpt : undefined}
                            />
                            {overview != null && (
                                <section className={clsx("prose dark:prose-invert", { "w-content-width": !fullWidth })}>
                                    <MdxContent mdx={overview} />
                                </section>
                            )}
                        </div>
                    </section>

                    {resolvedPath.node.children.flatMap((year) =>
                        year.children.flatMap((month) =>
                            month.children.map((entry) => {
                                const page = resolvedPath.pages[entry.pageId];
                                const title = typeof page !== "string" ? page?.frontmatter.title : undefined;
                                return (
                                    <Fragment key={entry.id}>
                                        <hr className="mt-8 mb-16" />
                                        <section id={entry.date} className="flex items-stretch">
                                            {fullWidth && (
                                                <div className="flex-initial max-md:hidden min-w-64">
                                                    <div className="sticky top-header-height-padded t-muted text-base mb-8">
                                                        <FernLink href={`/${entry.slug}`}>{entry.title}</FernLink>
                                                    </div>
                                                </div>
                                            )}
                                            <div
                                                className={clsx("relative mr-6 max-w-content-width flex-auto", {
                                                    "max-xl:mx-auto": !fullWidth,
                                                })}
                                            >
                                                {fullWidth && (
                                                    <div className="t-muted text-base mb-8 md:hidden">
                                                        <FernLink href={`/${entry.slug}`}>{entry.title}</FernLink>
                                                    </div>
                                                )}
                                                <div className="prose dark:prose-invert">
                                                    {title != null && <h1>{title}</h1>}
                                                    <MdxContent mdx={page} />
                                                </div>
                                            </div>
                                            {!fullWidth && (
                                                <div className="-mt-2 w-72 pl-4 text-right max-xl:hidden">
                                                    <span className="t-muted text-base sticky top-header-height-padded">
                                                        <FernLink href={`/${entry.slug}`}>{entry.title}</FernLink>
                                                    </span>
                                                </div>
                                            )}
                                        </section>
                                    </Fragment>
                                );
                            }),
                        ),
                    )}
                    <div className="h-48" />
                </article>
            </div>
        </div>
    );
}

import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { parse } from "node-html-parser";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import { getSlugFromText } from "../mdx/base-components";

export declare namespace TableOfContents {
    export interface HTMLProps {
        className?: string;
        style?: CSSProperties;
        renderedHtml: string;
    }

    export interface Props {
        className?: string;
        style?: CSSProperties;
        tableOfContents: TableOfContentsItem[];
    }
}

export const HTMLTableOfContents: React.FC<TableOfContents.HTMLProps> = ({ className, renderedHtml, style }) => {
    const tableOfContents = useMemo(() => generateTableOfContents(renderedHtml), [renderedHtml]);
    return <TableOfContents className={className} style={style} tableOfContents={tableOfContents} />;
};

let anchorJustSet = false;
let anchorJustSetTimeout: number;

export const TableOfContents: React.FC<TableOfContents.Props> = ({ className, tableOfContents, style }) => {
    const router = useRouter();

    const [, currentPathAnchor] = router.asPath.split("#");

    const allAnchors = useMemo(() => getAllAnchorStrings(tableOfContents), [tableOfContents]);

    const [anchorInView, setAnchorInView] = useState(currentPathAnchor ?? allAnchors[0]);

    useEffect(() => {
        if (currentPathAnchor != null) {
            setAnchorInView(currentPathAnchor);
            anchorJustSet = true;
            clearTimeout(anchorJustSetTimeout);
            anchorJustSetTimeout = window.setTimeout(() => {
                anchorJustSet = false;
            }, 150);
        }
    }, [currentPathAnchor]);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const handleScroll = () => {
            const scrollY = window.scrollY;

            // when the user scrolls to the very top of the page, set the anchorInView to the first anchor
            if (scrollY === 0) {
                setAnchorInView(allAnchors[0]);
                return;
            }

            // when the user scrolls to the very bottom of the page, set the anchorInView to the last anchor
            if (window.innerHeight + scrollY >= document.body.scrollHeight) {
                setAnchorInView(allAnchors[allAnchors.length - 1]);
                return;
            }

            // when the user scrolls down, check if an anchor has just scrolled up just past 40% from the top of the viewport
            // if so, set the anchorInView to that anchor

            if (!anchorJustSet) {
                for (let i = allAnchors.length - 1; i >= 0; i--) {
                    const anchor = allAnchors[i];
                    if (anchor == null) {
                        continue;
                    }
                    const element = document.getElementById(anchor);
                    if (element != null) {
                        const { bottom } = element.getBoundingClientRect();
                        if (bottom < window.innerHeight * 0.5) {
                            setAnchorInView(anchor);
                            break;
                        }
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [allAnchors, tableOfContents]);

    const renderList = (headings: TableOfContentsItem[], indent?: boolean) => {
        if (headings.length === 0) {
            return null;
        }
        return (
            <ul
                className={classNames("list-none", {
                    "pl-4": indent,
                    [className ?? ""]: !indent,
                    "pt-3 pb-4 border-b border-default": !indent,
                })}
                style={style}
            >
                {headings.map(({ simpleString: text, anchorString, children }, index) => {
                    if (text.length === 0 && children.length === 0) {
                        // don't render empty headings
                        return null;
                    }
                    return (
                        <li key={index}>
                            {text.length > 0 && (
                                <Link
                                    className={classNames(
                                        "hover:t-default block hyphens-auto break-words py-1.5 text-sm leading-5 no-underline hover:transition hover:no-underline",
                                        {
                                            "t-muted": anchorInView !== anchorString,
                                            "t-accent-aaa": anchorInView === anchorString,
                                        },
                                    )}
                                    href={`#${anchorString}`}
                                >
                                    {text}
                                </Link>
                            )}
                            {children.length > 0 && renderList(children, true)}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <>
            {tableOfContents.length > 0 && <h6 className="m-0">On this page</h6>}
            {renderList(tableOfContents)}
        </>
    );
};

export interface TableOfContentsItem {
    simpleString: string;
    anchorString: string;
    children: TableOfContentsItem[];
}

function generateTableOfContents(html: string): TableOfContentsItem[] {
    const doc = parse(html);
    const headings = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");

    const parsedHeadings = Array.from(headings)
        .map((heading) => ({
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            depth: parseInt(heading.tagName[1]!),
            text: heading.textContent?.trim() ?? "",
        }))
        .filter((heading) => heading.text.length > 0);

    const minDepth = Math.min(...parsedHeadings.map((heading) => heading.depth));

    return makeTree(parsedHeadings, minDepth);
}

const makeTree = (
    headings: {
        depth: number;
        text: string;
    }[],
    depth: number = 1,
): TableOfContentsItem[] => {
    const tree: TableOfContentsItem[] = [];

    while (headings.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const firstToken = headings[0]!;

        // if the next heading is at a higher level
        if (firstToken.depth < depth) {
            break;
        }

        if (firstToken.depth === depth) {
            const token = headings.shift();
            const simpleString = token != null ? token.text.trim() : "";
            tree.push({
                simpleString,
                anchorString: getSlugFromText(simpleString),
                children: makeTree(headings, depth + 1),
            });
        } else {
            tree.push(...makeTree(headings, depth + 1));
        }
    }

    return tree;
};

function getAllAnchorStrings(tableOfContents: TableOfContentsItem[]): string[] {
    return tableOfContents.flatMap((item) => [item.anchorString, ...getAllAnchorStrings(item.children)]);
}

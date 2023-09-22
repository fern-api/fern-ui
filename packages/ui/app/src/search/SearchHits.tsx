import { Spinner, SpinnerSize } from "@blueprintjs/core";
import { visitDiscriminatedUnion } from "@fern-ui/core-utils";
import { useKeyboardPress } from "@fern-ui/react-commons";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteHits, useInstantSearch } from "react-instantsearch-hooks-web";
import { useSearchContext } from "../search-context/useSearchContext";
import { SearchHit } from "./SearchHit";
import type { SearchRecord } from "./types";

type Progress = "error" | "pending" | "success";

export const EmptyStateView: React.FC<PropsWithChildren> = ({ children }) => {
    return <div className="t-muted justify flex h-24 w-full flex-col items-center py-3">{children}</div>;
};

export const SearchHits: React.FC = () => {
    const { closeSearchDialog } = useSearchContext();
    const { hits } = useInfiniteHits<SearchRecord>();
    const search = useInstantSearch();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [hoveredSearchHitId, setHoveredSearchHitId] = useState<string | null>(null);
    const router = useRouter();

    const hoveredSearchHit = useMemo(() => {
        return hits
            .map((hit, index) => ({ record: hit, index }))
            .find(({ record }) => record.objectID === hoveredSearchHitId);
    }, [hits, hoveredSearchHitId]);

    useEffect(() => {
        const [firstHit] = hits;
        if (hoveredSearchHit == null && firstHit != null) {
            setHoveredSearchHitId(firstHit.objectID);
        }
    }, [hits, hoveredSearchHit]);

    useKeyboardPress({
        key: "Up",
        onPress: () => {
            if (hoveredSearchHit == null) {
                return;
            }
            const previousHit = hits[hoveredSearchHit.index - 1];
            if (previousHit != null) {
                setHoveredSearchHitId(previousHit.objectID);
            }
        },
    });

    useKeyboardPress({
        key: "Down",
        onPress: () => {
            if (hoveredSearchHit == null) {
                return;
            }
            const nextHit = hits[hoveredSearchHit.index + 1];
            if (nextHit != null) {
                setHoveredSearchHitId(nextHit.objectID);
            }
        },
    });

    useKeyboardPress({
        key: "Enter",
        onPress: async () => {
            if (hoveredSearchHit == null) {
                return;
            }
            const { versionSlug, path } = hoveredSearchHit.record;
            const href = `/${versionSlug != null ? `${versionSlug}/` : ""}${path}`;
            void router.push(href);
            closeSearchDialog();
        },
        preventDefault: true,
    });

    const progress = useMemo((): Progress => {
        switch (search.status) {
            case "idle":
                return "success";
            case "stalled":
            case "loading":
                return "pending";
            case "error":
                return "error";
        }
    }, [search]);

    if (search.results.query.length === 0) {
        return null;
    }

    return (
        <div
            ref={containerRef}
            className={classNames("max-h-80 overflow-y-auto p-2", {
                "border-border-default-light/10 dark:border-border-default-dark/10 border-t":
                    (progress === "success" || progress === "pending") && hits.length > 0,
            })}
        >
            <div
                className={classNames(
                    "t-muted flex w-full flex-col items-center",
                    progress === "success" && hits.length > 0 ? "min-h-[6rem]" : "min-h-[3rem]"
                )}
            >
                {visitDiscriminatedUnion({ progress }, "progress")._visit<React.ReactNode>({
                    pending: () => <Spinner size={SpinnerSize.SMALL} />,
                    error: () => "An unexpected error has occurred while loading the results.",
                    success: () =>
                        hits.length > 0
                            ? hits.map((hit) => (
                                  <SearchHit
                                      key={hit.objectID}
                                      hit={hit}
                                      isHovered={hoveredSearchHitId === hit.objectID}
                                      onMouseEnter={() => setHoveredSearchHitId(hit.objectID)}
                                      onMouseLeave={() => setHoveredSearchHitId(null)}
                                  />
                              ))
                            : "No results",
                    _other: () => null,
                })}
            </div>
        </div>
    );
};

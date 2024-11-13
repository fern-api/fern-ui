import { FACET_DISPLAY_NAME_MAP, getFacets, toFilterOptions } from "@/utils/facet";
import { AlgoliaRecord } from "@fern-ui/fern-docs-search-server/types";
import { HttpMethodTag } from "@fern-ui/fern-http-method-tag";
import { Command } from "cmdk";
import { FileText, History, ListFilter, MessageCircle } from "lucide-react";
import { Dispatch, ReactElement, ReactNode, SetStateAction, useRef } from "react";
import { useInfiniteHits, useSearchBox } from "react-instantsearch";
import useSWRImmutable from "swr/immutable";
import { MarkRequired } from "ts-essentials";
import { RemoteIcon } from "../icons/RemoteIcon";
import { HitContent } from "../shared/HitContent";
import { generateHits } from "../shared/hits";
import { AlgoliaRecordHit } from "../types";

const ICON_CLASS = "size-4 text-[#969696] dark:text-white/50 shrink-0 my-1";

const FACET_DISPLAY_MAP: Record<string, Record<string, ReactNode>> = {
    method: {
        GET: <HttpMethodTag method="GET" />,
        POST: <HttpMethodTag method="POST" />,
        PUT: <HttpMethodTag method="PUT" />,
        PATCH: <HttpMethodTag method="PATCH" />,
        DELETE: <HttpMethodTag method="DELETE" />,
    },
} as const;

function toPlaceholder(filters: { facet: string; value: string }[]): string {
    if (filters.length === 0) {
        return "Search";
    }

    return `Search ${filters.map((filter) => FACET_DISPLAY_NAME_MAP[filter.facet]?.[filter.value] ?? filter.value).join(", ")}`;
}

export function DesktopCommand({
    domain,
    appId,
    apiKey,
    onSubmit,
    onAskAI,
    filters,
    setFilters,
}: {
    domain: string;
    appId: string;
    apiKey: string;
    onSubmit: (path: string) => void;
    onAskAI?: ({ initialInput }: { initialInput?: string }) => void;
    filters: {
        facet: string;
        value: string;
    }[];
    setFilters?: Dispatch<SetStateAction<{ facet: string; value: string }[]>>;
}): ReactElement {
    const ref = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const { query, refine } = useSearchBox();

    const { items } = useInfiniteHits<AlgoliaRecord>();

    const filtersString =
        filters.length > 0
            ? filters
                  .map((filter) => `${filter.facet}:${filter.value}`)
                  .sort()
                  .join(" AND ")
            : undefined;

    const { data: facets } = useSWRImmutable(`${domain}:${filtersString ?? ""}`, () =>
        getFacets({ appId, apiKey, filters: filtersString }),
    );

    // const items = useDeferredValue(rawHits);
    const groups = generateHits(items);

    const filterOptions = toFilterOptions(facets, query);

    function bounce() {
        if (ref.current) {
            ref.current.style.transform = "scale(0.96)";
            setTimeout(() => {
                if (ref.current) {
                    ref.current.style.transform = "";
                }
            }, 100);

            refine("");
            inputRef.current?.focus();
        }
    }

    return (
        <Command
            ref={ref}
            className="flex flex-col border border-[#DBDBDB] dark:border-white/10 rounded-lg overflow-hidden bg-[#F2F2F2]/30 dark:bg-[#1A1919]/30 backdrop-blur-xl transition-transform duration-100 h-full"
            shouldFilter={false}
        >
            <Command.Input
                ref={inputRef}
                className="p-4 border-b last:border-b-0 border-[#DBDBDB] dark:border-white/10 w-full focus:outline-none bg-transparent text-lg placeholder:text-[#969696] dark:placeholder:text-white/50"
                autoFocus
                value={query}
                placeholder={toPlaceholder(filters)}
                onValueChange={refine}
                onKeyDown={(e) => {
                    if (e.key === "Backspace" && query.length === 0) {
                        setFilters?.((lastFilters) => lastFilters.slice(0, -1));
                        bounce();
                    }
                }}
            />
            <Command.Empty className="p-4 pb-6 text-center text-[#969696] dark:text-white/50">
                No results found
            </Command.Empty>
            <Command.List className="py-3 min-h-0 shrink overflow-auto mask-grad-y-3">
                <Command.Group>
                    <Command.Item
                        value="ai-chat"
                        className="flex gap-2 cursor-default"
                        onSelect={() => onAskAI?.({ initialInput: query })}
                    >
                        <MessageCircle className={ICON_CLASS} />
                        <span>
                            Ask AI
                            {query.trimStart().length > 0 && (
                                <>
                                    <span className="ms-1">&ldquo;</span>
                                    <span className="font-semibold">{query}</span>
                                    <span>&rdquo;</span>
                                </>
                            )}
                        </span>
                    </Command.Item>
                </Command.Group>

                {filterOptions.length > 0 && (
                    <Command.Group heading="Filters">
                        {filterOptions.map((filter) => (
                            <Command.Item
                                key={`${filter.facet}:${filter.value}`}
                                className="flex gap-2 cursor-default"
                                onSelect={() => {
                                    setFilters?.([
                                        ...filters,
                                        {
                                            facet: filter.facet,
                                            value: filter.value,
                                        },
                                    ]);
                                    bounce();
                                }}
                            >
                                <ListFilter className={ICON_CLASS} />
                                <span>
                                    Search{" "}
                                    {FACET_DISPLAY_MAP[filter.facet]?.[filter.value] ??
                                        FACET_DISPLAY_NAME_MAP[filter.facet]?.[filter.value] ??
                                        filter.value}
                                </span>
                            </Command.Item>
                        ))}
                    </Command.Group>
                )}

                {groups.map((group, index) => (
                    <Command.Group key={group.title ?? index} heading={group.title ?? "Results"}>
                        {group.hits.map((hit) => (
                            <Command.Item
                                key={hit.path}
                                value={hit.path}
                                onSelect={() => onSubmit(hit.path)}
                                className="flex gap-2 cursor-default"
                            >
                                <Icon icon={hit.icon} type={hit.record?.type} />
                                {hit.record != null && (
                                    <HitContent hit={hit.record as MarkRequired<AlgoliaRecordHit, "type">} />
                                )}
                                {hit.record == null && hit.title}
                            </Command.Item>
                        ))}
                    </Command.Group>
                ))}
            </Command.List>
        </Command>
    );
}

function Icon({ icon, type }: { icon: string | undefined; type: string | undefined }): ReactElement {
    if (icon) {
        return <RemoteIcon icon={icon} className={ICON_CLASS} />;
    }

    if (type === "changelog") {
        return <History className={ICON_CLASS} />;
    }

    return <FileText className={ICON_CLASS} />;
}

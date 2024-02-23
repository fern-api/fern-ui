import { getFullSlugForNavigatable } from "@fern-ui/app-utils";
import { visitDiscriminatedUnion } from "@fern-ui/core-utils";
import classNames from "classnames";
import Link from "next/link";
import { useMemo } from "react";
import { useDocsContext } from "../docs-context/useDocsContext";
import { useNavigationContext } from "../navigation-context";
import { EndpointRecord } from "./content/EndpointRecord";
import { EndpointRecordV2 } from "./content/EndpointRecordV2";
import { PageRecord } from "./content/PageRecord";
import { PageRecordV2 } from "./content/PageRecordV2";
import type { SearchRecord } from "./types";
import { getFullPathForSearchRecord } from "./util";

export declare namespace SearchHit {
    export interface Props {
        setRef?: (elem: HTMLAnchorElement | null) => void;
        hit: SearchRecord;
        isHovered?: boolean;
        onMouseEnter?: () => void;
        onMouseLeave?: () => void;
    }
}

export const SearchHit: React.FC<SearchHit.Props> = ({
    setRef,
    hit,
    isHovered = false,
    onMouseEnter,
    onMouseLeave,
}) => {
    const { pathResolver } = useDocsContext();
    const { basePath } = useNavigationContext();

    const fullPath = useMemo(() => {
        const path = getFullPathForSearchRecord(hit, basePath);
        const navigatable = pathResolver.resolveNavigatable(path);
        if (navigatable == null) {
            return basePath?.slice(1) ?? "";
        }
        return getFullSlugForNavigatable(navigatable, { omitDefault: true, basePath });
    }, [hit, pathResolver, basePath]);

    const content = useMemo(() => {
        return visitDiscriminatedUnion(hit, "type")._visit({
            endpoint: (hit) => <EndpointRecord hit={hit} isHovered={isHovered} />,
            page: (hit) => <PageRecord hit={hit} isHovered={isHovered} />,
            "endpoint-v2": (hit) => <EndpointRecordV2 hit={hit} isHovered={isHovered} />,
            "page-v2": (hit) => <PageRecordV2 hit={hit} isHovered={isHovered} />,
            _other: () => null,
        });
    }, [hit, isHovered]);

    return (
        <Link
            ref={(elem) => setRef?.(elem)}
            className={classNames("flex w-full items-center space-x-4 space-y-1 rounded-md px-3 py-2 !no-underline", {
                "bg-accent t-accent-contrast": isHovered,
            })}
            href={`/${fullPath}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {content}
        </Link>
    );
};

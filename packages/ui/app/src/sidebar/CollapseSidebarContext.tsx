import { SidebarNode, visitSidebarNode } from "@fern-ui/fdr-utils";
import { noop } from "lodash-es";
import { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDocsContext } from "../contexts/docs-context/useDocsContext";
import { useNavigationContext } from "../contexts/navigation-context/useNavigationContext";

interface CollapseSidebarContextValue {
    expanded: string[][]; // true = expand all, string[] = expand only these slugs
    setExpanded: (slugs: string[][]) => void;
    toggleExpanded: (slug: readonly string[]) => void;
    selectedSlug: readonly string[] | undefined;
    checkExpanded: (expandableSlug: readonly string[]) => boolean;
}

const CollapseSidebarContext = createContext<CollapseSidebarContextValue>({
    expanded: [],
    setExpanded: noop,
    toggleExpanded: noop,
    selectedSlug: undefined,
    checkExpanded: () => false,
});

export function checkSlugStartsWith(slug: readonly string[], startsWith: readonly string[]): boolean {
    if (slug.length < startsWith.length) {
        return false;
    }
    for (let i = 0; i < startsWith.length; i++) {
        if (slug[i] !== startsWith[i]) {
            return false;
        }
    }
    return true;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useCollapseSidebar = () => useContext(CollapseSidebarContext);

function expandArray(arr: string[]): string[][] {
    return arr.map((_, idx) => arr.slice(0, idx + 1));
}

export const CollapseSidebarProvider: FC<
    PropsWithChildren<{
        navigationItems: SidebarNode[];
    }>
> = ({ children, navigationItems }) => {
    const { sidebarNodes } = useDocsContext();
    const { selectedSlug: selectedSlugString } = useNavigationContext();

    const parentSlugMap = useMemo(() => {
        const map = new Map<string, string[]>();
        sidebarNodes.forEach((node) => {
            visitSidebarNode(node, (visitedNode, parents) => {
                map.set(
                    visitedNode.slug.join("/"),
                    parents.map((p) => p.slug.join("/")),
                );
            });
        });
        return map;
    }, [sidebarNodes]);

    const parentToChildrenMap = useMemo(() => {
        const map = new Map<string, string[]>();
        sidebarNodes.forEach((node) => {
            visitSidebarNode(node, (visitedNode, parents) => {
                if (parents.length > 0) {
                    const parentSlug = parents[parents.length - 1].slug.join("/");
                    if (!map.has(parentSlug)) {
                        map.set(parentSlug, []);
                    }
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    map.get(parentSlug)!.push(visitedNode.slug.join("/"));
                }
            });
        });
        return map;
    }, [sidebarNodes]);

    const selectedSlug = useMemo(() => selectedSlugString.split("/"), [selectedSlugString]);
    const [expanded, setExpanded] = useState<string[][]>(() => [
        selectedSlug,
        ...(parentSlugMap.get(selectedSlug.join("/"))?.map((slug) => slug.split("/")) ?? []),
    ]);

    useEffect(() => {
        setExpanded(expandArray(selectedSlug));
    }, [selectedSlug]);

    const checkExpanded = useCallback(
        (expandableSlug: readonly string[]) =>
            expanded.some(
                (slug) =>
                    slug.join("/") === expandableSlug.join("/") ||
                    parentSlugMap.get(slug.join("/"))?.includes(expandableSlug.join("/")),
            ),
        [expanded, parentSlugMap],
    );

    const toggleExpanded = useCallback(
        (slug: readonly string[]) => {
            setExpanded((expanded) => {
                const childenToCollapse = parentToChildrenMap.get(slug.join("/")) ?? [];
                if (expanded.some((s) => s.join("/") === slug.join("/") || childenToCollapse.includes(s.join("/")))) {
                    return expanded.filter(
                        (s) => s.join("/") !== slug.join("/") && !childenToCollapse.includes(s.join("/")),
                    );
                }
                return [...expanded, [...slug]];
            });
        },
        [parentToChildrenMap],
    );

    // If there is only one pageGroup with only one page, hide the sidebar content
    // this is useful for tabs that only have one page
    if (
        navigationItems.length === 1 &&
        navigationItems[0].type === "pageGroup" &&
        navigationItems[0].pages.length === 1
    ) {
        return null;
    }

    return (
        <CollapseSidebarContext.Provider value={{ expanded, selectedSlug, setExpanded, checkExpanded, toggleExpanded }}>
            {children}
        </CollapseSidebarContext.Provider>
    );
};

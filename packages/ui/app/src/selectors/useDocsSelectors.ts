import { type DefinitionInfo, DocsNode, joinUrlSlugs } from "@fern-ui/app-utils";
import { useCallback, useMemo } from "react";
import { useNavigationContext } from "../navigation-context/useNavigationContext";
import type * as FernRegistryDocsRead from "@fern-fern/registry-browser/api/resources/docs/resources/v1/resources/read";

interface DocsSelectors {
    definitionInfo: DefinitionInfo;
    activeVersionContext: ActiveVersionContext;
    activeNavigationConfigContext: ActiveNavigationConfigContext;
    selectedSlug: string;
    /** Prefixes a given slug with the currently active version and tab slugs. */
    computeFullSlug: (slug: string) => string;
}

interface ActiveVersionContextUnversioned {
    type: "unversioned";
}

interface ActiveVersionContextVersioned {
    type: "versioned";
    version: DocsNode.Version;
}

export type ActiveVersionContext = ActiveVersionContextUnversioned | ActiveVersionContextVersioned;

interface ActiveNavigationConfigContextUntabbed {
    type: "untabbed";
    config: FernRegistryDocsRead.UnversionedUntabbedNavigationConfig;
}

interface ActiveNavigationConfigContextTabbed {
    type: "tabbed";
    config: FernRegistryDocsRead.UnversionedTabbedNavigationConfig;
}

export type ActiveNavigationConfigContext = ActiveNavigationConfigContextUntabbed | ActiveNavigationConfigContextTabbed;

export function useDocsSelectors(): DocsSelectors {
    const { activeNavigatable } = useNavigationContext();

    const definitionInfo = useMemo(() => activeNavigatable.context.root.info, [activeNavigatable]);

    const activeVersionContext = useMemo<ActiveVersionContext>(() => {
        if (
            activeNavigatable.context.type === "versioned-tabbed" ||
            activeNavigatable.context.type === "versioned-untabbed"
        ) {
            return { type: "versioned", version: activeNavigatable.context.version };
        } else {
            return { type: "unversioned" };
        }
    }, [activeNavigatable]);

    const activeNavigationConfigContext = useMemo<ActiveNavigationConfigContext>(() => {
        if (
            activeNavigatable.context.type === "versioned-tabbed" ||
            activeNavigatable.context.type === "unversioned-tabbed"
        ) {
            return { type: "tabbed", config: activeNavigatable.context.navigationConfig };
        } else {
            return { type: "untabbed", config: activeNavigatable.context.navigationConfig };
        }
    }, [activeNavigatable]);

    const selectedSlug = useMemo(() => activeNavigatable.leadingSlug, [activeNavigatable]);

    const computeFullSlug = useCallback(
        (slug: string) => {
            const c = activeNavigatable.context;
            const parts: string[] = [];
            if (c.type === "versioned-tabbed" || c.type === "versioned-untabbed") {
                parts.push(c.version.slug);
            }
            if (c.type === "unversioned-tabbed" || c.type === "versioned-tabbed") {
                parts.push(c.tab.slug);
            }
            parts.push(slug);
            return joinUrlSlugs(...parts);
        },
        [activeNavigatable.context]
    );

    return {
        definitionInfo,
        activeVersionContext,
        activeNavigationConfigContext,
        selectedSlug,
        computeFullSlug,
    };
}

import { FernNavigation } from "@fern-api/fdr-sdk";
import { SidebarVersionInfo } from "@fern-ui/fdr-utils";
import { Dialog, Transition } from "@headlessui/react";
import algolia, { SearchClient } from "algoliasearch";
import cn from "clsx";
import { Fragment, PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";
import { InstantSearch } from "react-instantsearch";
import { useDocsContext } from "../contexts/docs-context/useDocsContext";
import { useLayoutBreakpoint } from "../contexts/layout-breakpoint/useLayoutBreakpoint";
import { useNavigationContext } from "../contexts/navigation-context";
import { useSearchService, type SearchCredentials, type SearchService } from "../services/useSearchService";
import { useCloseSearchDialog, useIsSearchDialogOpen } from "../sidebar/atom";
import { SearchBox, SearchMobileBox } from "./SearchBox";
import { SearchHits, SearchMobileHits } from "./SearchHits";

export declare namespace SearchDialog {
    export interface Props {
        fromHeader?: boolean;
    }
}

export const SearchDialog: React.FC<SearchDialog.Props> = (providedProps) => {
    const { fromHeader } = providedProps;
    const [credentials, setSearchCredentials] = useState<SearchCredentials | undefined>(undefined);
    const inputRef = useRef<HTMLInputElement>(null);
    const layoutBreakpoint = useLayoutBreakpoint();

    const searchService = useSearchService();
    const isSearchDialogOpen = useIsSearchDialogOpen();
    const closeSearchDialog = useCloseSearchDialog();

    useEffect(() => {
        if (searchService.isAvailable) {
            void searchService.loadCredentials().then(setSearchCredentials);
        }
    }, [searchService]);

    const searchClient = useMemo(() => {
        if (credentials?.appId == null) {
            return undefined;
        }
        return algolia(credentials.appId, credentials.searchApiKey);
    }, [credentials?.appId, credentials?.searchApiKey]);

    if (!searchService.isAvailable || searchClient == null || layoutBreakpoint === "mobile") {
        return null;
    }

    return (
        <Transition show={isSearchDialogOpen} as={Fragment} appear={true}>
            <Dialog
                as="div"
                className="fixed inset-0 z-30 hidden sm:block"
                onClose={closeSearchDialog}
                initialFocus={inputRef}
            >
                <Transition.Child
                    as="div"
                    className="fixed inset-0 z-0 bg-background/50 backdrop-blur-sm"
                    enter="transition-opacity ease-linear duration-200"
                    enterFrom="opacity-0 backdrop-blur-none"
                    enterTo="opacity-100 backdrop-blur-sm"
                />
                <Dialog.Panel
                    className={cn(
                        "md:max-w-content-width my-header-height-padded relative z-10 mx-6 max-h-[calc(100vh-var(--spacing-header-height)-var(--spacing-header-height)-2rem)] md:mx-auto flex flex-col",
                        {
                            "mt-4": fromHeader,
                        },
                    )}
                >
                    <FernInstantSearch searchClient={searchClient} searchService={searchService} inputRef={inputRef} />
                </Dialog.Panel>
            </Dialog>
        </Transition>
    );
};

interface FernInstantSearchProps {
    searchClient: SearchClient;
    searchService: SearchService.Available;
    inputRef: React.RefObject<HTMLInputElement>;
}

function FernInstantSearch({ searchClient, searchService, inputRef }: FernInstantSearchProps) {
    const { sidebar } = useDocsContext();
    const { activeVersion } = useNavigationContext();
    const placeholder = useMemo(
        () => createSearchPlaceholderWithVersion(activeVersion, sidebar),
        [activeVersion, sidebar],
    );
    return (
        <InstantSearch searchClient={searchClient} indexName={searchService.index}>
            <div className="bg-background-translucent border-default flex h-auto min-h-0 shrink flex-col overflow-hidden rounded-xl border text-left align-middle shadow-2xl backdrop-blur-lg">
                <SearchBox
                    ref={inputRef}
                    placeholder={placeholder}
                    className="flex-1"
                    inputClassName="form-input w-full text-base t-muted placeholder:t-muted !p-5 form-input !border-none !bg-transparent !outline-none !ring-0"
                />
                <SearchHits />
            </div>
        </InstantSearch>
    );
}

export declare namespace SearchSidebar {
    export interface Props {
        searchService: SearchService;
    }
}

export const SearchSidebar: React.FC<PropsWithChildren<SearchSidebar.Props>> = (providedProps) => {
    const { sidebar } = useDocsContext();
    const { activeVersion } = useNavigationContext();
    const placeholder = useMemo(
        () => createSearchPlaceholderWithVersion(activeVersion, sidebar),
        [activeVersion, sidebar],
    );

    const { searchService, children } = providedProps;
    const [credentials, setSearchCredentials] = useState<SearchCredentials | undefined>(undefined);
    const inputRef = useRef<HTMLInputElement>(null);
    const layoutBreakpoint = useLayoutBreakpoint();

    useEffect(() => {
        if (searchService.isAvailable) {
            void searchService.loadCredentials().then(setSearchCredentials);
        }
    }, [searchService]);

    const searchClient = useMemo(() => {
        if (credentials?.appId == null) {
            return undefined;
        }
        return algolia(credentials.appId, credentials.searchApiKey);
    }, [credentials?.appId, credentials?.searchApiKey]);

    if (!searchService.isAvailable || searchClient == null || layoutBreakpoint !== "mobile") {
        return <>{children}</>;
    }

    return (
        <InstantSearch searchClient={searchClient} indexName={searchService.index}>
            <SearchMobileBox ref={inputRef} placeholder={placeholder} className="mx-4 mt-4" />
            <SearchMobileHits>{children}</SearchMobileHits>
        </InstantSearch>
    );
};

function createSearchPlaceholderWithVersion(
    activeVersion: SidebarVersionInfo | undefined,
    sidebar: FernNavigation.SidebarRootNode,
): string {
    return `Search ${activeVersion != null ? `across ${activeVersion.id} ` : ""}for ${createSearchPlaceholder(sidebar)}...`;
}

function createSearchPlaceholder(sidebar: FernNavigation.SidebarRootNode): string {
    const hasGuides = checkHasGuides(sidebar);
    const hasEndpoints = checkHasEndpoints(sidebar);
    if (hasGuides && hasEndpoints) {
        return "guides and endpoints";
    }

    if (hasGuides) {
        return "guides";
    }

    if (hasEndpoints) {
        return "endpoints";
    }

    return "guides and endpoints";
}

function checkHasGuides(sidebar: FernNavigation.SidebarRootNode): boolean {
    let hasGuides = false;
    FernNavigation.traverseNavigation(sidebar, (node) => {
        if (node.type === "page") {
            hasGuides = true;
            return false;
        }
        if (node.type === "changelog") {
            return "skip";
        }
        return;
    });
    return hasGuides;
}

function checkHasEndpoints(sidebar: FernNavigation.SidebarRootNode): boolean {
    let hasEndpoints = false;
    FernNavigation.traverseNavigation(sidebar, (node) => {
        if (node.type === "apiReference") {
            hasEndpoints = true;
            return false;
        }
        if (node.type === "changelog") {
            return "skip";
        }
        return;
    });
    return hasEndpoints;
}

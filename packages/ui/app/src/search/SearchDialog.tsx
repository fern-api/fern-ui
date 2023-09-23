import { Icon } from "@blueprintjs/core";
import { Dialog } from "@headlessui/react";
import { type SearchClient } from "algoliasearch/lite";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { InstantSearch, SearchBox } from "react-instantsearch-hooks-web";
import { useSearchService } from "../services/useSearchService";
import styles from "./SearchDialog.module.scss";
import { SearchHits } from "./SearchHits";

export declare namespace SearchDialog {
    export interface Props {
        isOpen: boolean;
        onClose: () => void;
        activeVersion?: string;
    }
}

export const SearchDialog: React.FC<SearchDialog.Props> = (providedProps) => {
    const { isOpen, onClose, activeVersion } = providedProps;
    const searchService = useSearchService();
    const [searchClient, setSearchClient] = useState<SearchClient | undefined>(undefined);

    useEffect(() => {
        if (searchService.isAvailable) {
            void (async () => {
                const loadedClient = await searchService.loadClient();
                setSearchClient(loadedClient);
            })();
        }
    }, [searchService]);

    return (
        <Dialog as="div" className="fixed inset-0 z-30" open={isOpen} onClose={onClose}>
            <div className="flex min-h-screen items-start justify-center p-4">
                <Dialog.Overlay className="bg-background-tertiary-light/40 dark:bg-background-tertiary-dark/40 fixed inset-0 backdrop-blur-sm" />
                {searchService.isAvailable && searchClient != null && (
                    <InstantSearch searchClient={searchClient} indexName={searchService.index}>
                        <div className="bg-background-primary-light dark:bg-background-primary-dark z-10 mx-3 mb-8 mt-10 flex w-full max-w-2xl flex-col overflow-hidden rounded-md text-left align-middle shadow-2xl">
                            <div className={classNames(styles.searchBox, "flex items-center space-x-3 px-5")}>
                                <Icon className="t-muted" icon="search" size={14} />
                                <SearchBox
                                    inputMode="text"
                                    autoFocus
                                    placeholder={
                                        activeVersion != null
                                            ? `Search across version ${activeVersion}`
                                            : "Find something..."
                                    }
                                    classNames={{
                                        root: "w-full",
                                        loadingIcon: "hidden",
                                        loadingIndicator: "hidden",
                                        reset: "hidden",
                                        resetIcon: "hidden",
                                        submit: "hidden",
                                        submitIcon: "hidden",
                                        input: "w-full text-base t-muted placeholder:text-text-muted-light placeholder:dark:text-text-muted-dark bg-transparent py-5",
                                    }}
                                />
                            </div>
                            <SearchHits />
                        </div>
                    </InstantSearch>
                )}
            </div>
        </Dialog>
    );
};

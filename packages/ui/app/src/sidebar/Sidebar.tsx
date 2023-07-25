import classNames from "classnames";
import { useCallback } from "react";
import { useDocsContext } from "../docs-context/useDocsContext";
import { useSearchContext } from "../search-context/useSearchContext";
import { useSearchService } from "../services/useSearchService";
import { isUnversionedNavigationConfig } from "../util/docs";
import { BuiltWithFern } from "./BuiltWithFern";
import { SidebarContext, SidebarContextValue } from "./context/SidebarContext";
import styles from "./Sidebar.module.scss";
import { SidebarItems } from "./SidebarItems";
import { SidebarSearchBar } from "./SidebarSearchBar";

export declare namespace Sidebar {
    export interface Props {
        expandAllSections?: boolean;
    }
}

export const Sidebar: React.FC<Sidebar.Props> = ({ expandAllSections = false }) => {
    const { docsInfo } = useDocsContext();
    const { openSearchDialog } = useSearchContext();
    const searchService = useSearchService();

    const contextValue = useCallback((): SidebarContextValue => ({ expandAllSections }), [expandAllSections]);

    if (!isUnversionedNavigationConfig(docsDefinition.config.navigation)) {
        // TODO: Implement
        return null;
    }

    return (
        <SidebarContext.Provider value={contextValue}>
            <div className="border-border-default-light dark:border-border-default-dark bg-background-light dark:bg-background-dark flex min-w-0 flex-1 flex-col justify-between overflow-hidden border-r">
                <div className="z-10 flex flex-col px-2.5 pt-2.5">
                    {searchService.isAvailable && <SidebarSearchBar onClick={openSearchDialog} />}
                </div>
                <div className={classNames("flex flex-1 flex-col overflow-y-auto pb-6", styles.scrollingContainer)}>
                    <SidebarItems navigationItems={docsInfo.activeNavigationConfig.items} slug="" />
                </div>
                <BuiltWithFern />
            </div>
        </SidebarContext.Provider>
    );
};

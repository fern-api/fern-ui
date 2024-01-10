import { PLATFORM } from "@fern-ui/core-utils";
import { useKeyboardCommand } from "@fern-ui/react-commons";
import classNames from "classnames";
import { useTheme } from "next-themes";
import { memo, useCallback, useEffect, useMemo } from "react";
import { useDocsContext } from "../docs-context/useDocsContext";
import { useMobileSidebarContext } from "../mobile-sidebar-context/useMobileSidebarContext";
import { useNavigationContext } from "../navigation-context/useNavigationContext";
import { useSearchContext } from "../search-context/useSearchContext";
import { SearchDialog } from "../search/SearchDialog";
import { useSearchService } from "../services/useSearchService";
import { Sidebar } from "../sidebar/Sidebar";
import { BgImageGradient } from "./BgImageGradient";
import { DocsMainContent } from "./DocsMainContent";
import { Header } from "./Header";

export const Docs: React.FC = memo(function UnmemoizedDocs() {
    const { observeDocContent, activeNavigatable } = useNavigationContext();
    const docsContext = useDocsContext();
    const { docsDefinition } = docsContext;
    const searchContext = useSearchContext();
    const { isSearchDialogOpen, openSearchDialog, closeSearchDialog } = searchContext;
    const searchService = useSearchService();
    const { resolvedTheme: theme, themes, setTheme } = useTheme();
    useKeyboardCommand({ key: "K", platform: PLATFORM, onCommand: openSearchDialog });

    useEffect(() => {
        // this is a hack to ensure that the theme is always set to a valid value, even if localStorage is corrupted
        if (theme == null || !themes.includes(theme)) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            setTheme(themes.length === 1 ? themes[0]! : "system");
        }
    }, [setTheme, theme, themes]);

    const { isMobileSidebarOpen, openMobileSidebar, closeMobileSidebar } = useMobileSidebarContext();

    const hasSpecifiedBackgroundImage = !!docsDefinition.config.backgroundImage;

    const { colorsV3 } = docsDefinition.config;

    const backgroundType = useMemo(() => {
        if (colorsV3.type === "darkAndLight") {
            if (theme === "dark" || theme === "light") {
                return colorsV3[theme].background.type;
            }
            return null;
        } else {
            return colorsV3.background.type;
        }
    }, [colorsV3, theme]);

    const renderBackground = useCallback(
        (className?: string) => (
            <div className={classNames(className, "clipped-background")}>
                <BgImageGradient
                    className="h-screen opacity-60 dark:opacity-50"
                    backgroundType={backgroundType}
                    hasSpecifiedBackgroundImage={hasSpecifiedBackgroundImage}
                />
            </div>
        ),
        [backgroundType, hasSpecifiedBackgroundImage]
    );

    return (
        <>
            <BgImageGradient
                backgroundType={backgroundType}
                hasSpecifiedBackgroundImage={hasSpecifiedBackgroundImage}
            />
            {searchService.isAvailable && (
                <SearchDialog
                    isOpen={isSearchDialogOpen}
                    onClose={closeSearchDialog}
                    activeVersion={activeNavigatable.context.version?.info.id}
                    searchService={searchService}
                />
            )}

            <div id="docs-content" className="relative flex min-h-0 flex-1 flex-col" ref={observeDocContent}>
                <div className="border-border-concealed-light dark:border-border-concealed-dark dark:shadow-header-dark fixed inset-x-0 top-0 z-30 h-16 overflow-visible border-b backdrop-blur-lg lg:backdrop-blur">
                    {renderBackground()}
                    <Header
                        className="max-w-8xl mx-auto"
                        docsDefinition={docsDefinition}
                        openSearchDialog={openSearchDialog}
                        isMobileSidebarOpen={isMobileSidebarOpen}
                        openMobileSidebar={openMobileSidebar}
                        closeMobileSidebar={closeMobileSidebar}
                        searchService={searchService}
                    />
                </div>

                <div className="max-w-8xl relative mx-auto flex min-h-0 w-full min-w-0 flex-1">
                    {isMobileSidebarOpen && (
                        <div
                            className="fixed inset-0 z-20 bg-white/30 sm:block sm:bg-black/30 lg:hidden dark:bg-black/30"
                            onClick={closeMobileSidebar}
                        />
                    )}
                    <div
                        className={classNames(
                            "z-20 fixed inset-0 top-16 lg:mt-16 lg:sticky lg:h-[calc(100vh-64px)] lg:w-72 sm:max-w-[20rem] sm:border-r lg:border-none border-border-concealed-light dark:border-border-concealed-dark",
                            "transition-all lg:transition-none sm:-translate-x-full sm:translate-y-0 lg:transition-none lg:translate-x-0 lg:translate-y-0",
                            {
                                "opacity-0 sm:opacity-100 sm:block pointer-events-none lg:pointer-events-auto sm:-translate-x-full":
                                    !isMobileSidebarOpen,
                                "sm:translate-x-0 opacity-100": isMobileSidebarOpen,
                            }
                        )}
                    >
                        {renderBackground("lg:hidden backdrop-blur-lg")}
                        <Sidebar />
                    </div>

                    <main className={classNames("relative flex w-full min-w-0 flex-1 flex-col pt-16")}>
                        <DocsMainContent />
                    </main>
                </div>
            </div>
        </>
    );
});

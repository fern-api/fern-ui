import { DocsV1Read } from "@fern-api/fdr-sdk";
import { visitDiscriminatedUnion } from "@fern-ui/core-utils";
import { Cross1Icon, HamburgerMenuIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { CSSProperties, forwardRef, memo, PropsWithChildren } from "react";
import { FernButtonGroup } from "../components/FernButton";
import { SearchService } from "../services/useSearchService";
import { HeaderLogoSection } from "./HeaderLogoSection";
import { HeaderPrimaryLink } from "./HeaderPrimaryLink";
import { HeaderSecondaryLink } from "./HeaderSecondaryLink";
import { ThemeButton } from "./ThemeButton";

export declare namespace Header {
    export interface Props {
        className?: string;
        style?: CSSProperties;
        config: DocsV1Read.DocsConfig;
        openSearchDialog: () => void;
        isMobileSidebarOpen: boolean;
        openMobileSidebar: () => void;
        closeMobileSidebar: () => void;
        searchService: SearchService;
    }
}

const UnmemoizedHeader = forwardRef<HTMLDivElement, PropsWithChildren<Header.Props>>(function Header(
    {
        className,
        style,
        config,
        openSearchDialog,
        isMobileSidebarOpen,
        openMobileSidebar,
        closeMobileSidebar,
        searchService,
    },
    ref,
) {
    const { navbarLinks, colorsV3 } = config;
    const navbarLinksSection = (
        <div className="hidden lg:block">
            <FernButtonGroup>
                {navbarLinks?.map((navbarLink, idx) =>
                    visitDiscriminatedUnion(navbarLink, "type")._visit({
                        primary: (navbarLink) => <HeaderPrimaryLink key={idx} navbarLink={navbarLink} />,
                        secondary: (navbarLink) => <HeaderSecondaryLink key={idx} navbarLink={navbarLink} />,
                        _other: () => null,
                    }),
                )}

                {colorsV3?.type === "darkAndLight" && <ThemeButton className="hidden lg:flex" />}
            </FernButtonGroup>
        </div>
    );

    return (
        <nav
            aria-label="primary"
            className={classNames(
                "flex justify-between items-center shrink-0 px-6 sm:px-8",
                // this matches with the calc() in the EndpointContent examples section
                "h-full",
                className,
            )}
            ref={ref}
            style={style}
        >
            <HeaderLogoSection config={config} />

            <div className="-mr-2 ml-auto flex items-center space-x-0 md:mr-0 lg:space-x-4">
                {navbarLinksSection}

                {searchService.isAvailable && (
                    <button
                        onClick={openSearchDialog}
                        className="t-muted hover:t-default flex h-[32px] w-[32px] items-center justify-center transition lg:hidden"
                    >
                        <MagnifyingGlassIcon className="size-5" />
                    </button>
                )}

                <button
                    onClick={isMobileSidebarOpen ? closeMobileSidebar : openMobileSidebar}
                    className={classNames(
                        "t-muted hover:t-default flex h-[32px] w-[32px] items-center justify-center transition lg:hidden rounded-lg",
                        {
                            "t-accent bg-tag-primary ring-inset ring-1 ring-border-accent-muted-light dark:ring-border-accent-muted-dark":
                                isMobileSidebarOpen,
                        },
                    )}
                >
                    {isMobileSidebarOpen ? <Cross1Icon className="size-5" /> : <HamburgerMenuIcon className="size-5" />}
                </button>
            </div>
        </nav>
    );
});

export const Header = memo(UnmemoizedHeader);

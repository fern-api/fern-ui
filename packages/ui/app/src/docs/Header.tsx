import { Icon } from "@blueprintjs/core";
import { visitDiscriminatedUnion } from "@fern-ui/core-utils";
import classNames from "classnames";
import { MenuIcon } from "../commons/icons/MenuIcon";
import { useDocsContext } from "../docs-context/useDocsContext";
import { useSearchContext } from "../search-context/useSearchContext";
import { useSearchService } from "../services/useSearchService";
import { HeaderLogoSection } from "./HeaderLogoSection";
import { HeaderPrimaryLink } from "./HeaderPrimaryLink";
import { HeaderSecondaryLink } from "./HeaderSecondaryLink";
import { ThemeButton } from "./ThemeButton";

export declare namespace Header {
    export interface Props {
        className?: string;
    }
}

export const Header: React.FC<Header.Props> = ({ className }) => {
    const { docsDefinition, lightModeEnabled } = useDocsContext();
    const { openSearchDialog } = useSearchContext();
    const searchService = useSearchService();
    const { navbarLinks } = docsDefinition.config;

    const navbarLinksSection = (
        <div className="hidden items-center space-x-5 md:flex md:space-x-8">
            {navbarLinks.map((navbarLink, idx) =>
                visitDiscriminatedUnion(navbarLink, "type")._visit({
                    primary: (navbarLink) => <HeaderPrimaryLink key={idx} navbarLink={navbarLink} />,
                    secondary: (navbarLink) => <HeaderSecondaryLink key={idx} navbarLink={navbarLink} />,
                    _other: () => null,
                })
            )}
        </div>
    );

    return (
        <div
            className={classNames(
                "flex justify-between items-center shrink-0 pl-4 pr-4",
                // this matches with the calc() in the EndpointContent examples section
                "h-16",
                className
            )}
        >
            <HeaderLogoSection />

            <div className="ml-auto flex items-center space-x-4">
                {navbarLinksSection}

                {lightModeEnabled && (
                    <>
                        <div className="dark:bg-border-default-dark bg-border-default-light hidden w-px self-stretch md:flex" />
                        <ThemeButton className="hidden md:flex" />
                    </>
                )}

                {searchService.isAvailable && (
                    <button
                        onClick={openSearchDialog}
                        className="text-intent-default dark:hover:text-text-primary-dark hover:text-text-primary-light flex transition md:hidden"
                    >
                        <Icon icon="search" size={14} />
                    </button>
                )}

                <button
                    onClick={() => {
                        // TODO: Implement
                    }}
                    className="text-intent-default dark:hover:text-text-primary-dark hover:text-text-primary-light flex transition md:hidden"
                >
                    <MenuIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

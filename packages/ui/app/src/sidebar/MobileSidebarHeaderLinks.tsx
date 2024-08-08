import type { DocsV1Read } from "@fern-api/fdr-sdk/client/types";
import cn from "clsx";
import { ArrowRight } from "iconoir-react";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { ReactElement } from "react";
import { DOCS_LAYOUT_ATOM, MOBILE_SIDEBAR_ENABLED_ATOM, NAVBAR_LINKS_ATOM } from "../atoms";
import { FernLinkButton } from "../components/FernLinkButton";

interface HeaderSidebarSlugLinkProps {
    navbarLink: DocsV1Read.NavbarLink;
}

export const HeaderSidebarSlugLink: React.FC<HeaderSidebarSlugLinkProps> = ({ navbarLink }) => {
    if (navbarLink.type === "github") {
        // TODO: Implement GitHub link
        return null;
    }
    return (
        <Link
            className={cn(
                "text-sm group pl-4 pr-3 py-1.5 border border-border-accent-muted hover:border-2 flex space-x-1.5 items-center t-accent hover:t-accent transition rounded-lg hover:bg-tag-primary",
            )}
            href={navbarLink.url}
            target="_blank"
        >
            <span className="whitespace-nowrap">{navbarLink.text}</span>
            {navbarLink.type === "primary" && (
                <div className="flex size-5 items-center">
                    <ArrowRight />
                </div>
            )}
        </Link>
    );
};

export function MobileSidebarHeaderLinks(): ReactElement | null {
    const layout = useAtomValue(DOCS_LAYOUT_ATOM);
    const navbarLinks = useAtomValue(NAVBAR_LINKS_ATOM);
    const isMobileSidebarEnabled = useAtomValue(MOBILE_SIDEBAR_ENABLED_ATOM);
    if (navbarLinks == null || navbarLinks.length === 0) {
        return null;
    }
    return (
        <div
            className={cn("border-concealed list-none -mx-4 border-t p-4 mt-4", {
                "lg:hidden": layout?.disableHeader !== true,
            })}
        >
            {navbarLinks?.map((navbarLink, idx) =>
                // TODO: Implement GitHub link
                navbarLink.type === "github" ? null : (
                    <FernLinkButton
                        key={idx}
                        icon={navbarLink.icon}
                        href={navbarLink.url}
                        text={navbarLink.text}
                        rightIcon={
                            navbarLink.rightIcon ??
                            (navbarLink.type === "primary" ||
                            (navbarLink.type === "filled" && idx === navbarLinks.length - 1) ? (
                                <ArrowRight className="size-4" />
                            ) : undefined)
                        }
                        className={cn("w-full", {
                            "mt-2": navbarLink.type === "primary" || navbarLink.type === "filled",
                        })}
                        variant={
                            navbarLink.type === "primary"
                                ? "outlined"
                                : navbarLink.type === "secondary"
                                  ? "minimal"
                                  : navbarLink.type
                        }
                        intent={navbarLink.type === "primary" || navbarLink.type === "filled" ? "primary" : "none"}
                        size={isMobileSidebarEnabled ? "large" : "normal"}
                    />
                ),
            )}
        </div>
    );
}

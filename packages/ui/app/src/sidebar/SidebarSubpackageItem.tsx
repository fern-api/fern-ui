import classNames from "classnames";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronDownIcon } from "../commons/icons/ChevronDownIcon";
import { joinUrlSlugs } from "../docs-context/joinUrlSlugs";
import { useDocsContext } from "../docs-context/useDocsContext";
import { SidebarItemLayout } from "./SidebarItemLayout";
import { UrlPathResolver } from "./UrlPathResolver";

export declare namespace SidebarSubpackageItem {
    export interface Props {
        title: JSX.Element | string;
        isChildSelected: boolean;
        className?: string;
        slug: string;
    }
}

export const SidebarSubpackageItem: React.FC<SidebarSubpackageItem.Props> = ({
    title,
    isChildSelected,
    className,
    slug,
}) => {
    const { navigateToPath, registerScrolledToPathListener, getFullSlug, docsDefinition, docsInfo } = useDocsContext();
    const router = useRouter();

    const urlPathResolver = useMemo(() => {
        return new UrlPathResolver({
            navigation: docsInfo.activeNavigationConfig,
            loadApiDefinition: (id) => docsDefinition.apis[id],
            loadApiPage: (id) => docsDefinition.pages[id],
        });
    }, [docsDefinition, docsInfo]);

    const handleClick = useCallback(async () => {
        const resolvedUrlPath = await urlPathResolver.resolveSlug(slug);
        if (resolvedUrlPath?.type === "apiSubpackage") {
            const [firstNavigatableEndpoint] = resolvedUrlPath.subpackage.endpoints;
            if (firstNavigatableEndpoint != null) {
                const slugToNavigate = joinUrlSlugs(resolvedUrlPath.slug, firstNavigatableEndpoint.urlSlug);
                void router.push("/" + getFullSlug(slugToNavigate));
                navigateToPath(slugToNavigate);
            }
        }
    }, [router, navigateToPath, slug, getFullSlug, urlPathResolver]);

    const fullSlug = getFullSlug(slug);

    const renderTitle = useCallback(
        ({ isHovering }: { isHovering: boolean }) => {
            return (
                <div
                    className={classNames(
                        "flex flex-1 py-2 px-4 rounded-lg items-center justify-between select-none min-w-0 transition",
                        {
                            "text-accent-primary": isHovering,
                            "t-muted": !isHovering,
                        }
                    )}
                >
                    <div className="flex min-w-0 items-center space-x-2">
                        <ChevronDownIcon
                            className={classNames("text-sm h-5 w-5 transition-all", {
                                "-rotate-90": !isChildSelected,
                                "rotate-0": isChildSelected,
                            })}
                        />
                        <span className="text-ellipsis">{title}</span>
                    </div>
                </div>
            );
        },
        [isChildSelected, title]
    );

    const [ref, setRef] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (ref == null) {
            return;
        }
        const unsubscribe = registerScrolledToPathListener(fullSlug, () => {
            ref.scrollIntoView({
                block: "center",
            });
        });
        return unsubscribe;
    }, [ref, registerScrolledToPathListener, fullSlug]);

    return (
        <button className={className} ref={setRef} onClick={handleClick}>
            <SidebarItemLayout title={renderTitle} />
        </button>
    );
};

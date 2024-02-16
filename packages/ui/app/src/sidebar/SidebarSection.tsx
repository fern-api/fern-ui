import { joinUrlSlugs } from "@fern-api/fdr-sdk";
import { visitDiscriminatedUnion } from "@fern-ui/core-utils";
import classNames from "classnames";
import { isEqual } from "lodash-es";
import { Fragment, memo, useCallback } from "react";
import { checkSlugStartsWith, useCollapseSidebar } from "./CollapseSidebarContext";
import { ExpandableSidebarApiSection, SidebarApiSection } from "./SidebarApiSection";
import { SidebarHeading } from "./SidebarHeading";
import { SidebarSlugLink } from "./SidebarLink";
import { SidebarNode } from "./types";

export interface SidebarSectionProps {
    className?: string;
    navigationItems: SidebarNode[];
    slug: string[];

    registerScrolledToPathListener: (slug: string, listener: () => void) => () => void;

    topLevel?: boolean;
    nested?: boolean;
    depth: number;
}

interface ExpandableSidebarSectionProps extends SidebarSectionProps {
    title: string;
}

const ExpandableSidebarSection: React.FC<ExpandableSidebarSectionProps> = ({
    className,
    title,
    slug,
    navigationItems,
    registerScrolledToPathListener,
    depth,
}) => {
    const { checkExpanded, toggleExpanded, selectedSlug } = useCollapseSidebar();
    const expanded = checkExpanded(slug);

    return (
        <SidebarSlugLink
            className={className}
            depth={Math.max(depth - 1, 0)}
            registerScrolledToPathListener={registerScrolledToPathListener}
            title={title}
            expanded={expanded}
            toggleExpand={useCallback(() => toggleExpanded(slug), [slug, toggleExpanded])}
            showIndicator={selectedSlug != null && checkSlugStartsWith(selectedSlug, slug) && !expanded}
        >
            <SidebarSection
                className={classNames("expandable", { hidden: !expanded })}
                slug={slug}
                navigationItems={navigationItems}
                registerScrolledToPathListener={registerScrolledToPathListener}
                depth={depth + 1}
            />
        </SidebarSlugLink>
    );
};

export const SidebarSection = memo<SidebarSectionProps>(function SidebarSection({
    className,
    navigationItems,
    registerScrolledToPathListener,
    topLevel = false,
    depth,
}) {
    const { selectedSlug } = useCollapseSidebar();

    if (navigationItems.length === 0) {
        return null;
    }

    return (
        <ul className={classNames(className, "fern-sidebar-group")}>
            {navigationItems.map((navigationItem, idx) =>
                visitDiscriminatedUnion(navigationItem, "type")._visit({
                    pageGroup: ({ pages }) => (
                        <Fragment key={idx}>
                            {pages.map((page, pageIdx) => (
                                <SidebarSlugLink
                                    key={page.id}
                                    className={classNames({
                                        "mt-6": topLevel && pageIdx === 0,
                                    })}
                                    slug={page.slug}
                                    depth={Math.max(depth - 1, 0)}
                                    registerScrolledToPathListener={registerScrolledToPathListener}
                                    title={page.title}
                                    selected={isEqual(selectedSlug, page.slug)}
                                />
                            ))}
                        </Fragment>
                    ),
                    section: (section) => {
                        const sectionSlug = joinUrlSlugs(...section.slug);
                        if (depth === 0) {
                            return (
                                <li key={sectionSlug}>
                                    <SidebarHeading
                                        className={classNames({
                                            "mt-6": topLevel,
                                        })}
                                        depth={depth}
                                        title={section.title}
                                    />
                                    <SidebarSection
                                        slug={section.slug}
                                        navigationItems={section.items}
                                        registerScrolledToPathListener={registerScrolledToPathListener}
                                        depth={depth + 1}
                                    />
                                </li>
                            );
                        } else {
                            return (
                                <ExpandableSidebarSection
                                    key={sectionSlug}
                                    className={classNames({
                                        "mt-6": topLevel,
                                    })}
                                    title={section.title}
                                    slug={section.slug}
                                    navigationItems={section.items}
                                    registerScrolledToPathListener={registerScrolledToPathListener}
                                    depth={depth}
                                />
                            );
                        }
                    },
                    apiSection: (apiSection) =>
                        depth === 0 ? (
                            <li key={apiSection.id}>
                                <SidebarHeading
                                    className={classNames({
                                        "mt-6": topLevel,
                                    })}
                                    depth={depth}
                                    title={apiSection.title}
                                />
                                <SidebarApiSection
                                    slug={apiSection.slug}
                                    apiSection={apiSection}
                                    registerScrolledToPathListener={registerScrolledToPathListener}
                                    depth={depth + 1}
                                />
                            </li>
                        ) : (
                            <ExpandableSidebarApiSection
                                slug={apiSection.slug}
                                apiSection={apiSection}
                                registerScrolledToPathListener={registerScrolledToPathListener}
                                depth={depth}
                                title={apiSection.title}
                                artifacts={apiSection.artifacts}
                            />
                        ),
                    _other: () => null,
                }),
            )}
        </ul>
    );
});

import { DocsV1Read, isApiNode } from "@fern-api/fdr-sdk";
import classNames from "classnames";
import { isEqual } from "lodash-es";
import { forwardRef, useCallback } from "react";
import { areApiArtifactsNonEmpty } from "../api-page/artifacts/areApiArtifactsNonEmpty";
import { HttpMethodTag } from "../commons/HttpMethodTag";
import { API_ARTIFACTS_TITLE } from "../config";
import { useNavigationContext } from "../navigation-context";
import { ResolvedApiDefinitionPackage, ResolvedNavigationItemApiSection } from "../util/resolver";
import { checkSlugStartsWith, useCollapseSidebar } from "./CollapseSidebarContext";
import { SidebarSlugLink } from "./SidebarLink";

export interface ApiSidebarSectionProps {
    className?: string;
    apiSection: ResolvedNavigationItemApiSection;
    slug: string[];
    registerScrolledToPathListener: (slug: string, listener: () => void) => () => void;
    depth: number;
}

export const ApiSidebarSection: React.FC<ApiSidebarSectionProps> = ({
    className,
    slug,
    registerScrolledToPathListener,
    apiSection,
    depth,
}) => {
    return (
        <InnerApiSidebarSection
            className={className}
            apiDefinitionPackage={apiSection}
            slug={slug}
            registerScrolledToPathListener={registerScrolledToPathListener}
            artifacts={apiSection.artifacts}
            depth={depth}
            apiSection={apiSection}
        />
    );
};

interface InnerApiSidebarSectionProps extends ApiSidebarSectionProps {
    apiDefinitionPackage: ResolvedApiDefinitionPackage;
    artifacts?: DocsV1Read.ApiArtifacts;
}

const InnerApiSidebarSection = forwardRef<HTMLUListElement, InnerApiSidebarSectionProps>(
    function InnerApiSidebarSection(
        { className, apiDefinitionPackage, slug, registerScrolledToPathListener, artifacts, depth, apiSection },
        ref
    ) {
        const { selectedSlug } = useCollapseSidebar();
        const { activeNavigatable } = useNavigationContext();
        const shallow = isApiNode(activeNavigatable) && activeNavigatable.section.api === apiSection.api;
        const renderArtifacts = () => {
            if (artifacts == null || !areApiArtifactsNonEmpty(artifacts)) {
                return null;
            }
            const clientLibrariesSlug = [...slug, "client-libraries"];
            return (
                <SidebarSlugLink
                    slug={clientLibrariesSlug}
                    title={API_ARTIFACTS_TITLE}
                    registerScrolledToPathListener={registerScrolledToPathListener}
                    selected={isEqual(clientLibrariesSlug, selectedSlug)}
                    depth={Math.max(0, depth - 1)}
                />
            );
        };

        if (
            apiDefinitionPackage.endpoints.length === 0 &&
            apiDefinitionPackage.webhooks.length === 0 &&
            apiDefinitionPackage.subpackages.length === 0 &&
            (artifacts == null || areApiArtifactsNonEmpty(artifacts))
        ) {
            return null;
        }

        return (
            <ul className={classNames(className, "list-none")} ref={ref}>
                {renderArtifacts()}
                {apiDefinitionPackage.endpoints.map((endpoint) => {
                    return (
                        <SidebarSlugLink
                            key={endpoint.id}
                            slug={endpoint.slug}
                            shallow={shallow}
                            title={endpoint.title}
                            registerScrolledToPathListener={registerScrolledToPathListener}
                            selected={isEqual(endpoint.slug, selectedSlug)}
                            depth={Math.max(0, depth - 1)}
                            rightElement={<HttpMethodTag className="ml-2 font-normal" method={endpoint.method} small />}
                        />
                    );
                })}
                {apiDefinitionPackage.webhooks.map((webhook) => {
                    return (
                        <SidebarSlugLink
                            key={webhook.id}
                            slug={webhook.slug}
                            shallow={shallow}
                            title={webhook.name ?? "/" + webhook.path.join("/")}
                            registerScrolledToPathListener={registerScrolledToPathListener}
                            selected={isEqual(webhook.slug, selectedSlug)}
                            depth={Math.max(0, depth - 1)}
                        />
                    );
                })}
                {apiDefinitionPackage.subpackages.map((subpackage) => {
                    return (
                        <ExpandableApiSidebarSection
                            key={subpackage.id}
                            title={subpackage.title}
                            slug={subpackage.slug}
                            apiDefinitionPackage={subpackage}
                            registerScrolledToPathListener={registerScrolledToPathListener}
                            depth={depth}
                            apiSection={apiSection}
                        />
                    );
                })}
            </ul>
        );
    }
);

interface ExpandableApiSidebarSectionProps extends InnerApiSidebarSectionProps {
    className?: string;
    title: string;
}

const ExpandableApiSidebarSection: React.FC<ExpandableApiSidebarSectionProps> = ({
    className,
    title,
    slug,
    registerScrolledToPathListener,
    depth,
    apiDefinitionPackage,
    artifacts,
    apiSection,
}) => {
    const { checkExpanded, toggleExpanded, selectedSlug } = useCollapseSidebar();
    const expanded = checkExpanded(slug);

    return (
        <SidebarSlugLink
            className={className}
            depth={Math.max(depth - 1, 0)}
            registerScrolledToPathListener={registerScrolledToPathListener}
            onClick={useCallback(() => {
                if (!expanded) {
                    toggleExpanded(slug);
                }
            }, [expanded, slug, toggleExpanded])}
            title={title}
            expanded={expanded}
            toggleExpand={useCallback(() => toggleExpanded(slug), [slug, toggleExpanded])}
            showIndicator={selectedSlug != null && checkSlugStartsWith(selectedSlug, slug) && !expanded}
        >
            <InnerApiSidebarSection
                className={classNames({ hidden: !expanded })}
                slug={slug}
                registerScrolledToPathListener={registerScrolledToPathListener}
                depth={depth + 1}
                apiDefinitionPackage={apiDefinitionPackage}
                artifacts={artifacts}
                apiSection={apiSection}
            />
        </SidebarSlugLink>
    );
};

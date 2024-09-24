import { UnreachableCaseError } from "ts-essentials";
import { FernNavigation, visitDiscriminatedUnion } from "../..";

/**
 * This migration accounts for the following changes:
 * - add canonicalSlug to all nodes
 */
export class FernNavigationV1ToLatest {
    #canonicalSlugs = new Map<string, FernNavigation.Slug>();

    #getAndSetCanonicalSlug(key: string | undefined, slug: FernNavigation.Slug): FernNavigation.Slug | undefined {
        if (key == null) {
            return undefined;
        }
        const existing = this.#canonicalSlugs.get(key);
        if (existing != null) {
            return existing;
        }
        this.#canonicalSlugs.set(key, slug);
        return undefined;
    }

    root(node: FernNavigation.V1.RootNode): FernNavigation.RootNode {
        const latest: FernNavigation.RootNode = {
            type: "root",
            child: visitDiscriminatedUnion(node.child)._visit<FernNavigation.RootChild>({
                versioned: this.versioned,
                unversioned: this.unversioned,
                productgroup: this.productGroup,
            }),
            version: "v2",
            title: node.title,
            id: FernNavigation.NodeId(node.id),
            pointsTo: node.pointsTo ? FernNavigation.Slug(node.pointsTo) : undefined,
            slug: FernNavigation.Slug(node.slug),
            canonicalSlug: undefined,
            icon: node.icon,
            hidden: node.hidden,
        };

        return latest;
    }

    versioned(node: FernNavigation.V1.VersionedNode): FernNavigation.VersionedNode {
        const latest: FernNavigation.VersionedNode = {
            type: "versioned",
            id: FernNavigation.NodeId(node.id),
            children: node.children.map((child) => this.version(child)),
        };

        return latest;
    }

    version(node: FernNavigation.V1.VersionNode): FernNavigation.VersionNode {
        const landingPage = node.landingPage ? this.landingPage(node.landingPage) : undefined;
        const latest: FernNavigation.VersionNode = {
            type: "version",
            default: node.default,
            versionId: node.versionId,
            landingPage,
            child: visitDiscriminatedUnion(node.child)._visit<FernNavigation.VersionChild>({
                tabbed: this.tabbed,
                sidebarRoot: this.sidebarRoot,
            }),
            availability: this.#availability(node.availability),
            title: node.title,
            slug: FernNavigation.Slug(node.slug),
            canonicalSlug: undefined,
            icon: node.icon,
            hidden: node.hidden,
            id: FernNavigation.NodeId(node.id),
            pointsTo: node.pointsTo ? FernNavigation.Slug(node.pointsTo) : undefined,
        };
        return latest;
    }

    landingPage(node: FernNavigation.V1.LandingPageNode): FernNavigation.LandingPageNode {
        const slug = FernNavigation.Slug(node.slug);
        const canonicalSlug = this.#getAndSetCanonicalSlug(node.pageId, slug);
        const latest: FernNavigation.LandingPageNode = {
            type: "landingPage",
            title: node.title,
            slug,
            canonicalSlug,
            icon: node.icon,
            hidden: node.hidden,
            id: FernNavigation.NodeId(node.id),
            pageId: FernNavigation.PageId(node.pageId),
            noindex: node.noindex,
        };
        return latest;
    }

    tabbed(node: FernNavigation.V1.TabbedNode): FernNavigation.TabbedNode {
        const latest: FernNavigation.TabbedNode = {
            type: "tabbed",
            id: FernNavigation.NodeId(node.id),
            children: node.children.map((child) =>
                visitDiscriminatedUnion(child)._visit<FernNavigation.TabChild>({
                    tab: this.tab,
                    link: this.link,
                    changelog: this.changelog,
                }),
            ),
        };
        return latest;
    }

    tab(node: FernNavigation.V1.TabNode): FernNavigation.TabNode {
        const latest: FernNavigation.TabNode = {
            type: "tab",
            child: this.sidebarRoot(node.child),
            title: node.title,
            slug: FernNavigation.Slug(node.slug),
            canonicalSlug: undefined,
            icon: node.icon,
            hidden: node.hidden,
            id: FernNavigation.NodeId(node.id),
            pointsTo: node.pointsTo ? FernNavigation.Slug(node.pointsTo) : undefined,
        };
        return latest;
    }

    link(node: FernNavigation.V1.LinkNode): FernNavigation.LinkNode {
        const latest: FernNavigation.LinkNode = {
            type: "link",
            id: FernNavigation.NodeId(node.id),
            title: node.title,
            url: node.url,
            icon: node.icon,
        };
        return latest;
    }

    unversioned(node: FernNavigation.V1.UnversionedNode): FernNavigation.UnversionedNode {
        const latest: FernNavigation.UnversionedNode = {
            type: "unversioned",
            child: visitDiscriminatedUnion(node.child)._visit<FernNavigation.VersionChild>({
                tabbed: this.tabbed,
                sidebarRoot: this.sidebarRoot,
            }),
            landingPage: node.landingPage ? this.landingPage(node.landingPage) : undefined,
            id: FernNavigation.NodeId(node.id),
        };

        return latest;
    }

    productGroup(node: FernNavigation.V1.ProductGroupNode): FernNavigation.ProductGroupNode {
        const latest: FernNavigation.ProductGroupNode = {
            type: "productgroup",
            landingPage: node.landingPage ? this.landingPage(node.landingPage) : undefined,
            children: node.children.map((child) => this.product(child)),
            id: FernNavigation.NodeId(node.id),
        };
        return latest;
    }

    product(node: FernNavigation.V1.ProductNode): FernNavigation.ProductNode {
        const latest: FernNavigation.ProductNode = {
            type: "product",
            id: FernNavigation.NodeId(node.id),
            title: node.title,
            slug: FernNavigation.Slug(node.slug),
            canonicalSlug: undefined,
            icon: node.icon,
            hidden: node.hidden,
            pointsTo: node.pointsTo ? FernNavigation.Slug(node.pointsTo) : undefined,
            default: node.default,
            productId: FernNavigation.ProductId(node.productId),
            child: visitDiscriminatedUnion(node.child)._visit<FernNavigation.ProductChild>({
                unversioned: this.unversioned,
                versioned: this.versioned,
            }),
            subtitle: node.subtitle,
        };
        return latest;
    }

    sidebarRoot(node: FernNavigation.V1.SidebarRootNode): FernNavigation.SidebarRootNode {
        const latest: FernNavigation.SidebarRootNode = {
            type: "sidebarRoot",
            id: FernNavigation.NodeId(node.id),
            children: node.children.map((child) =>
                visitDiscriminatedUnion(child)._visit<FernNavigation.SidebarRootChild>({
                    sidebarGroup: this.sidebarGroup,
                    apiReference: this.apiReference,
                    section: this.section,
                }),
            ),
        };
        return latest;
    }

    sidebarGroup(node: FernNavigation.V1.SidebarGroupNode): FernNavigation.SidebarGroupNode {
        const latest: FernNavigation.SidebarGroupNode = {
            type: "sidebarGroup",
            id: FernNavigation.NodeId(node.id),
            children: node.children.map((child) => this.navigationChild(child)),
        };
        return latest;
    }

    navigationChild(child: FernNavigation.V1.NavigationChild): FernNavigation.NavigationChild {
        return visitDiscriminatedUnion(child)._visit<FernNavigation.NavigationChild>({
            apiReference: this.apiReference,
            section: this.section,
            link: this.link,
            page: this.page,
            changelog: this.changelog,
        });
    }

    page(node: FernNavigation.V1.PageNode): FernNavigation.PageNode {
        const slug = FernNavigation.Slug(node.slug);
        const canonicalSlug = this.#getAndSetCanonicalSlug(node.pageId, slug);
        const latest: FernNavigation.PageNode = {
            type: "page",
            id: FernNavigation.NodeId(node.id),
            title: node.title,
            slug,
            canonicalSlug,
            icon: node.icon,
            hidden: node.hidden,
            pageId: FernNavigation.PageId(node.pageId),
            noindex: node.noindex,
        };
        return latest;
    }

    section(node: FernNavigation.V1.SectionNode): FernNavigation.SectionNode {
        const slug = FernNavigation.Slug(node.slug);
        const overviewPageId = node.overviewPageId ? FernNavigation.PageId(node.overviewPageId) : undefined;
        const canonicalSlug = this.#getAndSetCanonicalSlug(overviewPageId, slug);
        const latest: FernNavigation.SectionNode = {
            type: "section",
            id: FernNavigation.NodeId(node.id),
            children: node.children.map((child) => this.navigationChild(child)),
            title: node.title,
            slug,
            canonicalSlug,
            icon: node.icon,
            hidden: node.hidden,
            pointsTo: node.pointsTo ? FernNavigation.Slug(node.pointsTo) : undefined,
            collapsed: node.collapsed,
            overviewPageId,
            noindex: node.noindex,
        };
        return latest;
    }

    apiReference(node: FernNavigation.V1.ApiReferenceNode): FernNavigation.ApiReferenceNode {
        const slug = FernNavigation.Slug(node.slug);
        const overviewPageId = node.overviewPageId ? FernNavigation.PageId(node.overviewPageId) : undefined;
        const canonicalSlug = this.#getAndSetCanonicalSlug(overviewPageId, slug);
        const latest: FernNavigation.ApiReferenceNode = {
            type: "apiReference",
            paginated: node.paginated,
            showErrors: node.showErrors,
            hideTitle: node.hideTitle,
            children: node.children.map((child) => this.apiPackageChild(child)),
            changelog: node.changelog ? this.changelog(node.changelog) : undefined,
            playground: node.playground,
            title: node.title,
            slug,
            canonicalSlug,
            icon: node.icon,
            hidden: node.hidden,
            id: FernNavigation.NodeId(node.id),
            overviewPageId,
            noindex: node.noindex,
            apiDefinitionId: node.apiDefinitionId,
            availability: this.#availability(node.availability),
            pointsTo: node.pointsTo ? FernNavigation.Slug(node.pointsTo) : undefined,
        };
        return latest;
    }

    changelog(node: FernNavigation.V1.ChangelogNode): FernNavigation.ChangelogNode {
        const slug = FernNavigation.Slug(node.slug);
        const overviewPageId = node.overviewPageId ? FernNavigation.PageId(node.overviewPageId) : undefined;
        const canonicalSlug = this.#getAndSetCanonicalSlug(overviewPageId, slug);
        const latest: FernNavigation.ChangelogNode = {
            type: "changelog",
            id: FernNavigation.NodeId(node.id),
            children: node.children.map((child) => this.changelogYear(child)),
            title: node.title,
            slug,
            canonicalSlug,
            icon: node.icon,
            hidden: node.hidden,
            overviewPageId,
            noindex: node.noindex,
        };
        return latest;
    }

    changelogYear(node: FernNavigation.V1.ChangelogYearNode): FernNavigation.ChangelogYearNode {
        const latest: FernNavigation.ChangelogYearNode = {
            type: "changelogYear",
            id: FernNavigation.NodeId(node.id),
            children: node.children.map((child) => this.changelogMonth(child)),
            title: node.title,
            slug: FernNavigation.Slug(node.slug),
            canonicalSlug: undefined,
            icon: node.icon,
            hidden: node.hidden,
            year: node.year,
        };
        return latest;
    }

    changelogMonth(node: FernNavigation.V1.ChangelogMonthNode): FernNavigation.ChangelogMonthNode {
        const latest: FernNavigation.ChangelogMonthNode = {
            type: "changelogMonth",
            id: FernNavigation.NodeId(node.id),
            children: node.children.map((child) => this.changelogEntry(child)),
            title: node.title,
            slug: FernNavigation.Slug(node.slug),
            canonicalSlug: undefined,
            icon: node.icon,
            hidden: node.hidden,
            month: node.month,
        };
        return latest;
    }

    changelogEntry(node: FernNavigation.V1.ChangelogEntryNode): FernNavigation.ChangelogEntryNode {
        const slug = FernNavigation.Slug(node.slug);
        const canonicalSlug = this.#getAndSetCanonicalSlug(node.pageId, slug);
        const latest: FernNavigation.ChangelogEntryNode = {
            type: "changelogEntry",
            id: FernNavigation.NodeId(node.id),
            title: node.title,
            slug,
            canonicalSlug,
            icon: node.icon,
            hidden: node.hidden,
            date: node.date,
            pageId: FernNavigation.PageId(node.pageId),
            noindex: node.noindex,
        };
        return latest;
    }

    apiPackageChild(child: FernNavigation.V1.ApiPackageChild): FernNavigation.ApiPackageChild {
        return visitDiscriminatedUnion(child)._visit<FernNavigation.ApiPackageChild>({
            page: this.page,
            link: this.link,
            apiPackage: this.apiPackage,
            endpoint: this.endpoint,
            endpointPair: this.endpointPair,
            webSocket: this.webSocket,
            webhook: this.webhook,
        });
    }

    apiPackage(node: FernNavigation.V1.ApiPackageNode): FernNavigation.ApiPackageNode {
        const slug = FernNavigation.Slug(node.slug);
        const overviewPageId = node.overviewPageId ? FernNavigation.PageId(node.overviewPageId) : undefined;
        const canonicalSlug = this.#getAndSetCanonicalSlug(overviewPageId, slug);
        const latest: FernNavigation.ApiPackageNode = {
            type: "apiPackage",
            id: FernNavigation.NodeId(node.id),
            children: node.children.map((child) => this.apiPackageChild(child)),
            title: node.title,
            slug,
            canonicalSlug,
            icon: node.icon,
            hidden: node.hidden,
            pointsTo: node.pointsTo ? FernNavigation.Slug(node.pointsTo) : undefined,
            playground: node.playground,
            overviewPageId,
            noindex: node.noindex,
            apiDefinitionId: node.apiDefinitionId,
            availability: this.#availability(node.availability),
        };
        return latest;
    }

    endpoint(node: FernNavigation.V1.EndpointNode): FernNavigation.EndpointNode {
        const slug = FernNavigation.Slug(node.slug);
        const canonicalSlug = this.#getAndSetCanonicalSlug(
            `:api:${node.apiDefinitionId}:endpoint:${node.endpointId}`,
            slug,
        );
        const latest: FernNavigation.EndpointNode = {
            type: "endpoint",
            id: FernNavigation.NodeId(node.id),
            title: node.title,
            slug,
            canonicalSlug,
            icon: node.icon,
            hidden: node.hidden,
            playground: node.playground,
            apiDefinitionId: node.apiDefinitionId,
            availability: this.#availability(node.availability),
            method: node.method,
            endpointId: node.endpointId,
            isResponseStream: node.isResponseStream,
        };
        return latest;
    }

    endpointPair(node: FernNavigation.V1.EndpointPairNode): FernNavigation.EndpointPairNode {
        const latest: FernNavigation.EndpointPairNode = {
            type: "endpointPair",
            id: FernNavigation.NodeId(node.id),
            nonStream: this.endpoint(node.nonStream),
            stream: this.endpoint(node.stream),
        };
        return latest;
    }

    webSocket(node: FernNavigation.V1.WebSocketNode): FernNavigation.WebSocketNode {
        const slug = FernNavigation.Slug(node.slug);
        const canonicalSlug = this.#getAndSetCanonicalSlug(
            `:api:${node.apiDefinitionId}:websocket:${node.webSocketId}`,
            slug,
        );
        const latest: FernNavigation.WebSocketNode = {
            type: "webSocket",
            id: FernNavigation.NodeId(node.id),
            title: node.title,
            slug,
            canonicalSlug,
            icon: node.icon,
            hidden: node.hidden,
            playground: node.playground,
            apiDefinitionId: node.apiDefinitionId,
            availability: this.#availability(node.availability),
            webSocketId: node.webSocketId,
        };
        return latest;
    }

    webhook(node: FernNavigation.V1.WebhookNode): FernNavigation.WebhookNode {
        const slug = FernNavigation.Slug(node.slug);
        const canonicalSlug = this.#getAndSetCanonicalSlug(
            `:api:${node.apiDefinitionId}:webhook:${node.webhookId}`,
            slug,
        );
        const latest: FernNavigation.WebhookNode = {
            type: "webhook",
            id: FernNavigation.NodeId(node.id),
            title: node.title,
            slug,
            canonicalSlug,
            icon: node.icon,
            hidden: node.hidden,
            apiDefinitionId: node.apiDefinitionId,
            availability: this.#availability(node.availability),
            method: node.method,
            webhookId: node.webhookId,
        };
        return latest;
    }

    #availability(v1: FernNavigation.V1.NavigationV1Availability | undefined): FernNavigation.Availability | undefined {
        if (v1 == null) {
            return undefined;
        }
        switch (v1) {
            case "beta":
                return FernNavigation.Availability.Beta;
            case "deprecated":
                return FernNavigation.Availability.Deprecated;
            case "generally-available":
                return FernNavigation.Availability.GenerallyAvailable;
            case "in-development":
                return FernNavigation.Availability.InDevelopment;
            case "pre-release":
                return FernNavigation.Availability.PreRelease;
            case "stable":
                return FernNavigation.Availability.Stable;
            default:
                throw new UnreachableCaseError(v1);
        }
    }
}

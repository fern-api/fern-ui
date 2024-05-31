import { noop } from "lodash-es";
import urljoin from "url-join";
import { SlugCollector } from "../SlugCollector";
import { FernNavigation } from "../generated";
import { NavigationLeafNode, NavigationNode, NavigationNodeWithContent } from "../types/NavigationNode";
import { visitNavigationNodeWithMetadata } from "../visitors";
import { followRedirect } from "./followRedirect";
import { nodeHasContent } from "./nodeHasContent";
import { nodeHasMetadata } from "./nodeHasMetadata";

export type Node = Node.Found | Node.Redirect | Node.NotFound;

export declare namespace Node {
    interface Found {
        type: "found";
        node: NavigationLeafNode;
        breadcrumb: string[];
        root: FernNavigation.RootNode;
        versions: FernNavigation.VersionNode[];
        currentVersion: FernNavigation.VersionNode | undefined;
        currentTab: FernNavigation.TabNode | undefined;
        tabs: FernNavigation.TabChild[];
        sidebar: FernNavigation.SidebarRootNode;
        apiReference: FernNavigation.ApiReferenceNode | undefined;
        next: NavigationNodeWithContent | undefined;
        prev: NavigationNodeWithContent | undefined;
    }

    interface Redirect {
        type: "redirect";
        redirect: FernNavigation.Slug;
    }

    interface NotFound {
        type: "notFound";
        redirect: FernNavigation.Slug | undefined;
    }
}

export function findNode(root: FernNavigation.RootNode, slug: string[]): Node {
    const slugToFind = urljoin(slug);
    const collector = SlugCollector.collect(root);
    const map = collector.getSlugMapWithParents();
    const found = map.get(slugToFind);
    if (found == null) {
        let maybeVersionNode: FernNavigation.RootNode | FernNavigation.VersionNode = root;
        for (const versionNode of collector.getVersionNodes()) {
            const versionSlug = urljoin(versionNode.slug);
            if (slugToFind.startsWith(versionSlug)) {
                maybeVersionNode = versionNode;
                break;
            }
        }

        const redirect = followRedirect(maybeVersionNode);
        return { type: "notFound", redirect };
    }

    const sidebar = found.parents.find((node): node is FernNavigation.SidebarRootNode => node.type === "sidebarRoot");
    const version = found.parents.find((node): node is FernNavigation.VersionNode => node.type === "version");
    if (
        (nodeHasContent(found.node) ||
            found.node.type === "changelog" ||
            found.node.type === "changelogYear" ||
            found.node.type === "changelogMonth") &&
        sidebar != null
    ) {
        const rootChild = (version ?? root).child;
        return {
            type: "found",
            node: found.node,
            breadcrumb: createBreadcrumb(found.parents),
            root,
            versions: collector.getVersionNodes(),
            tabs: rootChild.type === "tabbed" ? rootChild.children : [],
            currentVersion: version,
            currentTab: found.parents.findLast((node): node is FernNavigation.TabNode => node.type === "tab"),
            sidebar,
            apiReference: found.parents.find(
                (node): node is FernNavigation.ApiReferenceNode => node.type === "apiReference",
            ),
            next: found.next,
            prev: found.prev,
        };
    }

    const redirectSlug = followRedirect(found.node);

    if (redirectSlug == null) {
        if (found.node.type === "root") {
            return { type: "notFound", redirect: undefined };
        }

        const redirect = followRedirect(version ?? root);
        return { type: "notFound", redirect };
    }

    return { type: "redirect", redirect: redirectSlug };
}

function createBreadcrumb(nodes: NavigationNode[]): string[] {
    const breadcrumb: string[] = [];
    nodes.forEach((node) => {
        if (!nodeHasMetadata(node)) {
            return;
        }
        visitNavigationNodeWithMetadata(node, {
            root: noop,
            version: noop,
            tab: noop,
            page: noop,
            section: (section) => {
                breadcrumb.push(section.title);
            },
            apiReference: (apiReference) => {
                if (!apiReference.hideTitle) {
                    breadcrumb.push(apiReference.title);
                }
            },
            changelog: (changelog) => {
                breadcrumb.push(changelog.title);
            },
            changelogYear: (changelogYear) => {
                breadcrumb.push(changelogYear.title);
            },
            changelogMonth: (changelogMonth) => {
                breadcrumb.push(changelogMonth.title);
            },
            apiSection: (apiSection) => {
                breadcrumb.push(apiSection.title);
            },
            changelogEntry: noop,
            endpoint: noop,
            webSocket: noop,
            webhook: noop,
        });
    });

    return breadcrumb;
}

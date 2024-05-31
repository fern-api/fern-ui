import { noop } from "lodash-es";
import { NavigationNode } from "../types/NavigationNode";
import { visitNavigationNode } from "./visitNavigationNode";

const SKIP = "skip" as const;
const CONTINUE = true as const;
const STOP = false as const;

export function traverseNavigation(
    node: NavigationNode,
    visit: (node: NavigationNode, index: number | undefined, parents: NavigationNode[]) => boolean | typeof SKIP | void,
): void {
    function internalChildrenTraverser(nodes: NavigationNode[], parents: NavigationNode[]): boolean | void {
        for (let i = 0; i < nodes.length; i++) {
            const result = internalTraverser(nodes[i], i, parents);
            if (result === STOP) {
                return STOP;
            }
        }
        return;
    }
    function internalTraverser(
        node: NavigationNode,
        index: number | undefined,
        parents: NavigationNode[],
    ): boolean | void {
        const v = visit(node, index, parents);
        if (v === SKIP) {
            return;
        } else if (v === STOP || v === CONTINUE) {
            return v;
        }
        return visitNavigationNode(node, {
            root: (root) => internalTraverser(root.child, undefined, [...parents, root]),
            versioned: (versioned) => internalChildrenTraverser(versioned.children, [...parents, versioned]),
            tabbed: (tabbed) => internalChildrenTraverser(tabbed.children, [...parents, tabbed]),
            sidebarRoot: (sidebar) => internalChildrenTraverser(sidebar.children, [...parents, sidebar]),
            version: (version) => internalTraverser(version.child, undefined, [...parents, version]),
            tab: (tab) => internalChildrenTraverser(tab.children, [...parents, tab]),
            link: noop,
            page: noop,
            section: (section) => internalChildrenTraverser(section.children, [...parents, section]),
            apiReference: (apiReference) => {
                const result = internalChildrenTraverser(apiReference.children, [...parents, apiReference]);
                if (result === STOP) {
                    return STOP;
                }
                if (apiReference.changelog != null) {
                    return internalTraverser(apiReference.changelog, undefined, [...parents, apiReference]);
                }
            },
            changelog: (changelog) => internalChildrenTraverser(changelog.children, [...parents, changelog]),
            changelogYear: (changelogYear) =>
                internalChildrenTraverser(changelogYear.children, [...parents, changelogYear]),
            changelogMonth: (changelogMonth) =>
                internalChildrenTraverser(changelogMonth.children, [...parents, changelogMonth]),
            changelogEntry: noop,
            endpoint: noop,
            webSocket: noop,
            webhook: noop,
            apiSection: (apiSection) => internalChildrenTraverser(apiSection.children, [...parents, apiSection]),
            endpointPair: (endpointPair) => {
                const result = internalTraverser(endpointPair.nonStream, undefined, [...parents, endpointPair]);
                if (result === STOP) {
                    return STOP;
                }
                return internalTraverser(endpointPair.stream, undefined, [...parents, endpointPair]);
            },
        });
    }
    internalTraverser(node, undefined, []);
}

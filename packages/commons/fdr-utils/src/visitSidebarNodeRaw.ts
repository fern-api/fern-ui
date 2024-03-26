import { noop, visitDiscriminatedUnion } from "@fern-ui/core-utils";
import { SidebarNodeRaw } from "./types";

export function visitSidebarNodeRaw(
    node: SidebarNodeRaw.VisitableNode,
    visit: (node: SidebarNodeRaw.VisitableNode, parents: SidebarNodeRaw.ParentNode[]) => void,
    parentNodes: SidebarNodeRaw.ParentNode[] = [],
): void {
    visit(node, parentNodes);
    visitDiscriminatedUnion(node, "type")._visit({
        pageGroup: (pageGroup) => {
            pageGroup.pages.forEach((page) => {
                if (page.type !== "link") {
                    // pageGroup is a psuedo-node that should not be considered as a parent
                    visitSidebarNodeRaw(page, visit, parentNodes);
                }
            });
        },
        apiSection: (apiSection) => {
            apiSection.items.forEach((item) => {
                visitSidebarNodeRaw(item, visit, [...parentNodes, apiSection]);
            });
            if (apiSection.changelog) {
                visitSidebarNodeRaw(apiSection.changelog, visit, [...parentNodes, apiSection]);
            }
        },
        section: (section) => {
            section.items.forEach((item) => {
                visitSidebarNodeRaw(item, visit, [...parentNodes, section]);
            });
        },
        versionGroup: (versionGroup) => {
            versionGroup.items.forEach((item) => {
                visitSidebarNodeRaw(item, visit, [...parentNodes, versionGroup]);
            });
        },
        tabGroup: (tabGroup) => {
            tabGroup.items.forEach((item) => {
                visitSidebarNodeRaw(item, visit, [...parentNodes, tabGroup]);
            });
        },
        page: noop,
        root: (root) => {
            root.items.forEach((item) => {
                visitSidebarNodeRaw(item, visit, [root, ...parentNodes]);
            });
        },
        _other: noop,
    });
}

import { FernNavigation } from "../..";

export function collectApiReferences(nav: FernNavigation.NavigationNode): FernNavigation.ApiReferenceNode[] {
    const apiReferences: FernNavigation.ApiReferenceNode[] = [];
    FernNavigation.traverseNavigation(nav, (node) => {
        if (node.type === "apiReference") {
            apiReferences.push(node);
            return "skip";
        }
        return true;
    });
    return apiReferences;
}

import { FernNavigation } from "@fern-api/fdr-sdk";
import { useAtomValue } from "jotai";
import { RESOLVED_API_DEFINITION_ATOM, useIsApiReferencePaginated, useIsSelectedSidebarNode } from "../../atoms";
import { HttpMethodTag } from "../../commons/HttpMethodTag";
import { SidebarSlugLink } from "../SidebarLink";

interface SidebarApiLeafNodeProps {
    node: FernNavigation.NavigationNodeApiLeaf;
    depth: number;
}

export function SidebarApiLeafNode({ node, depth }: SidebarApiLeafNodeProps): React.ReactElement | null {
    const selected = useIsSelectedSidebarNode(node.id);
    const isPaginated = useIsApiReferencePaginated();
    const resolvedApi = useAtomValue(RESOLVED_API_DEFINITION_ATOM);

    if (node.hidden && !selected) {
        return null;
    }

    const renderRightElement = () => {
        if (node.type === "webSocket") {
            return <HttpMethodTag method="WSS" size="sm" active={selected} />;
        } else {
            if (node.type === "endpoint" && node.isResponseStream) {
                return <HttpMethodTag method="STREAM" size="sm" active={selected} />;
            }

            return <HttpMethodTag method={node.method} size="sm" active={selected} />;
        }
    };

    return (
        <SidebarSlugLink
            nodeId={node.id}
            slug={node.slug}
            title={node.title}
            depth={Math.max(0, depth - 1)}
            hidden={node.hidden}
            icon={renderRightElement()}
            selected={selected}
            shallow={!isPaginated && resolvedApi === node.apiDefinitionId}
        />
    );
}

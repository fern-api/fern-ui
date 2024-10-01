import type { ApiDefinition } from "@fern-api/fdr-sdk/api-definition";
import type { NavigationNodeApiLeaf } from "@fern-api/fdr-sdk/navigation";
import { visitDiscriminatedUnion } from "@fern-ui/core-utils";
import { useAtomCallback } from "jotai/utils";
import { preload } from "swr";
import { useCallbackOne } from "use-memo-one";
import { selectApiRoute } from "../../hooks/useApiRoute";

const fetcher = (url: string): Promise<ApiDefinition> => fetch(url).then((res) => res.json());

export function usePreloadApiLeaf(): (node: NavigationNodeApiLeaf) => Promise<ApiDefinition> {
    return useAtomCallback(
        useCallbackOne((get, _set, node: NavigationNodeApiLeaf) => {
            const route = selectApiRoute(
                get,
                `/api/fern-docs/api-definition/${encodeURIComponent(node.apiDefinitionId)}/${visitDiscriminatedUnion(
                    node,
                )._visit({
                    endpoint: (node) => `endpoint/${encodeURIComponent(node.endpointId)}`,
                    webSocket: (node) => `websocket/${encodeURIComponent(node.webSocketId)}`,
                    webhook: (node) => `webhook/${encodeURIComponent(node.webhookId)}`,
                })}`,
            );
            return preload(route, fetcher);
        }, []),
    );
}

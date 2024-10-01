import { ApiDefinition } from "@fern-api/fdr-sdk/api-definition";
import type * as FernNavigation from "@fern-api/fdr-sdk/navigation";
import { useMemo } from "react";
import useSWRImmutable from "swr/immutable";
import { useApiRoute } from "../../hooks/useApiRoute";
import { WebSocketContext, createWebSocketContext } from "../types/endpoint-context";

interface LoadableWebSocketContext {
    context: WebSocketContext | undefined;
    isLoading: boolean;
}

/**
 * This hook leverages SWR to fetch and cache the definition for this endpoint.
 * It should be refactored to store the resulting endpoint in a global state, so that it can be shared between components.
 */
export function useWebSocketContext(node: FernNavigation.WebSocketNode): LoadableWebSocketContext {
    const route = useApiRoute(`/api/fern-docs/api-definition/${node.apiDefinitionId}/websocket/${node.webSocketId}`);
    const { data: apiDefinition, isLoading } = useSWRImmutable<ApiDefinition>(route, (url: string) =>
        fetch(url).then((res) => res.json()),
    );
    const context = useMemo(() => createWebSocketContext(node, apiDefinition), [node, apiDefinition]);

    return { context, isLoading };
}

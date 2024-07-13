import { FernNavigation } from "@fern-api/fdr-sdk";
import * as Sentry from "@sentry/nextjs";
import { useAtom, useAtomValue } from "jotai";
import dynamic from "next/dynamic";
import { FC, PropsWithChildren, createContext, useCallback, useContext, useEffect } from "react";
import useSWR from "swr";
import { noop } from "ts-essentials";
import urljoin from "url-join";
import { capturePosthogEvent } from "../analytics/posthog";
import { APIS_ATOM, FLATTENED_APIS_ATOM, store, useBasePath } from "../atoms";
import {
    HAS_PLAYGROUND_ATOM,
    PLAYGROUND_FORM_STATE_ATOM,
    useInitPlaygroundRouter,
    useOpenPlayground,
} from "../atoms/playground";
import { ResolvedApiDefinition, ResolvedRootPackage, isEndpoint, isWebSocket } from "../resolver/types";
import { getInitialEndpointRequestFormStateWithExample } from "./PlaygroundDrawer";

const PlaygroundDrawer = dynamic(() => import("./PlaygroundDrawer").then((m) => m.PlaygroundDrawer), {
    ssr: false,
});

const PlaygroundContext = createContext<(state: FernNavigation.NavigationNodeApiLeaf) => void>(noop);

const fetcher = async (url: string) => {
    const res = await fetch(url);
    return res.json();
};

export const PlaygroundContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const basePath = useBasePath();
    const key = urljoin(basePath ?? "", "/api/fern-docs/resolve-api");

    const { data } = useSWR<Record<string, ResolvedRootPackage> | null>(key, fetcher, {
        revalidateOnFocus: false,
    });
    useEffect(() => {
        if (data != null) {
            store.set(APIS_ATOM, data);
        }
    }, [data]);

    const flattenedApis = useAtomValue(FLATTENED_APIS_ATOM);

    const [globalFormState, setGlobalFormState] = useAtom(PLAYGROUND_FORM_STATE_ATOM);

    useInitPlaygroundRouter();

    const openPlayground = useOpenPlayground();

    const setSelectionStateAndOpen = useCallback(
        async (newSelectionState: FernNavigation.NavigationNodeApiLeaf) => {
            const matchedPackage = flattenedApis[newSelectionState.apiDefinitionId];
            if (matchedPackage == null) {
                Sentry.captureMessage("Could not find package for API playground selection state", "fatal");
                return;
            }

            if (newSelectionState.type === "endpoint") {
                const matchedEndpoint = matchedPackage.apiDefinitions.find(
                    (definition) => isEndpoint(definition) && definition.id === newSelectionState.endpointId,
                ) as ResolvedApiDefinition.Endpoint | undefined;
                if (matchedEndpoint == null) {
                    Sentry.captureMessage("Could not find endpoint for API playground selection state", "fatal");
                }
                openPlayground(newSelectionState.id);
                capturePosthogEvent("api_playground_opened", {
                    endpointId: newSelectionState.endpointId,
                    endpointName: matchedEndpoint?.title,
                });
                if (matchedEndpoint != null && globalFormState[newSelectionState.id] == null) {
                    setGlobalFormState((currentFormState) => {
                        return {
                            ...currentFormState,
                            [newSelectionState.id]: getInitialEndpointRequestFormStateWithExample(
                                matchedPackage?.auth,
                                matchedEndpoint,
                                matchedEndpoint?.examples[0],
                                matchedPackage?.types ?? {},
                            ),
                        };
                    });
                }
            } else if (newSelectionState.type === "webSocket") {
                const matchedWebSocket = matchedPackage.apiDefinitions.find(
                    (definition) => isWebSocket(definition) && definition.id === newSelectionState.webSocketId,
                ) as ResolvedApiDefinition.Endpoint | undefined;
                if (matchedWebSocket == null) {
                    Sentry.captureMessage("Could not find websocket for API playground selection state", "fatal");
                }
                openPlayground(newSelectionState.id);
                capturePosthogEvent("api_playground_opened", {
                    webSocketId: newSelectionState.webSocketId,
                    webSocketName: matchedWebSocket?.title,
                });
            }
        },
        [flattenedApis, globalFormState, openPlayground, setGlobalFormState],
    );

    const hasPlayground = useAtomValue(HAS_PLAYGROUND_ATOM);

    return (
        <PlaygroundContext.Provider value={setSelectionStateAndOpen}>
            {children}
            {hasPlayground && <PlaygroundDrawer />}
        </PlaygroundContext.Provider>
    );
};

export function useSetAndOpenPlayground(): (state: FernNavigation.NavigationNodeApiLeaf) => void {
    return useContext(PlaygroundContext);
}

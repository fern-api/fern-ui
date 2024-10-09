import type * as ApiDefinition from "@fern-api/fdr-sdk/api-definition";
import { joiner } from "@fern-api/fdr-sdk/api-definition";
import type * as FernNavigation from "@fern-api/fdr-sdk/navigation";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { useEffect } from "react";
import { useMemoOne } from "use-memo-one";
import { useIsLocalPreview } from "../contexts/local-preview";
import { FEATURE_FLAGS_ATOM } from "./flags";
import { RESOLVED_API_DEFINITION_ATOM, RESOLVED_PATH_ATOM } from "./navigation";

const SETTABLE_APIS_ATOM = atom<Record<ApiDefinition.ApiDefinitionId, ApiDefinition.ApiDefinition>>({});
SETTABLE_APIS_ATOM.debugLabel = "SETTABLE_APIS_ATOM";

export const WRITE_API_DEFINITION_ATOM = atom(
    null,
    (_get, set, apiDefinition: ApiDefinition.ApiDefinition, force?: boolean) => {
        set(SETTABLE_APIS_ATOM, (prev) => {
            const prevDefinition = prev[apiDefinition.id];
            if (prevDefinition == null) {
                return { ...prev, [apiDefinition.id]: apiDefinition };
            }
            const merged = joiner(force)(prevDefinition, apiDefinition);
            if (merged === prevDefinition) {
                return prev;
            }
            return { ...prev, [apiDefinition.id]: merged };
        });
    },
);

export function useWriteApiDefinitionAtom(api: ApiDefinition.ApiDefinition | undefined): void {
    const isLocalPreview = useIsLocalPreview();
    const set = useSetAtom(WRITE_API_DEFINITION_ATOM);
    useEffect(() => {
        if (api != null) {
            set(api, isLocalPreview);
        }
    }, [api, set, isLocalPreview]);
}

export function useWriteApiDefinitionsAtom(
    apis: Record<ApiDefinition.ApiDefinitionId, ApiDefinition.ApiDefinition>,
): void {
    const isLocalPreview = useIsLocalPreview();
    const set = useSetAtom(WRITE_API_DEFINITION_ATOM);
    useEffect(() => {
        Object.values(apis).forEach((api) => {
            set(api, isLocalPreview);
        });
    }, [apis, set]);
}

export const READ_APIS_ATOM = atom((get) => get(SETTABLE_APIS_ATOM));

export const getApiDefinitionAtom = atomFamily((apiDefinitionId: ApiDefinition.ApiDefinitionId | undefined) =>
    atom((get) => (apiDefinitionId != null ? get(SETTABLE_APIS_ATOM)[apiDefinitionId] : undefined)),
);

const IS_API_REFERENCE_PAGINATED = atom<boolean>((get) => {
    const content = get(RESOLVED_PATH_ATOM);
    if (content.type === "api-endpoint-page") {
        return true;
    }
    return get(FEATURE_FLAGS_ATOM).isApiScrollingDisabled;
});

export function useIsApiReferencePaginated(): boolean {
    return useAtomValue(IS_API_REFERENCE_PAGINATED);
}

export function useIsApiReferenceShallowLink(node: FernNavigation.WithApiDefinitionId): boolean {
    return useAtomValue(
        useMemoOne(
            () =>
                atom((get) => {
                    const isPaginated = get(IS_API_REFERENCE_PAGINATED);
                    const resolvedApi = get(RESOLVED_API_DEFINITION_ATOM);
                    return !isPaginated && resolvedApi?.id === node.apiDefinitionId;
                }),
            [node.apiDefinitionId],
        ),
    );
}

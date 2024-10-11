/* eslint-disable react-hooks/rules-of-hooks */
import type { SearchConfig } from "@fern-ui/search-utils";
import { noop } from "ts-essentials";
import { useIsLocalPreview } from "../contexts/local-preview";
import { useApiRouteSWR } from "../hooks/useApiRouteSWR";

export type SearchCredentials = {
    appId: string;
    searchApiKey: string;
};

export declare namespace SearchService {
    export interface Available {
        isAvailable: true;
        loadCredentials: () => Promise<SearchCredentials | undefined>;
        index: string;
    }

    export interface Unavailable {
        isAvailable: false;
    }
}

export type SearchService = SearchService.Available | SearchService.Unavailable;

export function useSearchConfig(): [SearchConfig, refresh: () => void] {
    const isLocalPreview = useIsLocalPreview();

    if (isLocalPreview) {
        return [{ isAvailable: false }, noop];
    }

    const { data } = useApiRouteSWR<SearchConfig>("/api/fern-docs/search", {
        refreshInterval: 1000 * 60 * 60 * 2, // 2 hours
        revalidateOnFocus: false,
    });

    return [data ?? { isAvailable: false }, noop];
}

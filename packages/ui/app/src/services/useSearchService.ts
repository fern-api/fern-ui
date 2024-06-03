import { FernNavigation } from "@fern-api/fdr-sdk";
import { atom, useAtom, useAtomValue } from "jotai";
import { once } from "lodash-es";
import { useEffect, useMemo } from "react";
import { captureSentryError } from "../analytics/sentry";
import { useLocalPreviewContext } from "../contexts/LocalPreviewContext";
import { useDocsContext } from "../contexts/docs-context/useDocsContext";
import { getEnvConfig, type EnvironmentConfig } from "../env";
import { REGISTRY_SERVICE } from "./registry";

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

function createSearchApiKeyLoader(envConfig: EnvironmentConfig, indexSegmentId: string) {
    return async () => {
        const resp = await REGISTRY_SERVICE.docs.v2.read.getSearchApiKeyForIndexSegment({
            indexSegmentId,
        });
        if (!resp.ok) {
            // eslint-disable-next-line no-console
            console.error(resp.error);

            captureSentryError(resp.error, {
                context: "SearchService",
                errorSource: "createSearchApiKeyLoader",
                errorDescription: "[P0] Failed to fetch index segment api key.",
            });

            return undefined;
        }
        const { searchApiKey } = resp.body;
        return {
            appId: envConfig.algoliaAppId,
            searchApiKey,
        };
    };
}

const SEARCH_SERVICE_ATOM = atom<SearchService>({ isAvailable: false });

export function useSearchService(): SearchService {
    return useAtomValue(SEARCH_SERVICE_ATOM);
}

export function useCreateSearchService(currentVersionId: FernNavigation.VersionId | undefined): void {
    const { searchInfo, versions } = useDocsContext();
    const [, setSearchService] = useAtom(SEARCH_SERVICE_ATOM);
    const { isLocalPreview } = useLocalPreviewContext();

    const searchService = useMemo<SearchService>(() => {
        if (isLocalPreview) {
            return { isAvailable: false };
        }

        try {
            const envConfig = getEnvConfig();
            if (typeof searchInfo !== "object" || searchInfo.type === "legacyMultiAlgoliaIndex") {
                return { isAvailable: false };
            } else if (searchInfo.value.type === "unversioned") {
                if (envConfig.algoliaSearchIndex == null) {
                    throw new Error('Missing environment variable "NEXT_PUBLIC_ALGOLIA_SEARCH_INDEX"');
                }
                const { indexSegment } = searchInfo.value;

                return {
                    isAvailable: true,
                    loadCredentials: once(createSearchApiKeyLoader(envConfig, indexSegment.id)),
                    index: envConfig.algoliaSearchIndex,
                };
            } else {
                const currentVersion = versions.find((v) => v.id === currentVersionId);
                if (currentVersion == null) {
                    throw new Error("Inconsistent State: Received search info is versioned but docs are unversioned");
                }
                const versionId = currentVersion.id;
                const { indexSegmentsByVersionId } = searchInfo.value;
                const indexSegment = indexSegmentsByVersionId[versionId];
                if (indexSegment == null) {
                    throw new Error(
                        `Inconsistent State: Did not receive index segment for version "${versionId}". This may indicate a backend bug.`,
                    );
                }
                if (envConfig.algoliaSearchIndex == null) {
                    throw new Error('Missing environment variable "NEXT_PUBLIC_ALGOLIA_SEARCH_INDEX"');
                }
                return {
                    isAvailable: true,
                    loadCredentials: once(createSearchApiKeyLoader(envConfig, indexSegment.id)),
                    index: envConfig.algoliaSearchIndex,
                };
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error("Failed to initialize search service", e);

            captureSentryError(e, {
                context: "SearchService",
                errorSource: "useCreateSearchService",
                errorDescription: "Failed to initialize search service",
            });

            return { isAvailable: false };
        }
    }, [currentVersionId, isLocalPreview, searchInfo, versions]);

    useEffect(() => {
        setSearchService(searchService);
    }, [searchService, setSearchService]);
}

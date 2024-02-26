import type { FullSlug } from "@fern-api/fdr-sdk";
import { LRUCache } from "lru-cache";
import { PropsWithChildren, useCallback, useRef } from "react";
import type { SerializedMdxContent } from "../util/mdx";
import { CacheContext, CacheContextValue } from "./CacheContext";

export declare namespace CacheContextProvider {}

export const CacheContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const lruCache = useRef(new LRUCache<FullSlug, SerializedMdxContent>({ max: 50 }));

    const storeSerializedMdxContent = useCallback(
        (fullSlug: FullSlug, serializedMdxContent: SerializedMdxContent) =>
            lruCache.current.set(fullSlug, serializedMdxContent),
        [],
    );

    const getSerializedMdxContent = useCallback((fullSlug: FullSlug) => lruCache.current.get(fullSlug), []);

    const contextValue = useCallback(
        (): CacheContextValue => ({
            storeSerializedMdxContent,
            getSerializedMdxContent,
        }),
        [storeSerializedMdxContent, getSerializedMdxContent],
    );

    return <CacheContext.Provider value={contextValue}>{children}</CacheContext.Provider>;
};

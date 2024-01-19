import { FdrAPI, PathResolver } from "@fern-api/fdr-sdk";
import { getFullSlugForNavigatable, type ResolvedPath } from "@fern-ui/app-utils";
import { useBooleanState, useEventCallback } from "@fern-ui/react-commons";
import { debounce } from "lodash-es";
import { useRouter } from "next/router";
import { PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDocsContext } from "../docs-context/useDocsContext";
import { getRouteNode } from "../util/anchor";
import { getRouteForResolvedPath } from "./getRouteForResolvedPath";
import { NavigationContext } from "./NavigationContext";
import { useSlugListeners } from "./useSlugListeners";

export declare namespace NavigationContextProvider {
    export type Props = PropsWithChildren<{
        resolvedPath: ResolvedPath;
        basePath: string | undefined;
    }>;
}

const smoothScrollIntoView = debounce(
    (node: HTMLElement) => {
        node.scrollIntoView({ behavior: "smooth" });
    },
    100,
    { leading: true, trailing: false }
);

export const NavigationContextProvider: React.FC<NavigationContextProvider.Props> = ({
    resolvedPath,
    children,
    basePath,
}) => {
    const { docsDefinition } = useDocsContext();
    const router = useRouter();
    const userIsScrolling = useRef(false);
    const resolvedRoute = getRouteForResolvedPath({
        resolvedSlug: resolvedPath.fullSlug,
        asPath: router.asPath, // do not include basepath because it is already included
    });
    const justNavigatedTo = useRef<string | undefined>(resolvedRoute);
    type ApiDefinition = FdrAPI.api.v1.read.ApiDefinition;
    const resolver = useMemo(
        () =>
            new PathResolver({
                definition: {
                    apis: docsDefinition.apis as Record<ApiDefinition["id"], ApiDefinition>,
                    docsConfig: docsDefinition.config,
                    basePath,
                },
            }),
        [basePath, docsDefinition.apis, docsDefinition.config]
    );

    const resolvedNavigatable = useMemo(() => {
        const node = resolver.resolveNavigatable(resolvedPath.fullSlug);
        if (node == null) {
            throw new Error(
                `Implementation Error. Cannot resolve navigatable for resolved path ${resolvedPath.fullSlug}`
            );
        }
        return node;
    }, [resolver, resolvedPath.fullSlug]);

    const [activeNavigatable, setActiveNavigatable] = useState(resolvedNavigatable);

    const activeNavigatableNeighbors = useMemo(() => {
        return resolver.getNeighborsForNavigatable(activeNavigatable);
    }, [resolver, activeNavigatable]);

    const selectedSlug = getFullSlugForNavigatable(activeNavigatable, { omitDefault: true, basePath });

    const navigateToRoute = useRef((route: string, disableSmooth = false) => {
        const [routeWithoutAnchor, _anchor] = route.split("#");
        if (!userIsScrolling.current && routeWithoutAnchor != null) {
            // fallback to "routeWithoutAnchor" if anchor is not detected (otherwise API reference will scroll to top)
            const node = getRouteNode(route) ?? getRouteNode(routeWithoutAnchor);
            if (node != null) {
                if (disableSmooth) {
                    node.scrollIntoView({
                        behavior: "auto",
                    });
                } else {
                    smoothScrollIntoView(node);
                }
            }
        }
        justNavigatedTo.current = route;
    });

    // on mount, scroll directly to routed element
    useEffect(() => {
        const handleInit = () => {
            navigateToRoute.current(resolvedRoute);
        };
        handleInit();
        window.addEventListener("DOMContentLoaded", handleInit);
        return () => {
            window.removeEventListener("DOMContentLoaded", handleInit);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setUserIsScrollingFalse = useRef(
        debounce(
            () => {
                userIsScrolling.current = false;
            },
            300,
            { leading: false, trailing: true }
        )
    );

    const resizeObserver = useRef<ResizeObserver>();

    const observeDocContent = useCallback((element: HTMLDivElement) => {
        const handleNavigate = () => {
            if (justNavigatedTo.current != null) {
                navigateToRoute.current(justNavigatedTo.current, true);
            }
        };
        if (element != null) {
            resizeObserver.current?.disconnect();
            handleNavigate();
            resizeObserver.current = new window.ResizeObserver(handleNavigate);
            resizeObserver.current.observe(element);
        }
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }
        const handleScroll = () => {
            userIsScrolling.current = true;
            setUserIsScrollingFalse.current();
            justNavigatedTo.current = undefined;
        };
        window.addEventListener("wheel", handleScroll);
        window.addEventListener("touchmove", handleScroll);

        return () => {
            window.removeEventListener("wheel", handleScroll);
            window.removeEventListener("touchmove", handleScroll);
        };
    }, []);

    const justNavigated = useRef(false);

    // const navigateToPathListeners = useSlugListeners("navigateToPath", { selectedSlug });
    const scrollToPathListeners = useSlugListeners("scrollToPath", { selectedSlug });

    const onScrollToPath = useEventCallback((fullSlug: string) => {
        if (justNavigated.current || fullSlug === selectedSlug) {
            return;
        }
        const navigatable = resolver.resolveNavigatable(fullSlug);
        if (navigatable != null) {
            setActiveNavigatable(navigatable);
        }
        void router.replace(`/${fullSlug}`, undefined, { shallow: true, scroll: false });
        scrollToPathListeners.invokeListeners(fullSlug);
    });

    const timeout = useRef<NodeJS.Timeout>();

    const navigateToPath = useEventCallback((fullSlug: string) => {
        justNavigated.current = true;
        const navigatable = resolver.resolveNavigatable(fullSlug);
        navigateToRoute.current(`/${fullSlug}`, undefined);
        if (navigatable != null) {
            setActiveNavigatable(navigatable);

            if (navigatable.type === "page") {
                window.scrollTo({ top: 0 });
            }
        }
        // navigateToPathListeners.invokeListeners(slug);
        timeout.current != null && clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            justNavigated.current = false;
        }, 500);
    });

    useEffect(() => {
        const handleRouteChangeStart = (route: string) => {
            navigateToPath(route.substring(1));
        };
        router.events.on("routeChangeStart", handleRouteChangeStart);
        router.events.on("hashChangeStart", handleRouteChangeStart);
        router.events.on("routeChangeComplete", handleRouteChangeStart);
        router.events.on("hashChangeComplete", handleRouteChangeStart);
        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart);
            router.events.off("hashChangeStart", handleRouteChangeStart);
            router.events.off("routeChangeComplete", handleRouteChangeStart);
            router.events.off("hashChangeComplete", handleRouteChangeStart);
        };
    }, [navigateToPath, router.events]);

    useEffect(() => {
        router.beforePopState(({ as }) => {
            const slugCandidate = as.substring(1, as.length);
            const previousNavigatable = resolver.resolveNavigatable(slugCandidate);
            if (previousNavigatable != null) {
                const fullSlug = getFullSlugForNavigatable(previousNavigatable, { basePath });
                navigateToPath(fullSlug);
            }
            return true;
        });
    }, [router, navigateToPath, docsDefinition, resolver, basePath]);

    const hydrated = useBooleanState(false);
    useEffect(() => {
        hydrated.setTrue();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <NavigationContext.Provider
            value={{
                basePath,
                justNavigated: justNavigatedTo.current != null,
                activeNavigatable,
                navigateToPath,
                userIsScrolling: () => userIsScrolling.current,
                onScrollToPath,
                observeDocContent,
                resolver,
                registerScrolledToPathListener: scrollToPathListeners.registerListener,
                activeNavigatableNeighbors,
                resolvedPath,
                hydrated: hydrated.value,
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

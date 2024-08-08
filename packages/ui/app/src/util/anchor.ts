export function getAnchorId(anchorIdParts: readonly string[]): string {
    return anchorIdParts.map((anchorId) => encodeURI(anchorId)).join(".");
}

export function getRouteNode(route: string): HTMLElement | undefined {
    const toRet = document.getElementById(route) ?? undefined;
    if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.debug(`getting route node: ${route} => ${toRet}`);
    }
    return toRet;
}

export function getRouteNodeWithAnchor(route: string): HTMLElement | undefined {
    const [, anchor] = route.split("#");
    return getRouteNode(route) ?? (anchor != null ? getRouteNode(anchor) : undefined);
}

export function scrollToRoute(route: string, smooth = false): boolean {
    if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.debug(`scrolling to route: ${route}`);
    }
    const node = getRouteNodeWithAnchor(route);
    node?.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
    return node != null;
}

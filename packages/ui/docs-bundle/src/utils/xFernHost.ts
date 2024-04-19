import type { NextApiRequest } from "next";
import type { NextRequest } from "next/server";

/**
 * Notes:
 *
 * x-fern-host is always appended to the request header by cloudfront for all *.docs.buildwithfern.com requests.
 * if the request is a rewrite from a custom domain, then x-forwarded-host is appended to the request header.
 * prefer x-forwarded-host over x-fern-host.
 *
 * NEXT_PUBLIC_DOCS_DOMAIN is used for local development only.
 */

export function getXFernHostEdge(req: NextRequest): string {
    return (
        process.env.NEXT_PUBLIC_DOCS_DOMAIN ??
        req.headers.get("x-forwarded-host") ??
        req.headers.get("x-fern-host") ??
        req.nextUrl.host
    );
}

export function getXFernHostNode(req: NextApiRequest): string {
    const xFernHost =
        process.env.NEXT_PUBLIC_DOCS_DOMAIN ??
        req.headers["x-forwarded-host"] ??
        req.headers["x-fern-host"] ??
        req.headers["host"] ??
        getHostFromUrl(req.url);

    if (typeof xFernHost !== "string") {
        throw new Error("Could not determine xFernHost from request.");
    }

    return xFernHost;
}

function getHostFromUrl(url: string | undefined): string | undefined {
    if (url == null) {
        return undefined;
    }
    const urlObj = new URL(url);
    return urlObj.host;
}

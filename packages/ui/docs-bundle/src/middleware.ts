import { get } from "@vercel/edge-config";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import urlJoin from "url-join";

export async function middleware(request: NextRequest): Promise<NextResponse> {
    const requestHeaders = new Headers(request.headers);

    const host =
        requestHeaders.get("x-fern-host") ??
        process.env.NEXT_PUBLIC_DOCS_DOMAIN ??
        request.cookies.get("_fern_docs_preview")?.value ??
        (await getCanonicalHost(request)) ??
        request.nextUrl.host;
    requestHeaders.set("x-fern-host", host);

    /**
     * Check if the request is dynamic by checking if the request has a token cookie, or if the request is an error page.
     */
    const isDynamic =
        request.cookies.has("fern_token") ||
        request.cookies.has("_fern_docs_preview") ||
        request.nextUrl.searchParams.get("error") === "true";

    const url = request.nextUrl.clone();

    if (request.nextUrl.pathname.includes("/api/fern-docs/")) {
        url.pathname = url.pathname.substring(url.pathname.indexOf("/api/fern-docs/"));
        return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    }

    if (request.nextUrl.pathname.includes("/_next/")) {
        url.pathname = url.pathname.substring(url.pathname.indexOf("/_next/"));

        if (url.pathname.includes("/_next/image/")) {
            return NextResponse.rewrite(url);
        }

        /**
         * while /_next/static routes are handled by the assetPrefix config, we need to handle the /_next/data routes separately
         * when the user is hovering over a link, Next.js will prefetch the data route using `/_next/data` routes. We intercept
         * the prefetch request at packages/ui/app/src/next-app/NextApp.tsx and append the customer-defined basepath:
         *
         * i.e. /base/path/_next/data/*
         *
         * This rewrite rule will ensure that /base/path/_next/data/* is rewritten to /_next/data/* on the server,
         * and also ensure that `/_next/data/buildId/path:` is rewritten to `/_next/data/buildId/{static|dynamic}/tenent.com/path:`
         */
        if (url.pathname.includes("/_next/data/")) {
            const path = url.pathname.substring(url.pathname.indexOf("/_next/data/") + "/_next/data/".length);
            const [buildId, ...page] = path.split("/");
            url.pathname = urlJoin("/_next/data", buildId, isDynamic ? "dynamic" : "static", host, ...page);
            return NextResponse.rewrite(url);
        }

        return NextResponse.next();
    }

    if (request.nextUrl.pathname.endsWith("/robots.txt")) {
        url.pathname = "/api/fern-docs/robots.txt";
        return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    }

    if (request.nextUrl.pathname.endsWith("/sitemap.xml")) {
        url.pathname = "/api/fern-docs/sitemap.xml";
        return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    }

    if (request.nextUrl.pathname.endsWith(".rss")) {
        url.pathname = "/api/fern-docs/changelog";
        url.searchParams.set("format", "rss");
        url.searchParams.set("path", request.nextUrl.pathname.substring(0, request.nextUrl.pathname.length - 4));
        return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    }

    if (request.nextUrl.pathname.endsWith(".atom")) {
        url.pathname = "/api/fern-docs/changelog";
        url.searchParams.set("format", "atom");
        url.searchParams.set("path", request.nextUrl.pathname.substring(0, request.nextUrl.pathname.length - 5));
        return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    }

    url.pathname = urlJoin(isDynamic ? "dynamic" : "static", host, request.nextUrl.pathname);
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
}

async function getCanonicalHost(request: NextRequest): Promise<string | undefined> {
    const canonicalUrls = await get<Record<string, string>>("cannonical-host");
    return canonicalUrls?.[request.nextUrl.host];
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!_next/static|_next/image|_vercel|api/fern-docs).*)",
    ],
};

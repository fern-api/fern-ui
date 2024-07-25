import { NextRequest, NextResponse } from "next/server";

/**
 * Why do we need this?
 *
 * This is a workaround for ISR pages that return a redirect to an external URL.
 * When the page is built, NextJS will send a HEAD request to the destination URL to check if it is valid.
 * This would add undesireable load to the destination server (e.g. the customer's server).
 *
 * By using this function, we can intercept the HEAD request and return a 308 redirect to the destination URL.
 */

export const runtime = "edge";

export default async function handler(req: NextRequest): Promise<NextResponse> {
    if (req.method !== "GET" && req.method !== "HEAD") {
        return new NextResponse(null, { status: 405 });
    }

    const url = req.nextUrl.clone();
    url.pathname = url.pathname.replace("/api/fern-docs/redirect", "/api/fern-docs/redirect2");
    return NextResponse.redirect(url.toString(), { status: 307 });
}

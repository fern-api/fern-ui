import { FernNavigation } from "@fern-api/fdr-sdk";
import { NodeCollector } from "@fern-api/fdr-sdk/navigation";
// eslint-disable-next-line import/no-internal-modules
import { checkViewerAllowedEdge } from "@fern-ui/ui/auth";
import { NextRequest, NextResponse } from "next/server";
import urljoin from "url-join";
import { buildUrlFromApiEdge } from "../../../utils/buildUrlFromApi";
import { loadWithUrl } from "../../../utils/loadWithUrl";
import { jsonResponse } from "../../../utils/serverResponse";
import { getXFernHostEdge } from "../../../utils/xFernHost";

export const runtime = "edge";

export default async function GET(req: NextRequest): Promise<NextResponse> {
    if (req.method !== "GET") {
        return new NextResponse(null, { status: 405 });
    }

    const xFernHost = getXFernHostEdge(req);

    const status = await checkViewerAllowedEdge(xFernHost, req);
    if (status >= 400) {
        return NextResponse.next({ status });
    }

    const headers = new Headers();
    headers.set("x-fern-host", xFernHost);

    const url = buildUrlFromApiEdge(xFernHost, req);
    const docs = await loadWithUrl(url);

    if (docs == null) {
        return jsonResponse(404, [], { headers });
    }

    const node = FernNavigation.utils.convertLoadDocsForUrlResponse(docs);
    const slugCollector = NodeCollector.collect(node);
    const urls = slugCollector.getPageSlugs().map((slug) => urljoin(xFernHost, slug));

    return jsonResponse(200, urls, { headers });
}

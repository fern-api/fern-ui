// eslint-disable-next-line import/no-internal-modules
import { getOAuthEdgeConfig, getOAuthRedirect } from "@fern-ui/ui/auth";
import { NextRequest, NextResponse } from "next/server";
import { getXFernHostEdge } from "../../../../utils/xFernHost";

export const runtime = "edge";

export default async function handler(req: NextRequest): Promise<NextResponse<string | false>> {
    const domain = getXFernHostEdge(req);
    const config = await getOAuthEdgeConfig(domain);

    // ory is the only partner enabled for api-key-injection (with RightBrain)
    if (config?.["api-key-injection-enabled"]) {
        const url = getOAuthRedirect(config);
        if (url != null) {
            return NextResponse.json(url);
        }
    }

    return NextResponse.json(false);
}

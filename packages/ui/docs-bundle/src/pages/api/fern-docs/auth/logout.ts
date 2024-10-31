import { revokeSessionForToken } from "@/server/auth/workos-session";
import { safeUrl } from "@/server/safeUrl";
import { getDocsDomainEdge, getHostEdge } from "@/server/xfernhost/edge";
import { withDefaultProtocol } from "@fern-api/ui-core-utils";
import { getAuthEdgeConfig } from "@fern-ui/fern-docs-edge-config";
import { COOKIE_ACCESS_TOKEN, COOKIE_FERN_TOKEN, COOKIE_REFRESH_TOKEN } from "@fern-ui/fern-docs-utils";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export default async function GET(req: NextRequest): Promise<NextResponse> {
    const domain = getDocsDomainEdge(req);

    const authConfig = await getAuthEdgeConfig(domain);

    if (authConfig?.type === "sso" && authConfig.partner === "workos") {
        // revoke session in WorkOS
        await revokeSessionForToken(req.cookies.get(COOKIE_FERN_TOKEN)?.value);
    }

    const logoutUrl = safeUrl(authConfig?.type === "basic_token_verification" ? authConfig.logout : undefined);

    // if logout url is provided, append the state to it before redirecting
    if (req.nextUrl.searchParams.has("state")) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        logoutUrl?.searchParams.set("state", req.nextUrl.searchParams.get("state")!);
    }

    const redirectLocation =
        logoutUrl ?? safeUrl(req.nextUrl.searchParams.get("state")) ?? safeUrl(withDefaultProtocol(getHostEdge(req)));

    const res = redirectLocation ? NextResponse.redirect(redirectLocation) : NextResponse.next();
    res.cookies.delete(COOKIE_FERN_TOKEN);
    res.cookies.delete(COOKIE_ACCESS_TOKEN);
    res.cookies.delete(COOKIE_REFRESH_TOKEN);
    return res;
}

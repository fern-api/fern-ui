import { getAuthStateNode } from "@/server/auth/getAuthState";
import * as ApiDefinition from "@fern-api/fdr-sdk/api-definition";
import { getFeatureFlags } from "@fern-ui/fern-docs-edge-config";
import { ApiDefinitionLoader } from "@fern-ui/fern-docs-server";
import { getMdxBundler } from "@fern-ui/ui/bundlers";
import { NextApiHandler, NextApiResponse } from "next";

const resolveApiHandler: NextApiHandler = async (req, res: NextApiResponse<ApiDefinition.ApiDefinition>) => {
    const { api, websocket } = req.query;
    if (req.method !== "GET" || typeof api !== "string" || typeof websocket !== "string") {
        res.status(400).end();
        return;
    }

    // TODO: this auth needs to be more granular: the user should only have access to this api definition if
    // - the api definition belongs to this org
    // - the user has view access to the the api definition based on their audience
    const authState = await getAuthStateNode(req);

    if (!authState.isLoggedIn && authState.status >= 400) {
        return res.status(authState.status).end();
    }

    const flags = await getFeatureFlags(authState.xFernHost);

    // TODO: pass in other tsx/mdx files to serializeMdx options
    const engine = flags.useMdxBundler ? "mdx-bundler" : "next-mdx-remote";
    const serializeMdx = await getMdxBundler(engine);

    // TODO: authenticate the request in FDR
    const apiDefinition = await ApiDefinitionLoader.create(authState.xFernHost, ApiDefinition.ApiDefinitionId(api))
        .withFlags(flags)
        .withMdxBundler(serializeMdx, engine)
        .withPrune({ type: "webSocket", webSocketId: ApiDefinition.WebSocketId(websocket) })
        .withResolveDescriptions()
        .withEnvironment(process.env.NEXT_PUBLIC_FDR_ORIGIN)
        .load();

    if (!apiDefinition) {
        return res.status(404).end();
    }

    // Cache the response in Vercel's Data Cache for 1 hour, and allow it to be served stale for up to 24 hours
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");

    return res.status(200).json(apiDefinition);
};

export default resolveApiHandler;

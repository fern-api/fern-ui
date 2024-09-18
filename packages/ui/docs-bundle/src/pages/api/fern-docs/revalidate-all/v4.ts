import * as FernNavigation from "@fern-api/fdr-sdk/navigation";
import { NodeCollector } from "@fern-api/fdr-sdk/navigation";
import type { FernDocs } from "@fern-fern/fern-docs-sdk";
import { provideRegistryService } from "@fern-ui/ui";
import { getAuthEdgeConfig } from "@fern-ui/ui/auth";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Revalidator } from "../../../../utils/revalidator";
import { getXFernHostNode } from "../../../../utils/xFernHost";

export const config = {
    maxDuration: 300,
};

const MAX_BATCH_SIZE = 100;
const DEFAULT_BATCH_SIZE = 10;

const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<FernDocs.RevalidateAllV4Response>,
): Promise<unknown> => {
    // when we call res.revalidate() nextjs uses
    // req.headers.host to make the network request
    const xFernHost = getXFernHostNode(req, true);
    req.headers.host = xFernHost;

    /**
     * Limit the number of paths to revalidate to max of 100.
     */
    let limit = req.query.limit == null ? DEFAULT_BATCH_SIZE : parseInt(req.query.limit as string, 10);
    if (isNaN(limit) || limit < 0) {
        // eslint-disable-next-line no-console
        console.error("Invalid limit:", req.query.limit);
        return res.status(400).json({ total: 0, results: [] });
    }
    limit = Math.min(limit, MAX_BATCH_SIZE);

    /**
     * Offset is the number of paths to skip before starting to revalidate.
     */
    const offset = req.query.offset == null ? 0 : parseInt(req.query.offset as string, 10);
    if (isNaN(offset) || offset < 0) {
        // eslint-disable-next-line no-console
        console.error("Invalid offset:", req.query.offset);
        return res.status(400).json({ total: 0, results: [] });
    }

    try {
        const authConfig = await getAuthEdgeConfig(xFernHost);

        /**
         * If the auth config is basic_token_verification, we don't need to revalidate.
         *
         * This is because basic_token_verification is a special case where all the routes are protected by a fern_token that
         * is generated by the customer, and so all routes use SSR and are not cached.
         */
        if (authConfig?.type === "basic_token_verification") {
            return res.status(200).json({ total: 0, results: [] });
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return res.status(500).json({ total: 0, results: [] });
    }

    const docs = await provideRegistryService().docs.v2.read.getDocsForUrl({ url: xFernHost });

    if (!docs.ok) {
        /**
         * If the error is UnauthorizedError, we don't need to revalidate, since all the routes require SSR.
         */
        return res.status(docs.error.error === "UnauthorizedError" ? 200 : 404).json({ total: 0, results: [] });
    }

    const node = FernNavigation.utils.convertLoadDocsForUrlResponse(docs.body);
    const slugs = NodeCollector.collect(node).getPageSlugs();
    const total = slugs.length;
    const batch = slugs.slice(offset, offset + limit);

    const revalidate = new Revalidator(res, xFernHost);
    const results = await revalidate.batch(batch);

    return res.status(200).json({ total, results });
};

export default handler;

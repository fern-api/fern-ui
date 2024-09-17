import * as FernNavigation from "@fern-api/fdr-sdk/navigation";
import { NodeCollector } from "@fern-api/fdr-sdk/navigation";
import type { FernDocs } from "@fern-fern/fern-docs-sdk";
import { provideRegistryService } from "@fern-ui/ui";
import { getAuthEdgeConfig } from "@fern-ui/ui/auth";
import { chunk } from "lodash-es";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Revalidator } from "../../../../utils/revalidator";
import { getXFernHostNode } from "../../../../utils/xFernHost";

export const config = {
    maxDuration: 300,
};

// reduce concurrency per domain
const DEFAULT_BATCH_SIZE = 100;

function isSuccessResult(result: FernDocs.RevalidationResult): result is FernDocs.SuccessfulRevalidation {
    return result.success;
}

function isFailureResult(result: FernDocs.RevalidationResult): result is FernDocs.FailedRevalidation {
    return !result.success;
}

const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<FernDocs.RevalidateAllV3Response>,
): Promise<unknown> => {
    // when we call res.revalidate() nextjs uses
    // req.headers.host to make the network request
    const xFernHost = getXFernHostNode(req, true);
    req.headers.host = xFernHost;

    const revalidate = new Revalidator(res, xFernHost);

    try {
        const authConfig = await getAuthEdgeConfig(xFernHost);

        /**
         * If the auth config is basic_token_verification, we don't need to revalidate.
         *
         * This is because basic_token_verification is a special case where all the routes are protected by a fern_token that
         * is generated by the customer, and so all routes use SSR and are not cached.
         */
        if (authConfig?.type === "basic_token_verification") {
            return res.status(200).json({ successfulRevalidations: [], failedRevalidations: [] });
        }

        const docs = await provideRegistryService().docs.v2.read.getDocsForUrl({ url: xFernHost });

        if (!docs.ok) {
            /**
             * If the error is UnauthorizedError, we don't need to revalidate, since all the routes require SSR.
             */
            return res
                .status(docs.error.error === "UnauthorizedError" ? 200 : 404)
                .json({ successfulRevalidations: [], failedRevalidations: [] });
        }

        const node = FernNavigation.utils.convertLoadDocsForUrlResponse(docs.body);
        const slugCollector = NodeCollector.collect(node);
        const slugs = slugCollector.getPageSlugs();

        const results: FernDocs.RevalidationResult[] = [];
        for (const batch of chunk(slugs, DEFAULT_BATCH_SIZE)) {
            results.push(...(await revalidate.batch(batch)));
        }

        const successfulRevalidations = results.filter(isSuccessResult);
        const failedRevalidations = results.filter(isFailureResult);

        return res
            .status(failedRevalidations.length === 0 ? 200 : successfulRevalidations.length === 0 ? 500 : 207)
            .json({ successfulRevalidations, failedRevalidations });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return res.status(500).json({ successfulRevalidations: [], failedRevalidations: [] });
    }
};

export default handler;

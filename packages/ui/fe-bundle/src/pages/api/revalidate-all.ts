import { FdrAPI, PathResolver } from "@fern-api/fdr-sdk";
import { NextApiHandler, NextApiResponse } from "next";
import { REGISTRY_SERVICE } from "../../service";

const handler: NextApiHandler = async (req, res: NextApiResponse<void>) => {
    try {
        if (req.method !== "POST") {
            res.status(400).send();
            return;
        }

        // when we call res.revalidate() nextjs uses
        // req.headers.host to make the network request
        const xFernHost = req.headers["x-fern-host"] ?? process.env.NEXT_PUBLIC_DOCS_DOMAIN;
        if (typeof xFernHost === "string") {
            req.headers.host = xFernHost;
            res.setHeader("host", xFernHost);
        } else {
            res.status(400).send();
            return;
        }
        const hostWithoutTrailingSlash = xFernHost.endsWith("/") ? xFernHost.slice(0, -1) : xFernHost;

        const docs = await REGISTRY_SERVICE.docs.v2.read.getDocsForUrl({
            url: hostWithoutTrailingSlash,
        });

        if (!docs.ok) {
            res.status(404).send();
            return;
        }

        type ApiDefinition = FdrAPI.api.v1.read.ApiDefinition;
        const resolver = new PathResolver({
            definition: {
                apis: docs.body.definition.apis as Record<ApiDefinition["id"], ApiDefinition>,
                docsConfig: docs.body.definition.config,
            },
        });

        const urls = resolver.getAllSlugsWithBaseURL(hostWithoutTrailingSlash);

        await Promise.all(urls.map((url) => res.revalidate(url.replace("https://", "/"))));

        res.status(200).send();
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        res.status(500).send();
    }
};

export default handler;

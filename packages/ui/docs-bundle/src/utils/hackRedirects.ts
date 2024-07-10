import type { DocsV1Read, DocsV2Read } from "@fern-api/fdr-sdk";
import { compile, match } from "path-to-regexp";
import urljoin from "url-join";

const HUME_REDIRECTS: DocsV1Read.RedirectConfig[] = [
    {
        source: "/streaming-api-tutorial",
        destination: "/docs/expression-measurement-api/websocket",
    },
    {
        source: "/docs/support",
        destination: "/support",
    },
    {
        source: "/streaming-api-error-codes",
        destination: "/docs/resources/errors",
    },
];

function getRedirects(domain: string): DocsV1Read.RedirectConfig[] {
    if (domain.includes("hume")) {
        return HUME_REDIRECTS;
    }

    return [];
}

export function getRedirectForPath(
    path: string,
    baseUrl: DocsV2Read.BaseUrl,
    redirects: DocsV1Read.RedirectConfig[] = [],
): DocsV1Read.RedirectConfig | undefined {
    for (const redirect of [...getRedirects(baseUrl.domain), ...withBasepath(redirects, baseUrl.basePath)]) {
        if (redirect.source === path) {
            return redirect;
        }
        const sourceFn = match(redirect.source, { decode: false });
        const result = sourceFn(path);
        if (result) {
            const destFn = compile(redirect.destination, { encode: false });
            const destination = destFn(result.params);
            return { source: path, destination };
        }
    }
    return undefined;
}

function withBasepath(
    redirects: DocsV1Read.RedirectConfig[],
    basePath: string | undefined,
): DocsV1Read.RedirectConfig[] {
    if (basePath == null) {
        return redirects;
    }
    return redirects.map((redirect) => ({
        source: redirect.source.startsWith(basePath) ? redirect.source : urljoin(basePath, redirect.source),
        destination: redirect.destination,
    }));
}

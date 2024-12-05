import { algoliaAppId } from "@/server/env-variables";
import { FACET_NAMES, FacetsResponse } from "@/types";
import { SEARCH_INDEX } from "@fern-ui/fern-docs-search-server/algolia";
import { algoliasearch } from "algoliasearch";
import { zip } from "es-toolkit/array";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    const domain = request.nextUrl.searchParams.get("domain");
    const filters = request.nextUrl.searchParams.getAll("filters");
    const apiKey = request.nextUrl.searchParams.get("x-algolia-api-key") ?? undefined;
    if (!domain) {
        return NextResponse.json({ error: "Domain is required" }, { status: 400 });
    }

    if (!apiKey) {
        return NextResponse.json({ error: "x-algolia-api-key is required" }, { status: 400 });
    }

    const response: FacetsResponse = {
        type: [],
        api_type: [],
        method: [],
        status_code: [],
        "product.title": [],
        "version.title": [],
        availability: [],
    };

    const { results } = await algoliasearch(algoliaAppId(), apiKey)
        .searchForFacets({
            requests: FACET_NAMES.map((facet) => ({
                indexName: SEARCH_INDEX,
                facet,
                facetFilters: filters,
                type: "facet",
                distinct: true,
            })),
        })
        .catch((err) => {
            // eslint-disable-next-line no-console
            console.error(err);
            return { results: [] };
        });

    if (results.length === 0) {
        return NextResponse.json(response);
    }

    zip(results, FACET_NAMES).forEach(([{ facetHits }, attribute]) => {
        const filteredFacets = facetHits.filter((hit) => hit.count > 0);

        if (filteredFacets.length < 2) {
            return;
        }

        filteredFacets.forEach((hit) => {
            response[attribute].push({ value: hit.value, count: hit.count });
        });
    });

    return NextResponse.json(response);
}

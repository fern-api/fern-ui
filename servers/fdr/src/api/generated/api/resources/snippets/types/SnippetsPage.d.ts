/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../index";
export interface SnippetsPage {
    /** If present, pass this into the `page` query parameter to load the next page. */
    next: number | undefined;
    /**
     * The snippets are returned as a map of endpoint path (e.g. `/api/users`)
     * to a map of endpoint method (e.g. `POST`) to snippets.
     */
    snippets: Record<FernRegistry.EndpointPathLiteral, FernRegistry.SnippetsByEndpointMethod>;
}

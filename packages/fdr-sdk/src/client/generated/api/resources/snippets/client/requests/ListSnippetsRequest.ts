/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../..";

/**
 * @example
 *     {
 *         page: 1,
 *         orgId: "vellum",
 *         apiId: "vellum-ai",
 *         sdks: [{
 *                 type: "python",
 *                 package: "vellum-ai"
 *             }]
 *     }
 */
export interface ListSnippetsRequest {
    page?: number;
    /**
     * If the same API is defined across multiple organization,
     * you must specify an organization ID.
     *
     */
    orgId?: FernRegistry.OrgId;
    /**
     * If you have more than one API, you must specify its ID.
     *
     */
    apiId?: FernRegistry.ApiId;
    /**
     * The SDKs for which to load snippets. If unspecified,
     * snippets for the latest published SDKs will be returned.
     *
     */
    sdks?: FernRegistry.SdkRequest[];
}

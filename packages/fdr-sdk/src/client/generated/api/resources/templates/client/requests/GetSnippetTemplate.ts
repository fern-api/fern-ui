/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../..";

export interface GetSnippetTemplate {
    /**
     * The organization to create snippets for.
     *
     */
    orgId: FernRegistry.OrgId;
    /**
     * The API name.
     *
     */
    apiId: FernRegistry.ApiId;
    sdk: FernRegistry.Sdk;
    endpointId: FernRegistry.EndpointIdentifier;
}

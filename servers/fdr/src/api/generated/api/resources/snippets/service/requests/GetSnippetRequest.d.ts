/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../..";
export interface GetSnippetRequest {
    orgId?: FernRegistry.OrgId;
    apiId?: FernRegistry.ApiId;
    sdks?: FernRegistry.SdkRequest[];
    endpoint: FernRegistry.EndpointIdentifier;
    payload?: FernRegistry.CustomSnippetPayload;
}

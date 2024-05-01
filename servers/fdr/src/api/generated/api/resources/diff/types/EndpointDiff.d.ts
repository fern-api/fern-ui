/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../..";
export interface EndpointDiff {
    id: FernRegistry.EndpointIdentifier;
    pathParameterDiff: FernRegistry.PathParameterDiff;
    queryParameterDiff: FernRegistry.QueryParameterDiff;
    requestBodyDiff: FernRegistry.RequestBodyDiff;
    responseBodyDiff: FernRegistry.ResponseBodyDiff;
}

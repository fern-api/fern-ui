/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../index";

export interface AlgoliaEndpointRecordV3 extends FernRegistry.AlgoliaPageRecordV3 {
    method: FernRegistry.api.v1.read.HttpMethod;
    endpointPath: FernRegistry.api.v1.read.EndpointPathPart[];
    isResponseStream?: boolean;
}

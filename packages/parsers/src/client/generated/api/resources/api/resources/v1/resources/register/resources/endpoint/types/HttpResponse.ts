/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../../index";

export interface HttpResponse extends FernRegistry.api.v1.WithDescription {
    type: FernRegistry.api.v1.register.HttpResponseBodyShape;
    /** Defaults to 200 */
    statusCode: number | undefined;
}

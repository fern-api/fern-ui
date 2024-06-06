/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../../index";

export interface StreamResponseV2 {
    /**
     * The terminator for each message. For example, for OpenAPI
     * the terminator is [DATA].
     */
    terminator?: string;
    shape: FernRegistry.api.v1.register.JsonBodyShape;
}

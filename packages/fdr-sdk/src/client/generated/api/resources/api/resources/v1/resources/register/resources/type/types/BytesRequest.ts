/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../..";

export interface BytesRequest
    extends FernRegistry.api.v1.register.WithDescription,
        FernRegistry.api.v1.register.WithAvailability {
    isOptional: boolean;
    contentType?: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../../index";

export interface Header extends FernRegistry.api.v1.WithDescription, FernRegistry.api.v1.WithAvailability {
    key: string;
    type: FernRegistry.api.v1.read.TypeReference;
}

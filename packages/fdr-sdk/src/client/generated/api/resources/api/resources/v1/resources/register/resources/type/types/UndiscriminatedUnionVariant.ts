/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../../index";

export interface UndiscriminatedUnionVariant
    extends FernRegistry.api.v1.WithDescription,
        FernRegistry.api.v1.WithAvailability {
    typeName: string | undefined;
    type: FernRegistry.api.v1.register.TypeReference;
}

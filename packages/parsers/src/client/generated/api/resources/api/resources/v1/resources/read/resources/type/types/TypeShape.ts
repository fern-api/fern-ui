/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../../index";

export type TypeShape =
    | FernRegistry.api.v1.read.TypeShape.Alias
    | FernRegistry.api.v1.read.TypeShape.Enum
    | FernRegistry.api.v1.read.TypeShape.UndiscriminatedUnion
    | FernRegistry.api.v1.read.TypeShape.DiscriminatedUnion
    | FernRegistry.api.v1.read.TypeShape.Object_;

export declare namespace TypeShape {
    interface Alias {
        type: "alias";
        value: FernRegistry.api.v1.read.TypeReference;
    }

    interface Enum extends FernRegistry.api.v1.read.EnumType {
        type: "enum";
    }

    interface UndiscriminatedUnion extends FernRegistry.api.v1.read.UndiscriminatedUnionType {
        type: "undiscriminatedUnion";
    }

    interface DiscriminatedUnion extends FernRegistry.api.v1.read.DiscriminatedUnionType {
        type: "discriminatedUnion";
    }

    interface Object_ extends FernRegistry.api.v1.read.ObjectType {
        type: "object";
    }
}

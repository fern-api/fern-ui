/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../../..";
export declare type TypeShape = FernRegistry.api.v1.register.TypeShape.Alias | FernRegistry.api.v1.register.TypeShape.Enum | FernRegistry.api.v1.register.TypeShape.UndiscriminatedUnion | FernRegistry.api.v1.register.TypeShape.DiscriminatedUnion | FernRegistry.api.v1.register.TypeShape.Object_;
export declare namespace TypeShape {
    interface Alias {
        type: "alias";
        value: FernRegistry.api.v1.register.TypeReference;
    }
    interface Enum extends FernRegistry.api.v1.register.EnumType {
        type: "enum";
    }
    interface UndiscriminatedUnion extends FernRegistry.api.v1.register.UndiscriminatedUnionType {
        type: "undiscriminatedUnion";
    }
    interface DiscriminatedUnion extends FernRegistry.api.v1.register.DiscriminatedUnionType {
        type: "discriminatedUnion";
    }
    interface Object_ extends FernRegistry.api.v1.register.ObjectType {
        type: "object";
    }
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../../index";

export type TypeReference =
    | FernRegistry.api.v1.read.TypeReference.Id
    | FernRegistry.api.v1.read.TypeReference.Primitive
    | FernRegistry.api.v1.read.TypeReference.Optional
    | FernRegistry.api.v1.read.TypeReference.List
    | FernRegistry.api.v1.read.TypeReference.Set
    | FernRegistry.api.v1.read.TypeReference.Map
    | FernRegistry.api.v1.read.TypeReference.Literal
    | FernRegistry.api.v1.read.TypeReference.Unknown;

export declare namespace TypeReference {
    interface Id extends FernRegistry.api.v1.read.TypeReferenceId {
        type: "id";
    }

    interface Primitive {
        type: "primitive";
        value: FernRegistry.api.v1.read.PrimitiveType;
    }

    interface Optional extends FernRegistry.api.v1.read.OptionalType {
        type: "optional";
    }

    interface List extends FernRegistry.api.v1.read.ListType {
        type: "list";
    }

    interface Set extends FernRegistry.api.v1.read.SetType {
        type: "set";
    }

    interface Map extends FernRegistry.api.v1.read.MapType {
        type: "map";
    }

    interface Literal {
        type: "literal";
        value: FernRegistry.api.v1.read.LiteralType;
    }

    interface Unknown {
        type: "unknown";
    }
}

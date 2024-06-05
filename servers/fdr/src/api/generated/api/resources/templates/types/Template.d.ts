/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../index";
export declare type Template = FernRegistry.Template.Generic | FernRegistry.Template.Enum | FernRegistry.Template.DiscriminatedUnion | FernRegistry.Template.Union | FernRegistry.Template.Dict | FernRegistry.Template.Iterable;
export declare namespace Template {
    interface Generic extends FernRegistry.GenericTemplate {
        type: "generic";
    }
    interface Enum extends FernRegistry.EnumTemplate {
        type: "enum";
    }
    interface DiscriminatedUnion extends FernRegistry.DiscriminatedUnionTemplate {
        type: "discriminatedUnion";
    }
    interface Union extends FernRegistry.UnionTemplate {
        type: "union";
    }
    interface Dict extends FernRegistry.DictTemplate {
        type: "dict";
    }
    interface Iterable extends FernRegistry.IterableTemplate {
        type: "iterable";
    }
}

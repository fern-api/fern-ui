/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../../../index";
export declare type LiteralType = FernRegistry.api.v1.read.LiteralType.BooleanLiteral | FernRegistry.api.v1.read.LiteralType.StringLiteral;
export declare namespace LiteralType {
    interface BooleanLiteral {
        type: "booleanLiteral";
        value: boolean;
    }
    interface StringLiteral {
        type: "stringLiteral";
        value: string;
    }
}

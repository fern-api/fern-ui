/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../../../index";
/**
 * Hand-written code samples
 */
export interface CustomCodeSample extends FernRegistry.api.v1.WithDescription {
    language: FernRegistry.api.v1.read.Language;
    code: string;
    name?: string;
    install?: string;
}

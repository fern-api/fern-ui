/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../index";
export interface CustomFontConfig {
    name: string;
    variants: FernRegistry.docs.v1.write.CustomFontConfigVariant[];
    display?: FernRegistry.docs.v1.write.FontDisplay;
    fallback?: string[];
    fontVariationSettings?: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../..";
export interface DocsSection {
    title: string;
    items: FernRegistry.docs.v1.read.NavigationItem[];
    urlSlug: string;
    skipUrlSlug: boolean;
    collapsed: boolean;
    fullSlug?: string[];
}

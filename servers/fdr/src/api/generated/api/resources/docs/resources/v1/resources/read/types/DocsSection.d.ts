/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../index";
export interface DocsSection {
    title: string;
    icon?: string;
    items: FernRegistry.docs.v1.read.NavigationItem[];
    urlSlug: string;
    skipUrlSlug: boolean;
    collapsed: boolean;
    hidden?: boolean;
    fullSlug?: string[];
}

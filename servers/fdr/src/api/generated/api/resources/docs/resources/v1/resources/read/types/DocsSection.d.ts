/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../..";
export interface DocsSection extends FernRegistry.docs.v1.read.NavigationNodeMetadata {
    title: string;
    items: FernRegistry.docs.v1.read.NavigationItem[];
    skipUrlSlug: boolean;
    collapsed: boolean;
    overviewPageId?: FernRegistry.docs.v1.commons.PageId;
}

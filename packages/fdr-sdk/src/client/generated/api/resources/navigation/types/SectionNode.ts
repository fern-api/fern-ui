/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../index";

export interface SectionNode
    extends FernRegistry.navigation.WithNodeMetadata,
        FernRegistry.navigation.WithOverviewPage,
        FernRegistry.navigation.WithRedirect {
    type: "section";
    collapsed?: boolean;
    children: FernRegistry.navigation.NavigationChild[];
}

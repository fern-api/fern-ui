/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernNavigation from "../index";

export interface ApiSectionNode
    extends FernNavigation.WithNodeMetadata,
        FernNavigation.WithOverviewPage,
        FernNavigation.WithApiDefinitionId,
        FernNavigation.WithRedirect {
    type: "apiSection";
    children: FernNavigation.ApiSectionChild[];
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernNavigation from "../index";

export interface ApiReferenceNode
    extends FernNavigation.WithNodeMetadata,
        FernNavigation.WithOverviewPage,
        FernNavigation.WithApiDefinitionId,
        FernNavigation.WithRedirect {
    type: "apiReference";
    disableLongScrolling: boolean | undefined;
    showErrors: boolean | undefined;
    hideTitle: boolean | undefined;
    children: FernNavigation.ApiReferenceChild[];
    changelog: FernNavigation.ChangelogNode | undefined;
}

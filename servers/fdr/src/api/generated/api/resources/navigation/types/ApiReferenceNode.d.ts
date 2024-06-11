/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../..";
export interface ApiReferenceNode extends FernRegistry.navigation.WithNodeMetadata, FernRegistry.navigation.WithOverviewPage, FernRegistry.navigation.WithApiDefinitionId, FernRegistry.navigation.WithRedirect {
    type: "apiReference";
    disableLongScrolling?: boolean;
    showErrors?: boolean;
    hideTitle?: boolean;
    children: FernRegistry.navigation.ApiSectionChild[];
    changelog?: FernRegistry.navigation.ChangelogNode;
}

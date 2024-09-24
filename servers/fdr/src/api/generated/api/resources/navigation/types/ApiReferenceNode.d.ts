/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../index";
export interface ApiReferenceNode extends FernRegistry.navigation.WithNodeMetadata, FernRegistry.navigation.WithOverviewPage, FernRegistry.navigation.WithApiDefinitionId, FernRegistry.navigation.WithRedirect {
    type: "apiReference";
    /** If true, long-scrolling will be disabled. */
    paginated: boolean | undefined;
    showErrors: boolean | undefined;
    hideTitle: boolean | undefined;
    children: FernRegistry.navigation.ApiPackageChild[];
    changelog: FernRegistry.navigation.ChangelogNode | undefined;
    /** Settings for the api playground that affects all endpoints. */
    playground: FernRegistry.navigation.PlaygroundSettings | undefined;
}

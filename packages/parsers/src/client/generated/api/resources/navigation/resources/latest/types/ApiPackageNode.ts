/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../index";

export interface ApiPackageNode
    extends FernRegistry.navigation.latest.WithNodeMetadata,
        FernRegistry.navigation.latest.WithOverviewPage,
        FernRegistry.navigation.latest.WithApiDefinitionId,
        FernRegistry.navigation.latest.WithRedirect {
    type: "apiPackage";
    children: FernRegistry.navigation.latest.ApiPackageChild[];
    /** Settings for the api playground that is applied only to descendants of this api package. */
    playground: FernRegistry.navigation.latest.PlaygroundSettings | undefined;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../index";

export interface ApiPackageNode
    extends FernRegistry.navigation.WithNodeMetadata,
        FernRegistry.navigation.WithOverviewPage,
        FernRegistry.navigation.WithApiDefinitionId,
        FernRegistry.navigation.WithRedirect {
    type: "apiPackage";
    children: FernRegistry.navigation.ApiPackageChild[];
    /** Settings for the api playground that is applied only to descendants of this api package. */
    playground: FernRegistry.navigation.PlaygroundSettings | undefined;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../index";

export interface UnversionedNode extends FernRegistry.navigation.WithNodeId {
    type: "unversioned";
    child: FernRegistry.navigation.VersionChild;
    landingPage?: FernRegistry.navigation.LandingPageNode;
}

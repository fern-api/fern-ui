/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../index";
export interface VersionNode extends FernRegistry.navigation.WithNodeMetadata, FernRegistry.navigation.WithRedirect {
    type: "version";
    default: boolean;
    versionId: FernRegistry.VersionId;
    child: FernRegistry.navigation.VersionChild;
    availability?: FernRegistry.navigation.Availability;
    landingPage?: FernRegistry.navigation.LandingPageNode;
}

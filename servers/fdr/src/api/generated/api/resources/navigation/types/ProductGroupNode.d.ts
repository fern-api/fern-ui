/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../..";
export interface ProductGroupNode extends FernRegistry.navigation.WithNodeId {
    type: "productgroup";
    landingPage?: FernRegistry.navigation.LandingPageNode;
    /** The individual products being documented */
    children: FernRegistry.navigation.ProductNode[];
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../..";
export declare type ApiNavigationConfigItemV2 = FernRegistry.docs.v1.write.ApiNavigationConfigItemV2.Section | FernRegistry.docs.v1.write.ApiNavigationConfigItemV2.Node | FernRegistry.docs.v1.write.ApiNavigationConfigItemV2.Page;
export declare namespace ApiNavigationConfigItemV2 {
    interface Section extends FernRegistry.docs.v1.write.ApiNavigationConfigSection {
        type: "section";
    }
    interface Node {
        type: "node";
        value: FernRegistry.docs.v1.write.ApiNavigationNodeLocator;
    }
    interface Page extends FernRegistry.docs.v1.write.PageMetadata {
        type: "page";
    }
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../index";

export interface TabNode extends FernRegistry.navigation.WithNodeMetadata, FernRegistry.navigation.WithRedirect {
    type: "tab";
    child: FernRegistry.navigation.SidebarRootNode;
}

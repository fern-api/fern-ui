/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernNavigation from "../index";

export interface TabNode extends FernNavigation.WithNodeMetadata, FernNavigation.WithRedirect {
    type: "tab";
    child: FernNavigation.SidebarRootNode;
}

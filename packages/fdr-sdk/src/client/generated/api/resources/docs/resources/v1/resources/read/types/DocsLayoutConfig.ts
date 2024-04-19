/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../..";

export interface DocsLayoutConfig {
    pageWidth?: FernRegistry.docs.v1.read.PageWidthSizeConfig;
    contentWidth?: FernRegistry.docs.v1.read.SizeConfig;
    sidebarWidth?: FernRegistry.docs.v1.read.SizeConfig;
    headerHeight?: FernRegistry.docs.v1.read.SizeConfig;
    searchbarPlacement?: FernRegistry.docs.v1.read.SidebarOrHeaderPlacement;
    tabsPlacement?: FernRegistry.docs.v1.read.SidebarOrHeaderPlacement;
    contentAlignment?: FernRegistry.docs.v1.read.ContentAlignment;
    headerPosition?: FernRegistry.docs.v1.read.HeaderPosition;
    disableHeader?: boolean;
}

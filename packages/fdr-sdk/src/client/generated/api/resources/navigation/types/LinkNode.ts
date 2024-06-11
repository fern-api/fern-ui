/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../index";

export interface LinkNode extends FernRegistry.navigation.WithNodeId {
    type: "link";
    title: string;
    icon?: string;
    url: FernRegistry.navigation.Url;
}

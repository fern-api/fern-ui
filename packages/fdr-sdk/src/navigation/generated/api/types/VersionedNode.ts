/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernNavigation from "../index";

export interface VersionedNode extends FernNavigation.WithNodeId {
    type: "versioned";
    children: FernNavigation.VersionNode[];
}

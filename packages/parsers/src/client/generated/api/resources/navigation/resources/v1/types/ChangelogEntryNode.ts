/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../index";

export interface ChangelogEntryNode
    extends FernRegistry.navigation.v1.WithNodeMetadata,
        FernRegistry.navigation.v1.WithPage {
    type: "changelogEntry";
    date: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../index";

export interface ChangelogYearNode extends FernRegistry.navigation.v1.WithNodeMetadata {
    type: "changelogYear";
    year: number;
    children: FernRegistry.navigation.v1.ChangelogMonthNode[];
}

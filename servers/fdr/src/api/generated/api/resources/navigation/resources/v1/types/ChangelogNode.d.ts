/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../index";
export interface ChangelogNode extends FernRegistry.navigation.v1.WithNodeMetadata, FernRegistry.navigation.v1.WithOverviewPage {
    type: "changelog";
    children: FernRegistry.navigation.v1.ChangelogYearNode[];
}

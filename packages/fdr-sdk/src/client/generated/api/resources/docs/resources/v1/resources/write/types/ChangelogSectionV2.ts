/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../..";

export interface ChangelogSectionV2 extends FernRegistry.docs.v1.write.NavigationNodeMetadata {
    title?: string;
    description?: string;
    pageId?: string;
    items: FernRegistry.docs.v1.write.ChangelogItem[];
}

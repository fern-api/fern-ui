/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../index";

export interface ChangelogSectionV2 extends FernRegistry.docs.v1.write.NavigationNodeMetadata {
    title: string | undefined;
    description: string | undefined;
    pageId: string | undefined;
    items: FernRegistry.docs.v1.write.ChangelogItem[];
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../index";

export type NavigationTabV2 =
    | FernRegistry.docs.v1.write.NavigationTabV2.Group
    | FernRegistry.docs.v1.write.NavigationTabV2.Link
    | FernRegistry.docs.v1.write.NavigationTabV2.Changelog;

export declare namespace NavigationTabV2 {
    interface Group extends FernRegistry.docs.v1.write.NavigationTabGroup {
        type: "group";
    }

    interface Link extends FernRegistry.docs.v1.write.NavigationTabLink {
        type: "link";
    }

    interface Changelog extends FernRegistry.docs.v1.write.ChangelogSectionV2 {
        type: "changelog";
    }
}

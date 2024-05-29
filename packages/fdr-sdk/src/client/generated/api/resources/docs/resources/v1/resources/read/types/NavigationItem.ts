/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../..";

export type NavigationItem =
    | FernRegistry.docs.v1.read.NavigationItem.Page
    | FernRegistry.docs.v1.read.NavigationItem.Api
    | FernRegistry.docs.v1.read.NavigationItem.Section
    | FernRegistry.docs.v1.read.NavigationItem.Link
    | FernRegistry.docs.v1.read.NavigationItem.Changelog;

export declare namespace NavigationItem {
    interface Page extends FernRegistry.docs.v1.read.PageMetadata {
        type: "page";
    }

    interface Api extends FernRegistry.docs.v1.read.ApiSection {
        type: "api";
    }

    interface Section extends FernRegistry.docs.v1.read.DocsSection {
        type: "section";
    }

    interface Link extends FernRegistry.docs.v1.read.LinkMetadata {
        type: "link";
    }

    interface Changelog extends FernRegistry.docs.v1.read.ChangelogSection {
        type: "changelog";
    }
}

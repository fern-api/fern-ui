/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../..";
export declare type NavigationItem = FernRegistry.docs.v1.db.NavigationItem.Page | FernRegistry.docs.v1.db.NavigationItem.Api | FernRegistry.docs.v1.db.NavigationItem.ApiV2 | FernRegistry.docs.v1.db.NavigationItem.Section | FernRegistry.docs.v1.db.NavigationItem.Link | FernRegistry.docs.v1.db.NavigationItem.Changelog | FernRegistry.docs.v1.db.NavigationItem.ChangelogV3;
export declare namespace NavigationItem {
    interface Page extends FernRegistry.docs.v1.read.PageMetadata {
        type: "page";
    }
    interface Api extends FernRegistry.docs.v1.db.ApiSection {
        type: "api";
    }
    interface ApiV2 extends FernRegistry.docs.v1.read.ApiSectionV2 {
        type: "apiV2";
    }
    interface Section extends FernRegistry.docs.v1.db.DocsSection {
        type: "section";
    }
    interface Link extends FernRegistry.docs.v1.read.LinkMetadata {
        type: "link";
    }
    interface Changelog extends FernRegistry.docs.v1.read.ChangelogSection {
        type: "changelog";
    }
    interface ChangelogV3 extends FernRegistry.docs.v1.read.ChangelogSectionV3 {
        type: "changelogV3";
    }
}

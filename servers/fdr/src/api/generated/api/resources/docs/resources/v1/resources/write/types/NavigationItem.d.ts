/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../..";
export declare type NavigationItem = FernRegistry.docs.v1.write.NavigationItem.Page | FernRegistry.docs.v1.write.NavigationItem.Api | FernRegistry.docs.v1.write.NavigationItem.Section | FernRegistry.docs.v1.write.NavigationItem.Link;
export declare namespace NavigationItem {
    interface Page extends FernRegistry.docs.v1.write.PageMetadata {
        type: "page";
    }
    interface Api extends FernRegistry.docs.v1.write.ApiSection {
        type: "api";
    }
    interface Section extends FernRegistry.docs.v1.write.DocsSection {
        type: "section";
    }
    interface Link extends FernRegistry.docs.v1.write.LinkMetadata {
        type: "link";
    }
}

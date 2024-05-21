/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../..";
export declare type FooterLink = FernRegistry.docs.v1.read.FooterLink.Github | FernRegistry.docs.v1.read.FooterLink.Twitter | FernRegistry.docs.v1.read.FooterLink.X | FernRegistry.docs.v1.read.FooterLink.Linkedin | FernRegistry.docs.v1.read.FooterLink.Youtube | FernRegistry.docs.v1.read.FooterLink.Instagram | FernRegistry.docs.v1.read.FooterLink.Facebook | FernRegistry.docs.v1.read.FooterLink.Discord | FernRegistry.docs.v1.read.FooterLink.Slack | FernRegistry.docs.v1.read.FooterLink.Hackernews | FernRegistry.docs.v1.read.FooterLink.Medium | FernRegistry.docs.v1.read.FooterLink.Website;
export declare namespace FooterLink {
    interface Github {
        type: "github";
        value: FernRegistry.docs.v1.commons.Url;
    }
    interface Twitter {
        type: "twitter";
        value: FernRegistry.docs.v1.commons.Url;
    }
    interface X {
        type: "x";
        value: FernRegistry.docs.v1.commons.Url;
    }
    interface Linkedin {
        type: "linkedin";
        value: FernRegistry.docs.v1.commons.Url;
    }
    interface Youtube {
        type: "youtube";
        value: FernRegistry.docs.v1.commons.Url;
    }
    interface Instagram {
        type: "instagram";
        value: FernRegistry.docs.v1.commons.Url;
    }
    interface Facebook {
        type: "facebook";
        value: FernRegistry.docs.v1.commons.Url;
    }
    interface Discord {
        type: "discord";
        value: FernRegistry.docs.v1.commons.Url;
    }
    interface Slack {
        type: "slack";
        value: FernRegistry.docs.v1.commons.Url;
    }
    interface Hackernews {
        type: "hackernews";
        value: FernRegistry.docs.v1.commons.Url;
    }
    interface Medium {
        type: "medium";
        value: FernRegistry.docs.v1.commons.Url;
    }
    interface Website {
        type: "website";
        value: FernRegistry.docs.v1.commons.Url;
    }
}

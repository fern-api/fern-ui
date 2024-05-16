/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../..";

export type FooterLink =
    | FernRegistry.docs.v1.write.FooterLink.Github
    | FernRegistry.docs.v1.write.FooterLink.Twitter
    | FernRegistry.docs.v1.write.FooterLink.X
    | FernRegistry.docs.v1.write.FooterLink.Linkedin
    | FernRegistry.docs.v1.write.FooterLink.Youtube
    | FernRegistry.docs.v1.write.FooterLink.Instagram
    | FernRegistry.docs.v1.write.FooterLink.Facebook
    | FernRegistry.docs.v1.write.FooterLink.Discord
    | FernRegistry.docs.v1.write.FooterLink.Slack
    | FernRegistry.docs.v1.write.FooterLink.Hackernews
    | FernRegistry.docs.v1.write.FooterLink.Medium
    | FernRegistry.docs.v1.write.FooterLink.Website;

export declare namespace FooterLink {
    interface Github {
        type: "github";
        value: FernRegistry.docs.v1.write.Url;
    }

    interface Twitter {
        type: "twitter";
        value: FernRegistry.docs.v1.write.Url;
    }

    interface X {
        type: "x";
        value: FernRegistry.docs.v1.write.Url;
    }

    interface Linkedin {
        type: "linkedin";
        value: FernRegistry.docs.v1.write.Url;
    }

    interface Youtube {
        type: "youtube";
        value: FernRegistry.docs.v1.write.Url;
    }

    interface Instagram {
        type: "instagram";
        value: FernRegistry.docs.v1.write.Url;
    }

    interface Facebook {
        type: "facebook";
        value: FernRegistry.docs.v1.write.Url;
    }

    interface Discord {
        type: "discord";
        value: FernRegistry.docs.v1.write.Url;
    }

    interface Slack {
        type: "slack";
        value: FernRegistry.docs.v1.write.Url;
    }

    interface Hackernews {
        type: "hackernews";
        value: FernRegistry.docs.v1.write.Url;
    }

    interface Medium {
        type: "medium";
        value: FernRegistry.docs.v1.write.Url;
    }

    interface Website {
        type: "website";
        value: FernRegistry.docs.v1.write.Url;
    }
}

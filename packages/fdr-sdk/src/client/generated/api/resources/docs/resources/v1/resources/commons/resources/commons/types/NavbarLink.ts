/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../..";

export type NavbarLink =
    | FernRegistry.docs.v1.commons.NavbarLink.Filled
    | FernRegistry.docs.v1.commons.NavbarLink.Outlined
    | FernRegistry.docs.v1.commons.NavbarLink.Minimal
    | FernRegistry.docs.v1.commons.NavbarLink.Github
    | FernRegistry.docs.v1.commons.NavbarLink.Primary
    | FernRegistry.docs.v1.commons.NavbarLink.Secondary;

export declare namespace NavbarLink {
    interface Filled extends FernRegistry.docs.v1.commons.NavbarLinkMetadata {
        type: "filled";
    }

    interface Outlined extends FernRegistry.docs.v1.commons.NavbarLinkMetadata {
        type: "outlined";
    }

    interface Minimal extends FernRegistry.docs.v1.commons.NavbarLinkMetadata {
        type: "minimal";
    }

    interface Github extends FernRegistry.docs.v1.commons.NavbarGithubMetadata {
        type: "github";
    }

    interface Primary extends FernRegistry.docs.v1.commons.NavbarLinkMetadata {
        type: "primary";
    }

    interface Secondary extends FernRegistry.docs.v1.commons.NavbarLinkMetadata {
        type: "secondary";
    }
}

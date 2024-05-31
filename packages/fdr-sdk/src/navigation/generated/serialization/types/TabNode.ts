/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as FernNavigation from "../../api/index";
import * as core from "../../core";
import { SidebarRootNode } from "./SidebarRootNode";
import { WithNodeMetadata } from "./WithNodeMetadata";

export const TabNode: core.serialization.ObjectSchema<serializers.TabNode.Raw, FernNavigation.TabNode> =
    core.serialization
        .objectWithoutOptionalProperties({
            type: core.serialization.stringLiteral("tab"),
            child: SidebarRootNode,
        })
        .extend(WithNodeMetadata);

export declare namespace TabNode {
    interface Raw extends WithNodeMetadata.Raw {
        type: "tab";
        child: SidebarRootNode.Raw;
    }
}

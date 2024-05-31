/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as FernNavigation from "../../api/index";
import * as core from "../../core";
import { TabNode } from "./TabNode";
import { LinkNode } from "./LinkNode";
import { ChangelogNode } from "./ChangelogNode";

export const TabChild: core.serialization.Schema<serializers.TabChild.Raw, FernNavigation.TabChild> =
    core.serialization.undiscriminatedUnion([TabNode, LinkNode, ChangelogNode]);

export declare namespace TabChild {
    type Raw = TabNode.Raw | LinkNode.Raw | ChangelogNode.Raw;
}

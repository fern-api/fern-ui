/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as FernNavigation from "../../api/index";
import * as core from "../../core";
import { EndpointNode } from "./EndpointNode";
import { EndpointPairNode } from "./EndpointPairNode";
import { WebSocketNode } from "./WebSocketNode";
import { WebhookNode } from "./WebhookNode";
import { PageNode } from "./PageNode";
import { LinkNode } from "./LinkNode";

export const ApiReferenceChild: core.serialization.Schema<
    serializers.ApiReferenceChild.Raw,
    FernNavigation.ApiReferenceChild
> = core.serialization.undiscriminatedUnion([
    EndpointNode,
    EndpointPairNode,
    WebSocketNode,
    WebhookNode,
    core.serialization.lazyObject(async () => (await import("..")).ApiSectionNode),
    PageNode,
    LinkNode,
]);

export declare namespace ApiReferenceChild {
    type Raw =
        | EndpointNode.Raw
        | EndpointPairNode.Raw
        | WebSocketNode.Raw
        | WebhookNode.Raw
        | serializers.ApiSectionNode.Raw
        | PageNode.Raw
        | LinkNode.Raw;
}

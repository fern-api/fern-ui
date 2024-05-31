/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as FernNavigation from "../../api/index";
import * as core from "../../core";
import { WebSocketId } from "../resources/apiReference/types/WebSocketId";
import { WithNodeMetadata } from "./WithNodeMetadata";
import { WithApiDefinitionId } from "./WithApiDefinitionId";

export const WebSocketNode: core.serialization.ObjectSchema<
    serializers.WebSocketNode.Raw,
    FernNavigation.WebSocketNode
> = core.serialization
    .objectWithoutOptionalProperties({
        type: core.serialization.stringLiteral("webSocket"),
        webSocketId: WebSocketId,
    })
    .extend(WithNodeMetadata)
    .extend(WithApiDefinitionId);

export declare namespace WebSocketNode {
    interface Raw extends WithNodeMetadata.Raw, WithApiDefinitionId.Raw {
        type: "webSocket";
        webSocketId: WebSocketId.Raw;
    }
}

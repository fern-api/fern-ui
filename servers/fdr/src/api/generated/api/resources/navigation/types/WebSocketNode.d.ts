/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../index";
export interface WebSocketNode extends FernRegistry.navigation.WithNodeMetadata, FernRegistry.navigation.WithApiDefinitionId {
    type: "webSocket";
    webSocketId: FernRegistry.WebSocketId;
    /** Settings for the api playground that affect this endpoint specifically. */
    playground?: FernRegistry.navigation.PlaygroundSettings;
}

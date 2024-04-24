/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../..";
export declare type ApiNavigationConfigItem = FernRegistry.api.v1.register.ApiNavigationConfigItem.Subpackage | FernRegistry.api.v1.register.ApiNavigationConfigItem.EndpointId | FernRegistry.api.v1.register.ApiNavigationConfigItem.WebsocketId | FernRegistry.api.v1.register.ApiNavigationConfigItem.WebhookId;
export declare namespace ApiNavigationConfigItem {
    interface Subpackage extends FernRegistry.api.v1.register.ApiNavigationConfigSubpackage {
        type: "subpackage";
    }
    interface EndpointId {
        type: "endpointId";
        value: FernRegistry.api.v1.register.EndpointId;
    }
    interface WebsocketId {
        type: "websocketId";
        value: FernRegistry.api.v1.register.WebSocketId;
    }
    interface WebhookId {
        type: "webhookId";
        value: FernRegistry.api.v1.register.WebhookId;
    }
}

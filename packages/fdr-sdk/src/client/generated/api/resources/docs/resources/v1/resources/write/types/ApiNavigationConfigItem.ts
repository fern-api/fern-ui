/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../..";

export type ApiNavigationConfigItem =
    | FernRegistry.docs.v1.write.ApiNavigationConfigItem.Subpackage
    | FernRegistry.docs.v1.write.ApiNavigationConfigItem.EndpointId
    | FernRegistry.docs.v1.write.ApiNavigationConfigItem.WebsocketId
    | FernRegistry.docs.v1.write.ApiNavigationConfigItem.WebhookId
    | FernRegistry.docs.v1.write.ApiNavigationConfigItem.Page;

export declare namespace ApiNavigationConfigItem {
    interface Subpackage extends FernRegistry.docs.v1.write.ApiNavigationConfigSubpackage {
        type: "subpackage";
    }

    interface EndpointId {
        type: "endpointId";
        value: FernRegistry.docs.v1.commons.EndpointId;
    }

    interface WebsocketId {
        type: "websocketId";
        value: FernRegistry.docs.v1.commons.WebSocketId;
    }

    interface WebhookId {
        type: "webhookId";
        value: FernRegistry.docs.v1.commons.WebhookId;
    }

    interface Page extends FernRegistry.docs.v1.write.PageMetadata {
        type: "page";
    }
}

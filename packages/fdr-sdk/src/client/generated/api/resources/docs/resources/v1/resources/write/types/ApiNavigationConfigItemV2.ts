/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../..";

export type ApiNavigationConfigItemV2 =
    | FernRegistry.docs.v1.write.ApiNavigationConfigItemV2.Subpackage
    | FernRegistry.docs.v1.write.ApiNavigationConfigItemV2.Endpoint
    | FernRegistry.docs.v1.write.ApiNavigationConfigItemV2.Websocket
    | FernRegistry.docs.v1.write.ApiNavigationConfigItemV2.Webhook
    | FernRegistry.docs.v1.write.ApiNavigationConfigItemV2.Page;

export declare namespace ApiNavigationConfigItemV2 {
    interface Subpackage extends FernRegistry.docs.v1.write.ApiNavigationConfigSubpackageV2 {
        type: "subpackage";
    }

    interface Endpoint extends FernRegistry.docs.v1.commons.EndpointLocator {
        type: "endpoint";
    }

    interface Websocket extends FernRegistry.docs.v1.commons.WebSocketLocator {
        type: "websocket";
    }

    interface Webhook extends FernRegistry.docs.v1.commons.WebhookLocator {
        type: "webhook";
    }

    interface Page extends FernRegistry.docs.v1.write.PageMetadata {
        type: "page";
    }
}

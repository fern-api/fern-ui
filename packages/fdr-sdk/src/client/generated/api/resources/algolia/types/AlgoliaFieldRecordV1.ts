/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../index";

export type AlgoliaFieldRecordV1 =
    | FernRegistry.AlgoliaFieldRecordV1.EndpointFieldV1
    | FernRegistry.AlgoliaFieldRecordV1.WebsocketFieldV1
    | FernRegistry.AlgoliaFieldRecordV1.WebhookFieldV1;

export declare namespace AlgoliaFieldRecordV1 {
    interface EndpointFieldV1 extends FernRegistry.AlgoliaEndpointFieldRecordV1 {
        type: "endpoint-field-v1";
    }

    interface WebsocketFieldV1 extends FernRegistry.AlgoliaWebSocketFieldRecordV1 {
        type: "websocket-field-v1";
    }

    interface WebhookFieldV1 extends FernRegistry.AlgoliaWebhookFieldRecordV1 {
        type: "webhook-field-v1";
    }
}

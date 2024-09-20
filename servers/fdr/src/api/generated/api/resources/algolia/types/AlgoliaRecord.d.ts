/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../index";
export declare type AlgoliaRecord = FernRegistry.AlgoliaRecord.PageV4 | FernRegistry.AlgoliaRecord.EndpointV4 | FernRegistry.AlgoliaRecord.WebsocketV4 | FernRegistry.AlgoliaRecord.WebhookV4 | FernRegistry.AlgoliaRecord.PageV3 | FernRegistry.AlgoliaRecord.EndpointV3 | FernRegistry.AlgoliaRecord.WebsocketV3 | FernRegistry.AlgoliaRecord.WebhookV3 | FernRegistry.AlgoliaRecord.MarkdownSectionV1 | FernRegistry.AlgoliaRecord.FieldV1 | FernRegistry.AlgoliaRecord.Endpoint | FernRegistry.AlgoliaRecord.Page | FernRegistry.AlgoliaRecord.EndpointV2 | FernRegistry.AlgoliaRecord.PageV2;
export declare namespace AlgoliaRecord {
    interface PageV4 extends FernRegistry.AlgoliaPageRecordV4 {
        type: "page-v4";
    }
    interface EndpointV4 extends FernRegistry.AlgoliaEndpointRecordV4 {
        type: "endpoint-v4";
    }
    interface WebsocketV4 extends FernRegistry.AlgoliaWebSocketRecordV4 {
        type: "websocket-v4";
    }
    interface WebhookV4 extends FernRegistry.AlgoliaWebhookRecordV4 {
        type: "webhook-v4";
    }
    interface PageV3 extends FernRegistry.AlgoliaPageRecordV3 {
        type: "page-v3";
    }
    interface EndpointV3 extends FernRegistry.AlgoliaEndpointRecordV3 {
        type: "endpoint-v3";
    }
    interface WebsocketV3 extends FernRegistry.AlgoliaWebSocketRecordV3 {
        type: "websocket-v3";
    }
    interface WebhookV3 extends FernRegistry.AlgoliaWebhookRecordV3 {
        type: "webhook-v3";
    }
    interface MarkdownSectionV1 extends FernRegistry.AlgoliaMarkdownSectionRecordV1 {
        type: "markdown-section-v1";
    }
    interface FieldV1 extends FernRegistry.AlgoliaFieldRecordV1 {
        type: "field-v1";
    }
    interface Endpoint extends FernRegistry.AlgoliaEndpointRecord {
        type: "endpoint";
    }
    interface Page extends FernRegistry.AlgoliaPageRecord {
        type: "page";
    }
    interface EndpointV2 extends FernRegistry.AlgoliaEndpointRecordV2 {
        type: "endpoint-v2";
    }
    interface PageV2 extends FernRegistry.AlgoliaPageRecordV2 {
        type: "page-v2";
    }
}

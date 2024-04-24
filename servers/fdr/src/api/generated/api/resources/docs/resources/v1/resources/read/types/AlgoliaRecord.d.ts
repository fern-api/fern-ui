/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../..";
export declare type AlgoliaRecord = FernRegistry.docs.v1.read.AlgoliaRecord.Endpoint | FernRegistry.docs.v1.read.AlgoliaRecord.Page | FernRegistry.docs.v1.read.AlgoliaRecord.EndpointV2 | FernRegistry.docs.v1.read.AlgoliaRecord.PageV2;
export declare namespace AlgoliaRecord {
    interface Endpoint extends FernRegistry.docs.v1.read.AlgoliaEndpointRecord {
        type: "endpoint";
    }
    interface Page extends FernRegistry.docs.v1.read.AlgoliaPageRecord {
        type: "page";
    }
    interface EndpointV2 extends FernRegistry.docs.v1.read.AlgoliaEndpointRecordV2 {
        type: "endpoint-v2";
    }
    interface PageV2 extends FernRegistry.docs.v1.read.AlgoliaPageRecordV2 {
        type: "page-v2";
    }
}

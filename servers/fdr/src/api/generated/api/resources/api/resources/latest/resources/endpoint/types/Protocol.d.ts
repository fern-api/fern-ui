/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../index";
export declare type Protocol = FernRegistry.api.latest.Protocol.Rest | FernRegistry.api.latest.Protocol.Openrpc;
export declare namespace Protocol {
    interface Rest extends FernRegistry.api.latest.RestProtocol {
        type: "rest";
    }
    interface Openrpc extends FernRegistry.api.latest.OpenRpcProtocol {
        type: "openrpc";
    }
}

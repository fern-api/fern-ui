/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../index";
export declare type Source = FernRegistry.api.v1.register.Source.Openapi | FernRegistry.api.v1.register.Source.Asyncapi | FernRegistry.api.v1.register.Source.Proto;
export declare namespace Source {
    interface Openapi {
        type: "openapi";
    }
    interface Asyncapi {
        type: "asyncapi";
    }
    interface Proto {
        type: "proto";
    }
}

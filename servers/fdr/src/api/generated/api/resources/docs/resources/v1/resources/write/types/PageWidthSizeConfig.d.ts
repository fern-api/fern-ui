/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../..";
export declare type PageWidthSizeConfig = FernRegistry.docs.v1.write.PageWidthSizeConfig.Px | FernRegistry.docs.v1.write.PageWidthSizeConfig.Rem | FernRegistry.docs.v1.write.PageWidthSizeConfig.Full;
export declare namespace PageWidthSizeConfig {
    interface Px {
        type: "px";
        value: number;
    }
    interface Rem {
        type: "rem";
        value: number;
    }
    interface Full {
        type: "full";
    }
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../index";

export type Background = FernRegistry.docs.v1.read.Background.Solid | FernRegistry.docs.v1.read.Background.Gradient;

export declare namespace Background {
    interface Solid extends FernRegistry.RgbaColor {
        type: "solid";
    }

    interface Gradient {
        type: "gradient";
    }
}

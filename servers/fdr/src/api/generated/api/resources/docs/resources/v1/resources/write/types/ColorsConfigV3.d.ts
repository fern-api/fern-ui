/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../..";
export declare type ColorsConfigV3 = FernRegistry.docs.v1.write.ColorsConfigV3.Dark | FernRegistry.docs.v1.write.ColorsConfigV3.Light | FernRegistry.docs.v1.write.ColorsConfigV3.DarkAndLight;
export declare namespace ColorsConfigV3 {
    interface Dark extends FernRegistry.docs.v1.write.ThemeConfig {
        type: "dark";
    }
    interface Light extends FernRegistry.docs.v1.write.ThemeConfig {
        type: "light";
    }
    interface DarkAndLight extends FernRegistry.docs.v1.write.DarkAndLightModeConfig {
        type: "darkAndLight";
    }
}

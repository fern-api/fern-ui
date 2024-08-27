/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../index";

/**
 * Identifier for an API environment (i.e. "Prod", "Staging", "Dev")
 */
export type EnvironmentId = string & {
    navigation_EnvironmentId: void;
};

export function EnvironmentId(value: string): FernRegistry.navigation.EnvironmentId {
    return value as unknown as FernRegistry.navigation.EnvironmentId;
}

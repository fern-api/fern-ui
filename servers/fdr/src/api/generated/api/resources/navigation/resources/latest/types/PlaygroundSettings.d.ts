/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../index";
export interface PlaygroundSettings {
    /**
     * A list of environment IDs that are allowed to be used in the playground.
     * If not provided, all environments are allowed. And if the provided list is empty, the playground should be disabled.
     */
    environments: FernRegistry.EnvironmentId[] | undefined;
    button: FernRegistry.navigation.latest.PlaygroundButtonSettings | undefined;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../index";
export interface BaseCliRelease {
    /** The major version of the IR that this CLI exposes. */
    irVersion: number;
    /** Tags to categorize the CLI release. */
    tags?: FernRegistry.generators.CliReleaseTag[];
}

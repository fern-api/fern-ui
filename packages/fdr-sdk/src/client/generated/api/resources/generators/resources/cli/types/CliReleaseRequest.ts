/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../index";

export interface CliReleaseRequest extends FernRegistry.generators.ReleaseRequest {
    /** The major version of the IR that this CLI exposes. */
    irVersion: number;
}

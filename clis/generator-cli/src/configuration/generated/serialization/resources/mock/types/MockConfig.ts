/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as FernGeneratorCli from "../../../../api/index";
import * as core from "../../../../core";

export const MockConfig: core.serialization.ObjectSchema<serializers.MockConfig.Raw, FernGeneratorCli.MockConfig> =
    core.serialization.object({
        organization: core.serialization.string(),
        cliVersion: core.serialization.string(),
        definitionUrl: core.serialization.string(),
    });

export declare namespace MockConfig {
    interface Raw {
        organization: string;
        cliVersion: string;
        definitionUrl: string;
    }
}

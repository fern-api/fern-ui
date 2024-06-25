/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as FernGeneratorCli from "../../../../api/index";
import * as core from "../../../../core";
import { TopLevelSnippet } from "./TopLevelSnippet";
import { ParameterReference } from "./ParameterReference";

export const EndpointReference: core.serialization.ObjectSchema<
    serializers.EndpointReference.Raw,
    FernGeneratorCli.EndpointReference
> = core.serialization.object({
    topLevelSnippet: TopLevelSnippet,
    description: core.serialization.string().optional(),
    usageSnippet: core.serialization.string(),
    parameters: core.serialization.list(ParameterReference),
});

export declare namespace EndpointReference {
    interface Raw {
        topLevelSnippet: TopLevelSnippet.Raw;
        description?: string | null;
        usageSnippet: string;
        parameters: ParameterReference.Raw[];
    }
}

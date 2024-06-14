/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as FernGeneratorCli from "../../../../api/index";
import * as core from "../../../../core";

export const GithubRemote: core.serialization.ObjectSchema<
    serializers.GithubRemote.Raw,
    FernGeneratorCli.GithubRemote
> = core.serialization.object({
    repoUrl: core.serialization.string(),
    installationToken: core.serialization.string(),
});

export declare namespace GithubRemote {
    interface Raw {
        repoUrl: string;
        installationToken: string;
    }
}

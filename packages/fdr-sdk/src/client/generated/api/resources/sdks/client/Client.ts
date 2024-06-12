/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../environments";
import * as core from "../../../../core";
import { Versions } from "../resources/versions/client/Client";

export declare namespace Sdks {
    interface Options {
        environment?: core.Supplier<environments.FernRegistryEnvironment | string>;
        token?: core.Supplier<core.BearerToken | undefined>;
    }

    interface RequestOptions {
        timeoutInSeconds?: number;
        maxRetries?: number;
        abortSignal?: AbortSignal;
    }
}

export class Sdks {
    constructor(protected readonly _options: Sdks.Options = {}) {}

    protected _versions: Versions | undefined;

    public get versions(): Versions {
        return (this._versions ??= new Versions(this._options));
    }
}

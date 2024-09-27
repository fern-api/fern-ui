/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../../../environments";
import * as core from "../../../../../../core";
import { Read } from "../resources/read/client/Client";
import { Write } from "../resources/write/client/Client";

export declare namespace V1 {
    interface Options {
        environment?: core.Supplier<environments.FernRegistryEnvironment | string>;
        token?: core.Supplier<core.BearerToken | undefined>;
    }

    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
    }
}

export class V1 {
    constructor(protected readonly _options: V1.Options = {}) {}

    protected _read: Read | undefined;

    public get read(): Read {
        return (this._read ??= new Read(this._options));
    }

    protected _write: Write | undefined;

    public get write(): Write {
        return (this._write ??= new Write(this._options));
    }
}

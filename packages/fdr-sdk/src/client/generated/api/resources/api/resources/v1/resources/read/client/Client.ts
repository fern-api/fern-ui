/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../../../../../environments";
import * as core from "../../../../../../../../core";
import * as FernRegistry from "../../../../../../../index";
import urlJoin from "url-join";

export declare namespace Read {
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
        /** Additional headers to include in the request. */
        headers?: Record<string, string>;
    }
}

export class Read {
    constructor(protected readonly _options: Read.Options = {}) {}

    /**
     * @param {FernRegistry.ApiDefinitionId} apiDefinitionId
     * @param {Read.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.api.v1.read.getApi(FernRegistry.ApiDefinitionId("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32"))
     */
    public async getApi(
        apiDefinitionId: FernRegistry.ApiDefinitionId,
        requestOptions?: Read.RequestOptions
    ): Promise<core.APIResponse<FernRegistry.api.v1.read.ApiDefinition, FernRegistry.api.v1.read.getApi.Error>> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.FernRegistryEnvironment.Prod,
                `/registry/api/load/${encodeURIComponent(apiDefinitionId)}`
            ),
            method: "GET",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            requestType: "json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : undefined,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return {
                ok: true,
                body: _response.body as FernRegistry.api.v1.read.ApiDefinition,
            };
        }

        if (_response.error.reason === "status-code") {
            switch ((_response.error.body as FernRegistry.api.v1.read.getApi.Error)?.error) {
                case "ApiDoesNotExistError":
                    return {
                        ok: false,
                        error: _response.error.body as FernRegistry.api.v1.read.getApi.Error,
                    };
            }
        }

        return {
            ok: false,
            error: FernRegistry.api.v1.read.getApi.Error._unknown(_response.error),
        };
    }

    protected async _getAuthorizationHeader(): Promise<string | undefined> {
        const bearer = await core.Supplier.get(this._options.token);
        if (bearer != null) {
            return `Bearer ${bearer}`;
        }

        return undefined;
    }
}

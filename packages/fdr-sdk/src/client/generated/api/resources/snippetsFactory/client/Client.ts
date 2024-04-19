/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../environments";
import * as core from "../../../../core";
import * as FernRegistry from "../../..";
import urlJoin from "url-join";

export declare namespace SnippetsFactory {
    interface Options {
        environment?: core.Supplier<environments.FernRegistryEnvironment | string>;
        token?: core.Supplier<core.BearerToken | undefined>;
    }

    interface RequestOptions {
        timeoutInSeconds?: number;
        maxRetries?: number;
    }
}

export class SnippetsFactory {
    constructor(protected readonly _options: SnippetsFactory.Options = {}) {}

    /**
     * Store endpoint snippets for a particular SDK.
     */
    public async createSnippetsForSdk(
        request: FernRegistry.CreateSnippetRequest,
        requestOptions?: SnippetsFactory.RequestOptions
    ): Promise<core.APIResponse<void, FernRegistry.snippetsFactory.createSnippetsForSdk.Error>> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.FernRegistryEnvironment.Dev,
                "/snippets/create"
            ),
            method: "POST",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            body: request,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : undefined,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return {
                ok: true,
                body: undefined,
            };
        }

        if (_response.error.reason === "status-code") {
            switch ((_response.error.body as FernRegistry.snippetsFactory.createSnippetsForSdk.Error)?.error) {
                case "UnauthorizedError":
                case "UserNotInOrgError":
                case "OrgIdNotFound":
                case "SDKNotFound":
                    return {
                        ok: false,
                        error: _response.error.body as FernRegistry.snippetsFactory.createSnippetsForSdk.Error,
                    };
            }
        }

        return {
            ok: false,
            error: FernRegistry.snippetsFactory.createSnippetsForSdk.Error._unknown(_response.error),
        };
    }

    protected async _getAuthorizationHeader() {
        const bearer = await core.Supplier.get(this._options.token);
        if (bearer != null) {
            return `Bearer ${bearer}`;
        }

        return undefined;
    }
}

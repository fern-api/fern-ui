/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../environments";
import * as core from "../../../../core";
import * as FernRegistry from "../../../index";
import urlJoin from "url-join";

export declare namespace Snippets {
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

export class Snippets {
    constructor(protected readonly _options: Snippets.Options = {}) {}

    /**
     * Get snippet by endpoint method and path
     *
     * @param {FernRegistry.GetSnippetRequest} request
     * @param {Snippets.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await fernRegistry.snippets.get({
     *         endpoint: {
     *             method: FernRegistry.HttpMethod.Get,
     *             path: FernRegistry.EndpointPath("/v1/search")
     *         }
     *     })
     */
    public async get(
        request: FernRegistry.GetSnippetRequest,
        requestOptions?: Snippets.RequestOptions
    ): Promise<core.APIResponse<FernRegistry.Snippet[], FernRegistry.snippets.get.Error>> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.FernRegistryEnvironment.Prod,
                "/snippets"
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
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return {
                ok: true,
                body: _response.body as FernRegistry.Snippet[],
            };
        }

        if (_response.error.reason === "status-code") {
            switch ((_response.error.body as FernRegistry.snippets.get.Error)?.error) {
                case "UnauthorizedError":
                case "UserNotInOrgError":
                case "UnavailableError":
                case "ApiIdRequiredError":
                case "OrgIdRequiredError":
                case "OrgIdAndApiIdNotFound":
                case "OrgIdNotFound":
                case "EndpointNotFound":
                case "SDKNotFound":
                    return {
                        ok: false,
                        error: _response.error.body as FernRegistry.snippets.get.Error,
                    };
            }
        }

        return {
            ok: false,
            error: FernRegistry.snippets.get.Error._unknown(_response.error),
        };
    }

    /**
     * @param {FernRegistry.ListSnippetsRequest} request
     * @param {Snippets.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await fernRegistry.snippets.load({
     *         page: 1,
     *         orgId: FernRegistry.OrgId("vellum"),
     *         apiId: FernRegistry.ApiId("vellum-ai"),
     *         sdks: [{
     *                 type: "python",
     *                 package: "vellum-ai"
     *             }]
     *     })
     */
    public async load(
        request: FernRegistry.ListSnippetsRequest = {},
        requestOptions?: Snippets.RequestOptions
    ): Promise<core.APIResponse<FernRegistry.SnippetsPage, FernRegistry.snippets.load.Error>> {
        const { page, ..._body } = request;
        const _queryParams: Record<string, string | string[] | object | object[]> = {};
        if (page != null) {
            _queryParams["page"] = page.toString();
        }

        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.FernRegistryEnvironment.Prod,
                "/snippets/load"
            ),
            method: "POST",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            queryParameters: _queryParams,
            body: _body,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : undefined,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return {
                ok: true,
                body: _response.body as FernRegistry.SnippetsPage,
            };
        }

        if (_response.error.reason === "status-code") {
            switch ((_response.error.body as FernRegistry.snippets.load.Error)?.error) {
                case "UnauthorizedError":
                case "UserNotInOrgError":
                case "UnavailableError":
                case "InvalidPageError":
                case "ApiIdRequiredError":
                case "OrgIdRequiredError":
                case "OrgIdAndApiIdNotFound":
                case "OrgIdNotFound":
                case "SDKNotFound":
                    return {
                        ok: false,
                        error: _response.error.body as FernRegistry.snippets.load.Error,
                    };
            }
        }

        return {
            ok: false,
            error: FernRegistry.snippets.load.Error._unknown(_response.error),
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

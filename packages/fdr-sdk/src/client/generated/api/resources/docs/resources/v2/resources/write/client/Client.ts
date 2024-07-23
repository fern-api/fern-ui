/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../../../../../environments";
import * as core from "../../../../../../../../core";
import * as FernRegistry from "../../../../../../../index";
import urlJoin from "url-join";

export declare namespace Write {
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

export class Write {
    constructor(protected readonly _options: Write.Options = {}) {}

    /**
     * @param {FernRegistry.docs.v2.write.StartDocsRegisterRequestV2} request
     * @param {Write.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await fernRegistry.docs.v2.write.startDocsRegister({
     *         domain: "string",
     *         customDomains: ["string"],
     *         authConfig: {
     *             type: "public"
     *         },
     *         orgId: "string",
     *         apiId: "string",
     *         filepaths: ["string"],
     *         images: [{
     *                 filePath: "string",
     *                 width: 1.1,
     *                 height: 1.1,
     *                 blurDataUrl: "string",
     *                 alt: "string"
     *             }]
     *     })
     */
    public async startDocsRegister(
        request: FernRegistry.docs.v2.write.StartDocsRegisterRequestV2,
        requestOptions?: Write.RequestOptions
    ): Promise<
        core.APIResponse<
            FernRegistry.docs.v1.write.StartDocsRegisterResponse,
            FernRegistry.docs.v2.write.startDocsRegister.Error
        >
    > {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.FernRegistryEnvironment.Prod,
                "/v2/registry/docs/v2/init"
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
                body: _response.body as FernRegistry.docs.v1.write.StartDocsRegisterResponse,
            };
        }

        if (_response.error.reason === "status-code") {
            switch ((_response.error.body as FernRegistry.docs.v2.write.startDocsRegister.Error)?.error) {
                case "InvalidDomainError":
                case "InvalidCustomDomainError":
                case "FernTokenForbiddenError":
                case "DomainBelongsToAnotherOrgError":
                    return {
                        ok: false,
                        error: _response.error.body as FernRegistry.docs.v2.write.startDocsRegister.Error,
                    };
            }
        }

        return {
            ok: false,
            error: FernRegistry.docs.v2.write.startDocsRegister.Error._unknown(_response.error),
        };
    }

    /**
     * @param {FernRegistry.docs.v2.write.StartDocsPreviewRegisterRequestV2} request
     * @param {Write.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await fernRegistry.docs.v2.write.startDocsPreviewRegister({
     *         basePath: "string",
     *         orgId: "string",
     *         authConfig: {
     *             type: "public"
     *         },
     *         filepaths: ["string"],
     *         images: [{
     *                 filePath: "string",
     *                 width: 1.1,
     *                 height: 1.1,
     *                 blurDataUrl: "string",
     *                 alt: "string"
     *             }]
     *     })
     */
    public async startDocsPreviewRegister(
        request: FernRegistry.docs.v2.write.StartDocsPreviewRegisterRequestV2,
        requestOptions?: Write.RequestOptions
    ): Promise<
        core.APIResponse<
            FernRegistry.docs.v2.write.StartDocsPreviewRegisterResponse,
            FernRegistry.docs.v2.write.startDocsPreviewRegister.Error
        >
    > {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.FernRegistryEnvironment.Prod,
                "/v2/registry/docs/preview/init"
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
                body: _response.body as FernRegistry.docs.v2.write.StartDocsPreviewRegisterResponse,
            };
        }

        if (_response.error.reason === "status-code") {
            switch ((_response.error.body as FernRegistry.docs.v2.write.startDocsPreviewRegister.Error)?.error) {
                case "InvalidDomainError":
                case "FernTokenForbiddenError":
                    return {
                        ok: false,
                        error: _response.error.body as FernRegistry.docs.v2.write.startDocsPreviewRegister.Error,
                    };
            }
        }

        return {
            ok: false,
            error: FernRegistry.docs.v2.write.startDocsPreviewRegister.Error._unknown(_response.error),
        };
    }

    /**
     * @param {FernRegistry.docs.v1.write.DocsRegistrationId} docsRegistrationId
     * @param {FernRegistry.docs.v2.write.RegisterDocsRequest} request
     * @param {Write.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await fernRegistry.docs.v2.write.finishDocsRegister("string", {
     *         docsDefinition: {
     *             pages: {
     *                 "string": {}
     *             },
     *             config: {},
     *             jsFiles: {
     *                 "string": "string"
     *             }
     *         }
     *     })
     */
    public async finishDocsRegister(
        docsRegistrationId: FernRegistry.docs.v1.write.DocsRegistrationId,
        request: FernRegistry.docs.v2.write.RegisterDocsRequest,
        requestOptions?: Write.RequestOptions
    ): Promise<core.APIResponse<void, FernRegistry.docs.v2.write.finishDocsRegister.Error>> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.FernRegistryEnvironment.Prod,
                `/v2/registry/docs/register/${encodeURIComponent(docsRegistrationId)}`
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
                body: undefined,
            };
        }

        if (_response.error.reason === "status-code") {
            switch ((_response.error.body as FernRegistry.docs.v2.write.finishDocsRegister.Error)?.error) {
                case "UnauthorizedError":
                case "UserNotInOrgError":
                case "DocsRegistrationIdNotFound":
                    return {
                        ok: false,
                        error: _response.error.body as FernRegistry.docs.v2.write.finishDocsRegister.Error,
                    };
            }
        }

        return {
            ok: false,
            error: FernRegistry.docs.v2.write.finishDocsRegister.Error._unknown(_response.error),
        };
    }

    /**
     * @param {FernRegistry.docs.v2.write.ReindexAlgoliaRecordsRequest} request
     * @param {Write.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await fernRegistry.docs.v2.write.reindexAlgoliaSearchRecords({
     *         url: "string"
     *     })
     */
    public async reindexAlgoliaSearchRecords(
        request: FernRegistry.docs.v2.write.ReindexAlgoliaRecordsRequest,
        requestOptions?: Write.RequestOptions
    ): Promise<core.APIResponse<void, FernRegistry.docs.v2.write.reindexAlgoliaSearchRecords.Error>> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.FernRegistryEnvironment.Prod,
                "/v2/registry/docs/algolia/reindex"
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
                body: undefined,
            };
        }

        if (_response.error.reason === "status-code") {
            switch ((_response.error.body as FernRegistry.docs.v2.write.reindexAlgoliaSearchRecords.Error)?.error) {
                case "DocsNotFoundError":
                case "ReindexNotAllowedError":
                    return {
                        ok: false,
                        error: _response.error.body as FernRegistry.docs.v2.write.reindexAlgoliaSearchRecords.Error,
                    };
            }
        }

        return {
            ok: false,
            error: FernRegistry.docs.v2.write.reindexAlgoliaSearchRecords.Error._unknown(_response.error),
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

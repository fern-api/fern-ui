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
     * @param {FernRegistry.docs.v1.write.StartDocsRegisterRequest} request
     * @param {Write.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await fernRegistry.docs.v1.write.startDocsRegister({
     *         domain: "string",
     *         orgId: "string",
     *         filepaths: ["string"]
     *     })
     */
    public async startDocsRegister(
        request: FernRegistry.docs.v1.write.StartDocsRegisterRequest,
        requestOptions?: Write.RequestOptions
    ): Promise<
        core.APIResponse<
            FernRegistry.docs.v1.write.StartDocsRegisterResponse,
            FernRegistry.docs.v1.write.startDocsRegister.Error
        >
    > {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.FernRegistryEnvironment.Prod,
                "/registry/docs/init"
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

        return {
            ok: false,
            error: FernRegistry.docs.v1.write.startDocsRegister.Error._unknown(_response.error),
        };
    }

    /**
     * @param {FernRegistry.docs.v1.write.DocsRegistrationId} docsRegistrationId
     * @param {FernRegistry.docs.v1.write.RegisterDocsRequest} request
     * @param {Write.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await fernRegistry.docs.v1.write.finishDocsRegister("string", {
     *         docsDefinition: {
     *             pages: {
     *                 "string": {}
     *             },
     *             config: {}
     *         }
     *     })
     */
    public async finishDocsRegister(
        docsRegistrationId: FernRegistry.docs.v1.write.DocsRegistrationId,
        request: FernRegistry.docs.v1.write.RegisterDocsRequest,
        requestOptions?: Write.RequestOptions
    ): Promise<core.APIResponse<void, FernRegistry.docs.v1.write.finishDocsRegister.Error>> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.FernRegistryEnvironment.Prod,
                `/registry/docs/register/${encodeURIComponent(docsRegistrationId)}`
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
            switch ((_response.error.body as FernRegistry.docs.v1.write.finishDocsRegister.Error)?.error) {
                case "UnauthorizedError":
                case "UserNotInOrgError":
                case "DocsRegistrationIdNotFound":
                    return {
                        ok: false,
                        error: _response.error.body as FernRegistry.docs.v1.write.finishDocsRegister.Error,
                    };
            }
        }

        return {
            ok: false,
            error: FernRegistry.docs.v1.write.finishDocsRegister.Error._unknown(_response.error),
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

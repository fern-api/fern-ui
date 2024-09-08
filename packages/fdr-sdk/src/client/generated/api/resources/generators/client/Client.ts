/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../environments";
import * as core from "../../../../core";
import * as FernRegistry from "../../../index";
import urlJoin from "url-join";
import { Cli } from "../resources/cli/client/Client";
import { Versions } from "../resources/versions/client/Client";

export declare namespace Generators {
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

/**
 * CRUD API for managing the generator entity itself.
 */
export class Generators {
    constructor(protected readonly _options: Generators.Options = {}) {}

    /**
     * Update or create the specified generator.
     *
     * @param {FernRegistry.generators.Generator} request
     * @param {Generators.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await fernRegistry.generators.upsertGenerator({
     *         id: "string",
     *         generatorType: {
     *             type: "sdk"
     *         },
     *         generatorLanguage: FernRegistry.generators.GeneratorLanguage.Python,
     *         dockerImage: "string"
     *     })
     */
    public async upsertGenerator(
        request: FernRegistry.generators.Generator,
        requestOptions?: Generators.RequestOptions
    ): Promise<core.APIResponse<void, FernRegistry.generators.upsertGenerator.Error>> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.FernRegistryEnvironment.Prod,
                "/generators"
            ),
            method: "PUT",
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

        return {
            ok: false,
            error: FernRegistry.generators.upsertGenerator.Error._unknown(_response.error),
        };
    }

    /**
     * Get the generator corresponding to the given docker image.
     *
     * @param {FernRegistry.generators.GetGeneratorByImageRequest} request
     * @param {Generators.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await fernRegistry.generators.getGeneratorByImage({
     *         dockerImage: "string"
     *     })
     */
    public async getGeneratorByImage(
        request: FernRegistry.generators.GetGeneratorByImageRequest,
        requestOptions?: Generators.RequestOptions
    ): Promise<
        core.APIResponse<
            FernRegistry.generators.Generator | undefined,
            FernRegistry.generators.getGeneratorByImage.Error
        >
    > {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.FernRegistryEnvironment.Prod,
                "/generators/by-image"
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
                body: _response.body as FernRegistry.generators.Generator | undefined,
            };
        }

        return {
            ok: false,
            error: FernRegistry.generators.getGeneratorByImage.Error._unknown(_response.error),
        };
    }

    /**
     * Get the specified generator.
     *
     * @param {FernRegistry.generators.GeneratorId} generatorId
     * @param {Generators.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await fernRegistry.generators.getGenerator("string")
     */
    public async getGenerator(
        generatorId: FernRegistry.generators.GeneratorId,
        requestOptions?: Generators.RequestOptions
    ): Promise<
        core.APIResponse<FernRegistry.generators.Generator | undefined, FernRegistry.generators.getGenerator.Error>
    > {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.FernRegistryEnvironment.Prod,
                `/generators/${encodeURIComponent(generatorId)}`
            ),
            method: "GET",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : undefined,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return {
                ok: true,
                body: _response.body as FernRegistry.generators.Generator | undefined,
            };
        }

        return {
            ok: false,
            error: FernRegistry.generators.getGenerator.Error._unknown(_response.error),
        };
    }

    /**
     * Get the all generators. This is currently not paginated since the list will be short, but there may in the future be need for pagination.
     *
     * @param {Generators.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await fernRegistry.generators.listGenerators()
     */
    public async listGenerators(
        requestOptions?: Generators.RequestOptions
    ): Promise<core.APIResponse<FernRegistry.generators.Generator[], FernRegistry.generators.listGenerators.Error>> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.FernRegistryEnvironment.Prod,
                "/generators"
            ),
            method: "GET",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : undefined,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return {
                ok: true,
                body: _response.body as FernRegistry.generators.Generator[],
            };
        }

        return {
            ok: false,
            error: FernRegistry.generators.listGenerators.Error._unknown(_response.error),
        };
    }

    protected _cli: Cli | undefined;

    public get cli(): Cli {
        return (this._cli ??= new Cli(this._options));
    }

    protected _versions: Versions | undefined;

    public get versions(): Versions {
        return (this._versions ??= new Versions(this._options));
    }

    protected async _getAuthorizationHeader(): Promise<string | undefined> {
        const bearer = await core.Supplier.get(this._options.token);
        if (bearer != null) {
            return `Bearer ${bearer}`;
        }

        return undefined;
    }
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../../../environments";
import * as core from "../../../../../../core";
import * as FernRegistry from "../../../../../index";
import urlJoin from "url-join";

export declare namespace Versions {
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
 * CRUD API for managing generator versions.
 */
export class Versions {
    constructor(protected readonly _options: Versions.Options = {}) {}

    /**
     * Get the latest generator version that has not been yanked.
     *
     * @param {FernRegistry.generators.GetLatestGeneratorReleaseRequest} request
     * @param {Versions.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await fernRegistry.generators.versions.getLatestGeneratorRelease({
     *         generator: "string",
     *         cli_version: "string",
     *         ir_version: 1,
     *         generator_major_version: 1,
     *         release_types: [FernRegistry.generators.ReleaseType.Ga]
     *     })
     */
    public async getLatestGeneratorRelease(
        request: FernRegistry.generators.GetLatestGeneratorReleaseRequest,
        requestOptions?: Versions.RequestOptions
    ): Promise<
        core.APIResponse<
            FernRegistry.generators.GeneratorRelease,
            FernRegistry.generators.versions.getLatestGeneratorRelease.Error
        >
    > {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.FernRegistryEnvironment.Prod,
                "/generators/versions/latest"
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
                body: _response.body as FernRegistry.generators.GeneratorRelease,
            };
        }

        if (_response.error.reason === "status-code") {
            switch ((_response.error.body as FernRegistry.generators.versions.getLatestGeneratorRelease.Error)?.error) {
                case "NoValidGeneratorsFoundError":
                    return {
                        ok: false,
                        error: _response.error.body as FernRegistry.generators.versions.getLatestGeneratorRelease.Error,
                    };
            }
        }

        return {
            ok: false,
            error: FernRegistry.generators.versions.getLatestGeneratorRelease.Error._unknown(_response.error),
        };
    }

    /**
     * Get the changelog for the specified generator upgrade. The response will be a map of the generator version to it's corresponding changelog.
     *
     * @param {FernRegistry.generators.GeneratorId} generator
     * @param {string} fromVersion
     * @param {string} toVersion
     * @param {Versions.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await fernRegistry.generators.versions.getChangelog("string", "string", "string")
     */
    public async getChangelog(
        generator: FernRegistry.generators.GeneratorId,
        fromVersion: string,
        toVersion: string,
        requestOptions?: Versions.RequestOptions
    ): Promise<
        core.APIResponse<
            FernRegistry.generators.GetChangelogResponse,
            FernRegistry.generators.versions.getChangelog.Error
        >
    > {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.FernRegistryEnvironment.Prod,
                `/generators/versions/${encodeURIComponent(generator)}/changelog/${encodeURIComponent(
                    fromVersion
                )}/to/${encodeURIComponent(toVersion)}`
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
                body: _response.body as FernRegistry.generators.GetChangelogResponse,
            };
        }

        return {
            ok: false,
            error: FernRegistry.generators.versions.getChangelog.Error._unknown(_response.error),
        };
    }

    /**
     * Update or create the specified generator version.
     *
     * @param {FernRegistry.generators.GeneratorReleaseRequest} request
     * @param {Versions.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await fernRegistry.generators.versions.upsertGeneratorRelease({
     *         generator_id: "string",
     *         ir_version: 1,
     *         migration: "string",
     *         custom_config_schema: "string",
     *         version: "string",
     *         created_at: "2023-01-15",
     *         is_yanked: {
     *             remediation_verision: "string"
     *         },
     *         changelog_entry: [{
     *                 type: FernRegistry.generators.ChangelogEntryType.Fix,
     *                 summary: "string",
     *                 upgrade_notes: {
     *                     "key": "value"
     *                 },
     *                 added: {
     *                     "key": "value"
     *                 },
     *                 changed: {
     *                     "key": "value"
     *                 },
     *                 deprecated: {
     *                     "key": "value"
     *                 },
     *                 removed: {
     *                     "key": "value"
     *                 },
     *                 fixed: {
     *                     "key": "value"
     *                 }
     *             }]
     *     })
     */
    public async upsertGeneratorRelease(
        request: FernRegistry.generators.GeneratorReleaseRequest,
        requestOptions?: Versions.RequestOptions
    ): Promise<core.APIResponse<void, FernRegistry.generators.versions.upsertGeneratorRelease.Error>> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.FernRegistryEnvironment.Prod,
                "/generators/versions"
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

        if (_response.error.reason === "status-code") {
            switch ((_response.error.body as FernRegistry.generators.versions.upsertGeneratorRelease.Error)?.error) {
                case "InvalidVersionError":
                    return {
                        ok: false,
                        error: _response.error.body as FernRegistry.generators.versions.upsertGeneratorRelease.Error,
                    };
            }
        }

        return {
            ok: false,
            error: FernRegistry.generators.versions.upsertGeneratorRelease.Error._unknown(_response.error),
        };
    }

    /**
     * Get the specified generator version.
     *
     * @param {FernRegistry.generators.GeneratorId} generator
     * @param {string} version
     * @param {Versions.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await fernRegistry.generators.versions.getGeneratorRelease("string", "string")
     */
    public async getGeneratorRelease(
        generator: FernRegistry.generators.GeneratorId,
        version: string,
        requestOptions?: Versions.RequestOptions
    ): Promise<
        core.APIResponse<
            FernRegistry.generators.GeneratorRelease,
            FernRegistry.generators.versions.getGeneratorRelease.Error
        >
    > {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.FernRegistryEnvironment.Prod,
                `/generators/versions/${encodeURIComponent(generator)}/${encodeURIComponent(version)}`
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
                body: _response.body as FernRegistry.generators.GeneratorRelease,
            };
        }

        if (_response.error.reason === "status-code") {
            switch ((_response.error.body as FernRegistry.generators.versions.getGeneratorRelease.Error)?.error) {
                case "GeneratorVersionNotFoundError":
                    return {
                        ok: false,
                        error: _response.error.body as FernRegistry.generators.versions.getGeneratorRelease.Error,
                    };
            }
        }

        return {
            ok: false,
            error: FernRegistry.generators.versions.getGeneratorRelease.Error._unknown(_response.error),
        };
    }

    /**
     * Get all generator versions for the specified generator.
     *
     * @param {FernRegistry.generators.GeneratorId} generator
     * @param {FernRegistry.generators.ListGeneratorReleasesRequest} request
     * @param {Versions.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await fernRegistry.generators.versions.listGeneratorReleases("string", {
     *         page: 1,
     *         page_size: 1
     *     })
     */
    public async listGeneratorReleases(
        generator: FernRegistry.generators.GeneratorId,
        request: FernRegistry.generators.ListGeneratorReleasesRequest = {},
        requestOptions?: Versions.RequestOptions
    ): Promise<
        core.APIResponse<
            FernRegistry.generators.ListGeneratorReleasesResponse,
            FernRegistry.generators.versions.listGeneratorReleases.Error
        >
    > {
        const { page, page_size: pageSize } = request;
        const _queryParams: Record<string, string | string[] | object | object[]> = {};
        if (page != null) {
            _queryParams["page"] = page.toString();
        }

        if (pageSize != null) {
            _queryParams["page_size"] = pageSize.toString();
        }

        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.FernRegistryEnvironment.Prod,
                `/generators/versions/${encodeURIComponent(generator)}`
            ),
            method: "GET",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            queryParameters: _queryParams,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : undefined,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return {
                ok: true,
                body: _response.body as FernRegistry.generators.ListGeneratorReleasesResponse,
            };
        }

        return {
            ok: false,
            error: FernRegistry.generators.versions.listGeneratorReleases.Error._unknown(_response.error),
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

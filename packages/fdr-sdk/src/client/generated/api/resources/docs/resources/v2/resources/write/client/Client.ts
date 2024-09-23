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
     *         orgId: FernRegistry.OrgId("string"),
     *         apiId: FernRegistry.ApiId("string"),
     *         filepaths: [FernRegistry.docs.v1.write.FilePath("string")],
     *         images: [{
     *                 filePath: FernRegistry.docs.v1.write.FilePath("string"),
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
                case "UnauthorizedError":
                case "UnavailableError":
                case "UserNotInOrgError":
                case "InvalidDomainError":
                case "InvalidCustomDomainError":
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
     *         orgId: FernRegistry.OrgId("string"),
     *         authConfig: {
     *             type: "public"
     *         },
     *         filepaths: [FernRegistry.docs.v1.write.FilePath("string")],
     *         images: [{
     *                 filePath: FernRegistry.docs.v1.write.FilePath("string"),
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
                case "UnauthorizedError":
                case "UnavailableError":
                case "UserNotInOrgError":
                case "InvalidDomainError":
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
     *     await fernRegistry.docs.v2.write.finishDocsRegister(FernRegistry.docs.v1.write.DocsRegistrationId("string"), {
     *         docsDefinition: {
     *             pages: {
     *                 "string": {
     *                     markdown: "string",
     *                     editThisPageUrl: FernRegistry.Url("string")
     *                 }
     *             },
     *             config: {
     *                 title: "string",
     *                 defaultLanguage: FernRegistry.docs.v1.commons.ProgrammingLanguage.Typescript,
     *                 announcement: {
     *                     text: "string"
     *                 },
     *                 navigation: {
     *                     tabs: [{
     *                             title: "string",
     *                             items: [{
     *                                     "key": "value"
     *                                 }],
     *                             skipUrlSlug: {
     *                                 "key": "value"
     *                             },
     *                             icon: {
     *                                 "key": "value"
     *                             },
     *                             hidden: {
     *                                 "key": "value"
     *                             },
     *                             urlSlugOverride: {
     *                                 "key": "value"
     *                             },
     *                             fullSlug: {
     *                                 "key": "value"
     *                             }
     *                         }],
     *                     tabsV2: [{
     *                             type: "group",
     *                             title: "string",
     *                             items: [{
     *                                     "key": "value"
     *                                 }],
     *                             skipUrlSlug: {
     *                                 "key": "value"
     *                             },
     *                             icon: {
     *                                 "key": "value"
     *                             },
     *                             hidden: {
     *                                 "key": "value"
     *                             },
     *                             urlSlugOverride: {
     *                                 "key": "value"
     *                             },
     *                             fullSlug: {
     *                                 "key": "value"
     *                             }
     *                         }],
     *                     landingPage: {
     *                         id: FernRegistry.PageId("string"),
     *                         title: "string",
     *                         icon: {
     *                             "key": "value"
     *                         },
     *                         hidden: {
     *                             "key": "value"
     *                         },
     *                         urlSlugOverride: {
     *                             "key": "value"
     *                         },
     *                         fullSlug: {
     *                             "key": "value"
     *                         }
     *                     }
     *                 },
     *                 navbarLinks: [{
     *                         type: "filled"
     *                     }],
     *                 footerLinks: [{
     *                         type: "github",
     *                         value: {
     *                             "key": "value"
     *                         }
     *                     }],
     *                 logoHeight: 1.1,
     *                 logoHref: FernRegistry.Url("string"),
     *                 favicon: FernRegistry.FileId("string"),
     *                 metadata: {
     *                     og:site_name: "string",
     *                     og:title: "string",
     *                     og:description: "string",
     *                     og:url: "string",
     *                     og:image: {
     *                         type: "fileId",
     *                         value: {
     *                             "key": "value"
     *                         }
     *                     },
     *                     og:image:width: 1.1,
     *                     og:image:height: 1.1,
     *                     og:locale: "string",
     *                     og:logo: {
     *                         type: "fileId",
     *                         value: {
     *                             "key": "value"
     *                         }
     *                     },
     *                     twitter:title: "string",
     *                     twitter:description: "string",
     *                     twitter:handle: "string",
     *                     twitter:image: {
     *                         type: "fileId",
     *                         value: {
     *                             "key": "value"
     *                         }
     *                     },
     *                     twitter:site: "string",
     *                     twitter:url: "string",
     *                     twitter:card: FernRegistry.docs.v1.commons.TwitterCardSetting.Summary,
     *                     noindex: true,
     *                     nofollow: true
     *                 },
     *                 redirects: [{
     *                         source: "string",
     *                         destination: "string",
     *                         permanent: {
     *                             "key": "value"
     *                         }
     *                     }],
     *                 colorsV3: {
     *                     type: "dark"
     *                 },
     *                 layout: {
     *                     pageWidth: {
     *                         type: "px",
     *                         value: {
     *                             "key": "value"
     *                         }
     *                     },
     *                     contentWidth: {
     *                         type: "px",
     *                         value: {
     *                             "key": "value"
     *                         }
     *                     },
     *                     sidebarWidth: {
     *                         type: "px",
     *                         value: {
     *                             "key": "value"
     *                         }
     *                     },
     *                     headerHeight: {
     *                         type: "px",
     *                         value: {
     *                             "key": "value"
     *                         }
     *                     },
     *                     searchbarPlacement: FernRegistry.docs.v1.commons.SearchbarPlacement.Header,
     *                     tabsPlacement: FernRegistry.docs.v1.commons.TabsPlacement.Header,
     *                     contentAlignment: FernRegistry.docs.v1.commons.ContentAlignment.Center,
     *                     headerPosition: FernRegistry.docs.v1.commons.HeaderPosition.Fixed,
     *                     disableHeader: true
     *                 },
     *                 typographyV2: {
     *                     headingsFont: {
     *                         type: "custom"
     *                     },
     *                     bodyFont: {
     *                         type: "custom"
     *                     },
     *                     codeFont: {
     *                         type: "custom"
     *                     }
     *                 },
     *                 analyticsConfig: {
     *                     segment: {
     *                         writeKey: "string"
     *                     },
     *                     fullstory: {
     *                         orgId: "string"
     *                     },
     *                     intercom: {
     *                         appId: "string",
     *                         apiBase: {
     *                             "key": "value"
     *                         }
     *                     },
     *                     posthog: {
     *                         apiKey: "string",
     *                         endpoint: {
     *                             "key": "value"
     *                         }
     *                     },
     *                     gtm: {
     *                         containerId: "string"
     *                     },
     *                     ga4: {
     *                         measurementId: "string"
     *                     },
     *                     amplitude: {
     *                         apiKey: "string"
     *                     },
     *                     mixpanel: {
     *                         apiKey: "string"
     *                     },
     *                     hotjar: {
     *                         hjid: "string",
     *                         hjsv: "string"
     *                     },
     *                     koala: {
     *                         apiKey: "string"
     *                     },
     *                     logrocket: {
     *                         apiKey: "string"
     *                     },
     *                     pirsch: {
     *                         id: "string"
     *                     },
     *                     plausible: {
     *                         domain: "string"
     *                     },
     *                     fathom: {
     *                         siteId: "string"
     *                     },
     *                     clearbit: {
     *                         apiKey: "string"
     *                     },
     *                     heap: {
     *                         appId: "string"
     *                     }
     *                 },
     *                 integrations: {
     *                     intercom: "string"
     *                 },
     *                 css: {
     *                     inline: [{
     *                             "key": "value"
     *                         }]
     *                 },
     *                 js: {
     *                     remote: [{
     *                             "key": "value"
     *                         }],
     *                     files: [{
     *                             fileId: FernRegistry.FileId("string"),
     *                             strategy: {
     *                                 "key": "value"
     *                             }
     *                         }],
     *                     inline: [{
     *                             "key": "value"
     *                         }]
     *                 },
     *                 playground: {
     *                     oauth: true
     *                 },
     *                 backgroundImage: FernRegistry.FileId("string"),
     *                 logoV2: {
     *                     dark: FernRegistry.FileId("string"),
     *                     light: FernRegistry.FileId("string")
     *                 },
     *                 logo: FernRegistry.FileId("string"),
     *                 colors: {
     *                     accentPrimary: {
     *                         r: 1,
     *                         g: 1,
     *                         b: 1,
     *                         a: {
     *                             "key": "value"
     *                         }
     *                     }
     *                 },
     *                 colorsV2: {
     *                     accentPrimary: {
     *                         type: "unthemed"
     *                     },
     *                     background: {
     *                         type: "unthemed"
     *                     }
     *                 },
     *                 typography: {
     *                     headingsFont: {
     *                         name: "string",
     *                         fontFile: FernRegistry.FileId("string")
     *                     },
     *                     bodyFont: {
     *                         name: "string",
     *                         fontFile: FernRegistry.FileId("string")
     *                     },
     *                     codeFont: {
     *                         name: "string",
     *                         fontFile: FernRegistry.FileId("string")
     *                     }
     *                 }
     *             },
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
     *         url: FernRegistry.Url("string")
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

/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../..";
import express from "express";
export interface ReadServiceMethods {
    getOrganizationForUrl(req: express.Request<never, FernRegistry.OrgId, FernRegistry.docs.v2.read.GetOrganizationForUrlRequest, never>, res: {
        send: (responseBody: FernRegistry.OrgId) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    getDocsForUrl(req: express.Request<never, FernRegistry.docs.v2.read.LoadDocsForUrlResponse, FernRegistry.docs.v2.read.LoadDocsForUrlRequest, never>, res: {
        send: (responseBody: FernRegistry.docs.v2.read.LoadDocsForUrlResponse) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    getPrivateDocsForUrl(req: express.Request<never, FernRegistry.docs.v2.read.LoadDocsForUrlResponse, FernRegistry.docs.v2.read.LoadPrivateDocsForUrlRequest, never>, res: {
        send: (responseBody: FernRegistry.docs.v2.read.LoadDocsForUrlResponse) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    getDocsConfigById(req: express.Request<{
        docsConfigId: FernRegistry.DocsConfigId;
    }, FernRegistry.docs.v2.read.GetDocsConfigByIdResponse, never, never>, res: {
        send: (responseBody: FernRegistry.docs.v2.read.GetDocsConfigByIdResponse) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    getSearchApiKeyForIndexSegment(req: express.Request<never, FernRegistry.docs.v2.read.GetSearchApiKeyForIndexSegmentResponse, FernRegistry.docs.v2.read.GetSearchApiKeyForIndexSegmentRequest, never>, res: {
        send: (responseBody: FernRegistry.docs.v2.read.GetSearchApiKeyForIndexSegmentResponse) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    listAllDocsUrls(req: express.Request<never, FernRegistry.docs.v2.read.ListAllDocsUrlsResponse, never, never>, res: {
        send: (responseBody: FernRegistry.docs.v2.read.ListAllDocsUrlsResponse) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
}
export declare class ReadService {
    private readonly methods;
    private router;
    constructor(methods: ReadServiceMethods, middleware?: express.RequestHandler[]);
    addMiddleware(handler: express.RequestHandler): this;
    toRouter(): express.Router;
}

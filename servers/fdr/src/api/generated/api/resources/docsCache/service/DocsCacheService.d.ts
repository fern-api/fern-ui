/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../..";
import express from "express";
export interface DocsCacheServiceMethods {
    invalidate(req: express.Request<never, never, FernRegistry.InvalidateCachedDocsRequest, never>, res: {
        send: () => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
}
export declare class DocsCacheService {
    private readonly methods;
    private router;
    constructor(methods: DocsCacheServiceMethods, middleware?: express.RequestHandler[]);
    addMiddleware(handler: express.RequestHandler): this;
    toRouter(): express.Router;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../index";
import express from "express";
export interface WriteServiceMethods {
    startDocsRegister(req: express.Request<never, FernRegistry.docs.v1.write.StartDocsRegisterResponse, FernRegistry.docs.v1.write.StartDocsRegisterRequest, never>, res: {
        send: (responseBody: FernRegistry.docs.v1.write.StartDocsRegisterResponse) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }, next: express.NextFunction): void | Promise<void>;
    finishDocsRegister(req: express.Request<{
        docsRegistrationId: FernRegistry.docs.v1.write.DocsRegistrationId;
    }, never, FernRegistry.docs.v1.write.RegisterDocsRequest, never>, res: {
        send: () => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }, next: express.NextFunction): void | Promise<void>;
}
export declare class WriteService {
    private readonly methods;
    private router;
    constructor(methods: WriteServiceMethods, middleware?: express.RequestHandler[]);
    addMiddleware(handler: express.RequestHandler): this;
    toRouter(): express.Router;
}

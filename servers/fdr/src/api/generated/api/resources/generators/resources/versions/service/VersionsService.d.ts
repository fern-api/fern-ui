/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../..";
import express from "express";
export interface VersionsServiceMethods {
    getLatestGeneratorVersion(req: express.Request<never, FernRegistry.generators.GeneratorRelease, FernRegistry.generators.GetLatestGeneratorVersionRequest, never>, res: {
        send: (responseBody: FernRegistry.generators.GeneratorRelease) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    getChangelog(req: express.Request<{
        generator: FernRegistry.generators.GeneratorId;
        from_version: string;
        to_version: string;
    }, FernRegistry.generators.ChangelogEntry[], never, never>, res: {
        send: (responseBody: FernRegistry.generators.ChangelogEntry[]) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    upsertGeneratorRelease(req: express.Request<never, never, FernRegistry.generators.GeneratorReleaseRequest, never>, res: {
        send: () => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    getGeneratorRelease(req: express.Request<{
        generator: FernRegistry.generators.GeneratorId;
        version: string;
    }, FernRegistry.generators.GeneratorRelease, never, never>, res: {
        send: (responseBody: FernRegistry.generators.GeneratorRelease) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    getAllGeneratorReleases(req: express.Request<{
        generator: FernRegistry.generators.GeneratorId;
    }, FernRegistry.generators.GeneratorRelease[], never, never>, res: {
        send: (responseBody: FernRegistry.generators.GeneratorRelease[]) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
}
/**
 * CRUD API for managing generator versions.
 */
export declare class VersionsService {
    private readonly methods;
    private router;
    constructor(methods: VersionsServiceMethods, middleware?: express.RequestHandler[]);
    addMiddleware(handler: express.RequestHandler): this;
    toRouter(): express.Router;
}

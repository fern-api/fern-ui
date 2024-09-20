/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../index";
import express from "express";
export interface GitServiceMethods {
    getRepository(req: express.Request<{
        repositoryOwner: string;
        repositoryName: string;
    }, FernRegistry.FernRepository, never, never>, res: {
        send: (responseBody: FernRegistry.FernRepository) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }, next: express.NextFunction): void | Promise<void>;
    listRepositories(req: express.Request<never, FernRegistry.ListRepositoriesResponse, never, {
        page?: number;
        pageSize?: number;
        organizationId?: FernRegistry.OrgId;
        repositoryName?: string;
        repositoryOwner?: string;
    }>, res: {
        send: (responseBody: FernRegistry.ListRepositoriesResponse) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }, next: express.NextFunction): void | Promise<void>;
    upsertRepository(req: express.Request<never, never, FernRegistry.FernRepository, never>, res: {
        send: () => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }, next: express.NextFunction): void | Promise<void>;
    deleteRepository(req: express.Request<{
        repositoryOwner: string;
        repositoryName: string;
    }, never, never, never>, res: {
        send: () => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }, next: express.NextFunction): void | Promise<void>;
    getPullRequest(req: express.Request<{
        repositoryOwner: string;
        repositoryName: string;
        pullRequestNumber: number;
    }, FernRegistry.PullRequest, never, never>, res: {
        send: (responseBody: FernRegistry.PullRequest) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }, next: express.NextFunction): void | Promise<void>;
    listPullRequests(req: express.Request<never, FernRegistry.ListPullRequestsResponse, never, {
        page?: number;
        pageSize?: number;
        repositoryName?: string;
        repositoryOwner?: string;
        organizationId?: FernRegistry.OrgId;
        state?: FernRegistry.PullRequestState[];
        author?: string[];
    }>, res: {
        send: (responseBody: FernRegistry.ListPullRequestsResponse) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }, next: express.NextFunction): void | Promise<void>;
    upsertPullRequest(req: express.Request<never, never, FernRegistry.PullRequest, never>, res: {
        send: () => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }, next: express.NextFunction): void | Promise<void>;
    deletePullRequest(req: express.Request<{
        repositoryOwner: string;
        repositoryName: string;
        pullRequestNumber: number;
    }, never, never, never>, res: {
        send: () => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }, next: express.NextFunction): void | Promise<void>;
}
/**
 * Produces an internal schema to easily track and view pull requests across Fern-managed repositories. This API is named `git` to allow for flexibility in adding other git providers down the line (e.g. gitlab).
 */
export declare class GitService {
    private readonly methods;
    private router;
    constructor(methods: GitServiceMethods, middleware?: express.RequestHandler[]);
    addMiddleware(handler: express.RequestHandler): this;
    toRouter(): express.Router;
}

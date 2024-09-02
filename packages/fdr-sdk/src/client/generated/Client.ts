/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "./environments";
import * as core from "./core";
import { Api } from "./api/resources/api/client/Client";
import { Docs } from "./api/resources/docs/client/Client";
import { Generators } from "./api/resources/generators/client/Client";
import { Diff } from "./api/resources/diff/client/Client";
import { DocsCache } from "./api/resources/docsCache/client/Client";
import { Sdks } from "./api/resources/sdks/client/Client";
import { SnippetsFactory } from "./api/resources/snippetsFactory/client/Client";
import { Snippets } from "./api/resources/snippets/client/Client";
import { Templates } from "./api/resources/templates/client/Client";
import { Tokens } from "./api/resources/tokens/client/Client";

export declare namespace FernRegistryClient {
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

export class FernRegistryClient {
    constructor(protected readonly _options: FernRegistryClient.Options = {}) {}

    protected _api: Api | undefined;

    public get api(): Api {
        return (this._api ??= new Api(this._options));
    }

    protected _docs: Docs | undefined;

    public get docs(): Docs {
        return (this._docs ??= new Docs(this._options));
    }

    protected _generators: Generators | undefined;

    public get generators(): Generators {
        return (this._generators ??= new Generators(this._options));
    }

    protected _diff: Diff | undefined;

    public get diff(): Diff {
        return (this._diff ??= new Diff(this._options));
    }

    protected _docsCache: DocsCache | undefined;

    public get docsCache(): DocsCache {
        return (this._docsCache ??= new DocsCache(this._options));
    }

    protected _sdks: Sdks | undefined;

    public get sdks(): Sdks {
        return (this._sdks ??= new Sdks(this._options));
    }

    protected _snippetsFactory: SnippetsFactory | undefined;

    public get snippetsFactory(): SnippetsFactory {
        return (this._snippetsFactory ??= new SnippetsFactory(this._options));
    }

    protected _snippets: Snippets | undefined;

    public get snippets(): Snippets {
        return (this._snippets ??= new Snippets(this._options));
    }

    protected _templates: Templates | undefined;

    public get templates(): Templates {
        return (this._templates ??= new Templates(this._options));
    }

    protected _tokens: Tokens | undefined;

    public get tokens(): Tokens {
        return (this._tokens ??= new Tokens(this._options));
    }
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
import express from "express";
import { DiffService } from "./api/resources/diff/service/DiffService";
import { DocsCacheService } from "./api/resources/docsCache/service/DocsCacheService";
import { GitService } from "./api/resources/git/service/GitService";
import { SnippetsFactoryService } from "./api/resources/snippetsFactory/service/SnippetsFactoryService";
import { SnippetsService } from "./api/resources/snippets/service/SnippetsService";
import { TemplatesService } from "./api/resources/templates/service/TemplatesService";
import { TokensService } from "./api/resources/tokens/service/TokensService";
import { ReadService as api_v1_read_RootService } from "./api/resources/api/resources/v1/resources/read/service/ReadService";
import { RegisterService as api_v1_register_RootService } from "./api/resources/api/resources/v1/resources/register/service/RegisterService";
import { ReadService as docs_v1_read_RootService } from "./api/resources/docs/resources/v1/resources/read/service/ReadService";
import { WriteService as docs_v1_write_RootService } from "./api/resources/docs/resources/v1/resources/write/service/WriteService";
import { ReadService as docs_v2_read_RootService } from "./api/resources/docs/resources/v2/resources/read/service/ReadService";
import { WriteService as docs_v2_write_RootService } from "./api/resources/docs/resources/v2/resources/write/service/WriteService";
import { GeneratorsService as generators_RootService } from "./api/resources/generators/service/GeneratorsService";
import { CliService as generators_CliService } from "./api/resources/generators/resources/cli/service/CliService";
import { VersionsService as generators_VersionsService } from "./api/resources/generators/resources/versions/service/VersionsService";
import { VersionsService as sdks_VersionsService } from "./api/resources/sdks/resources/versions/service/VersionsService";
export declare function register(expressApp: express.Express | express.Router, services: {
    diff: DiffService;
    docsCache: DocsCacheService;
    git: GitService;
    snippetsFactory: SnippetsFactoryService;
    snippets: SnippetsService;
    templates: TemplatesService;
    tokens: TokensService;
    api: {
        v1: {
            read: {
                _root: api_v1_read_RootService;
            };
            register: {
                _root: api_v1_register_RootService;
            };
        };
    };
    docs: {
        v1: {
            read: {
                _root: docs_v1_read_RootService;
            };
            write: {
                _root: docs_v1_write_RootService;
            };
        };
        v2: {
            read: {
                _root: docs_v2_read_RootService;
            };
            write: {
                _root: docs_v2_write_RootService;
            };
        };
    };
    generators: {
        _root: generators_RootService;
        cli: generators_CliService;
        versions: generators_VersionsService;
    };
    sdks: {
        versions: sdks_VersionsService;
    };
}): void;

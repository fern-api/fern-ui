import { FdrApplication, type FdrConfig } from "../app";
import { type FdrServices } from "../app/FdrApplication";
import { type DocsDefinitionDb } from "../generated/api/resources/docs/resources/v1/resources/db";
import { ConfigSegmentTuple, type AlgoliaSearchRecord, type AlgoliaService } from "../services/algolia";
import { type AuthService } from "../services/auth";
import {
    FailedToDeleteIndexSegment,
    FailedToRegisterDocsNotification,
    SlackService,
} from "../services/slack/SlackService";

class MockAlgoliaService implements AlgoliaService {
    generateSearchApiKey(_filters: string): string {
        return "";
    }

    async deleteIndexSegmentRecords(_indexSegmentIds: string[]): Promise<void> {
        return;
    }

    async generateSearchRecords(
        _docsDefinition: DocsDefinitionDb,
        _configSegmentTuples: ConfigSegmentTuple[]
    ): Promise<AlgoliaSearchRecord[]> {
        return [];
    }

    async uploadSearchRecords(_records: AlgoliaSearchRecord[]): Promise<void> {
        return;
    }
}

class MockAuthService implements AuthService {
    async checkUserBelongsToOrg(): Promise<void> {
        return;
    }
}

class MockSlackService implements SlackService {
    async notify(_message: string, _err: unknown): Promise<void> {
        return;
    }

    async notifyFailedToRegisterDocs(_request: FailedToRegisterDocsNotification): Promise<void> {
        return;
    }

    async notifyFailedToDeleteIndexSegment(_request: FailedToDeleteIndexSegment): Promise<void> {
        return;
    }
}

export function createMockFdrConfig(): FdrConfig {
    return {
        awsAccessKey: "",
        awsSecretKey: "",
        s3BucketName: "fdr",
        s3BucketRegion: "us-east-1",
        venusUrl: "",
        s3UrlOverride: "http://s3-mock:9090",
        domainSuffix: ".docs.buildwithfern.com",
        algoliaAppId: "",
        algoliaAdminApiKey: "",
        algoliaSearchIndex: "",
        slackToken: "",
    };
}

export function createMockFdrApplication(services?: Partial<FdrServices>) {
    return new FdrApplication(createMockFdrConfig(), {
        auth: new MockAuthService(),
        algolia: new MockAlgoliaService(),
        slack: new MockSlackService(),
        ...services,
    });
}

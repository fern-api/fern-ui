import { PrismaClient, SnippetApi } from "@prisma/client";

export interface LoadSnippetAPIRequest {
    orgId: string;
    apiName: string;
}

export interface LoadSnippetAPIsRequest {
    orgIds: string[];
    apiName: string | undefined;
}

export interface SnippetAPIsDao {
    createSnippetAPI({ apiName, orgId }: { apiName: string; orgId: string }): Promise<void>;

    loadSnippetAPI({
        loadSnippetAPIRequest,
    }: {
        loadSnippetAPIRequest: LoadSnippetAPIRequest;
    }): Promise<SnippetApi | null>;

    loadSnippetAPIs({
        loadSnippetAPIsRequest,
    }: {
        loadSnippetAPIsRequest: LoadSnippetAPIsRequest;
    }): Promise<SnippetApi[]>;
}

export class SnippetAPIsDaoImpl implements SnippetAPIsDao {
    constructor(private readonly prisma: PrismaClient) {}

    public async createSnippetAPI({ apiName, orgId }: { apiName: string; orgId: string }): Promise<void> {
        await this.prisma.snippetApi.create({
            data: {
                apiName,
                orgId,
            },
        });
    }

    public async loadSnippetAPI({
        loadSnippetAPIRequest,
    }: {
        loadSnippetAPIRequest: LoadSnippetAPIRequest;
    }): Promise<SnippetApi | null> {
        return await this.prisma.snippetApi.findUnique({
            where: {
                orgId_apiName: {
                    orgId: loadSnippetAPIRequest.orgId,
                    apiName: loadSnippetAPIRequest.apiName,
                },
            },
        });
    }

    public async loadSnippetAPIs({
        loadSnippetAPIsRequest,
    }: {
        loadSnippetAPIsRequest: LoadSnippetAPIsRequest;
    }): Promise<SnippetApi[]> {
        return await this.prisma.snippetApi.findMany({
            where: {
                orgId: {
                    in: loadSnippetAPIsRequest.orgIds,
                },
                apiName: loadSnippetAPIsRequest.apiName,
            },
        });
    }
}

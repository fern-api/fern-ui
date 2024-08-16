import { APIV1Read, FdrAPI } from "@fern-api/fdr-sdk";
import * as prisma from "@prisma/client";
import {
    ChangelogEntry,
    ChangelogResponse,
    GeneratorId,
    GeneratorRelease,
    GeneratorReleaseRequest,
    GetChangelogResponse,
    GetLatestGeneratorReleaseRequest,
    ListGeneratorReleasesResponse,
    Yank,
} from "../../api/generated/api/resources/generators";
import { readBuffer, writeBuffer } from "../../util";
import {
    convertGeneratorReleaseType,
    convertPrismaReleaseType,
    getPrereleaseType,
    parseSemverOrThrow,
} from "./daoUtils";
import { noncifySemanticVersion } from "./noncifySemanticVersion";

export interface LoadSnippetAPIRequest {
    orgId: string;
    apiName: string;
}

export interface LoadSnippetAPIsRequest {
    orgIds: string[];
    apiName: string | undefined;
}

export type SnippetTemplatesByEndpoint = Record<
    FdrAPI.EndpointPath,
    Record<FdrAPI.EndpointMethod, APIV1Read.EndpointSnippetTemplates>
>;

export type SnippetTemplatesByEndpointIdentifier = Record<string, APIV1Read.EndpointSnippetTemplates>;

export interface GeneratorVersionsDao {
    getLatestGeneratorRelease({
        getLatestGeneratorReleaseRequest,
    }: {
        getLatestGeneratorReleaseRequest: GetLatestGeneratorReleaseRequest;
    }): Promise<GeneratorRelease | undefined>;

    getChangelog({
        generator,
        fromVersion,
        toVersion,
    }: {
        generator: GeneratorId;
        fromVersion: string;
        toVersion: string;
    }): Promise<GetChangelogResponse>;

    upsertGeneratorRelease({ generatorRelease }: { generatorRelease: GeneratorReleaseRequest }): Promise<void>;

    getGeneratorRelease({
        generator,
        version,
    }: {
        generator: GeneratorId;
        version: string;
    }): Promise<GeneratorRelease | undefined>;

    listGeneratorReleases({
        generator,
        page,
        pageSize,
    }: {
        generator: GeneratorId;
        page?: number;
        pageSize?: number;
    }): Promise<ListGeneratorReleasesResponse>;
}

export class GeneratorVersionsDaoImpl implements GeneratorVersionsDao {
    constructor(private readonly prisma: prisma.PrismaClient) {}

    async upsertGeneratorRelease({ generatorRelease }: { generatorRelease: GeneratorReleaseRequest }): Promise<void> {
        const parsedVersion = parseSemverOrThrow(generatorRelease.version);

        const releaseType = convertGeneratorReleaseType(getPrereleaseType(generatorRelease.version));
        const data = {
            version: generatorRelease.version,
            generatorId: generatorRelease.generator_id,
            irVersion: generatorRelease.ir_version,
            major: parsedVersion.major,
            minor: parsedVersion.minor,
            patch: parsedVersion.patch,
            isYanked: generatorRelease.is_yanked != null ? writeBuffer(generatorRelease.is_yanked) : undefined,
            changelogEntry:
                generatorRelease.changelog_entry != null ? writeBuffer(generatorRelease.changelog_entry) : undefined,
            migration: generatorRelease.migration != null ? writeBuffer(generatorRelease.migration) : undefined,
            customConfigSchema: generatorRelease.custom_config_schema,
            releaseType,
            nonce: noncifySemanticVersion(generatorRelease.version),
        };
        await this.prisma.generatorRelease.upsert({
            where: {
                generatorId_version: {
                    generatorId: generatorRelease.generator_id,
                    version: generatorRelease.version,
                },
            },
            create: data,
            update: data,
        });
    }

    async getGeneratorRelease({
        generator,
        version,
    }: {
        generator: string;
        version: string;
    }): Promise<GeneratorRelease | undefined> {
        const maybeRelease = await this.prisma.generatorRelease.findUnique({
            where: {
                generatorId_version: {
                    generatorId: generator,
                    version,
                },
            },
        });
        return maybeRelease != null ? convertPrismaGeneratorRelease(maybeRelease) : undefined;
    }

    async listGeneratorReleases({
        generator,
        page = 0,
        pageSize = 20,
    }: {
        generator: GeneratorId;
        page?: number;
        pageSize?: number;
    }): Promise<ListGeneratorReleasesResponse> {
        const releases = await this.prisma.generatorRelease.findMany({
            where: {
                generatorId: generator,
            },
            skip: page * pageSize,
            take: pageSize,
            orderBy: [
                {
                    nonce: "desc",
                },
            ],
        });

        return {
            generator_releases: releases
                .map(convertPrismaGeneratorRelease)
                .filter((g): g is GeneratorRelease => g != null),
        };
    }

    async getLatestGeneratorRelease({
        getLatestGeneratorReleaseRequest,
    }: {
        getLatestGeneratorReleaseRequest: GetLatestGeneratorReleaseRequest;
    }): Promise<GeneratorRelease | undefined> {
        const releaseType =
            getLatestGeneratorReleaseRequest.releaseType != null
                ? convertGeneratorReleaseType(getLatestGeneratorReleaseRequest.releaseType)
                : undefined;

        const release = await this.prisma.generatorRelease.findFirst({
            where: {
                generatorId: getLatestGeneratorReleaseRequest.generator,
                releaseType,
                major: getLatestGeneratorReleaseRequest.retainMajorVersion,
            },
            orderBy: [
                {
                    nonce: "desc",
                },
            ],
        });

        return convertPrismaGeneratorRelease(release);
    }

    async getChangelog({
        generator,
        fromVersion,
        toVersion,
    }: {
        generator: GeneratorId;
        fromVersion: string;
        toVersion: string;
    }): Promise<GetChangelogResponse> {
        const releases = await this.prisma.generatorRelease.findMany({
            where: {
                generatorId: generator,
                nonce: {
                    gte: noncifySemanticVersion(fromVersion),
                    lte: noncifySemanticVersion(toVersion),
                },
            },
            orderBy: [
                {
                    nonce: "desc",
                },
            ],
        });

        const changelogs: ChangelogResponse[] = [];
        for (const release of releases) {
            if (release.changelogEntry != null) {
                changelogs.push({
                    version: release.version,
                    changelog_entry: readBuffer(release.changelogEntry) as ChangelogEntry,
                });
            }
        }
        return { entries: changelogs };
    }
}

function convertPrismaGeneratorRelease(generatorRelease: prisma.GeneratorRelease | null): GeneratorRelease | undefined {
    if (generatorRelease == null) {
        return undefined;
    }

    return {
        generator_id: generatorRelease.generatorId,
        version: generatorRelease.version,
        ir_version: generatorRelease.irVersion,
        release_type: convertPrismaReleaseType(generatorRelease.releaseType),
        changelog_entry:
            generatorRelease.changelogEntry != null
                ? (readBuffer(generatorRelease.changelogEntry) as ChangelogEntry)
                : undefined,
        migration: generatorRelease.migration != null ? (readBuffer(generatorRelease.migration) as string) : undefined,
        custom_config_schema:
            generatorRelease.customConfigSchema != null ? generatorRelease.customConfigSchema : undefined,
        major_version: generatorRelease.major,
        is_yanked: generatorRelease.isYanked != null ? (readBuffer(generatorRelease.isYanked) as Yank) : undefined,
    };
}

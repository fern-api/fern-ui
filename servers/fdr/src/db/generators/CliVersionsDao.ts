import { APIV1Read, FdrAPI } from "@fern-api/fdr-sdk";
import * as prisma from "@prisma/client";
import {
    ChangelogEntry,
    ChangelogResponse,
    CliRelease,
    CliReleaseRequest,
    GetChangelogRequest,
    GetChangelogResponse,
    GetLatestCliReleaseRequest,
    ListCliReleasesResponse,
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

export interface CliVersionsDao {
    getLatestCliRelease({
        getLatestCliReleaseRequest,
    }: {
        getLatestCliReleaseRequest: GetLatestCliReleaseRequest;
    }): Promise<CliRelease | undefined>;

    getChangelog({ versionRanges }: { versionRanges: GetChangelogRequest }): Promise<GetChangelogResponse>;

    getMinCliForIr({ irVersion }: { irVersion: number }): Promise<CliRelease | undefined>;

    upsertCliRelease({ cliRelease }: { cliRelease: CliReleaseRequest }): Promise<void>;

    getCliRelease({ cliVersion }: { cliVersion: string }): Promise<CliRelease | undefined>;

    listCliReleases({ page, pageSize }: { page?: number; pageSize?: number }): Promise<ListCliReleasesResponse>;
}

export class CliVersionsDaoImpl implements CliVersionsDao {
    constructor(private readonly prisma: prisma.PrismaClient) {}
    async getLatestCliRelease({
        getLatestCliReleaseRequest,
    }: {
        getLatestCliReleaseRequest: GetLatestCliReleaseRequest;
    }): Promise<CliRelease | undefined> {
        const releaseTypes =
            getLatestCliReleaseRequest.release_types != null
                ? getLatestCliReleaseRequest.release_types.map(convertGeneratorReleaseType)
                : [prisma.ReleaseType.ga];

        const maybeRelease = await this.prisma.cliRelease.findFirst({
            where: {
                releaseType: { in: releaseTypes },
                irVersion: { gte: getLatestCliReleaseRequest.ir_version },
                isYanked: null,
            },
            orderBy: [
                {
                    nonce: "desc",
                },
            ],
        });
        return convertPrismaCliRelease(maybeRelease);
    }

    async getChangelog({ versionRanges }: { versionRanges: GetChangelogRequest }): Promise<GetChangelogResponse> {
        const releases = await this.prisma.cliRelease.findMany({
            where: {
                nonce: {
                    gte:
                        versionRanges.from_version.type == "inclusive"
                            ? noncifySemanticVersion(versionRanges.from_version.value)
                            : undefined,
                    gt:
                        versionRanges.from_version.type == "exclusive"
                            ? noncifySemanticVersion(versionRanges.from_version.value)
                            : undefined,
                    lte:
                        versionRanges.to_version.type == "inclusive"
                            ? noncifySemanticVersion(versionRanges.to_version.value)
                            : undefined,
                    lt:
                        versionRanges.to_version.type == "exclusive"
                            ? noncifySemanticVersion(versionRanges.to_version.value)
                            : undefined,
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
                    changelog_entry: readBuffer(release.changelogEntry) as ChangelogEntry[],
                });
            }
        }
        return { entries: changelogs };
    }

    async upsertCliRelease({ cliRelease }: { cliRelease: CliReleaseRequest }): Promise<void> {
        const parsedVersion = parseSemverOrThrow(cliRelease.version);
        const data = {
            version: cliRelease.version,
            major: parsedVersion.major,
            minor: parsedVersion.minor,
            patch: parsedVersion.patch,
            nonce: noncifySemanticVersion(cliRelease.version),
            irVersion: cliRelease.ir_version,
            releaseType: convertGeneratorReleaseType(getPrereleaseType(cliRelease.version)),
            changelogEntry: cliRelease.changelog_entry != null ? writeBuffer(cliRelease.changelog_entry) : null,
            isYanked: cliRelease.is_yanked != null ? writeBuffer(cliRelease.is_yanked) : null,
            createdAt: cliRelease.created_at != null ? new Date(cliRelease.created_at) : undefined,
        };

        await this.prisma.cliRelease.upsert({
            where: {
                version: cliRelease.version,
            },
            update: data,
            create: data,
        });
    }

    async getMinCliForIr({ irVersion }: { irVersion: number }): Promise<CliRelease | undefined> {
        const maybeRelease = await this.prisma.cliRelease.findFirst({
            where: {
                irVersion,
            },
            orderBy: [
                {
                    // Get the lowest version
                    nonce: "asc",
                },
            ],
        });
        return convertPrismaCliRelease(maybeRelease);
    }

    async getCliRelease({ cliVersion }: { cliVersion: string }): Promise<CliRelease | undefined> {
        const maybeRelease = await this.prisma.cliRelease.findUnique({
            where: {
                version: cliVersion,
            },
        });
        return convertPrismaCliRelease(maybeRelease);
    }

    async listCliReleases({
        page = 0,
        pageSize = 20,
    }: {
        page?: number | undefined;
        pageSize?: number | undefined;
    }): Promise<ListCliReleasesResponse> {
        const releases = await this.prisma.cliRelease.findMany({
            skip: page * pageSize,
            take: pageSize,
            orderBy: [
                {
                    nonce: "desc",
                },
            ],
        });

        return { cli_releases: releases.map(convertPrismaCliRelease).filter((g): g is CliRelease => g != null) };
    }
}

function convertPrismaCliRelease(cliRelease: prisma.CliRelease | null): CliRelease | undefined {
    if (cliRelease == null) {
        return undefined;
    }

    return {
        version: cliRelease.version,
        ir_version: cliRelease.irVersion,
        release_type: convertPrismaReleaseType(cliRelease.releaseType),
        changelog_entry:
            cliRelease.changelogEntry != null ? (readBuffer(cliRelease.changelogEntry) as ChangelogEntry[]) : undefined,
        major_version: cliRelease.major,
        is_yanked: cliRelease.isYanked != null ? (readBuffer(cliRelease.isYanked) as Yank) : undefined,
        created_at: cliRelease.createdAt?.toISOString(),
    };
}

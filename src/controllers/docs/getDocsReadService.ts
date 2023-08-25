import type { DocsV2 } from "@prisma/client";
import type { FdrApplication } from "../../app";
import { FernRegistry } from "../../generated";
import { DomainNotRegisteredError } from "../../generated/api/resources/docs/resources/v1/resources/read";
import { ReadService } from "../../generated/api/resources/docs/resources/v1/resources/read/service/ReadService";
import { readBuffer, WithoutQuestionMarks } from "../../util";
import { convertDbApiDefinitionToRead } from "../api/getApiReadService";

export function getDocsReadService(app: FdrApplication): ReadService {
    return new ReadService({
        getDocsForDomainLegacy: async (req, res) => {
            const definition = await getDocsForDomain({ app, domain: req.params.domain });
            return res.send(definition);
        },
        getDocsForDomain: async (req, res) => {
            const definition = await getDocsForDomain({ app, domain: req.body.domain });
            return res.send(definition);
        },
    });
}

export async function getDocsForDomain({
    app,
    domain,
}: {
    app: FdrApplication;
    domain: string;
}): Promise<FernRegistry.docs.v1.read.DocsDefinition> {
    const [docs, docsV2] = await Promise.all([
        app.services.db.prisma.docs.findFirst({
            where: {
                url: domain,
            },
        }),
        app.services.db.prisma.docsV2.findFirst({
            where: {
                domain,
            },
        }),
    ]);

    if (!docs) {
        throw new DomainNotRegisteredError();
    }
    const docsDefinitionJson = readBuffer(docs.docsDefinition);
    const docsDbDefinition = migrateDocsDbDefinition(docsDefinitionJson);

    return getDocsDefinition({ app, docsDbDefinition, docsV2 });
}

export async function getDocsDefinition({
    app,
    docsDbDefinition,
    docsV2,
}: {
    app: FdrApplication;
    docsDbDefinition: FernRegistry.docs.v1.db.DocsDefinitionDb;
    docsV2: DocsV2 | null;
}): Promise<FernRegistry.docs.v1.read.DocsDefinition> {
    const apiDefinitions = await app.services.db.prisma.apiDefinitionsV2.findMany({
        where: {
            apiDefinitionId: {
                in: Array.from(docsDbDefinition.referencedApis),
            },
        },
    });
    return {
        algoliaSearchIndex: docsV2?.algoliaIndex ?? undefined,
        config: getDocsDefinitionConfig(docsDbDefinition),
        apis: Object.fromEntries(
            apiDefinitions.map((apiDefinition) => {
                const parsedApiDefinition = convertDbApiDefinitionToRead(apiDefinition.definition);
                return [apiDefinition.apiDefinitionId, parsedApiDefinition];
            })
        ),
        files: Object.fromEntries(
            await Promise.all(
                Object.entries(docsDbDefinition.files).map(async ([fileId, fileDbInfo]) => {
                    const s3DownloadUrl = await app.services.s3.getPresignedDownloadUrl({ key: fileDbInfo.s3Key });
                    return [fileId, s3DownloadUrl];
                })
            )
        ),
        pages: docsDbDefinition.pages,
    };
}

function getDocsDefinitionConfig(
    docsDbDefinition: FernRegistry.docs.v1.db.DocsDefinitionDb
): WithoutQuestionMarks<FernRegistry.docs.v1.read.DocsConfig> {
    return {
        navigation: docsDbDefinition.config.navigation,
        logo: docsDbDefinition.config.logo,
        logoV2: docsDbDefinition.config.logoV2,
        logoHeight: docsDbDefinition.config.logoHeight,
        logoHref: docsDbDefinition.config.logoHref,
        colors: docsDbDefinition.config.colors,
        colorsV2: docsDbDefinition.config.colorsV2,
        navbarLinks: docsDbDefinition.config.navbarLinks ?? [],
        title: docsDbDefinition.config.title,
        favicon: docsDbDefinition.config.favicon,
        backgroundImage: docsDbDefinition.config.backgroundImage,
        typography: docsDbDefinition.config.typography,
    };
}

export function migrateDocsDbDefinition(dbValue: unknown): FernRegistry.docs.v1.db.DocsDefinitionDb {
    return {
        // default to v1, but this will be overwritten if dbValue has "type" defined
        type: "v1",
        ...(dbValue as object),
    } as FernRegistry.docs.v1.db.DocsDefinitionDb;
}

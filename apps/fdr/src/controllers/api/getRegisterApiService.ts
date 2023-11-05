import { SDKSnippetHolder, convertAPIDefinitionToDb } from "@fern-api/fdr-sdk";
import { v4 as uuidv4 } from "uuid";
import { APIV1Write, APIV1WriteService } from "../../api";
import type { FdrApplication } from "../../app";
import { writeBuffer } from "../../util";

const REGISTER_API_DEFINITION_META = {
    service: "APIV1WriteService",
    endpoint: "registerApiDefinition",
};

export function getRegisterApiService(app: FdrApplication): APIV1WriteService {
    return new APIV1WriteService({
        registerApiDefinition: async (req, res) => {
            app.logger.debug(`Checking if user belongs to org ${req.body.orgId}`, REGISTER_API_DEFINITION_META);
            await app.services.auth.checkUserBelongsToOrg({
                authHeader: req.headers.authorization,
                orgId: req.body.orgId,
            });
            const snippetsConfiguration = req.body.definition.snippetsConfiguration ?? {};
            const packagesForSnippets = getPackagesAsArrayFromSnippetsConfig(snippetsConfiguration);
            const packageToSdkId = await app.dao.sdks().getLatestSdkIdsForPackages(packagesForSnippets);
            const snippetsBySdkId = await app.dao.snippets().loadAllSnippetsForSdkIds(Object.values(packageToSdkId));
            const apiDefinitionId = uuidv4();
            const snippetHolder = new SDKSnippetHolder({
                snippetsBySdkId,
                packageToSdkId,
                snippetsConfiguration,
            });
            const transformedApiDefinition = convertAPIDefinitionToDb(
                req.body.definition,
                apiDefinitionId,
                snippetHolder,
            );
            app.logger.debug(
                `Creating API Definition in database with name=${req.body.apiId} for org ${req.body.orgId}`,
                REGISTER_API_DEFINITION_META,
            );
            await app.services.db.prisma.apiDefinitionsV2.create({
                data: {
                    apiDefinitionId,
                    apiName: req.body.apiId,
                    orgId: req.body.orgId,
                    definition: writeBuffer(transformedApiDefinition),
                },
            });
            app.logger.debug(`Returning API Definition ID id=${apiDefinitionId}`, REGISTER_API_DEFINITION_META);
            return res.send({
                apiDefinitionId,
            });
        },
    });
}

function getPackagesAsArrayFromSnippetsConfig(snippetsConfig: APIV1Write.SnippetsConfig): string[] {
    const packages: string[] = [];
    if (snippetsConfig.goSdk != null) {
        packages.push(snippetsConfig.goSdk.githubRepo);
    }
    if (snippetsConfig.typescriptSdk != null) {
        packages.push(snippetsConfig.typescriptSdk.package);
    }
    if (snippetsConfig.javaSdk != null) {
        packages.push(snippetsConfig.javaSdk.coordinate);
    }
    if (snippetsConfig.pythonSdk != null) {
        packages.push(snippetsConfig.pythonSdk.package);
    }
    return packages;
}

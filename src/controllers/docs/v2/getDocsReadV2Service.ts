import NodeCache from "node-cache";
import { DocsV2Read, DocsV2ReadService } from "../../../api";
import type { FdrApplication } from "../../../app";
import { convertApiDefinitionsToRead } from "../../../converters/read/convertAPIDefinitionToRead";
import { convertDbDocsConfigToRead } from "../../../converters/read/convertDocsConfigToRead";
import { getParsedUrl } from "../../../util";
import { getDocsDefinition, getDocsForDomain } from "../v1/getDocsReadService";

const DOCS_DOMAIN_REGX = /^([^.\s]+)/;
const SECONDS_IN_ONE_HOUR = 60 * 60;

const DOCS_CONFIG_ID_CACHE = new NodeCache({
    stdTTL: SECONDS_IN_ONE_HOUR,
    maxKeys: 100,
});

export function getDocsReadV2Service(app: FdrApplication): DocsV2ReadService {
    return new DocsV2ReadService({
        getDocsForUrl: async (req, res) => {
            const parsedUrl = getParsedUrl(req.body.url);
            const dbDocs = await app.dao.docsV2().loadDocsForURL(parsedUrl);
            if (dbDocs != null) {
                const definition = await getDocsDefinition({
                    app,
                    docsDbDefinition: dbDocs.docsDefinition,
                    docsV2: dbDocs,
                });
                return res.send({
                    baseUrl: {
                        domain: dbDocs.domain,
                        basePath: dbDocs.path === "" ? undefined : dbDocs.path,
                    },
                    definition,
                    lightModeEnabled: definition.config.colorsV3.type != "dark",
                });
            } else {
                // delegate to V1
                const v1Domain = parsedUrl.hostname.match(DOCS_DOMAIN_REGX)?.[1];
                if (v1Domain == null) {
                    throw new DocsV2Read.DomainNotRegisteredError();
                }
                const definition = await getDocsForDomain({ app, domain: v1Domain });
                return res.send({
                    baseUrl: {
                        domain: parsedUrl.hostname,
                        basePath: undefined,
                    },
                    definition,
                    lightModeEnabled: definition.config.colorsV3.type != "dark",
                });
            }
        },
        getDocsConfigById: async (req, res) => {
            let docsConfig: DocsV2Read.GetDocsConfigByIdResponse | undefined =
                DOCS_CONFIG_ID_CACHE.get<DocsV2Read.GetDocsConfigByIdResponse>(req.params.docsConfigId);
            if (docsConfig == null) {
                const loadDocsConfigResponse = await app.dao
                    .docsV2()
                    .loadDocsConfigByInstanceId(req.params.docsConfigId);
                if (loadDocsConfigResponse == null) {
                    throw new DocsV2Read.DocsDefinitionNotFoundError();
                }
                const apiDefinitions = await app.dao.apis().loadAPIDefinitions(loadDocsConfigResponse.referencedApis);
                docsConfig = {
                    docsConfig: convertDbDocsConfigToRead({ dbShape: loadDocsConfigResponse.docsConfig }),
                    apis: convertApiDefinitionsToRead(apiDefinitions),
                };
                DOCS_CONFIG_ID_CACHE.set(req.params.docsConfigId, {
                    docsConfig: convertDbDocsConfigToRead({ dbShape: loadDocsConfigResponse.docsConfig }),
                    apis: convertApiDefinitionsToRead(apiDefinitions),
                });
            }
            return res.send(docsConfig);
        },
        getSearchApiKeyForIndexSegment: async (req, res) => {
            const { indexSegmentId } = req.body;
            const cachedKey = app.services.algoliaIndexSegmentManager.getSearchApiKeyForIndexSegment(indexSegmentId);
            if (cachedKey != null) {
                return res.send({ searchApiKey: cachedKey });
            }
            const indexSegment = await app.dao.indexSegment().loadIndexSegment(indexSegmentId);
            if (indexSegment == null) {
                throw new DocsV2Read.IndexSegmentNotFoundError();
            }
            const searchApiKey = app.services.algoliaIndexSegmentManager.generateAndCacheApiKey(indexSegmentId);
            return res.send({ searchApiKey });
        },
    });
}

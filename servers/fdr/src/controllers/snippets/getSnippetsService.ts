import { SnippetsService } from "../../api";
import { InvalidPageError, UnauthorizedError } from "../../api/generated/api";
import { type FdrApplication } from "../../app";
import { DbSnippetsPage } from "../../db/snippets/SnippetsDao";
import { APIResolver } from "./APIResolver";

export function getSnippetsService(app: FdrApplication): SnippetsService {
    return new SnippetsService({
        get: async (req, res) => {
            if (req.headers.authorization === undefined) {
                throw new UnauthorizedError("You must be authorized to load snippets");
            }
            const apiInferrer = new APIResolver(app, req.headers.authorization);
            const apiInfo = await apiInferrer.resolveApi({
                orgId: req.body.orgId,
                apiId: req.body.apiId,
            });
            if (req.body.payload == null)  {
                const response: DbSnippetsPage = await app.dao.snippets().loadSnippetsPage({
                    loadSnippetsInfo: {
                        orgId: apiInfo.orgId,
                        apiId: apiInfo.apiId,
                        endpointIdentifier: req.body.endpoint,
                        sdks: req.body.sdks,
                        page: undefined,
                    },
                });
                const snippetsForEndpointPath = response.snippets[req.body.endpoint.path];
                if (snippetsForEndpointPath === undefined) {
                    return res.send([]);
                }
                const snippetsForEndpointMethod = snippetsForEndpointPath[req.body.endpoint.method];
                return res.send(snippetsForEndpointMethod ?? []);    
            } else {
                const 
            }
        },
        load: async (req, res) => {
            if (req.headers.authorization === undefined) {
                throw new UnauthorizedError("You must be authorized to load snippets");
            }
            const apiInferrer = new APIResolver(app, req.headers.authorization);
            const apiInfo = await apiInferrer.resolveApi({
                orgId: req.body.orgId,
                apiId: req.body.apiId,
            });
            // TODO: The cast shouldn't be necessary but the query parameter is being
            // passed in as a string (even though it's typed as a number), so we
            // need to use the + operator to make it a number.
            const page: number | undefined = req.query.page !== undefined ? +req.query.page : undefined;
            if (page !== undefined && page <= 0) {
                throw new InvalidPageError("Query parameter 'page' must be >= 1");
            }
            const response: DbSnippetsPage = await app.dao.snippets().loadSnippetsPage({
                loadSnippetsInfo: {
                    orgId: apiInfo.orgId,
                    apiId: apiInfo.apiId,
                    endpointIdentifier: undefined,
                    sdks: req.body.sdks,
                    page,
                },
            });
            return res.send({
                next: response.nextPage,
                snippets: response.snippets,
            });
        },
    });
}

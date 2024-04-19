import { TemplateService } from "../../api";
import { SnippetNotFound, UnauthorizedError } from "../../api/generated/api";
import { type FdrApplication } from "../../app";
import { APIResolver } from "./APIResolver";

export function getTemplateService(app: FdrApplication): TemplateService {
    return new TemplateService({
        register: async (req, res) => {
            // if (req.headers.authorization === undefined) {
            //     throw new UnauthorizedError("You must be authorized to load snippets");
            // }
            // const apiInferrer = new APIResolver(app, req.headers.authorization);
            // const apiInfo = await apiInferrer.resolveApi({
            //     orgId: req.body.orgId,
            //     apiId: req.body.apiId,
            // });
            // await app.services.auth.checkOrgHasSnippetsApiAccess({
            //     authHeader: req.headers.authorization,
            //     orgId: apiInfo.orgId,
            //     failHard: true,
            // });

            await app.dao.snippetTemplates().storeSnippetTemplate({
                storeSnippetsInfo: {
                    ...req.body,
                    snippets: [req.body.snippet],
                    // Override the specified org and API to match what they're authed to do
                    // orgId: apiInfo.orgId,
                    // apiId: apiInfo.apiId,
                },
            });
            return res.send();
        },
        registerBatch: async (req, res) => {
            // if (req.headers.authorization === undefined) {
            //     throw new UnauthorizedError("You must be authorized to load snippets");
            // }
            // const apiInferrer = new APIResolver(app, req.headers.authorization);
            // const apiInfo = await apiInferrer.resolveApi({
            //     orgId: req.body.orgId,
            //     apiId: req.body.apiId,
            // });
            // await app.services.auth.checkOrgHasSnippetsApiAccess({
            //     authHeader: req.headers.authorization,
            //     orgId: apiInfo.orgId,
            //     failHard: true,
            // });

            await app.dao.snippetTemplates().storeSnippetTemplate({
                storeSnippetsInfo: {
                    ...req.body,
                    // Override the specified org and API to match what they're authed to do
                    // orgId: apiInfo.orgId,
                    // apiId: apiInfo.apiId,
                },
            });
            return res.send();
        },
        get: async (req, res) => {
            if (req.headers.authorization === undefined) {
                throw new UnauthorizedError("You must be authorized to load snippets");
            }
            const apiInferrer = new APIResolver(app, req.headers.authorization);
            const apiInfo = await apiInferrer.resolveApi({
                orgId: req.body.orgId,
                apiId: req.body.apiId,
            });
            const snippet = await app.dao.snippetTemplates().loadSnippetTemplate({
                loadSnippetTemplateRequest: {
                    ...req.body,
                    // Override the specified org and API to match what they're authed to do
                    orgId: apiInfo.orgId,
                    apiId: apiInfo.apiId,
                },
            });
            if (snippet == null) {
                throw new SnippetNotFound("The requested snippet could not be found.");
            }
            return res.send(snippet);
        },
    });
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../index";

/**
 * @example
 *     {
 *         orgId: "string",
 *         apiId: "string",
 *         definition: {
 *             rootPackage: {},
 *             types: {
 *                 "string": {}
 *             },
 *             subpackages: {
 *                 "string": {}
 *             },
 *             auth: {
 *                 type: "bearerAuth"
 *             },
 *             globalHeaders: [{}],
 *             snippetsConfiguration: {},
 *             navigation: {}
 *         },
 *         sources: {
 *             "string": {
 *                 type: "openapi"
 *             }
 *         }
 *     }
 */
export interface RegisterApiDefinitionRequest {
    orgId: FernRegistry.OrgId;
    apiId: FernRegistry.ApiId;
    definition: FernRegistry.api.v1.register.ApiDefinition;
    sources?: Record<FernRegistry.api.v1.register.SourceId, FernRegistry.api.v1.register.Source>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../index";

/**
 * @example
 *     {
 *         orgId: FernRegistry.OrgId("string"),
 *         apiId: FernRegistry.ApiId("string"),
 *         apiDefinitionId: FernRegistry.ApiDefinitionId("d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32"),
 *         snippet: {
 *             sdk: {
 *                 type: "typescript",
 *                 package: "string",
 *                 version: "string"
 *             },
 *             endpointId: {
 *                 path: FernRegistry.EndpointPathLiteral("string"),
 *                 method: "GET",
 *                 identifierOverride: "string"
 *             },
 *             snippetTemplate: {
 *                 type: "v1",
 *                 clientInstantiation: "string",
 *                 functionInvocation: {
 *                     type: "generic",
 *                     imports: ["string"],
 *                     isOptional: true,
 *                     templateString: "string",
 *                     templateInputs: [{
 *                             type: "template",
 *                             value: {
 *                                 "key": "value"
 *                             }
 *                         }],
 *                     inputDelimiter: "string"
 *                 }
 *             },
 *             additionalTemplates: {
 *                 "string": {
 *                     type: "v1",
 *                     clientInstantiation: "string",
 *                     functionInvocation: {
 *                         type: "generic",
 *                         imports: ["string"],
 *                         isOptional: true,
 *                         templateString: "string",
 *                         templateInputs: [{
 *                                 type: "template",
 *                                 value: {
 *                                     "key": "value"
 *                                 }
 *                             }],
 *                         inputDelimiter: "string"
 *                     }
 *                 }
 *             }
 *         }
 *     }
 */
export interface RegisterSnippetTemplateRequest {
    /**
     * The organization to create snippets for.
     *
     */
    orgId: FernRegistry.OrgId;
    /**
     * The API name.
     *
     */
    apiId: FernRegistry.ApiId;
    apiDefinitionId: FernRegistry.ApiDefinitionId;
    snippet: FernRegistry.SnippetRegistryEntry;
}

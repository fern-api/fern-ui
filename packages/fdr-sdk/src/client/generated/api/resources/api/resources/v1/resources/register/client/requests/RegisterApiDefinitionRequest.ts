/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../index";

/**
 * @example
 *     {
 *         orgId: FernRegistry.OrgId("string"),
 *         apiId: FernRegistry.ApiId("string"),
 *         definition: {
 *             rootPackage: {
 *                 endpoints: [{
 *                         auth: true,
 *                         defaultEnvironment: FernRegistry.EnvironmentId("string"),
 *                         environments: [{
 *                                 "key": "value"
 *                             }],
 *                         method: FernRegistry.HttpMethod.Get,
 *                         id: FernRegistry.EndpointId("string"),
 *                         originalEndpointId: "string",
 *                         name: "string",
 *                         path: {
 *                             parts: [{
 *                                     type: "literal",
 *                                     value: {
 *                                         "key": "value"
 *                                     }
 *                                 }],
 *                             pathParameters: [{
 *                                     key: FernRegistry.api.v1.PathParameterKey("string"),
 *                                     type: {
 *                                         type: "id"
 *                                     },
 *                                     description: {
 *                                         "key": "value"
 *                                     },
 *                                     availability: {
 *                                         "key": "value"
 *                                     }
 *                                 }]
 *                         },
 *                         queryParameters: [{
 *                                 key: "string",
 *                                 type: {
 *                                     type: "id"
 *                                 },
 *                                 description: {
 *                                     "key": "value"
 *                                 },
 *                                 availability: {
 *                                     "key": "value"
 *                                 }
 *                             }],
 *                         headers: [{
 *                                 key: "string",
 *                                 type: {
 *                                     type: "id"
 *                                 },
 *                                 description: {
 *                                     "key": "value"
 *                                 },
 *                                 availability: {
 *                                     "key": "value"
 *                                 }
 *                             }],
 *                         request: {
 *                             type: {
 *                                 type: "json"
 *                             },
 *                             description: {
 *                                 "key": "value"
 *                             }
 *                         },
 *                         response: {
 *                             type: {
 *                                 type: "object"
 *                             },
 *                             statusCode: {
 *                                 "key": "value"
 *                             },
 *                             description: {
 *                                 "key": "value"
 *                             }
 *                         },
 *                         errors: [{
 *                                 "key": "value"
 *                             }],
 *                         errorsV2: [{
 *                                 "key": "value"
 *                             }],
 *                         examples: [{
 *                                 name: {
 *                                     "key": "value"
 *                                 },
 *                                 path: "string",
 *                                 pathParameters: {
 *                                     "string": {
 *                                         "key": "value"
 *                                     }
 *                                 },
 *                                 queryParameters: {
 *                                     "string": {
 *                                         "key": "value"
 *                                     }
 *                                 },
 *                                 headers: {
 *                                     "string": {
 *                                         "key": "value"
 *                                     }
 *                                 },
 *                                 requestBody: {
 *                                     "key": "value"
 *                                 },
 *                                 requestBodyV3: {
 *                                     "key": "value"
 *                                 },
 *                                 responseStatusCode: 1,
 *                                 responseBody: {
 *                                     "key": "value"
 *                                 },
 *                                 responseBodyV3: {
 *                                     "key": "value"
 *                                 },
 *                                 codeSamples: {
 *                                     "key": "value"
 *                                 },
 *                                 description: {
 *                                     "key": "value"
 *                                 }
 *                             }],
 *                         description: {
 *                             "key": "value"
 *                         },
 *                         availability: {
 *                             "key": "value"
 *                         }
 *                     }],
 *                 websockets: [{
 *                         id: FernRegistry.WebSocketId("string"),
 *                         auth: true,
 *                         name: {
 *                             "key": "value"
 *                         },
 *                         defaultEnvironment: {
 *                             "key": "value"
 *                         },
 *                         environments: [{
 *                                 "key": "value"
 *                             }],
 *                         path: {
 *                             parts: [{
 *                                     type: "literal",
 *                                     value: {
 *                                         "key": "value"
 *                                     }
 *                                 }],
 *                             pathParameters: [{
 *                                     key: FernRegistry.api.v1.PathParameterKey("string"),
 *                                     type: {
 *                                         type: "id"
 *                                     },
 *                                     description: {
 *                                         "key": "value"
 *                                     },
 *                                     availability: {
 *                                         "key": "value"
 *                                     }
 *                                 }]
 *                         },
 *                         headers: [{
 *                                 "key": "value"
 *                             }],
 *                         queryParameters: [{
 *                                 "key": "value"
 *                             }],
 *                         messages: [{
 *                                 "key": "value"
 *                             }],
 *                         examples: [{
 *                                 "key": "value"
 *                             }],
 *                         description: {
 *                             "key": "value"
 *                         },
 *                         availability: {
 *                             "key": "value"
 *                         }
 *                     }],
 *                 webhooks: [{
 *                         method: FernRegistry.api.v1.WebhookHttpMethod.Get,
 *                         id: FernRegistry.WebhookId("string"),
 *                         name: {
 *                             "key": "value"
 *                         },
 *                         path: [{
 *                                 "key": "value"
 *                             }],
 *                         headers: [{
 *                                 "key": "value"
 *                             }],
 *                         payload: {
 *                             type: {
 *                                 type: "object"
 *                             },
 *                             description: {
 *                                 "key": "value"
 *                             }
 *                         },
 *                         examples: [{
 *                                 "key": "value"
 *                             }],
 *                         description: {
 *                             "key": "value"
 *                         }
 *                     }],
 *                 types: [FernRegistry.api.v1.TypeId("string")],
 *                 subpackages: [FernRegistry.api.v1.SubpackageId("string")],
 *                 pointsTo: FernRegistry.api.v1.SubpackageId("string")
 *             },
 *             types: {
 *                 "string": {
 *                     name: "string",
 *                     shape: {
 *                         type: "alias",
 *                         value: {
 *                             type: "id"
 *                         }
 *                     },
 *                     description: {
 *                         "key": "value"
 *                     },
 *                     availability: {
 *                         "key": "value"
 *                     }
 *                 }
 *             },
 *             subpackages: {
 *                 "string": {
 *                     subpackageId: FernRegistry.api.v1.SubpackageId("string"),
 *                     name: "string",
 *                     displayName: "string",
 *                     endpoints: [{
 *                             auth: true,
 *                             defaultEnvironment: FernRegistry.EnvironmentId("string"),
 *                             environments: [{
 *                                     "key": "value"
 *                                 }],
 *                             method: FernRegistry.HttpMethod.Get,
 *                             id: FernRegistry.EndpointId("string"),
 *                             originalEndpointId: "string",
 *                             name: "string",
 *                             path: {
 *                                 parts: [{
 *                                         type: "literal",
 *                                         value: {
 *                                             "key": "value"
 *                                         }
 *                                     }],
 *                                 pathParameters: [{
 *                                         key: FernRegistry.api.v1.PathParameterKey("string"),
 *                                         type: {
 *                                             type: "id"
 *                                         },
 *                                         description: {
 *                                             "key": "value"
 *                                         },
 *                                         availability: {
 *                                             "key": "value"
 *                                         }
 *                                     }]
 *                             },
 *                             queryParameters: [{
 *                                     key: "string",
 *                                     type: {
 *                                         type: "id"
 *                                     },
 *                                     description: {
 *                                         "key": "value"
 *                                     },
 *                                     availability: {
 *                                         "key": "value"
 *                                     }
 *                                 }],
 *                             headers: [{
 *                                     key: "string",
 *                                     type: {
 *                                         type: "id"
 *                                     },
 *                                     description: {
 *                                         "key": "value"
 *                                     },
 *                                     availability: {
 *                                         "key": "value"
 *                                     }
 *                                 }],
 *                             request: {
 *                                 type: {
 *                                     type: "json"
 *                                 },
 *                                 description: {
 *                                     "key": "value"
 *                                 }
 *                             },
 *                             response: {
 *                                 type: {
 *                                     type: "object"
 *                                 },
 *                                 statusCode: {
 *                                     "key": "value"
 *                                 },
 *                                 description: {
 *                                     "key": "value"
 *                                 }
 *                             },
 *                             errors: [{
 *                                     "key": "value"
 *                                 }],
 *                             errorsV2: [{
 *                                     "key": "value"
 *                                 }],
 *                             examples: [{
 *                                     name: {
 *                                         "key": "value"
 *                                     },
 *                                     path: "string",
 *                                     pathParameters: {
 *                                         "string": {
 *                                             "key": "value"
 *                                         }
 *                                     },
 *                                     queryParameters: {
 *                                         "string": {
 *                                             "key": "value"
 *                                         }
 *                                     },
 *                                     headers: {
 *                                         "string": {
 *                                             "key": "value"
 *                                         }
 *                                     },
 *                                     requestBody: {
 *                                         "key": "value"
 *                                     },
 *                                     requestBodyV3: {
 *                                         "key": "value"
 *                                     },
 *                                     responseStatusCode: 1,
 *                                     responseBody: {
 *                                         "key": "value"
 *                                     },
 *                                     responseBodyV3: {
 *                                         "key": "value"
 *                                     },
 *                                     codeSamples: {
 *                                         "key": "value"
 *                                     },
 *                                     description: {
 *                                         "key": "value"
 *                                     }
 *                                 }],
 *                             description: {
 *                                 "key": "value"
 *                             },
 *                             availability: {
 *                                 "key": "value"
 *                             }
 *                         }],
 *                     websockets: [{
 *                             id: FernRegistry.WebSocketId("string"),
 *                             auth: true,
 *                             name: {
 *                                 "key": "value"
 *                             },
 *                             defaultEnvironment: {
 *                                 "key": "value"
 *                             },
 *                             environments: [{
 *                                     "key": "value"
 *                                 }],
 *                             path: {
 *                                 parts: [{
 *                                         type: "literal",
 *                                         value: {
 *                                             "key": "value"
 *                                         }
 *                                     }],
 *                                 pathParameters: [{
 *                                         key: FernRegistry.api.v1.PathParameterKey("string"),
 *                                         type: {
 *                                             type: "id"
 *                                         },
 *                                         description: {
 *                                             "key": "value"
 *                                         },
 *                                         availability: {
 *                                             "key": "value"
 *                                         }
 *                                     }]
 *                             },
 *                             headers: [{
 *                                     "key": "value"
 *                                 }],
 *                             queryParameters: [{
 *                                     "key": "value"
 *                                 }],
 *                             messages: [{
 *                                     "key": "value"
 *                                 }],
 *                             examples: [{
 *                                     "key": "value"
 *                                 }],
 *                             description: {
 *                                 "key": "value"
 *                             },
 *                             availability: {
 *                                 "key": "value"
 *                             }
 *                         }],
 *                     webhooks: [{
 *                             method: FernRegistry.api.v1.WebhookHttpMethod.Get,
 *                             id: FernRegistry.WebhookId("string"),
 *                             name: {
 *                                 "key": "value"
 *                             },
 *                             path: [{
 *                                     "key": "value"
 *                                 }],
 *                             headers: [{
 *                                     "key": "value"
 *                                 }],
 *                             payload: {
 *                                 type: {
 *                                     type: "object"
 *                                 },
 *                                 description: {
 *                                     "key": "value"
 *                                 }
 *                             },
 *                             examples: [{
 *                                     "key": "value"
 *                                 }],
 *                             description: {
 *                                 "key": "value"
 *                             }
 *                         }],
 *                     types: [FernRegistry.api.v1.TypeId("string")],
 *                     subpackages: [FernRegistry.api.v1.SubpackageId("string")],
 *                     pointsTo: FernRegistry.api.v1.SubpackageId("string"),
 *                     description: {
 *                         "key": "value"
 *                     }
 *                 }
 *             },
 *             auth: {
 *                 type: "bearerAuth"
 *             },
 *             globalHeaders: [{
 *                     key: "string",
 *                     type: {
 *                         type: "id"
 *                     },
 *                     description: {
 *                         "key": "value"
 *                     },
 *                     availability: {
 *                         "key": "value"
 *                     }
 *                 }],
 *             snippetsConfiguration: {
 *                 typescriptSdk: {
 *                     package: "string",
 *                     version: {
 *                         "key": "value"
 *                     }
 *                 },
 *                 pythonSdk: {
 *                     package: "string",
 *                     version: {
 *                         "key": "value"
 *                     }
 *                 },
 *                 goSdk: {
 *                     githubRepo: "string",
 *                     version: {
 *                         "key": "value"
 *                     }
 *                 },
 *                 javaSdk: {
 *                     coordinate: "string",
 *                     version: {
 *                         "key": "value"
 *                     }
 *                 },
 *                 rubySdk: {
 *                     gem: "string",
 *                     version: {
 *                         "key": "value"
 *                     }
 *                 }
 *             },
 *             navigation: {
 *                 items: [{
 *                         type: "subpackage"
 *                     }]
 *             }
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

// import { APIV1Read, DocsV1Read, FdrAPI, FernNavigation } from "@fern-api/fdr-sdk";
// import { isNonNullish, titleCase, visitDiscriminatedUnion } from "@fern-ui/core-utils";
// import { stringifyEndpointPathParts } from "./stringifyEndpointPathParts";
// import { isSubpackage } from "./subpackage";

// /**
//  * Flattened API Definition lightly transforms the APIV1Read.ApiDefinition into a more usable format:
//  *  - We flatten the API package structure into a list of items, so that it's order is consistent throughout the fern docs.
//  *  - The docs config also may inject supplementary mdx pages into the package structure.
//  *  - The items are then ordered according to the docs config.
//  *  - All optional keys are turned into strict nullable properties.
//  *
//  * This "flattening" operation should be relatively cheap, and is consumed by two resolvers:
//  *  - the sidebar node resolver (which renders the sidebar navigation on every page)
//  *  - the full resolver (which should only run on api reference pages, since it's expensive and data-rich)
//  */

// export interface FlattenedParameter {
//     key: string;
//     type: APIV1Read.TypeReference;
//     description: string | undefined;
//     availability: APIV1Read.Availability | undefined;
// }

// export interface FlattenedEndpointDefinition {
//     type: "endpoint";
//     id: string;
//     slug: string[];
//     name: string;
//     description: string | undefined;
//     availability: APIV1Read.Availability | undefined;
//     authed: boolean;
//     defaultEnvironment: APIV1Read.Environment | undefined;
//     environments: APIV1Read.Environment[];
//     method: APIV1Read.HttpMethod;
//     path: APIV1Read.EndpointPath;
//     queryParameters: APIV1Read.QueryParameter[];
//     headers: APIV1Read.Header[];
//     request: APIV1Read.HttpRequest | undefined;
//     response: APIV1Read.HttpResponse | undefined;
//     errors: APIV1Read.ErrorDeclarationV2[];
//     examples: APIV1Read.ExampleEndpointCall[];
//     snippetTemplates: APIV1Read.EndpointSnippetTemplates | undefined;

//     // stream variant of the endpoint
//     stream: FlattenedEndpointDefinition | undefined;
// }

// export interface FlattenedWebSocketChannel {
//     type: "websocket";
//     id: string;
//     slug: string[];
//     name: string | undefined;
//     description: string | undefined;
//     availability: APIV1Read.Availability | undefined;
//     authed: boolean;
//     defaultEnvironment: APIV1Read.Environment | undefined;
//     environments: APIV1Read.Environment[];
//     path: APIV1Read.EndpointPath;
//     headers: APIV1Read.Header[];
//     queryParameters: APIV1Read.QueryParameter[];
//     messages: APIV1Read.WebSocketMessage[];
//     examples: APIV1Read.ExampleWebSocketSession[];
// }

// export interface FlattenedWebhookDefinition {
//     type: "webhook";
//     id: string;
//     slug: string[];
//     name: string | undefined;
//     description: string | undefined;
//     availability: APIV1Read.Availability | undefined;
//     method: APIV1Read.WebhookHttpMethod;
//     path: string[];
//     headers: APIV1Read.Header[];
//     payload: APIV1Read.WebhookPayload;
//     examples: APIV1Read.ExampleWebhookPayload[];
// }

// export interface FlattenedSubpackage extends FlattenedApiDefinitionPackage {
//     type: "subpackage";
//     subpackageId: string;
//     name: string;
//     description: string | undefined;
// }

// export interface FlattenedPageMetadata {
//     type: "page";
//     id: DocsV1Read.PageId;
//     slug: FernNavigation.Slug;
//     title: string;
//     icon: string | undefined;
//     hidden: boolean;
// }

// export function isFlattenedSubpackage(package_: FlattenedApiDefinitionPackage): package_ is FlattenedSubpackage {
//     return (package_ as FlattenedSubpackage).type === "subpackage";
// }

// export type FlattenedApiDefinitionPackageItem =
//     | FlattenedEndpointDefinition
//     | FlattenedWebSocketChannel
//     | FlattenedWebhookDefinition
//     | FlattenedSubpackage
//     | FlattenedPageMetadata;

// export const FlattenedApiDefinitionPackageItem = {
//     visit: <T>(
//         item: FlattenedApiDefinitionPackageItem,
//         visitor: {
//             endpoint: (endpoint: FlattenedEndpointDefinition) => T;
//             websocket: (websocket: FlattenedWebSocketChannel) => T;
//             webhook: (webhook: FlattenedWebhookDefinition) => T;
//             subpackage: (subpackage: FlattenedSubpackage) => T;
//             page: (page: FlattenedPageMetadata) => T;
//         },
//     ): T => {
//         switch (item.type) {
//             case "endpoint":
//                 return visitor.endpoint(item);
//             case "websocket":
//                 return visitor.websocket(item);
//             case "webhook":
//                 return visitor.webhook(item);
//             case "subpackage":
//                 return visitor.subpackage(item);
//             case "page":
//                 return visitor.page(item);
//         }
//     },
//     isSubpackage: (item: FlattenedApiDefinitionPackageItem): item is FlattenedSubpackage => item.type === "subpackage",
//     isEndpoint: (item: FlattenedApiDefinitionPackageItem): item is FlattenedEndpointDefinition =>
//         item.type === "endpoint",
//     isWebSocket: (item: FlattenedApiDefinitionPackageItem): item is FlattenedWebSocketChannel =>
//         item.type === "websocket",
//     isWebhook: (item: FlattenedApiDefinitionPackageItem): item is FlattenedWebhookDefinition => item.type === "webhook",
//     isPage: (item: FlattenedApiDefinitionPackageItem): item is FlattenedPageMetadata => item.type === "page",
// };

// export interface FlattenedApiDefinitionPackage {
//     summaryPageId: DocsV1Read.PageId | undefined;
//     items: FlattenedApiDefinitionPackageItem[];
//     slug: FernNavigation.Slug;
//     usedTypes: readonly string[];
// }

// export interface FlattenedApiDefinition extends FlattenedApiDefinitionPackage {
//     api: FdrAPI.ApiDefinitionId;
//     auth: APIV1Read.ApiAuth | undefined;
//     types: Record<string, APIV1Read.TypeDefinition>;
//     globalHeaders: APIV1Read.Header[];
//     isSidebarFlattened: boolean;
// }

// export function flattenApiDefinition(
//     apiDefinition: APIV1Read.ApiDefinition,
//     parentSlugs: readonly string[],
//     navigation: DocsV1Read.ApiNavigationConfigRoot | undefined,
//     domain: string,
//     isSidebarFlattened = false,
// ): FlattenedApiDefinition {
//     const package_ = flattenPackage(
//         apiDefinition.rootPackage,
//         apiDefinition.subpackages,
//         parentSlugs,
//         navigation ?? toConfigRoot(apiDefinition.navigation),
//         domain,
//     );

//     return {
//         api: apiDefinition.id,
//         auth: apiDefinition.auth,
//         types: apiDefinition.types,
//         globalHeaders: apiDefinition.globalHeaders ?? [],
//         isSidebarFlattened,
//         ...package_,
//     };
// }

// function flattenPackage(
//     apiDefinitionPackage: APIV1Read.ApiDefinitionPackage,
//     subpackagesMap: Record<string, APIV1Read.ApiDefinitionSubpackage>,
//     parentSlugs: readonly string[],
//     order: DocsV1Read.ApiNavigationConfigRoot | undefined,
//     domain: string,
// ): FlattenedApiDefinitionPackage {
//     let currentPackage: APIV1Read.ApiDefinitionPackage | undefined = apiDefinitionPackage;
//     while (currentPackage?.pointsTo != null) {
//         currentPackage = subpackagesMap[currentPackage.pointsTo];
//     }

//     if (currentPackage == null) {
//         return {
//             items: [],
//             slug: parentSlugs,
//             usedTypes: [],
//             summaryPageId: undefined,
//         };
//     }

//     const endpoints: FlattenedEndpointDefinition[] = [];
//     const methodAndPathToEndpoint = new Map<string, FlattenedEndpointDefinition>();

//     const packageId = isSubpackage(currentPackage) ? currentPackage.subpackageId : "root";

//     currentPackage.endpoints.forEach((endpoint) => {
//         const flattenedEndpoint: FlattenedEndpointDefinition = {
//             type: "endpoint",
//             id: endpoint.originalEndpointId ?? `${packageId}.${endpoint.id}`,
//             slug: [...parentSlugs, endpoint.urlSlug],
//             name: endpoint.name ?? stringifyEndpointPathParts(endpoint.path.parts),
//             description: endpoint.description,
//             availability: endpoint.availability,
//             authed: endpoint.authed,
//             defaultEnvironment: endpoint.environments.find(
//                 (enironment) => enironment.id === endpoint.defaultEnvironment,
//             ),
//             environments: endpoint.environments,
//             method: endpoint.method,
//             path: endpoint.path,
//             queryParameters: endpoint.queryParameters,
//             headers: endpoint.headers,
//             request: endpoint.request,
//             response: endpoint.response,
//             errors: endpoint.errorsV2 ?? [],
//             examples: endpoint.examples,
//             snippetTemplates: endpoint.snippetTemplates,
//             stream: undefined,
//         };
//         const methodAndPath = `${endpoint.method} ${stringifyEndpointPathParts(endpoint.path.parts)}`;
//         const existingEndpoint = methodAndPathToEndpoint.get(methodAndPath);

//         if (existingEndpoint != null) {
//             if (existingEndpoint.stream == null && isStreamResponse(flattenedEndpoint.response)) {
//                 existingEndpoint.stream = flattenedEndpoint;
//                 flattenedEndpoint.name = nameWithStreamSuffix(existingEndpoint.name);
//                 return;
//             } else if (isStreamResponse(existingEndpoint.response) && !isStreamResponse(flattenedEndpoint.response)) {
//                 const idx = endpoints.indexOf(existingEndpoint);
//                 if (idx !== -1) {
//                     flattenedEndpoint.stream = existingEndpoint;
//                     existingEndpoint.name = nameWithStreamSuffix(flattenedEndpoint.name);
//                     // replace the existing endpoint with the new one
//                     endpoints[idx] = flattenedEndpoint;
//                     return;
//                 }
//             }
//         }

//         endpoints.push(flattenedEndpoint);
//         methodAndPathToEndpoint.set(methodAndPath, flattenedEndpoint);
//     });

//     const websockets = currentPackage.websockets.map(
//         (websocket): FlattenedWebSocketChannel => ({
//             type: "websocket",
//             id: `${packageId}.${websocket.id}`,
//             slug: [...parentSlugs, websocket.urlSlug],
//             name: websocket.name,
//             description: websocket.description,
//             availability: websocket.availability,
//             authed: websocket.auth,
//             defaultEnvironment: websocket.environments.find(
//                 (enironment) => enironment.id === websocket.defaultEnvironment,
//             ),
//             environments: websocket.environments,
//             path: websocket.path,
//             headers: websocket.headers,
//             queryParameters: websocket.queryParameters,
//             messages: websocket.messages,
//             examples: websocket.examples,
//         }),
//     );

//     const webhooks = currentPackage.webhooks.map(
//         (webhook): FlattenedWebhookDefinition => ({
//             type: "webhook",
//             id: `${packageId}.${webhook.id}`,
//             slug: [...parentSlugs, webhook.urlSlug],
//             name: webhook.name,
//             description: webhook.description,
//             availability: undefined,
//             method: webhook.method,
//             path: webhook.path,
//             headers: webhook.headers,
//             payload: webhook.payload,
//             examples: webhook.examples,
//         }),
//     );

//     const orderedSubpackageItems = order?.items?.filter(
//         (item): item is DocsV1Read.ApiNavigationConfigItem.Subpackage => item.type === "subpackage",
//     );

//     let subpackages = currentPackage.subpackages
//         .map((subpackageId): FlattenedSubpackage | undefined => {
//             const subpackage = subpackagesMap[subpackageId];
//             if (subpackage == null) {
//                 return;
//             }
//             const subpackageSlugs = [...parentSlugs, subpackage.urlSlug];
//             const subpackageOrder = orderedSubpackageItems?.find((item) => item.subpackageId === subpackageId);
//             return {
//                 type: "subpackage",
//                 subpackageId: subpackage.subpackageId,
//                 name: subpackage.displayName ?? titleCase(subpackage.name),
//                 description: subpackage.description,
//                 ...flattenPackage(subpackage, subpackagesMap, subpackageSlugs, subpackageOrder, domain),
//             };
//         })
//         .filter(isNonNullish);

//     subpackages = maybeMergeSubpackages(subpackages, domain);

//     const pages =
//         order?.items
//             ?.filter((item): item is DocsV1Read.ApiNavigationConfigItem.Page => item.type === "page")
//             .map(
//                 (item): FlattenedPageMetadata => ({
//                     type: "page",
//                     id: item.id,
//                     slug: item.fullSlug ?? [...parentSlugs, item.urlSlug],
//                     title: item.title,
//                     icon: item.icon,
//                     hidden: item.hidden ?? false,
//                 }),
//             ) ?? [];

//     const items: FlattenedApiDefinitionPackageItem[] = [
//         ...endpoints,
//         ...websockets,
//         ...webhooks,
//         ...subpackages,
//         ...pages,
//     ];

//     if (order != null && order.items.length > 0) {
//         items.sort((a, b) => {
//             const aIndex = order.items.findIndex((item) => {
//                 if (item.type === "subpackage" && a.type === "subpackage") {
//                     return item.subpackageId === a.subpackageId;
//                 }

//                 if (item.type === "page" && a.type === "page") {
//                     return item.id === a.id;
//                 }

//                 if (
//                     item.type !== "subpackage" &&
//                     a.type !== "subpackage" &&
//                     item.type !== "page" &&
//                     a.type !== "page"
//                 ) {
//                     return item.value === a.id;
//                 }
//                 return false;
//             });
//             const bIndex = order.items.findIndex((item) => {
//                 if (item.type === "subpackage" && b.type === "subpackage") {
//                     return item.subpackageId === b.subpackageId;
//                 }

//                 if (item.type === "page" && b.type === "page") {
//                     return item.id === b.id;
//                 }

//                 if (
//                     item.type !== "subpackage" &&
//                     b.type !== "subpackage" &&
//                     item.type !== "page" &&
//                     b.type !== "page"
//                 ) {
//                     return item.value === b.id;
//                 }
//                 return false;
//             });

//             if (aIndex === -1) {
//                 return 1;
//             }
//             if (bIndex === -1) {
//                 return -1;
//             }
//             return aIndex - bIndex;
//         });
//     }

//     return {
//         items,
//         slug: parentSlugs,
//         usedTypes: currentPackage.types,
//         summaryPageId: order?.summaryPageId,
//     };
// }

// function toConfigRoot(
//     root: APIV1Read.ApiNavigationConfigRoot | undefined,
// ): DocsV1Read.ApiNavigationConfigRoot | undefined {
//     return root;
// }

// function maybeMergeSubpackages(subpackages: FlattenedSubpackage[], domain: string): FlattenedSubpackage[] {
//     if (domain.includes("assemblyai")) {
//         const realtimeIdx = subpackages.findIndex((subpackage) => subpackage.subpackageId === "subpackage_realtime");
//         const realtime = subpackages[realtimeIdx];
//         if (realtime != null) {
//             const subpackageIdx = subpackages.findIndex(
//                 (subpackage) => subpackage.subpackageId === "subpackage_streaming",
//             );
//             if (subpackageIdx !== -1) {
//                 const subpackage = subpackages[subpackageIdx];
//                 subpackages.splice(subpackageIdx, 1, {
//                     ...subpackage,
//                     items: [...realtime.items, ...subpackage.items],
//                 });
//                 subpackages.splice(realtimeIdx, 1);
//             }
//         }
//     }
//     return subpackages;
// }
// function isStreamResponse(response: APIV1Read.HttpResponse | undefined) {
//     if (response == null) {
//         return false;
//     }
//     return visitDiscriminatedUnion(response.type, "type")._visit<boolean>({
//         object: () => false,
//         reference: () => false,
//         fileDownload: () => false,
//         streamingText: () => true,
//         stream: () => true,
//         streamCondition: () => true,
//         _other: () => false,
//     });
// }

// function nameWithStreamSuffix(name: string) {
//     return name.toLowerCase().includes("stream") ? name : `${name} Stream`;
// }

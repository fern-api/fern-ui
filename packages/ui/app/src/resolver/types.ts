import type { APIV1Read, DocsV1Read, FdrAPI } from "@fern-api/fdr-sdk";
import { assertNever } from "@fern-ui/core-utils";
import { sortBy } from "lodash-es";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { SerializedMdxContent } from "../mdx/mdx";

type WithoutQuestionMarks<T> = {
    [K in keyof Required<T>]: undefined extends T[K] ? T[K] | undefined : T[K];
};

export type WithDescription = { description: MDXRemoteSerializeResult | string | undefined };
export type WithAvailability = { availability: APIV1Read.Availability | undefined };

export interface WithMetadata {
    description: MDXRemoteSerializeResult | string | undefined;
    availability: APIV1Read.Availability | undefined;
}

export function dereferenceObjectProperties(
    object: ResolvedObjectShape | ResolvedDiscriminatedUnionShapeVariant,
    types: Record<string, ResolvedTypeDefinition>,
): ResolvedObjectProperty[] {
    const directProperties = object.properties;
    const extendedProperties = object.extends.flatMap((typeId) => {
        const referencedShape = types[typeId] ?? {
            type: "unknown",
            availability: undefined,
            description: undefined,
        };
        const shape = unwrapReference(referencedShape, types);
        // TODO: should we be able to extend discriminated and undiscriminated unions?
        if (shape?.type !== "object") {
            // eslint-disable-next-line no-console
            console.error("Object extends non-object", typeId);
            return [];
        }
        return dereferenceObjectProperties(shape, types);
    });
    if (extendedProperties.length === 0) {
        // if there are no extended properties, we can just return the direct properties
        // required properties should come before optional properties
        // however, we do NOT sort the properties by key because the initial order of properties may be significant
        return sortBy(
            [...directProperties],
            (property) => unwrapReference(property.valueShape, types).type === "optional",
            (property) => (property.availability === "Deprecated" ? 2 : property.availability === "Beta" ? 1 : 0),
        );
    }
    const propertyKeys = new Set(object.properties.map((property) => property.key));
    const filteredExtendedProperties = extendedProperties.filter(
        (extendedProperty) => !propertyKeys.has(extendedProperty.key),
    );

    // required properties should come before optional properties
    // since there are extended properties, the initial order of properties are not significant, and we should sort by key
    return sortBy(
        [...directProperties, ...filteredExtendedProperties],
        (property) => unwrapReference(property.valueShape, types).type === "optional",
        (property) => (property.availability === "Deprecated" ? 2 : property.availability === "Beta" ? 1 : 0),
        (property) => property.key,
    );
}

// export type ResolvedNavigationItem =
//     | ResolvedNavigationItemPageGroup
//     | ResolvedNavigationItemApiSection
//     | ResolvedNavigationItemSection;

// export interface ResolvedNavigationItemPageGroup {
//     type: "pageGroup";
//     pages: ResolvedPageMetadata[];
// }

export interface ResolvedPageMetadata {
    id: DocsV1Read.PageId;
    slug: readonly string[];
    title: string;
    markdown: SerializedMdxContent;
}

export interface ResolvedNavigationItemApiSection
    extends WithoutQuestionMarks<Omit<DocsV1Read.ApiSection, "urlSlug" | "artifacts">>,
        ResolvedWithApiDefinition {
    type: "apiSection";
    auth: APIV1Read.ApiAuth | undefined;
    hasMultipleBaseUrls: boolean | undefined;
    slug: string[];
    types: Record<string, ResolvedTypeDefinition>;
    artifacts: DocsV1Read.ApiArtifacts | undefined;
}

export interface FlattenedRootPackage {
    auth: APIV1Read.ApiAuth | undefined;
    types: Record<string, ResolvedTypeDefinition>;
    apiDefinitions: ResolvedApiDefinition[];
}

export function flattenRootPackage(rootPackage: ResolvedRootPackage): FlattenedRootPackage {
    function getApiDefinitions(apiPackage: ResolvedApiDefinitionPackage): ResolvedApiDefinition[] {
        return apiPackage.items.flatMap((item) => {
            if (item.type === "subpackage") {
                return getApiDefinitions(item);
            }
            if (item.type === "page") {
                return [];
            }
            return [{ ...item, package: apiPackage }];
        });
    }

    return {
        auth: rootPackage.auth,
        types: rootPackage.types,
        apiDefinitions: getApiDefinitions(rootPackage),
    };
}

export interface ResolvedWithApiDefinition {
    items: ResolvedPackageItem[];
    slug: readonly string[];
}

export interface ResolvedApiPageMetadata extends ResolvedPageMetadata {
    type: "page";
}

export type ResolvedPackageItem =
    | ResolvedApiPageMetadata
    | ResolvedEndpointDefinition
    | ResolvedWebhookDefinition
    | ResolvedWebSocketChannel
    | ResolvedSubpackage;

interface ResolvedPackageItemVisitor<T> {
    page(item: ResolvedPageMetadata): T;
    endpoint(item: ResolvedEndpointDefinition): T;
    webhook(item: ResolvedWebhookDefinition): T;
    websocket(item: ResolvedWebSocketChannel): T;
    subpackage(item: ResolvedSubpackage): T;
}

export const ResolvedPackageItem = {
    visit: <T>(item: ResolvedPackageItem, visitor: ResolvedPackageItemVisitor<T>): T => {
        switch (item.type) {
            case "endpoint":
                return visitor.endpoint(item);
            case "webhook":
                return visitor.webhook(item);
            case "websocket":
                return visitor.websocket(item);
            case "subpackage":
                return visitor.subpackage(item);
            case "page":
                return visitor.page(item);
            default:
                assertNever(item);
        }
    },
};

export type ResolvedApiDefinition =
    | ResolvedApiDefinition.Endpoint
    | ResolvedApiDefinition.Webhook
    | ResolvedApiDefinition.WebSocket;

export declare namespace ResolvedApiDefinition {
    export interface Endpoint extends ResolvedEndpointDefinition {
        package: ResolvedApiDefinitionPackage;
    }

    export interface Webhook extends ResolvedWebhookDefinition {
        package: ResolvedApiDefinitionPackage;
    }

    export interface WebSocket extends ResolvedWebSocketChannel {
        package: ResolvedApiDefinitionPackage;
    }
}

export function isEndpoint(definition: ResolvedApiDefinition): definition is ResolvedApiDefinition.Endpoint {
    return definition.type === "endpoint";
}

export function isWebhook(definition: ResolvedApiDefinition): definition is ResolvedApiDefinition.Webhook {
    return definition.type === "webhook";
}

export function isWebSocket(definition: ResolvedApiDefinition): definition is ResolvedApiDefinition.WebSocket {
    return definition.type === "websocket";
}

export interface ResolvedSubpackage extends WithMetadata, ResolvedWithApiDefinition {
    type: "subpackage";
    apiSectionId: FdrAPI.ApiDefinitionId;
    id: APIV1Read.SubpackageId;
    name: string;
    title: string;
}

export function isResolvedSubpackage(item: ResolvedWithApiDefinition): item is ResolvedSubpackage {
    return (item as ResolvedSubpackage).type === "subpackage";
}

export interface ResolvedRootPackage extends ResolvedWithApiDefinition {
    type: "rootPackage";
    api: FdrAPI.ApiDefinitionId;
    auth: APIV1Read.ApiAuth | undefined;
    types: Record<string, ResolvedTypeDefinition>;
}

export type ResolvedApiDefinitionPackage = ResolvedRootPackage | ResolvedSubpackage;

export interface ResolvedEndpointDefinition extends WithMetadata {
    type: "endpoint";
    id: APIV1Read.EndpointId;
    apiSectionId: FdrAPI.ApiDefinitionId;
    apiPackageId: FdrAPI.ApiDefinitionId | APIV1Read.SubpackageId;
    slug: string[];
    auth: APIV1Read.ApiAuth | undefined;
    availability: APIV1Read.Availability | undefined;
    defaultEnvironment: APIV1Read.Environment | undefined;
    environments: APIV1Read.Environment[];
    method: APIV1Read.HttpMethod;
    name: string | undefined;
    title: string;
    path: ResolvedEndpointPathParts[];
    pathParameters: ResolvedObjectProperty[];
    queryParameters: ResolvedObjectProperty[];
    headers: ResolvedObjectProperty[];
    requestBody: ResolvedRequestBody[];
    responseBody: ResolvedResponseBody | undefined;
    errors: ResolvedError[];
    examples: ResolvedExampleEndpointCall[];
}

export interface ResolvedExampleEndpointCall {
    name: string | undefined;
    description: string | undefined;
    path: string;
    pathParameters: Record<string, unknown>;
    queryParameters: Record<string, unknown>;
    headers: Record<string, unknown>;
    requestBody: ResolvedExampleEndpointRequest | undefined;
    responseStatusCode: number;
    responseBody: ResolvedExampleEndpointResponse | undefined;
    // responseHast: Root | undefined;
    snippets: ResolvedCodeSnippet[];
}

export type ResolvedExampleEndpointRequest =
    | ResolvedExampleEndpointRequest.Json
    | ResolvedExampleEndpointRequest.Form
    | ResolvedExampleEndpointRequest.Stream;

export declare namespace ResolvedExampleEndpointRequest {
    interface Json {
        type: "json";
        value: unknown | undefined;
    }

    interface Form {
        type: "form";
        value: Record<string, ResolvedFormValue>;
    }

    interface Stream {
        type: "stream";
        fileName: string;
    }
}

export type ResolvedFormValue = ResolvedFormValue.Json | ResolvedFormValue.SingleFile | ResolvedFormValue.MultipleFiles;

export declare namespace ResolvedFormValue {
    interface Json {
        type: "json";
        value: unknown | undefined;
    }

    interface SingleFile {
        type: "file";
        fileName: string;
    }

    interface MultipleFiles {
        type: "fileArray";
        fileNames: string[];
    }
}

export type ResolvedExampleEndpointResponse =
    | ResolvedExampleEndpointResponse.Json
    | ResolvedExampleEndpointResponse.Filename
    | ResolvedExampleEndpointResponse.Stream;

export declare namespace ResolvedExampleEndpointResponse {
    interface Json {
        type: "json";
        value: unknown | undefined;
    }

    interface Filename {
        type: "filename";
        value: string;
    }

    interface Stream {
        type: "stream";
        value: unknown[];
    }
}
export interface ResolvedCodeSnippet {
    name: string | undefined;
    language: string;
    install: string | undefined;
    code: string;
    // hast: Root;
    generated: boolean;
}

export interface ResolvedRequestBody extends WithMetadata {
    contentType: string;
    shape: ResolvedHttpRequestBodyShape;
}

export interface ResolvedError extends WithMetadata {
    shape: ResolvedTypeShape | undefined;
    statusCode: number;
    name: string | undefined;
}

export interface ResolvedObjectProperty extends WithMetadata {
    key: APIV1Read.PropertyKey;
    valueShape: ResolvedTypeShape;
    hidden: boolean; // should be hidden in API reference, but present in examples and API Playground
}

export interface ResolvedResponseBody extends WithMetadata {
    shape: ResolvedHttpResponseBodyShape;
}

export type ResolvedEndpointPathParts = ResolvedEndpointPathParts.Literal | ResolvedEndpointPathParts.PathParameter;
export declare namespace ResolvedEndpointPathParts {
    interface Literal {
        type: "literal";
        value: string;
    }

    interface PathParameter extends ResolvedObjectProperty {
        type: "pathParameter";
    }
}

export function stringifyResolvedEndpointPathParts(pathParts: ResolvedEndpointPathParts[]): string {
    return pathParts.map((part) => (part.type === "literal" ? part.value : `:${part.key}`)).join("");
}

export interface ResolvedWebSocketChannel {
    type: "websocket";
    id: string;
    slug: string[];
    name: string | undefined;
    description: string | undefined;
    availability: APIV1Read.Availability | undefined;
    auth: APIV1Read.ApiAuth | undefined;
    defaultEnvironment: APIV1Read.Environment | undefined;
    environments: APIV1Read.Environment[];
    path: ResolvedEndpointPathParts[];
    headers: ResolvedObjectProperty[];
    pathParameters: ResolvedObjectProperty[];
    queryParameters: ResolvedObjectProperty[];
    messages: ResolvedWebSocketMessage[];
    examples: APIV1Read.ExampleWebSocketSession[];
}

export interface ResolvedWebSocketMessage extends WithMetadata {
    type: APIV1Read.WebSocketMessageId;
    body: ResolvedTypeShape;
    displayName: string | undefined;
    origin: APIV1Read.WebSocketMessageOrigin;
}

export interface ResolvedWebhookDefinition extends WithMetadata {
    type: "webhook";
    id: APIV1Read.WebhookId;
    slug: string[];

    method: APIV1Read.WebhookHttpMethod;
    name: string | undefined;
    path: string[];
    headers: ResolvedObjectProperty[];
    payload: ResolvedPayload;
    examples: ResolvedExampleWebhookPayload[];
}
export interface ResolvedExampleWebhookPayload {
    payload: unknown;
    // hast: Root;
}

export interface ResolvedPayload extends WithMetadata {
    shape: ResolvedTypeShape;
}

export interface ResolvedObjectShape extends WithMetadata {
    name: string | undefined;
    type: "object";
    extends: string[];
    properties: ResolvedObjectProperty[];
}

export interface ResolvedUndiscriminatedUnionShapeVariant extends WithMetadata {
    displayName: string | undefined;
    shape: ResolvedTypeShape;
}

export interface ResolvedUndiscriminatedUnionShape extends WithMetadata {
    name: string | undefined;
    type: "undiscriminatedUnion";
    variants: ResolvedUndiscriminatedUnionShapeVariant[];
}

export interface ResolvedDiscriminatedUnionShapeVariant extends WithMetadata {
    discriminantValue: string;
    extends: string[];
    properties: ResolvedObjectProperty[];
}

export interface ResolvedDiscriminatedUnionShape extends WithMetadata {
    name: string | undefined;
    type: "discriminatedUnion";
    discriminant: string;
    variants: ResolvedDiscriminatedUnionShapeVariant[];
}

export interface ResolvedOptionalShape extends WithMetadata {
    type: "optional";
    shape: NonOptionalTypeShapeWithReference;
    defaultsTo: unknown | undefined;
}

export interface ResolvedListShape extends WithMetadata {
    type: "list";
    shape: ResolvedTypeShape;
}

export interface ResolvedSetShape extends WithMetadata {
    type: "set";
    shape: ResolvedTypeShape;
}

export interface ResolvedMapShape extends WithMetadata {
    type: "map";
    keyShape: ResolvedTypeShape;
    valueShape: ResolvedTypeShape;
}

export type ResolvedTypeDefinition =
    | ResolvedObjectShape
    | ResolvedUndiscriminatedUnionShape
    | ResolvedDiscriminatedUnionShape
    | ResolvedEnumShape
    | ResolvedAliasShape
    | (APIV1Read.TypeReference.Unknown & WithMetadata);

interface ResolvedEnumShape extends WithMetadata {
    name: string | undefined;
    type: "enum";
    values: ResolvedEnumValue[];
}

export interface ResolvedEnumValue extends WithMetadata {
    value: string;
}

interface ResolvedAliasShape extends WithMetadata {
    name: string | undefined;
    type: "alias";
    shape: ResolvedTypeShape;
}

export type ResolvedTypeShape =
    | ResolvedTypeDefinition
    | (APIV1Read.PrimitiveType & WithMetadata)
    | ResolvedOptionalShape
    | ResolvedListShape
    | ResolvedSetShape
    | ResolvedMapShape
    | (APIV1Read.LiteralType & WithMetadata)
    | APIV1Read.TypeReference.Unknown
    | ResolvedReferenceShape;

export type DereferencedTypeShape = Exclude<ResolvedTypeShape, ResolvedReferenceShape>;
export type NonOptionalTypeShape = Exclude<DereferencedTypeShape, ResolvedOptionalShape>;
export type NonOptionalTypeShapeWithReference = Exclude<ResolvedTypeShape, ResolvedOptionalShape>;

export interface ResolvedReferenceShape {
    type: "reference";
    typeId: string;
}

export declare namespace ResolvedFileUploadRequestProperty {
    interface FileProperty extends WithMetadata {
        type: "file";
        key: string;
        isOptional: boolean;
    }
    interface FileArrayProperty extends WithMetadata {
        type: "fileArray";
        key: string;
        isOptional: boolean;
    }

    interface BodyProperty extends ResolvedObjectProperty {
        type: "bodyProperty";
    }
}

export type ResolvedFileUploadRequestProperty =
    | ResolvedFileUploadRequestProperty.FileProperty
    | ResolvedFileUploadRequestProperty.FileArrayProperty
    | ResolvedFileUploadRequestProperty.BodyProperty;

export interface ResolvedFileUploadRequest extends WithMetadata {
    name: string;
    properties: ResolvedFileUploadRequestProperty[];
}

export interface ResolvedFileUpload {
    type: "fileUpload";
    value: ResolvedFileUploadRequest | undefined;
}

export type ResolvedHttpRequestBodyShape =
    | ResolvedFileUpload
    | APIV1Read.HttpRequestBodyShape.Bytes
    | ResolvedTypeShape;

interface ResolvedHttpRequestBodyShapeVisitor<T> {
    fileUpload: (shape: ResolvedFileUpload) => T;
    bytes: (shape: APIV1Read.BytesRequest) => T;
    typeShape: (shape: ResolvedTypeShape) => T;
}

export function visitResolvedHttpRequestBodyShape<T>(
    shape: ResolvedHttpRequestBodyShape,
    visitor: ResolvedHttpRequestBodyShapeVisitor<T>,
): T {
    if (shape.type === "fileUpload") {
        return visitor.fileUpload(shape);
    } else if (shape.type === "bytes") {
        return visitor.bytes(shape);
    } else {
        return visitor.typeShape(shape);
    }
}

export interface ResolvedStreamShape {
    type: "stream";
    value: ResolvedTypeShape;
}

export type ResolvedHttpResponseBodyShape =
    | APIV1Read.HttpResponseBodyShape.FileDownload
    | APIV1Read.HttpResponseBodyShape.StreamingText
    | APIV1Read.HttpResponseBodyShape.StreamCondition
    | ResolvedStreamShape
    | ResolvedTypeShape;

interface ResolvedHttpResponseBodyShapeVisitor<T> {
    fileDownload: (shape: APIV1Read.HttpResponseBodyShape.FileDownload) => T;
    streamingText: (shape: APIV1Read.HttpResponseBodyShape.StreamingText) => T;
    streamCondition: (shape: APIV1Read.HttpResponseBodyShape.StreamCondition) => T;
    stream: (shape: ResolvedStreamShape) => T;
    typeShape: (shape: ResolvedTypeShape) => T;
}

export function visitResolvedHttpResponseBodyShape<T>(
    shape: ResolvedHttpResponseBodyShape,
    visitor: ResolvedHttpResponseBodyShapeVisitor<T>,
): T {
    switch (shape.type) {
        case "fileDownload":
            return visitor.fileDownload(shape);
        case "streamingText":
            return visitor.streamingText(shape);
        case "streamCondition":
            return visitor.streamCondition(shape);
        case "stream":
            return visitor.stream(shape);
        default:
            return visitor.typeShape(shape);
    }
}

export function unwrapReference(
    shape: ResolvedTypeShape,
    types: Record<string, ResolvedTypeDefinition>,
): DereferencedTypeShape {
    if (shape.type === "reference") {
        const nestedShape = types[shape.typeId];
        if (nestedShape == null) {
            return { type: "unknown", availability: undefined, description: undefined };
        }
        return unwrapReference(nestedShape, types);
    }
    return shape;
}

export function unwrapOptional(
    shape: ResolvedTypeShape,
    types: Record<string, ResolvedTypeDefinition>,
): NonOptionalTypeShape {
    shape = unwrapReference(shape, types);
    if (shape.type === "optional") {
        return unwrapOptional(shape.shape, types);
    }
    return shape;
}

// This hack is no longer needed since it was introduced for Hume's demo only.
// keeping this around in case we need to re-introduce it.

// HACK: remove this function when we have a proper way to merge content types
// function mergeContentTypes(definitions: ResolvedEndpointDefinition[]): ResolvedEndpointDefinition[] {
//     const toRet: ResolvedEndpointDefinition[] = [];

//     definitions.forEach((definition) => {
//         if (!definition.id.endsWith("_multipart")) {
//             toRet.push(definition);
//         }
//     });

//     definitions.forEach((definition) => {
//         if (definition.id.endsWith("_multipart")) {
//             const baseId = definition.id.replace("_multipart", "");
//             const baseDefinition = toRet.find((def) => def.id === baseId);
//             if (baseDefinition) {
//                 baseDefinition.requestBody = [...baseDefinition.requestBody, ...definition.requestBody];
//             } else {
//                 toRet.push(definition);
//             }
//         }
//     });

//     return toRet;
// }

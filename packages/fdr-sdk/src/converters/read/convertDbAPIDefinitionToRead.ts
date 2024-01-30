import { APIV1Db, APIV1Read } from "../../client";
import { WithoutQuestionMarks } from "../utils/WithoutQuestionMarks";
import { assertNever } from "../utils/assertNever";

export function convertDbAPIDefinitionsToRead(dbApiDefinitions: Record<string, APIV1Db.DbApiDefinition>) {
    return Object.fromEntries(
        Object.entries(dbApiDefinitions).map(([id, dbDefinition]) => {
            const parsedApiDefinition = convertDbAPIDefinitionToRead(dbDefinition);
            return [id, parsedApiDefinition];
        }),
    );
}

export function convertDbAPIDefinitionToRead(
    dbShape: APIV1Db.DbApiDefinition,
): WithoutQuestionMarks<APIV1Read.ApiDefinition> {
    return {
        id: dbShape.id,
        rootPackage: {
            endpoints: dbShape.rootPackage.endpoints.map((endpoint) => transformEndpoint({ dbShape: endpoint })),
            subpackages: dbShape.rootPackage.subpackages,
            types: dbShape.rootPackage.types,
            webhooks: dbShape.rootPackage.webhooks ?? [],
        },
        types: dbShape.types,
        subpackages: Object.fromEntries(
            Object.entries(dbShape.subpackages).map(([id, subpackage]) => {
                return [id, transformSubpackage({ dbShape: subpackage })];
            }),
        ),
        auth: dbShape.auth,
        hasMultipleBaseUrls: dbShape.hasMultipleBaseUrls,
    };
}

function transformSubpackage({
    dbShape,
}: {
    dbShape: APIV1Db.DbApiDefinitionSubpackage;
}): WithoutQuestionMarks<APIV1Read.ApiDefinitionSubpackage> {
    return {
        subpackageId: dbShape.subpackageId,
        parent: dbShape.parent,
        name: dbShape.name,
        endpoints: dbShape.endpoints.map((endpoint) => transformEndpoint({ dbShape: endpoint })),
        types: dbShape.types,
        subpackages: dbShape.subpackages,
        pointsTo: dbShape.pointsTo,
        urlSlug: dbShape.urlSlug,
        description: dbShape.description,
        htmlDescription: dbShape.htmlDescription,
        webhooks: dbShape.webhooks ?? [],
        descriptionContainsMarkdown: dbShape.descriptionContainsMarkdown,
    };
}

function transformEndpoint({
    dbShape,
}: {
    dbShape: APIV1Db.DbEndpointDefinition;
}): WithoutQuestionMarks<APIV1Read.EndpointDefinition> {
    return {
        environments: dbShape.environments ?? [],
        availability: dbShape.availability,
        defaultEnvironment: dbShape.defaultEnvironment,
        urlSlug: dbShape.urlSlug,
        migratedFromUrlSlugs: dbShape.migratedFromUrlSlugs,
        method: dbShape.method,
        id: dbShape.id,
        name: dbShape.name,
        path: dbShape.path,
        queryParameters: dbShape.queryParameters,
        headers: dbShape.headers,
        request: dbShape.request != null ? transformHttpRequest({ dbShape: dbShape.request }) : undefined,
        response: dbShape.response,
        errors: dbShape.errors ?? [],
        errorsV2:
            dbShape.errorsV2 ??
            (dbShape.errors != null
                ? dbShape.errors.map((error) => {
                      return {
                          ...error,
                          type:
                              error.type != null
                                  ? {
                                        type: "alias",
                                        value: error.type,
                                    }
                                  : undefined,
                      };
                  })
                : undefined),
        examples: dbShape.examples.map((example) => convertExampleEndpointCall({ dbShape: example })),
        description: dbShape.description,
        htmlDescription: dbShape.htmlDescription,
        authed: dbShape.authed ?? false,
        descriptionContainsMarkdown: dbShape.descriptionContainsMarkdown,
        customCodeSamples: dbShape.customCodeSamples ?? [],
    };
}

function transformHttpRequest({
    dbShape,
}: {
    dbShape: APIV1Db.DbHttpRequest;
}): WithoutQuestionMarks<APIV1Read.HttpRequest> {
    switch (dbShape.type.type) {
        case "object":
            return {
                contentType: dbShape.contentType ?? "application/json",
                description: dbShape.description,
                htmlDescription: dbShape.htmlDescription,
                type: dbShape.type,
                descriptionContainsMarkdown: dbShape.descriptionContainsMarkdown,
            };
        case "reference":
            return {
                contentType: dbShape.contentType ?? "application/json",
                description: dbShape.description,
                htmlDescription: dbShape.htmlDescription,
                type: dbShape.type,
                descriptionContainsMarkdown: dbShape.descriptionContainsMarkdown,
            };
        case "fileUpload":
            return {
                contentType: dbShape.contentType ?? "multipart/form-data",
                description: dbShape.description,
                htmlDescription: dbShape.htmlDescription,
                type: dbShape.type,
                descriptionContainsMarkdown: dbShape.descriptionContainsMarkdown,
            };
        default:
            assertNever(dbShape.type);
    }
}

export function convertExampleEndpointCall({
    dbShape,
}: {
    dbShape: APIV1Read.ExampleEndpointCall;
}): WithoutQuestionMarks<APIV1Read.ExampleEndpointCall> {
    return {
        name: dbShape.name,
        description: dbShape.description,
        htmlDescription: dbShape.htmlDescription,
        descriptionContainsMarkdown: true,
        path: dbShape.path,
        pathParameters: dbShape.pathParameters,
        queryParameters: dbShape.queryParameters,
        headers: dbShape.headers,
        requestBody: dbShape.requestBody,
        responseStatusCode: dbShape.responseStatusCode,
        responseBody: dbShape.responseBody,
        codeExamples: dbShape.codeExamples,
        requestBodyV3:
            dbShape.requestBodyV3 ?? dbShape.requestBody != null
                ? {
                      type: "json",
                      value: dbShape.requestBody,
                  }
                : undefined,
        responseBodyV3:
            dbShape.responseBodyV3 ?? dbShape.responseBody != null
                ? {
                      type: "json",
                      value: dbShape.responseBody,
                  }
                : undefined,
    };
}

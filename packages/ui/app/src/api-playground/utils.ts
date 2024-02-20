import { APIV1Read } from "@fern-api/fdr-sdk";
import { isPlainObject, visitDiscriminatedUnion } from "@fern-ui/core-utils";
import { isEmpty, noop } from "lodash-es";
import {
    ResolvedEndpointDefinition,
    ResolvedEndpointPathParts,
    ResolvedHttpRequestBodyShape,
    ResolvedObjectProperty,
    ResolvedParameter,
    ResolvedTypeReference,
} from "../util/resolver";
import { PlaygroundRequestFormState } from "./types";

export function unknownToString(value: unknown): string {
    if (typeof value === "string") {
        return value;
    }
    if (typeof value === "boolean") {
        return value ? "true" : "false";
    }
    if (typeof value === "number") {
        return value.toString();
    }
    if (value == null) {
        return "";
    }
    return JSON.stringify(value);
}

export function castToRecord(value: unknown): Record<string, unknown> {
    if (!isPlainObject(value)) {
        return {};
    }
    return value;
}

export function buildQueryParams(queryParameters: Record<string, unknown> | undefined): string {
    if (queryParameters == null) {
        return "";
    }
    const queryParams = new URLSearchParams();
    Object.entries(queryParameters).forEach(([key, value]) => {
        queryParams.set(key, unknownToString(value));
    });
    return queryParams.size > 0 ? "?" + queryParams.toString() : "";
}

function buildPath(path: ResolvedEndpointPathParts[], pathParameters?: Record<string, unknown>): string {
    return path
        .map((part) => {
            if (part.type === "pathParameter") {
                const stateValue = unknownToString(pathParameters?.[part.key]);
                return stateValue.length > 0 ? encodeURI(stateValue) : ":" + part.key;
            }
            return part.value;
        })
        .join("");
}

export function buildRequestUrl(
    baseUrl: string = "",
    path: ResolvedEndpointPathParts[] = [],
    pathParameters: Record<string, unknown> = {},
    queryParameters: Record<string, unknown> = {},
): string {
    return baseUrl + buildPath(path, pathParameters) + buildQueryParams(queryParameters);
}

export function buildEndpointUrl(
    endpoint: ResolvedEndpointDefinition | undefined,
    formState: PlaygroundRequestFormState | undefined,
): string {
    return buildRequestUrl(
        endpoint?.defaultEnvironment?.baseUrl,
        endpoint?.path,
        formState?.pathParameters,
        formState?.queryParameters,
    );
}

export function indentAfter(str: string, indent: number, afterLine?: number): string {
    return str
        .split("\n")
        .map((line, idx) => {
            if (afterLine == null || idx > afterLine) {
                return " ".repeat(indent) + line;
            }
            return line;
        })
        .join("\n");
}

export function stringifyFetch(
    auth: APIV1Read.ApiAuth | undefined,
    endpoint: ResolvedEndpointDefinition | undefined,
    formState: PlaygroundRequestFormState,
    redacted = true,
): string {
    if (endpoint == null) {
        return "";
    }
    const headers = redacted
        ? buildRedactedHeaders(auth, endpoint, formState)
        : buildUnredactedHeaders(auth, endpoint, formState);
    return `// ${endpoint.name} (${endpoint.method} ${endpoint.path
        .map((part) => (part.type === "literal" ? part.value : `:${part.key}`))
        .join("")})
const response = fetch("${buildEndpointUrl(endpoint, formState)}", {
  method: "${endpoint.method}",
  headers: ${indentAfter(JSON.stringify(headers, undefined, 2), 2, 0)},${
      endpoint.requestBody?.contentType === "application/json" &&
      !isEmpty(formState.body) &&
      endpoint.requestBody.shape.type !== "fileUpload"
          ? `\n  body: JSON.stringify(${indentAfter(JSON.stringify(formState.body, undefined, 2), 2, 0)}),`
          : ""
  }
});

const body = await response.json();
console.log(body);`;
}

export function stringifyPythonRequests(
    auth: APIV1Read.ApiAuth | undefined,
    endpoint: ResolvedEndpointDefinition | undefined,
    formState: PlaygroundRequestFormState,
    redacted = true,
): string {
    if (endpoint == null) {
        return "";
    }
    const headers = redacted
        ? buildRedactedHeaders(auth, endpoint, formState)
        : buildUnredactedHeaders(auth, endpoint, formState);
    return `import requests

# ${endpoint.name} (${endpoint.method} ${buildPath(endpoint.path)})
response = requests.${endpoint.method.toLowerCase()}(
  "${buildEndpointUrl(endpoint, formState)}",
  headers=${indentAfter(JSON.stringify(headers, undefined, 2), 2, 0)},${
      endpoint.requestBody?.contentType === "application/json" &&
      !isEmpty(formState.body) &&
      endpoint.requestBody.shape.type !== "fileUpload"
          ? `\n  json=${indentAfter(JSON.stringify(formState.body, undefined, 2), 2, 0)},`
          : ""
  }
)

print(response.json())`;
}

export function obfuscateSecret(secret: string): string {
    if (secret.trimEnd().length === 0) {
        return secret;
    }
    if (secret.length < 28) {
        return secret.slice(0, 1) + "*".repeat(25) + secret.slice(-2);
    }
    return secret.slice(0, 12) + "...." + secret.slice(-12);
}

function buildRedactedHeaders(
    auth: APIV1Read.ApiAuth | undefined,
    endpoint: ResolvedEndpointDefinition,
    formState: PlaygroundRequestFormState,
): Record<string, string> {
    const headers: Record<string, string> = {};
    endpoint.headers.forEach((header) => {
        if (formState.headers[header.key] != null) {
            headers[header.key] = unknownToString(formState.headers[header.key]);
        }
    });

    if (endpoint.requestBody?.contentType != null) {
        headers["Content-Type"] = endpoint.requestBody.contentType;
    }

    if (auth != null && endpoint.authed && formState.auth != null) {
        visitDiscriminatedUnion(formState.auth, "type")._visit({
            bearerAuth: (bearerAuth) => {
                if (auth.type === "bearerAuth") {
                    headers["Authorization"] = `Bearer ${obfuscateSecret(bearerAuth.token)}`;
                }
            },
            header: (header) => {
                if (auth.type === "header") {
                    const value = header.headers[auth.headerWireValue];
                    if (value != null) {
                        headers[auth.headerWireValue] = obfuscateSecret(value);
                    }
                }
            },
            basicAuth: (basicAuth) => {
                if (auth.type === "basicAuth") {
                    headers["Authorization"] = `Basic ${btoa(
                        `${basicAuth.username}:${obfuscateSecret(basicAuth.password)}`,
                    )}`;
                }
            },
            _other: noop,
        });
    }

    return headers;
}

export function buildUnredactedHeaders(
    auth: APIV1Read.ApiAuth | undefined,
    endpoint: ResolvedEndpointDefinition | undefined,
    formState: PlaygroundRequestFormState | undefined,
): Record<string, string> {
    const headers: Record<string, string> = {};
    if (endpoint == null) {
        return headers;
    }
    endpoint.headers.forEach((header) => {
        if (formState?.headers[header.key] != null) {
            headers[header.key] = unknownToString(formState.headers[header.key]);
        }
    });

    if (endpoint.requestBody?.contentType != null) {
        headers["Content-Type"] = endpoint.requestBody.contentType;
    }

    if (auth != null && endpoint.authed && formState?.auth != null) {
        visitDiscriminatedUnion(formState?.auth, "type")._visit({
            bearerAuth: (bearerAuth) => {
                if (auth.type === "bearerAuth") {
                    headers["Authorization"] = `Bearer ${bearerAuth.token}`;
                }
            },
            header: (header) => {
                if (auth.type === "header") {
                    const value = header.headers[auth.headerWireValue];
                    if (value != null) {
                        headers[auth.headerWireValue] = value;
                    }
                }
            },
            basicAuth: (basicAuth) => {
                if (auth.type === "basicAuth") {
                    headers["Authorization"] = `Basic ${btoa(`${basicAuth.username}:${basicAuth.password}`)}`;
                }
            },
            _other: noop,
        });
    }

    return headers;
}

export function stringifyCurl(
    auth: APIV1Read.ApiAuth | undefined,
    endpoint: ResolvedEndpointDefinition | undefined,
    formState: PlaygroundRequestFormState,
    redacted = true,
): string {
    if (endpoint == null) {
        return "";
    }
    const headers = redacted
        ? buildRedactedHeaders(auth, endpoint, formState)
        : buildUnredactedHeaders(auth, endpoint, formState);
    return `curl -X ${endpoint.method} "${buildEndpointUrl(endpoint, formState)}"${Object.entries(headers)
        .map(([key, value]) => ` \\\n     -H "${key}: ${value}"`)
        .join("")}${
        endpoint.requestBody?.contentType === "application/json" &&
        !isEmpty(formState.body) &&
        endpoint.requestBody.shape.type !== "fileUpload"
            ? ` \\\n     -d '${
                  redacted
                      ? JSON.stringify(formState.body, undefined, 2)
                      : JSON.stringify(JSON.stringify(formState.body))
              }'`
            : ""
    }
`;
}

export function getDefaultValueForObjectProperties(properties: ResolvedObjectProperty[]): Record<string, unknown> {
    return properties.reduce<Record<string, unknown>>((acc, property) => {
        acc[property.key] = getDefaultValueForType(property.valueShape);
        return acc;
    }, {});
}

export function matchesTypeReference(shape: ResolvedTypeReference, value: unknown): boolean {
    return visitDiscriminatedUnion(shape, "type")._visit<boolean>({
        object: (object) => {
            if (!isPlainObject(value)) {
                return false;
            }
            const propertyMap = new Map<string, ResolvedObjectProperty>();
            object.properties().forEach((property) => propertyMap.set(property.key, property));
            return Object.keys(value).every((key) => {
                const property = propertyMap.get(key);
                if (property == null) {
                    return false;
                }
                return matchesTypeReference(property.valueShape, value[key]);
            });
        },
        discriminatedUnion: (discriminatedUnion) => {
            if (!isPlainObject(value)) {
                return false;
            }
            const discriminantValue = value[discriminatedUnion.discriminant];
            if (typeof discriminantValue !== "string") {
                return false;
            }

            return discriminatedUnion.variants.some((variant) => {
                if (variant.discriminantValue !== discriminantValue) {
                    return false;
                }

                const propertyMap = new Map<string, ResolvedObjectProperty>();
                variant.additionalProperties.forEach((property) => propertyMap.set(property.key, property));
                return Object.keys(value).every((key) => {
                    if (key === discriminatedUnion.discriminant) {
                        return true;
                    }
                    const property = propertyMap.get(key);
                    if (property == null) {
                        return false;
                    }
                    return matchesTypeReference(property.valueShape, value[key]);
                });
            });
        },
        undiscriminatedUnion: (undiscriminatedUnion) =>
            undiscriminatedUnion.variants.some((variant) => matchesTypeReference(variant.shape, value)),
        enum: (enumType) => {
            if (typeof value !== "string") {
                return false;
            }
            return enumType.values.some((enumValue) => enumValue.value === value);
        },
        string: () => typeof value === "string",
        boolean: () => typeof value === "boolean",
        integer: () => typeof value === "number" && Number.isInteger(value),
        double: () => typeof value === "number",
        long: () => typeof value === "number" && Number.isInteger(value),
        datetime: () => value instanceof Date,
        uuid: () => typeof value === "string",
        base64: () => typeof value === "string",
        date: () => value instanceof Date,
        optional: (optionalType) => value == null || matchesTypeReference(optionalType.shape, value),
        list: (listType) => Array.isArray(value) && value.every((item) => matchesTypeReference(listType.shape, item)),
        set: (setType) => Array.isArray(value) && value.every((item) => matchesTypeReference(setType.shape, item)),
        map: (MapTypeContextProvider) =>
            isPlainObject(value) &&
            Object.keys(value).every((key) => matchesTypeReference(MapTypeContextProvider.valueShape, value[key])),
        stringLiteral: (literalType) => value === literalType.value,
        booleanLiteral: (literalType) => value === literalType.value,
        unknown: () => value == null,
        _other: () => value == null,
        reference: (reference) => matchesTypeReference(reference.shape(), value),
    });
}

export function getDefaultValueForTypes(types: ResolvedParameter[] = []): Record<string, unknown> {
    if (types == null) {
        return {};
    }
    return types.reduce<Record<string, unknown>>((acc, { key, shape }) => {
        acc[key] = getDefaultValueForType(shape);
        return acc;
    }, {});
}

export function getDefaultValuesForBody(requestShape: ResolvedHttpRequestBodyShape | undefined): unknown {
    if (requestShape == null) {
        return {};
    } else if (requestShape.type === "fileUpload") {
        return null;
    } else if (requestShape.type === "object") {
        return getDefaultValueForObjectProperties(requestShape.properties());
    } else {
        return getDefaultValueForType(requestShape);
    }
}

export function getDefaultValueForType(shape: ResolvedTypeReference): unknown {
    return visitDiscriminatedUnion(shape, "type")._visit<unknown>({
        object: (object) => getDefaultValueForObjectProperties(object.properties()),
        discriminatedUnion: (discriminatedUnion) => {
            const variant = discriminatedUnion.variants[0];

            if (variant == null) {
                return undefined;
            }

            return {
                ...getDefaultValueForObjectProperties(variant.additionalProperties),
                [discriminatedUnion.discriminant]: variant.discriminantValue,
            };
        },
        undiscriminatedUnion: (undiscriminatedUnion) => {
            const variant = undiscriminatedUnion.variants[0];
            if (variant == null) {
                return undefined;
            }
            return getDefaultValueForType(variant.shape);
        },
        // if enum.length === 1, select it, otherwise, we don't presume to select an incorrect enum.
        enum: (value) => (value.values.length === 1 ? value.values[0]?.value : null),
        string: () => "",
        boolean: () => false,
        integer: () => 0,
        double: () => 0,
        long: () => 0,
        datetime: () => new Date().toISOString(),
        uuid: () => "",
        base64: () => "",
        date: () => new Date().toISOString(),
        optional: () => undefined,
        list: () => [],
        set: () => [],
        map: () => ({}),
        stringLiteral: (literal) => literal.value,
        booleanLiteral: (literal) => literal.value,
        unknown: () => undefined,
        _other: () => undefined,
        reference: (reference) => getDefaultValueForType(reference.shape()),
    });
}

export function isExpandable(valueShape: ResolvedTypeReference, currentValue: unknown): boolean {
    return visitDiscriminatedUnion(valueShape, "type")._visit<boolean>({
        object: () => false,
        discriminatedUnion: () => false,
        undiscriminatedUnion: () => false,
        enum: () => false,
        optional: (optional) => isExpandable(optional.shape, currentValue),
        list: () => Array.isArray(currentValue) && currentValue.length > 0,
        set: () => Array.isArray(currentValue) && currentValue.length > 0,
        map: () => isPlainObject(currentValue) && Object.keys(currentValue).length > 0,
        unknown: () => false,
        _other: () => false,
        string: () => false,
        boolean: () => false,
        integer: () => false,
        double: () => false,
        long: () => false,
        datetime: () => false,
        uuid: () => false,
        base64: () => false,
        date: () => false,
        booleanLiteral: () => false,
        stringLiteral: () => false,
        reference: (reference) => isExpandable(reference.shape(), currentValue),
    });
}

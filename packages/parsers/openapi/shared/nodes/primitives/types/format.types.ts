// Copied from https://spec.openapis.org/registry/format/

export type OpenApiNumberTypeFormat =
    | "decimal"
    | "decimal128"
    | "double-int"
    | "double"
    | "float"
    | "sf-decimal"
    | undefined;
export type OpenApiIntegerTypeFormat = "int16" | "int32" | "int64" | "int8" | "sf-integer" | "uint8" | undefined;
export type OpenApiStringTypeFormat =
    | "base64url"
    | "binary"
    | "byte"
    | "char"
    | "commonmark"
    | "date-time"
    | "date"
    | "decimal"
    | "decimal128"
    | "duration"
    | "email"
    | "hostname"
    | "html"
    | "http-date"
    | "idn-email"
    | "idn-hostname"
    | "int64"
    | "ipv4"
    | "ipv6"
    | "iri-reference"
    | "iri"
    | "json-pointer"
    | "media-range"
    | "password"
    | "regex"
    | "relative-json-pointer"
    | "sf-binary"
    | "sf-boolean"
    | "sf-string"
    | "sf-token"
    | "time"
    | "uri-reference"
    | "uri-template"
    | "uri"
    | "uuid"
    | undefined;

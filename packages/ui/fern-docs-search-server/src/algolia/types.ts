import { z } from "zod";

// in order of priority:
export const SEARCHABLE_ATTRIBUTES = [
    "title",
    "description,payload_description,request_description,response_description",
    "unordered(content)",
    "endpoint_path",
    "parameter_name",

    // types (lower priority)
    "availability",
    "api_type",
    "method",
    "section_type",
    "subsection_type",
    "response_type",
    "status_code",
    "parameter_type",

    // make code snippets searchable
    "unordered(code_snippets.code)",

    // hierarchy (in descending order of priority)
    "hierarchy.h6.title,hierarchy.h5.title,hierarchy.h4.title,hierarchy.h3.title,hierarchy.h2.title,hierarchy.h1.title",
] as const;

// these are metadata fields that we do not want to include in the search hits:
export const DISTINCT_FACET_ATTRIBUTES = ["org_id", "domain", "visible_by", "authed"] as const;

export const BaseRecordSchema = z.object({
    objectID: z.string().describe("The unique identifier of this record"),
    org_id: z.string().describe("The Fern Organization ID"),
    domain: z.string().describe("The domain where the docs instance is hosted"),
    pathname: z.string().describe("The pathname of the page (with leading slash)"),
    icon: z.string().optional(),
    hash: z.string().optional(),
    title: z.string().describe("The title of the page, as specified in the frontmatter or docs.yml"),
    availability: z
        .enum(["Stable", "GenerallyAvailable", "InDevelopment", "PreRelease", "Deprecated", "Beta"])
        .optional(),
    description: z
        .string()
        .optional()
        .describe("The description of the page. This should be rendered unless a highlighted snippet is returned"),
    code_snippets: z
        .array(z.object({ lang: z.string().optional(), meta: z.string().optional(), code: z.string() }))
        .optional(),
    breadcrumb: z
        .array(z.object({ title: z.string(), pathname: z.string().optional() }))
        .describe("The breadcrumb of this record"),
    product: z.object({ id: z.string(), title: z.string() }).optional(),
    version: z.object({ id: z.string(), title: z.string() }).optional(),
    tab: z.object({ title: z.string() }).optional(),
    visible_by: z.array(z.string()).describe("The roles that can view this record"),
    authed: z.boolean().describe("Whether this record requires authentication to view"),
});

const HierarchySchema = z
    .object({
        h0: z.object({ title: z.string() }).optional(),
        h1: z.object({ id: z.string(), title: z.string() }).optional(),
        h2: z.object({ id: z.string(), title: z.string() }).optional(),
        h3: z.object({ id: z.string(), title: z.string() }).optional(),
        h4: z.object({ id: z.string(), title: z.string() }).optional(),
        h5: z.object({ id: z.string(), title: z.string() }).optional(),
        h6: z.object({ id: z.string(), title: z.string() }).optional(),
    })
    .describe(
        "The hierarchy of this record, within a markdown document. This will be useful for nesting markdown records under other markdown records",
    );

export const MarkdownRecordSchema = BaseRecordSchema.extend({
    type: z.literal("markdown"),
    content: z
        .string()
        .optional()
        .describe(
            "The raw markdown of this record. This must be raw markdown because it will be used as a document input to for conversational search. Unlike the description field, this should NOT be rendered by default.",
        ),
    hierarchy: HierarchySchema.optional(),
    level: z
        .enum(["h0", "h1", "h2", "h3", "h4", "h5", "h6"])
        .optional()
        .describe(
            "For convenience, this is the lowest indexable level described in the hierarchy, which identifies the rank of the content of this record",
        ),
});

export const ChangelogRecordSchema = BaseRecordSchema.extend({
    type: z.literal("changelog"),
    content: z
        .string()
        .optional()
        .describe(
            "The raw markdown of this record. This must be raw markdown because it will be used as a document input to for conversational search.",
        ),
    date: z.string().describe("YYYY-MM-DD"),
    date_timestamp: z.number().optional().describe("The timestamp of the date, in seconds since epoch"),
});

const EndpointBaseRecordSchema = BaseRecordSchema.extend({
    api_definition_id: z.string(),
    api_endpoint_id: z.string(),
    api_type: z.enum(["http", "webhook", "websocket"]),
    method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
    endpoint_path: z.string(),
    response_type: z.enum(["stream"]).optional(),
    environments: z.array(z.object({ id: z.string(), url: z.string() })).optional(),
    default_environment_id: z.string().optional(),
});

export const ApiReferenceRecordSchema = EndpointBaseRecordSchema.extend({
    type: z.literal("api-reference"),
    payload_description: z.string().optional(),
    request_description: z.string().optional(),
    response_description: z.string().optional(),
});

export const ParameterRecordSchema = EndpointBaseRecordSchema.extend({
    type: z.literal("parameter"),
    section_type: z.enum(["request", "response", "payload"]).optional(),
    subsection_type: z.enum(["header", "path", "query", "body"]).optional(),
    websocket_origin: z.enum(["client", "server"]).optional(),
    status_code: z.string().optional(), // anything >= 400 is considered an error
    parameter_breadcrumb: z.array(
        z.object({
            key: z.string(),
            display_name: z.string().optional(),
            optional: z.boolean().optional(),
        }),
    ),
    parameter_name: z.string(),
    parameter_type: z
        .string()
        .optional()
        .describe("The type of this parameter, i.e. string, integer, boolean, object, literal_value, etc."),
});

export const AlgoliaRecordSchema = z.discriminatedUnion("type", [
    MarkdownRecordSchema,
    ChangelogRecordSchema,
    ApiReferenceRecordSchema,
    ParameterRecordSchema,
]);

export type BaseRecord = z.infer<typeof BaseRecordSchema>;
export type EndpointBaseRecord = z.infer<typeof EndpointBaseRecordSchema>;
export type MarkdownRecord = z.infer<typeof MarkdownRecordSchema>;
export type ChangelogRecord = z.infer<typeof ChangelogRecordSchema>;
export type ApiReferenceRecord = z.infer<typeof ApiReferenceRecordSchema>;
export type ParameterRecord = z.infer<typeof ParameterRecordSchema>;
export type AlgoliaRecord = z.infer<typeof AlgoliaRecordSchema>;
export type Hierarchy = z.infer<typeof HierarchySchema>;

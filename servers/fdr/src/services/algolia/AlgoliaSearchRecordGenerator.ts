import {
    DocsV1Read,
    FernNavigation,
    convertDbAPIDefinitionToRead,
    titleCase,
    visitDbNavigationTab,
    visitDiscriminatedUnion,
    visitUnversionedDbNavigationConfig,
} from "@fern-api/fdr-sdk";
import { WebSocketNode, WebhookNode } from "@fern-api/fdr-sdk/src/navigation";
import grayMatter from "gray-matter";
import { noop } from "lodash-es";
import { v4 as uuid } from "uuid";
import { APIV1Db, APIV1Read, DocsV1Db } from "../../api";
import { BreadcrumbsInfo } from "../../api/generated/api";
import { EndpointPathPart } from "../../api/generated/api/resources/api/resources/v1/resources/read";
import { HttpMethod } from "../../api/generated/api/resources/navigation";
import { LOGGER } from "../../app/FdrApplication";
import { assertNever, convertMarkdownToText, truncateToBytes } from "../../util";
import { compact } from "../../util/object";
import { ReferencedTypes, getAllReferencedTypes } from "./getAllReferencedTypes";
import type { AlgoliaSearchRecord, IndexSegment, MarkdownNode, TypeReferenceWithMetadata } from "./types";

class NavigationContext {
    #indexSegment: IndexSegment;
    #pathParts: PathPart[];

    /**
     * The path represented by context slugs.
     */
    public get path() {
        return this.#pathParts
            .filter((p) => p.skipUrlSlug == null || !p.skipUrlSlug)
            .map((p) => p.urlSlug)
            .join("/");
    }

    /**
     * The path represented by context slugs.
     */
    public get pathParts() {
        return [...this.#pathParts];
    }

    public constructor(
        public readonly indexSegment: IndexSegment,
        pathParts: PathPart[],
    ) {
        this.#indexSegment = indexSegment;
        this.#pathParts = pathParts;
    }

    /**
     * @returns A new `NavigationContext` instance.
     */
    public withPathPart(pathPart: PathPart) {
        return this.withPathParts([pathPart]);
    }

    /**
     * @returns A new `NavigationContext` instance.
     */
    public withPathParts(pathParts: PathPart[]) {
        return new NavigationContext(this.#indexSegment, [...this.#pathParts, ...pathParts]);
    }

    /**
     * @returns A new `NavigationContext` instance.
     */
    public withFullSlug(fullSlug: string[]) {
        return new NavigationContext(
            this.#indexSegment,
            fullSlug.map((urlSlug) => ({ name: urlSlug, urlSlug })),
        );
    }
}

interface AlgoliaSearchRecordGeneratorConfig {
    docsDefinition: DocsV1Db.DocsDefinitionDb;
    apiDefinitionsById: Map<string, APIV1Db.DbApiDefinition>;
}

export class AlgoliaSearchRecordGenerator {
    public constructor(private readonly config: AlgoliaSearchRecordGeneratorConfig) {}

    public generateAlgoliaSearchRecordsForSpecificDocsVersion(
        navigationConfig: DocsV1Db.UnversionedNavigationConfig,
        indexSegment: IndexSegment,
    ): AlgoliaSearchRecord[] {
        const context = new NavigationContext(indexSegment, []);
        return this.generateAlgoliaSearchRecordsForUnversionedNavigationConfig(navigationConfig, context);
    }

    private generateAlgoliaSearchRecordsForUnversionedNavigationConfig(
        config: DocsV1Db.UnversionedNavigationConfig,
        context: NavigationContext,
    ): AlgoliaSearchRecord[] {
        return visitUnversionedDbNavigationConfig(config, {
            tabbed: (tabbedConfig) => {
                return this.generateAlgoliaSearchRecordsForUnversionedTabbedNavigationConfig(tabbedConfig, context);
            },
            untabbed: (untabbedConfig) => {
                return this.generateAlgoliaSearchRecordsForUnversionedUntabbedNavigationConfig(untabbedConfig, context);
            },
        });
    }

    private generateAlgoliaSearchRecordsForUnversionedUntabbedNavigationConfig(
        config: DocsV1Db.UnversionedUntabbedNavigationConfig,
        context: NavigationContext,
    ) {
        const records = config.items.map((item) => this.generateAlgoliaSearchRecordsForNavigationItem(item, context));
        return records.flat(1);
    }

    private generateAlgoliaSearchRecordsForUnversionedTabbedNavigationConfig(
        config: DocsV1Db.UnversionedTabbedNavigationConfig,
        context: NavigationContext,
    ): AlgoliaSearchRecord[] {
        const records =
            config.tabsV2?.flatMap((tab) => {
                switch (tab.type) {
                    case "group":
                        return tab.items.flatMap((item) =>
                            this.generateAlgoliaSearchRecordsForNavigationItem(
                                item,
                                context.withPathPart({
                                    name: tab.title,
                                    urlSlug: tab.urlSlug,
                                    skipUrlSlug: tab.skipUrlSlug,
                                }),
                            ),
                        );
                    case "changelog":
                        // TODO(rohin): Remove this once all search is migrated to new version
                        return this.generateAlgoliaSearchRecordsForChangelogSection(
                            tab,
                            context.withPathPart({
                                name: tab.title ?? "Changelog",
                                urlSlug: tab.urlSlug,
                            }),
                        ).concat(
                            this.generateAlgoliaSearchRecordsForChangelogSectionV2(
                                tab,
                                context.withPathPart({
                                    name: tab.title ?? "Changelog",
                                    urlSlug: tab.urlSlug,
                                }),
                            ),
                        );
                    default:
                        return [];
                }
            }) ??
            config.tabs?.map((tab) =>
                visitDbNavigationTab(tab, {
                    group: (group) => {
                        const tabRecords = group.items.map((item) =>
                            this.generateAlgoliaSearchRecordsForNavigationItem(
                                item,
                                context.withPathPart({ name: tab.title, urlSlug: group.urlSlug }),
                            ),
                        );
                        return tabRecords.flat(1);
                    },
                    link: () => [],
                }),
            ) ??
            [];
        return records.flat(1);
    }

    private generateAlgoliaSearchRecordsForNavigationItem(
        item: DocsV1Db.NavigationItem,
        context: NavigationContext,
    ): AlgoliaSearchRecord[] {
        if (item.type === "section") {
            if (item.hidden) {
                return [];
            }
            const section = item;
            const records = section.items.map((item) =>
                this.generateAlgoliaSearchRecordsForNavigationItem(
                    item,
                    context.withPathPart(
                        compact({
                            name: section.title,
                            urlSlug: section.urlSlug,
                            skipUrlSlug: section.skipUrlSlug || undefined,
                        }),
                    ),
                ),
            );
            return records.flat(1);
        } else if (item.type === "api") {
            if (item.hidden) {
                return [];
            }
            const records: AlgoliaSearchRecord[] = [];
            const api = item;
            const apiId = api.api;
            const apiDef = this.config.apiDefinitionsById.get(apiId);
            if (apiDef != null) {
                records.push(
                    ...this.generateAlgoliaSearchRecordsForApiDefinition(
                        apiDef,
                        context.withPathPart(
                            compact({
                                name: api.title,
                                urlSlug: api.urlSlug,
                                skipUrlSlug: api.skipUrlSlug || undefined,
                            }),
                        ),
                    ),
                );
            }

            if (item.changelog != null) {
                records.push(
                    ...this.generateAlgoliaSearchRecordsForChangelogSection(
                        item.changelog,
                        context,
                        `${api.title} Changelog`,
                    ),
                );
            }

            return records;
        } else if (item.type === "page") {
            if (item.hidden) {
                return [];
            }

            const page = item;
            const pageContent = this.config.docsDefinition.pages[page.id];
            if (pageContent == null) {
                return [];
            }

            const pageContext =
                page.fullSlug != null
                    ? context.withFullSlug(page.fullSlug)
                    : context.withPathPart({
                          name: page.title,
                          urlSlug: page.urlSlug,
                      });
            const processedContent = convertMarkdownToText(pageContent.markdown);
            const { indexSegment } = context;
            return [
                compact({
                    type: "page-v2",
                    objectID: uuid(),
                    title: page.title, // TODO: parse from frontmatter?
                    // TODO: Set to something more than 10kb on prod
                    // See: https://support.algolia.com/hc/en-us/articles/4406981897617-Is-there-a-size-limit-for-my-index-records-/
                    content: truncateToBytes(processedContent, 10_000 - 1),
                    path: {
                        parts: pageContext.pathParts,
                    },
                    version:
                        indexSegment.type === "versioned"
                            ? {
                                  id: indexSegment.version.id,
                                  urlSlug: indexSegment.version.urlSlug ?? indexSegment.version.id,
                              }
                            : undefined,
                    indexSegmentId: indexSegment.id,
                }),
            ];
        } else if (item.type === "link") {
            return [];
        } else if (item.type === "changelog") {
            return this.generateAlgoliaSearchRecordsForChangelogSection(item, context);
        } else if (item.type === "changelogV3") {
            return this.generateAlgoliaSearchRecordsForChangelogNode(
                item.node as FernNavigation.ChangelogNode,
                context,
            );
        } else if (item.type === "apiV2") {
            // TODO(rohin): Remove this once all search is migrated to new version
            return this.generateAlgoliaSearchRecordsForApiReferenceNode(
                item.node as FernNavigation.ApiReferenceNode,
                context,
            ).concat(
                this.generateAlgoliaSearchRecordsForApiReferenceNodeV2(
                    item.node as FernNavigation.ApiReferenceNode,
                    context,
                ),
            );
        }
        assertNever(item);
    }

    private generateAlgoliaSearchRecordsForApiReferenceNode(
        root: FernNavigation.ApiReferenceNode,
        context: NavigationContext,
    ): AlgoliaSearchRecord[] {
        const api = this.config.apiDefinitionsById.get(root.apiDefinitionId);
        if (api == null) {
            LOGGER.error("Failed to find API definition for API reference node. id=", root.apiDefinitionId);
        }
        const holder =
            api != null ? FernNavigation.ApiDefinitionHolder.create(convertDbAPIDefinitionToRead(api)) : undefined;
        const records: AlgoliaSearchRecord[] = [];

        const breadcrumbs = context.pathParts.map((part) => part.name);

        const version =
            context.indexSegment.type === "versioned"
                ? {
                      id: context.indexSegment.version.id,
                      slug: context.indexSegment.version.urlSlug ?? context.indexSegment.version.id,
                  }
                : undefined;

        function toBreadcrumbs(parents: FernNavigation.NavigationNode[]): string[] {
            return [
                ...breadcrumbs,
                ...parents
                    .filter(FernNavigation.hasMetadata)
                    .filter((parent) =>
                        parent.type === "apiReference"
                            ? parent.hideTitle !== true
                            : parent.type === "changelogMonth" || parent.type === "changelogYear"
                              ? false
                              : true,
                    )
                    .map((parent) => parent.title),
            ];
        }

        FernNavigation.utils.traverseNavigation(root, (node, _index, parents) => {
            if (!FernNavigation.hasMetadata(node)) {
                return;
            }

            if (node.hidden) {
                return "skip";
            }

            if (FernNavigation.isApiLeaf(node)) {
                visitDiscriminatedUnion(node)._visit({
                    endpoint: (node) => {
                        const endpoint = holder?.endpoints.get(node.endpointId);
                        if (endpoint == null) {
                            LOGGER.error("Failed to find endpoint for API reference node.", node);
                            return;
                        }

                        // this is a hack to include the endpoint request/response json in the search index
                        // and potentially use it for conversational AI in the future.
                        // this needs to be rewritten as a template, with proper markdown formatting + snapshot testing.
                        // also, the content is potentially trimmed to 10kb.
                        const contents = [endpoint.description ?? ""];

                        const typeReferences: APIV1Read.TypeReference[] = [];

                        if (endpoint.headers != null && endpoint.headers.length > 0) {
                            contents.push("## Headers\n");
                            endpoint.headers.forEach((header) => {
                                typeReferences.push(header.type);
                                contents.push(
                                    `- ${header.key}=${this.stringifyTypeRef(header.type)} ${header.description ?? ""}`,
                                );
                            });
                        }

                        if (endpoint.path.pathParameters.length > 0) {
                            contents.push("## Path Parameters\n");
                            endpoint.path.pathParameters.forEach((param) => {
                                typeReferences.push(param.type);
                                contents.push(
                                    `- ${param.key}=${this.stringifyTypeRef(param.type)} ${param.description ?? ""}`,
                                );
                            });
                        }

                        if (endpoint.queryParameters.length > 0) {
                            contents.push("## Query Parameters\n");
                            endpoint.queryParameters.forEach((param) => {
                                typeReferences.push(param.type);
                                contents.push(
                                    `- ${param.key}=${this.stringifyTypeRef(param.type)} ${param.description ?? ""}`,
                                );
                            });
                        }

                        if (endpoint.request != null) {
                            contents.push("## Request\n");
                            if (endpoint.request.description != null) {
                                contents.push(`${endpoint.request.description}\n`);
                            }

                            contents.push("### Body\n");

                            if (endpoint.request.type.type === "reference") {
                                typeReferences.push(endpoint.request.type.value);
                                contents.push(
                                    `${this.stringifyTypeRef(endpoint.request.type.value)}: ${endpoint.request.description ?? ""}`,
                                );
                            } else if (endpoint.request.type.type === "formData") {
                                endpoint.request.type.properties.forEach((property) => {
                                    if (property.type === "bodyProperty") {
                                        typeReferences.push(property.valueType);
                                        contents.push(
                                            `- ${property.key}=${this.stringifyTypeRef(property.valueType)} ${property.description ?? ""}`,
                                        );
                                    }
                                });
                            } else if (endpoint.request.type.type === "object") {
                                endpoint.request.type.extends.forEach((extend) => {
                                    contents.push(`- ${extend}`);
                                });
                                endpoint.request.type.properties.forEach((property) => {
                                    typeReferences.push(property.valueType);
                                    contents.push(
                                        `- ${property.key}=${this.stringifyTypeRef(property.valueType)} ${property.description ?? ""}`,
                                    );
                                });
                            }
                        }

                        if (endpoint.response != null) {
                            contents.push("## Response\n");
                            if (endpoint.response.description != null) {
                                contents.push(`${endpoint.response.description}\n`);
                            }

                            contents.push("### Body\n");

                            if (endpoint.response.type.type === "reference") {
                                typeReferences.push(endpoint.response.type.value);
                                contents.push(
                                    `${this.stringifyTypeRef(endpoint.response.type.value)}: ${endpoint.response.description ?? ""}`,
                                );
                            } else if (endpoint.response.type.type === "object") {
                                endpoint.response.type.extends.forEach((extend) => {
                                    contents.push(`- ${extend}`);
                                });
                                endpoint.response.type.properties.forEach((property) => {
                                    typeReferences.push(property.valueType);
                                    contents.push(
                                        `- ${property.key}=${this.stringifyTypeRef(property.valueType)} ${property.description ?? ""}`,
                                    );
                                });
                            }
                        }

                        contents.push(this.collectReferencedTypesToContent(typeReferences, holder?.api.types ?? {}));

                        records.push(
                            compact({
                                type: "endpoint-v3",
                                objectID: uuid(),
                                title: node.title,
                                content: truncateToBytes(contents.join("\n"), 10_000 - 1),
                                breadcrumbs: toBreadcrumbs(parents),
                                slug: node.slug,
                                version,
                                indexSegmentId: context.indexSegment.id,
                                method: endpoint.method,
                                endpointPath: endpoint.path.parts,
                                isResponseStream: node.isResponseStream,
                            }),
                        );
                    },
                    webSocket: (node) => {
                        const ws = holder?.webSockets.get(node.webSocketId);
                        if (ws == null) {
                            LOGGER.error("Failed to find websocket for API reference node.", node);
                            return;
                        }

                        const contents = [ws.description ?? ""];

                        const typeReferences: APIV1Read.TypeReference[] = [];

                        if (ws.headers.length > 0) {
                            contents.push("## Headers\n");
                            ws.headers.forEach((param) => {
                                typeReferences.push(param.type);
                                contents.push(
                                    `- ${param.key}=${this.stringifyTypeRef(param.type)} ${param.description ?? ""}`,
                                );
                            });
                        }

                        if (ws.path.pathParameters.length > 0) {
                            contents.push("## Path Parameters\n");
                            ws.path.pathParameters.forEach((param) => {
                                typeReferences.push(param.type);
                                contents.push(
                                    `- ${param.key}=${this.stringifyTypeRef(param.type)} ${param.description ?? ""}`,
                                );
                            });
                        }

                        if (ws.queryParameters.length > 0) {
                            contents.push("## Query Parameters\n");
                            ws.queryParameters.forEach((param) => {
                                typeReferences.push(param.type);
                                contents.push(
                                    `- ${param.key}=${this.stringifyTypeRef(param.type)} ${param.description ?? ""}`,
                                );
                            });
                        }

                        if (ws.messages.length > 0) {
                            contents.push("## Messages\n");
                            ws.messages.forEach((message) => {
                                contents.push(
                                    `### ${message.displayName ?? ""} (${message.type}) - ${message.origin}\n`,
                                );
                                if (message.description != null) {
                                    contents.push(message.description);
                                }
                                if (message.body.type === "reference") {
                                    const anchorIdParts = [message.origin === "server" ? "receive" : "send"];
                                    if (message.displayName != null) {
                                        anchorIdParts.push(message.displayName);
                                    }
                                    typeReferences.push(message.body.value);
                                    contents.push(`- ${this.stringifyTypeRef(message.body.value)}`);
                                } else if (message.body.type === "object") {
                                    message.body.extends.forEach((extend) => {
                                        contents.push(`- ${extend}`);
                                    });
                                    message.body.properties.forEach((property) => {
                                        typeReferences.push(property.valueType);
                                        contents.push(
                                            `- ${property.key}=${this.stringifyTypeRef(property.valueType)} ${property.description ?? ""}`,
                                        );
                                    });
                                } else {
                                    assertNever(message.body);
                                }
                            });
                        }

                        contents.push(this.collectReferencedTypesToContent(typeReferences, holder?.api.types ?? {}));

                        records.push(
                            compact({
                                type: "websocket-v3",
                                objectID: uuid(),
                                title: node.title,
                                content: truncateToBytes(contents.join("\n"), 10_000 - 1),
                                breadcrumbs: toBreadcrumbs(parents),
                                slug: node.slug,
                                version,
                                indexSegmentId: context.indexSegment.id,
                                endpointPath: ws.path.parts,
                            }),
                        );
                    },
                    webhook: (node) => {
                        const webhook = holder?.webhooks.get(node.webhookId);
                        if (webhook == null) {
                            LOGGER.error("Failed to find webhook for API reference node.", node);
                            return;
                        }

                        const contents = [webhook.description ?? ""];
                        const typeReferences: APIV1Read.TypeReference[] = [];

                        if (webhook.headers.length > 0) {
                            contents.push("## Headers\n");
                            webhook.headers.forEach((header) => {
                                typeReferences.push(header.type);
                                contents.push(
                                    `- ${header.key}=${this.stringifyTypeRef(header.type)} ${header.description ?? ""}`,
                                );
                            });
                        }

                        contents.push("## Payload\n");

                        if (webhook.payload.description != null) {
                            contents.push(webhook.payload.description);
                        }

                        if (webhook.payload.type.type === "reference") {
                            typeReferences.push(webhook.payload.type.value);
                            contents.push(
                                `${this.stringifyTypeRef(webhook.payload.type.value)}: ${webhook.payload.description ?? ""}`,
                            );
                        } else if (webhook.payload.type.type === "object") {
                            webhook.payload.type.extends.forEach((extend) => {
                                contents.push(`- ${extend}`);
                            });
                            webhook.payload.type.properties.forEach((property) => {
                                typeReferences.push(property.valueType);
                                contents.push(
                                    `- ${property.key}=${this.stringifyTypeRef(property.valueType)} ${property.description ?? ""}`,
                                );
                            });
                        } else {
                            assertNever(webhook.payload.type);
                        }

                        contents.push(this.collectReferencedTypesToContent(typeReferences, holder?.api.types ?? {}));

                        records.push(
                            compact({
                                type: "webhook-v3",
                                objectID: uuid(),
                                title: node.title,
                                content: truncateToBytes(contents.join("\n"), 10_000 - 1),
                                breadcrumbs: toBreadcrumbs(parents),
                                slug: node.slug,
                                version,
                                indexSegmentId: context.indexSegment.id,
                                method: webhook.method,
                                endpointPath: webhook.path.map((path) => ({ type: "literal", value: path })),
                            }),
                        );
                    },
                });
            } else if (FernNavigation.hasMarkdown(node)) {
                const pageId = FernNavigation.utils.getPageId(node);
                if (pageId == null) {
                    return;
                }

                const md = this.config.docsDefinition.pages[pageId]?.markdown;
                if (md == null) {
                    LOGGER.error("Failed to find markdown for node", node);
                    return;
                }

                const frontmatter = getFrontmatter(md);

                records.push(
                    compact({
                        type: "page-v3",
                        objectID: uuid(),
                        title: frontmatter.title ?? node.title,
                        content: truncateToBytes(md, 10_000 - 1),
                        breadcrumbs: toBreadcrumbs(parents),
                        slug: node.slug,
                        version,
                        indexSegmentId: context.indexSegment.id,
                    }),
                );
            }
            return;
        });

        return records;
    }

    private generateAlgoliaSearchRecordsForApiReferenceNodeV2(
        root: FernNavigation.ApiReferenceNode,
        context: NavigationContext,
    ): AlgoliaSearchRecord[] {
        const api = this.config.apiDefinitionsById.get(root.apiDefinitionId);
        if (api == null) {
            LOGGER.error("Failed to find API definition for API reference node. id=", root.apiDefinitionId);
        }
        const holder =
            api != null ? FernNavigation.ApiDefinitionHolder.create(convertDbAPIDefinitionToRead(api)) : undefined;
        const records: AlgoliaSearchRecord[] = [];

        const breadcrumbs = context.pathParts.map((part) => part.name);

        const version =
            context.indexSegment.type === "versioned"
                ? {
                      id: context.indexSegment.version.id,
                      slug: context.indexSegment.version.urlSlug ?? context.indexSegment.version.id,
                  }
                : undefined;

        function toBreadcrumbs(parents: FernNavigation.NavigationNode[]): BreadcrumbsInfo[] {
            return [
                ...breadcrumbs,
                ...parents
                    .filter(FernNavigation.hasMetadata)
                    .filter((parent) =>
                        parent.type === "apiReference"
                            ? parent.hideTitle !== true
                            : parent.type === "changelogMonth" || parent.type === "changelogYear"
                              ? false
                              : true,
                    )
                    .map((parent) => parent.title),
            ].reduce((acc: BreadcrumbsInfo[], breadcrumb: string) => {
                if (acc.length === 0) {
                    return [{ title: breadcrumb, slug: breadcrumb }];
                }
                return [...acc, { title: breadcrumb, slug: `${acc[acc.length - 1]?.slug}/${breadcrumb}` }];
            }, []);
        }

        function anchorIdToSlug(
            node: FernNavigation.EndpointNode | WebSocketNode | WebhookNode,
            anchorIdParts: string[],
        ) {
            return `${node.slug}#${anchorIdParts.join(".")}`;
        }

        FernNavigation.utils.traverseNavigation(root, (node, _index, parents) => {
            if (!FernNavigation.hasMetadata(node)) {
                return;
            }

            if (node.hidden) {
                return "skip";
            }

            if (FernNavigation.isApiLeaf(node)) {
                const indexSegmentId = context.indexSegment.id;
                const breadcrumbs = toBreadcrumbs(parents);
                visitDiscriminatedUnion(node)._visit({
                    endpoint: (node) => {
                        const endpoint = holder?.endpoints.get(node.endpointId);
                        if (endpoint == null) {
                            LOGGER.error("Failed to find endpoint for API reference node.", node);
                            return;
                        }

                        // this is a hack to include the endpoint request/response json in the search index
                        // and potentially use it for conversational AI in the future.
                        // this needs to be rewritten as a template, with proper markdown formatting + snapshot testing.
                        // also, the content is potentially trimmed to 10kb.
                        const fields: AlgoliaSearchRecord[] = [];

                        const typeReferences: TypeReferenceWithMetadata[] = [];

                        if (endpoint.headers != null && endpoint.headers.length > 0) {
                            endpoint.headers.forEach((header) => {
                                const anchorIdParts = ["request", "header", header.key];
                                const slug = anchorIdToSlug(node, anchorIdParts);
                                const fieldBreadcrumbs = breadcrumbs.concat(
                                    anchorIdParts.map((part) => ({ title: part, slug })),
                                );
                                fields.push({
                                    type: "field-v1",
                                    objectID: uuid(),
                                    value: {
                                        type: "endpoint-field-v1",
                                        title: header.key,
                                        description: header.description,
                                        availability: header.availability,
                                        breadcrumbs: fieldBreadcrumbs,
                                        slug,
                                        version,
                                        indexSegmentId,
                                        method: endpoint.method,
                                        endpointPath: endpoint.path.parts,
                                        isResponseStream: node.isResponseStream,
                                    },
                                });
                                typeReferences.push({
                                    reference: header.type,
                                    anchorIdParts,
                                    breadcrumbs: fieldBreadcrumbs,
                                    slugPrefix: slug,
                                    version,
                                    indexSegmentId,
                                    method: endpoint.method,
                                    endpointPath: endpoint.path.parts,
                                    isResponseStream: node.isResponseStream,
                                    type: "endpoint-field-v1",
                                });
                            });
                        }

                        if (endpoint.path.pathParameters.length > 0) {
                            endpoint.path.pathParameters.forEach((param) => {
                                const anchorIdParts = ["request", "path", param.key];
                                const slug = anchorIdToSlug(node, anchorIdParts);
                                const fieldBreadcrumbs = breadcrumbs.concat(
                                    anchorIdParts.map((part) => ({ title: part, slug })),
                                );
                                fields.push({
                                    type: "field-v1",
                                    objectID: uuid(),
                                    value: {
                                        type: "endpoint-field-v1",
                                        title: param.key,
                                        description: param.description,
                                        availability: param.availability,
                                        breadcrumbs: fieldBreadcrumbs,
                                        slug,
                                        version,
                                        indexSegmentId,
                                        method: endpoint.method,
                                        endpointPath: endpoint.path.parts,
                                        isResponseStream: node.isResponseStream,
                                    },
                                });
                                typeReferences.push({
                                    reference: param.type,
                                    anchorIdParts,
                                    breadcrumbs: fieldBreadcrumbs,
                                    slugPrefix: slug,
                                    version,
                                    indexSegmentId,
                                    method: endpoint.method,
                                    endpointPath: endpoint.path.parts,
                                    isResponseStream: node.isResponseStream,
                                    type: "endpoint-field-v1",
                                });
                            });
                        }

                        if (endpoint.queryParameters.length > 0) {
                            endpoint.queryParameters.forEach((param) => {
                                const anchorIdParts = ["request", "query", param.key];
                                const slug = anchorIdToSlug(node, anchorIdParts);
                                const fieldBreadcrumbs = breadcrumbs.concat(
                                    anchorIdParts.map((part) => ({ title: part, slug })),
                                );
                                fields.push({
                                    type: "field-v1",
                                    objectID: uuid(),
                                    value: {
                                        type: "endpoint-field-v1",
                                        title: param.key,
                                        description: param.description,
                                        availability: param.availability,
                                        breadcrumbs: fieldBreadcrumbs,
                                        slug,
                                        version,
                                        indexSegmentId,
                                        method: endpoint.method,
                                        endpointPath: endpoint.path.parts,
                                        isResponseStream: node.isResponseStream,
                                    },
                                });
                                typeReferences.push({
                                    reference: param.type,
                                    anchorIdParts,
                                    breadcrumbs: fieldBreadcrumbs,
                                    slugPrefix: slug,
                                    version,
                                    indexSegmentId,
                                    method: endpoint.method,
                                    endpointPath: endpoint.path.parts,
                                    isResponseStream: node.isResponseStream,
                                    type: "endpoint-field-v1",
                                });
                            });
                        }

                        if (endpoint.request != null) {
                            if (endpoint.request.description != null) {
                                const slug = anchorIdToSlug(node, ["request"]);
                                fields.push({
                                    type: "field-v1",
                                    objectID: uuid(),
                                    value: {
                                        type: "endpoint-field-v1",
                                        title: `${endpoint.name ?? endpoint.id} Request`,
                                        description: endpoint.request.description,
                                        availability: endpoint.availability,
                                        breadcrumbs: toBreadcrumbs(parents).concat([
                                            {
                                                title: "request",
                                                slug,
                                            },
                                        ]),
                                        slug,
                                        version,
                                        indexSegmentId: context.indexSegment.id,
                                        extends:
                                            endpoint.request.type.type === "object"
                                                ? endpoint.request.type.extends
                                                : undefined,
                                        method: endpoint.method,
                                        endpointPath: endpoint.path.parts,
                                        isResponseStream: node.isResponseStream,
                                    },
                                });
                            }

                            if (endpoint.request.type.type === "reference") {
                                const anchorIdParts = ["request", "body"];
                                const slug = anchorIdToSlug(node, anchorIdParts);
                                const fieldBreadcrumbs = breadcrumbs.concat(
                                    anchorIdParts.map((part) => ({ title: part, slug })),
                                );
                                typeReferences.push({
                                    reference: endpoint.request.type.value,
                                    anchorIdParts,
                                    breadcrumbs: fieldBreadcrumbs,
                                    slugPrefix: slug,
                                    version,
                                    indexSegmentId,
                                    method: endpoint.method,
                                    endpointPath: endpoint.path.parts,
                                    isResponseStream: node.isResponseStream,
                                    type: "endpoint-field-v1",
                                });
                            } else if (endpoint.request.type.type === "formData") {
                                endpoint.request.type.properties.forEach((property) => {
                                    if (property.type === "bodyProperty") {
                                        const anchorIdParts = ["request", "body", property.key];
                                        const slug = anchorIdToSlug(node, anchorIdParts);
                                        const fieldBreadcrumbs = breadcrumbs.concat(
                                            anchorIdParts.map((part) => ({ title: part, slug })),
                                        );
                                        fields.push({
                                            type: "field-v1",
                                            objectID: uuid(),
                                            value: {
                                                type: "endpoint-field-v1",
                                                title: property.key,
                                                description: property.description,
                                                availability: property.availability,
                                                breadcrumbs: fieldBreadcrumbs,
                                                slug,
                                                version,
                                                indexSegmentId,
                                                method: endpoint.method,
                                                endpointPath: endpoint.path.parts,
                                                isResponseStream: node.isResponseStream,
                                            },
                                        });
                                        typeReferences.push({
                                            reference: property.valueType,
                                            anchorIdParts,
                                            breadcrumbs: fieldBreadcrumbs,
                                            slugPrefix: slug,
                                            version,
                                            indexSegmentId,
                                            method: endpoint.method,
                                            endpointPath: endpoint.path.parts,
                                            isResponseStream: node.isResponseStream,
                                            type: "endpoint-field-v1",
                                        });
                                    }
                                });
                            } else if (endpoint.request.type.type === "object") {
                                endpoint.request.type.properties.forEach((property) => {
                                    const anchorIdParts = ["request", "body", property.key];
                                    const slug = anchorIdToSlug(node, anchorIdParts);
                                    const fieldBreadcrumbs = breadcrumbs.concat(
                                        anchorIdParts.map((part) => ({ title: part, slug })),
                                    );
                                    fields.push({
                                        type: "field-v1",
                                        objectID: uuid(),
                                        value: {
                                            type: "endpoint-field-v1",
                                            title: property.key,
                                            description: property.description,
                                            availability: property.availability,
                                            breadcrumbs: fieldBreadcrumbs,
                                            slug,
                                            version,
                                            indexSegmentId,
                                            method: endpoint.method,
                                            endpointPath: endpoint.path.parts,
                                            isResponseStream: node.isResponseStream,
                                        },
                                    });
                                    typeReferences.push({
                                        reference: property.valueType,
                                        anchorIdParts,
                                        breadcrumbs: fieldBreadcrumbs,
                                        slugPrefix: slug,
                                        version,
                                        indexSegmentId,
                                        method: endpoint.method,
                                        endpointPath: endpoint.path.parts,
                                        isResponseStream: node.isResponseStream,
                                        type: "endpoint-field-v1",
                                    });
                                });
                            }
                        }

                        if (endpoint.response != null) {
                            const slug = anchorIdToSlug(node, ["response"]);

                            fields.push({
                                type: "field-v1",
                                objectID: uuid(),
                                value: {
                                    type: "endpoint-field-v1",
                                    title: `${endpoint.name ?? endpoint.id} Response`,
                                    description: endpoint.response.description,
                                    availability: endpoint.availability,
                                    breadcrumbs: toBreadcrumbs(parents).concat([
                                        {
                                            title: "response",
                                            slug,
                                        },
                                    ]),
                                    slug,
                                    version,
                                    indexSegmentId: context.indexSegment.id,
                                    extends:
                                        endpoint.response.type.type === "object"
                                            ? endpoint.response.type.extends
                                            : undefined,
                                    method: endpoint.method,
                                    endpointPath: endpoint.path.parts,
                                    isResponseStream: node.isResponseStream,
                                },
                            });

                            if (endpoint.response.type.type === "reference") {
                                const anchorIdParts = ["response", "body"];
                                const slug = anchorIdToSlug(node, anchorIdParts);
                                const fieldBreadcrumbs = breadcrumbs.concat(
                                    anchorIdParts.map((part) => ({ title: part, slug })),
                                );
                                typeReferences.push({
                                    reference: endpoint.response.type.value,
                                    anchorIdParts,
                                    breadcrumbs: fieldBreadcrumbs,
                                    slugPrefix: slug,
                                    version,
                                    indexSegmentId,
                                    method: endpoint.method,
                                    endpointPath: endpoint.path.parts,
                                    isResponseStream: node.isResponseStream,
                                    type: "endpoint-field-v1",
                                });
                            } else if (endpoint.response.type.type === "object") {
                                endpoint.response.type.properties.forEach((property) => {
                                    const anchorIdParts = ["response", "body", property.key];
                                    const slug = anchorIdToSlug(node, anchorIdParts);
                                    const fieldBreadcrumbs = breadcrumbs.concat(
                                        anchorIdParts.map((part) => ({ title: part, slug })),
                                    );
                                    fields.push({
                                        type: "field-v1",
                                        objectID: uuid(),
                                        value: {
                                            type: "endpoint-field-v1",
                                            title: property.key,
                                            description: property.description,
                                            availability: property.availability,
                                            breadcrumbs: fieldBreadcrumbs,
                                            slug,
                                            version,
                                            indexSegmentId,
                                            method: endpoint.method,
                                            endpointPath: endpoint.path.parts,
                                            isResponseStream: node.isResponseStream,
                                        },
                                    });
                                    typeReferences.push({
                                        reference: property.valueType,
                                        anchorIdParts,
                                        breadcrumbs: fieldBreadcrumbs,
                                        slugPrefix: slug,
                                        version,
                                        indexSegmentId,
                                        method: endpoint.method,
                                        endpointPath: endpoint.path.parts,
                                        isResponseStream: node.isResponseStream,
                                        type: "endpoint-field-v1",
                                    });
                                });
                            }
                        }

                        records.push(...fields.map(compact));
                        records.push(
                            ...this.collectReferencedTypesToContentV2(typeReferences, holder?.api.types ?? {}).map(
                                compact,
                            ),
                        );
                        records.push(
                            compact({
                                type: "endpoint-v4",
                                objectID: uuid(),
                                title: node.title,
                                description: endpoint.description,
                                breadcrumbs: toBreadcrumbs(parents),
                                slug: node.slug,
                                version,
                                indexSegmentId: context.indexSegment.id,
                                method: endpoint.method,
                                endpointPath: endpoint.path.parts,
                                isResponseStream: node.isResponseStream,
                            }),
                        );
                    },
                    webSocket: (node) => {
                        const ws = holder?.webSockets.get(node.webSocketId);
                        if (ws == null) {
                            LOGGER.error("Failed to find websocket for API reference node.", node);
                            return;
                        }

                        const typeReferences: TypeReferenceWithMetadata[] = [];

                        const fields: AlgoliaSearchRecord[] = [];

                        if (ws.headers.length > 0) {
                            ws.headers.forEach((param) => {
                                const anchorIdParts = ["request", "header", param.key];
                                const slug = anchorIdToSlug(node, anchorIdParts);
                                const fieldBreadcrumbs = breadcrumbs.concat(
                                    anchorIdParts.map((part) => ({ title: part, slug })),
                                );
                                fields.push({
                                    type: "field-v1",
                                    objectID: uuid(),
                                    value: {
                                        type: "websocket-field-v1",
                                        title: param.key,
                                        description: param.description,
                                        availability: param.availability,
                                        breadcrumbs: fieldBreadcrumbs,
                                        slug,
                                        version,
                                        indexSegmentId,
                                        endpointPath: ws.path.parts,
                                    },
                                });
                                typeReferences.push({
                                    reference: param.type,
                                    anchorIdParts,
                                    breadcrumbs: fieldBreadcrumbs,
                                    slugPrefix: slug,
                                    version,
                                    indexSegmentId,
                                    endpointPath: ws.path.parts,
                                    type: "websocket-field-v1",
                                });
                            });
                        }

                        if (ws.path.pathParameters.length > 0) {
                            ws.path.pathParameters.forEach((param) => {
                                const anchorIdParts = ["request", "path", param.key];
                                const slug = anchorIdToSlug(node, anchorIdParts);
                                const fieldBreadcrumbs = breadcrumbs.concat(
                                    anchorIdParts.map((part) => ({ title: part, slug })),
                                );
                                fields.push({
                                    type: "field-v1",
                                    objectID: uuid(),
                                    value: {
                                        type: "websocket-field-v1",
                                        title: param.key,
                                        description: param.description,
                                        availability: param.availability,
                                        breadcrumbs: fieldBreadcrumbs,
                                        slug,
                                        version,
                                        indexSegmentId,
                                        endpointPath: ws.path.parts,
                                    },
                                });
                                typeReferences.push({
                                    reference: param.type,
                                    anchorIdParts,
                                    breadcrumbs: fieldBreadcrumbs,
                                    slugPrefix: slug,
                                    version,
                                    indexSegmentId,
                                    endpointPath: ws.path.parts,
                                    type: "websocket-field-v1",
                                });
                            });
                        }

                        if (ws.queryParameters.length > 0) {
                            ws.queryParameters.forEach((param) => {
                                const anchorIdParts = ["request", "query", param.key];
                                const slug = anchorIdToSlug(node, anchorIdParts);
                                const fieldBreadcrumbs = breadcrumbs.concat(
                                    anchorIdParts.map((part) => ({ title: part, slug })),
                                );
                                fields.push({
                                    type: "field-v1",
                                    objectID: uuid(),
                                    value: {
                                        type: "websocket-field-v1",
                                        title: param.key,
                                        description: param.description,
                                        availability: param.availability,
                                        breadcrumbs: fieldBreadcrumbs,
                                        slug,
                                        version,
                                        indexSegmentId,
                                        endpointPath: ws.path.parts,
                                    },
                                });
                                typeReferences.push({
                                    reference: param.type,
                                    anchorIdParts,
                                    breadcrumbs: fieldBreadcrumbs,
                                    slugPrefix: slug,
                                    version,
                                    indexSegmentId,
                                    endpointPath: ws.path.parts,
                                    type: "websocket-field-v1",
                                });
                            });
                        }

                        if (ws.messages.length > 0) {
                            ws.messages.forEach((message) => {
                                const messageType = message.origin === "server" ? "receive" : "send";
                                const slug = anchorIdToSlug(node, [messageType]);
                                fields.push({
                                    type: "field-v1",
                                    objectID: uuid(),
                                    value: {
                                        type: "websocket-field-v1",
                                        title: `${ws.name ?? ws.id} ${messageType}`,
                                        description: message.description,
                                        availability: message.availability,
                                        breadcrumbs: toBreadcrumbs(parents).concat([
                                            {
                                                title: messageType,
                                                slug,
                                            },
                                        ]),
                                        slug,
                                        version,
                                        indexSegmentId,
                                        extends: message.body.type === "object" ? message.body.extends : undefined,
                                        endpointPath: ws.path.parts,
                                    },
                                });
                                if (message.body.type === "reference") {
                                    const anchorIdParts = [message.origin === "server" ? "receive" : "send"];
                                    if (message.displayName != null) {
                                        anchorIdParts.push(message.displayName);
                                    }
                                    const fieldBreadcrumbs = breadcrumbs.concat(
                                        anchorIdParts.map((part) => ({ title: part, slug })),
                                    );
                                    typeReferences.push({
                                        reference: message.body.value,
                                        anchorIdParts,
                                        breadcrumbs: fieldBreadcrumbs,
                                        slugPrefix: anchorIdToSlug(node, anchorIdParts),
                                        version,
                                        indexSegmentId,
                                        endpointPath: ws.path.parts,
                                        type: "websocket-field-v1",
                                    });
                                } else if (message.body.type === "object") {
                                    message.body.properties.forEach((property) => {
                                        const anchorIdParts = [message.origin === "server" ? "receive" : "send"];
                                        if (message.displayName != null) {
                                            anchorIdParts.push(message.displayName);
                                        }
                                        anchorIdParts.push(property.key);
                                        const slug = anchorIdToSlug(node, anchorIdParts);
                                        const fieldBreadcrumbs = breadcrumbs.concat(
                                            anchorIdParts.map((part) => ({ title: part, slug })),
                                        );
                                        fields.push({
                                            type: "field-v1",
                                            objectID: uuid(),
                                            value: {
                                                type: "websocket-field-v1",
                                                title: property.key,
                                                description: property.description,
                                                availability: property.availability,
                                                breadcrumbs: fieldBreadcrumbs,
                                                slug,
                                                version,
                                                indexSegmentId,
                                                endpointPath: ws.path.parts,
                                            },
                                        });
                                        typeReferences.push({
                                            reference: property.valueType,
                                            anchorIdParts,
                                            breadcrumbs: fieldBreadcrumbs,
                                            slugPrefix: slug,
                                            version,
                                            indexSegmentId,
                                            endpointPath: ws.path.parts,
                                            type: "websocket-field-v1",
                                        });
                                    });
                                } else {
                                    assertNever(message.body);
                                }
                            });
                        }

                        records.push(...fields.map(compact));
                        records.push(
                            ...this.collectReferencedTypesToContentV2(typeReferences, holder?.api.types ?? {}).map(
                                compact,
                            ),
                        );
                        records.push(
                            compact({
                                type: "websocket-v4",
                                objectID: uuid(),
                                title: node.title,
                                description: ws.description,
                                breadcrumbs: toBreadcrumbs(parents),
                                slug: node.slug,
                                version,
                                indexSegmentId: context.indexSegment.id,
                                endpointPath: ws.path.parts,
                            }),
                        );
                    },
                    webhook: (node) => {
                        const webhook = holder?.webhooks.get(node.webhookId);
                        if (webhook == null) {
                            LOGGER.error("Failed to find webhook for API reference node.", node);
                            return;
                        }

                        const typeReferences: TypeReferenceWithMetadata[] = [];
                        const fields: AlgoliaSearchRecord[] = [];
                        const endpointPath: EndpointPathPart[] = webhook.path.map((path) => ({
                            type: "literal",
                            value: path,
                        }));

                        if (webhook.headers.length > 0) {
                            //TODO(rohin): check webhook anchor ids
                            webhook.headers.forEach((header) => {
                                const anchorIdParts = ["request", "header", header.key];
                                const slug = anchorIdToSlug(node, anchorIdParts);
                                const fieldBreadcrumbs = breadcrumbs.concat(
                                    anchorIdParts.map((part) => ({ title: part, slug })),
                                );
                                fields.push({
                                    type: "field-v1",
                                    objectID: uuid(),
                                    value: {
                                        type: "webhook-field-v1",
                                        title: header.key,
                                        description: header.description,
                                        availability: header.availability,
                                        breadcrumbs: fieldBreadcrumbs,
                                        slug,
                                        version,
                                        indexSegmentId,
                                        method: webhook.method,
                                        endpointPath,
                                    },
                                });
                                typeReferences.push({
                                    reference: header.type,
                                    anchorIdParts,
                                    breadcrumbs: fieldBreadcrumbs,
                                    slugPrefix: slug,
                                    version,
                                    indexSegmentId,
                                    method: webhook.method,
                                    endpointPath,
                                    type: "websocket-field-v1",
                                });
                            });
                        }

                        fields.push({
                            type: "field-v1",
                            objectID: uuid(),
                            value: {
                                type: "webhook-field-v1",
                                title: `${webhook.name ?? webhook.id} Payload`,
                                description: webhook.payload.description,
                                breadcrumbs: toBreadcrumbs(parents).concat([
                                    {
                                        title: "payload",
                                        slug: `${webhook.urlSlug}#payload`,
                                    },
                                ]),
                                slug: `${webhook.urlSlug}#payload`,
                                version,
                                indexSegmentId: context.indexSegment.id,
                                method: webhook.method,
                                endpointPath,
                            },
                        });

                        if (webhook.payload.type.type === "reference") {
                            const anchorIdParts = ["request", "body"];
                            const slug = anchorIdToSlug(node, anchorIdParts);
                            const fieldBreadcrumbs = breadcrumbs.concat(
                                anchorIdParts.map((part) => ({ title: part, slug })),
                            );
                            typeReferences.push({
                                reference: webhook.payload.type.value,
                                anchorIdParts,
                                breadcrumbs: fieldBreadcrumbs,
                                slugPrefix: slug,
                                version,
                                indexSegmentId,
                                method: webhook.method,
                                endpointPath,
                                type: "websocket-field-v1",
                            });
                        } else if (webhook.payload.type.type === "object") {
                            webhook.payload.type.properties.forEach((property) => {
                                const anchorIdParts = ["request", "body", property.key];
                                const slug = anchorIdToSlug(node, anchorIdParts);
                                const fieldBreadcrumbs = breadcrumbs.concat(
                                    anchorIdParts.map((part) => ({ title: part, slug })),
                                );
                                fields.push({
                                    type: "field-v1",
                                    objectID: uuid(),
                                    value: {
                                        type: "webhook-field-v1",
                                        title: property.key,
                                        description: property.description,
                                        availability: property.availability,
                                        breadcrumbs: fieldBreadcrumbs,
                                        slug,
                                        version,
                                        indexSegmentId: context.indexSegment.id,
                                        method: webhook.method,
                                        endpointPath,
                                    },
                                });
                                typeReferences.push({
                                    reference: property.valueType,
                                    anchorIdParts,
                                    breadcrumbs: fieldBreadcrumbs,
                                    slugPrefix: slug,
                                    version,
                                    indexSegmentId,
                                    method: webhook.method,
                                    endpointPath,
                                    type: "websocket-field-v1",
                                });
                            });
                        } else {
                            assertNever(webhook.payload.type);
                        }

                        records.push(...fields.map(compact));
                        records.push(
                            ...this.collectReferencedTypesToContentV2(typeReferences, holder?.api.types ?? {}).map(
                                compact,
                            ),
                        );
                        records.push(
                            compact({
                                type: "webhook-v4",
                                objectID: uuid(),
                                title: node.title,
                                description: webhook.description,
                                breadcrumbs: toBreadcrumbs(parents),
                                slug: node.slug,
                                version,
                                indexSegmentId: context.indexSegment.id,
                                method: webhook.method,
                                endpointPath,
                            }),
                        );
                    },
                });
            } else if (FernNavigation.hasMarkdown(node)) {
                const pageId = FernNavigation.utils.getPageId(node);
                if (pageId == null) {
                    return;
                }

                const md = this.config.docsDefinition.pages[pageId]?.markdown;
                if (md == null) {
                    LOGGER.error("Failed to find markdown for node", node);
                    return;
                }

                const frontmatter = getFrontmatter(md);
                const markdownTree = getMarkdownSectionTree(md);
                const markdownSections = getMarkdownSections(
                    markdownTree,
                    toBreadcrumbs(parents),
                    context.indexSegment.id,
                    node.slug,
                );

                records.push(
                    compact({
                        type: "page-v4",
                        objectID: uuid(),
                        title: frontmatter.title ?? node.title,
                        description: markdownTree.content,
                        breadcrumbs: toBreadcrumbs(parents),
                        slug: node.slug,
                        version,
                        indexSegmentId: context.indexSegment.id,
                    }),
                );
                records.push(...markdownSections);
            }
            return;
        });

        return records;
    }

    private stringifyTypeRef(typeRef: APIV1Read.TypeReference): string {
        return visitDiscriminatedUnion(typeRef)._visit({
            literal: (value) => value.value.value.toString(),
            id: (value) => value.value,
            primitive: (value) => value.value.type,
            optional: (value) => `${this.stringifyTypeRef(value.itemType)}?`,
            list: (value) => `${this.stringifyTypeRef(value.itemType)}[]`,
            set: (value) => `Set<${this.stringifyTypeRef(value.itemType)}>`,
            map: (value) => `Map<${this.stringifyTypeRef(value.keyType)}, ${this.stringifyTypeRef(value.valueType)}>`,
            unknown: () => "unknown",
        });
    }

    private collectReferencedTypesToContent(
        typeReferences: APIV1Read.TypeReference[],
        types: Record<string, APIV1Read.TypeDefinition>,
    ): string {
        let referencedTypes: ReferencedTypes = {};

        typeReferences.forEach((typeReference) => {
            const allReferencedTypes = getAllReferencedTypes({
                reference: typeReference,
                types,
            });
            referencedTypes = {
                ...referencedTypes,
                ...allReferencedTypes,
            };
        });

        const contents = [];
        if (Object.keys(referencedTypes).length > 0) {
            contents.push("## Referenced Types\n");
            Object.entries(referencedTypes).forEach(([key, value]) => {
                contents.push(`### ${key}\n`);

                if (value.description != null) {
                    contents.push(value.description);
                }

                visitDiscriminatedUnion(value.shape)._visit({
                    object: (object) => {
                        object.extends.forEach((extend) => {
                            contents.push(`- ${extend}`);
                        });
                        object.properties.forEach((property) => {
                            contents.push(
                                `- ${property.key}: ${this.stringifyTypeRef(property.valueType)} - ${property.description ?? ""}`,
                            );
                        });
                    },
                    alias: noop,
                    enum: (enum_) => {
                        enum_.values.forEach((value) => {
                            contents.push(`- ${value}`);
                        });
                    },
                    undiscriminatedUnion: (value) => {
                        value.variants.forEach((variant) => {
                            if (variant.displayName != null) {
                                contents.push(`#### ${variant.displayName}\n`);
                            } else if (variant.type.type === "id") {
                                contents.push(`#### ${variant.type.value}\n`);
                            }
                            contents.push(
                                `Type: ${this.stringifyTypeRef(variant.type)} - ${variant.description ?? ""}`,
                            );
                        });
                    },
                    discriminatedUnion: (value) => {
                        value.variants.forEach((variant) => {
                            contents.push(`#### ${variant.displayName ?? titleCase(variant.discriminantValue)}\n`);
                            if (variant.description != null) {
                                contents.push(variant.description);
                            }
                            variant.additionalProperties.extends.forEach((extend) => {
                                contents.push(`- ${extend}`);
                            });
                            variant.additionalProperties.properties.forEach((property) => {
                                contents.push(
                                    `- ${property.key}: ${this.stringifyTypeRef(property.valueType)} - ${property.description ?? ""}`,
                                );
                            });
                        });
                    },
                });
            });
        }

        return contents.join("\n");
    }

    private collectReferencedTypesToContentV2(
        typeReferencesWithMetadata: TypeReferenceWithMetadata[],
        types: Record<string, APIV1Read.TypeDefinition>,
    ): AlgoliaSearchRecord[] {
        const fields: AlgoliaSearchRecord[] = [];
        let referencedTypes: ReferencedTypes = {};
        const metadataMap: Record<string, TypeReferenceWithMetadata | undefined> = {};

        typeReferencesWithMetadata.forEach((typeReferenceWithMetadata) => {
            const allReferencedTypes = getAllReferencedTypes({
                reference: typeReferenceWithMetadata.reference,
                types,
            });
            referencedTypes = {
                ...referencedTypes,
                ...allReferencedTypes,
            };
            Object.keys(allReferencedTypes).forEach((key) => {
                metadataMap[key] = typeReferenceWithMetadata;
            });
        });

        if (Object.keys(referencedTypes).length > 0) {
            Object.entries(referencedTypes).forEach(([key, value]) => {
                const metadata = metadataMap[key];

                if (metadata != null) {
                    const endpointProperties = {
                        type: "endpoint-field-v1" as const,
                        method: metadata.method as HttpMethod,
                        endpointPath: metadata.endpointPath,
                        isResponseStream: metadata.isResponseStream,
                    };
                    const websocketProperties = {
                        type: "websocket-field-v1" as const,
                        endpointPath: metadata.endpointPath,
                    };
                    const webhookProperties = {
                        type: "webhook-field-v1" as const,
                        method: metadata.method as HttpMethod,
                        endpointPath: metadata.endpointPath,
                    };
                    const additionalProperties =
                        metadata.method != null
                            ? metadata.type === "endpoint-field-v1"
                                ? endpointProperties
                                : webhookProperties
                            : websocketProperties;

                    fields.push({
                        type: "field-v1",
                        objectID: uuid(),
                        value: {
                            title: key,
                            description: value.description,
                            availability: value.availability,
                            breadcrumbs: metadata.breadcrumbs,
                            slug: `${metadata.slugPrefix}.${key}`,
                            version: metadata.version,
                            indexSegmentId: metadata.indexSegmentId,
                            ...additionalProperties,
                        },
                    });

                    visitDiscriminatedUnion(value.shape)._visit({
                        object: (object) => {
                            object.properties.forEach((property) => {
                                if (metadata != null) {
                                    const slug = `${metadata.slugPrefix}.${key}.${property.key}`;
                                    fields.push({
                                        type: "field-v1",
                                        objectID: uuid(),
                                        value: {
                                            title: property.key,
                                            description: property.description,
                                            availability: property.availability,
                                            breadcrumbs: metadata.breadcrumbs.concat({
                                                title: property.key,
                                                slug,
                                            }),
                                            slug,
                                            version: metadata.version,
                                            indexSegmentId: metadata.indexSegmentId,
                                            extends: object.extends,
                                            ...additionalProperties,
                                        },
                                    });
                                }
                            });
                        },
                        alias: noop,
                        enum: (enum_) => {
                            enum_.values.forEach((value) => {
                                if (metadata != null) {
                                    const slug = `${metadata.slugPrefix}.${key}.${value.value}`;
                                    fields.push({
                                        type: "field-v1",
                                        objectID: uuid(),
                                        value: {
                                            title: value.value,
                                            availability: value.availability,
                                            description: value.description,
                                            breadcrumbs: metadata.breadcrumbs.concat({
                                                title: value.value,
                                                slug,
                                            }),
                                            slug,
                                            version: metadata.version,
                                            indexSegmentId: metadata.indexSegmentId,
                                            ...additionalProperties,
                                        },
                                    });
                                }
                            });
                        },
                        undiscriminatedUnion: (value) => {
                            value.variants.forEach((variant) => {
                                const title =
                                    variant.displayName != null
                                        ? variant.displayName
                                        : variant.type.type === "id"
                                          ? variant.type.value
                                          : undefined;
                                if (metadata != null && title != null) {
                                    const slug = `${metadata.slugPrefix}.${key}.${title}`;
                                    fields.push({
                                        type: "field-v1",
                                        objectID: uuid(),
                                        value: {
                                            title,
                                            description: variant.description,
                                            availability: variant.availability,
                                            breadcrumbs: metadata.breadcrumbs.concat({
                                                title,
                                                slug,
                                            }),
                                            slug,
                                            version: metadata.version,
                                            indexSegmentId: metadata.indexSegmentId,
                                            ...additionalProperties,
                                        },
                                    });
                                }
                            });
                        },
                        discriminatedUnion: (value) => {
                            value.variants.forEach((variant) => {
                                const title = variant.displayName ?? titleCase(variant.discriminantValue);
                                if (metadata != null) {
                                    const slug = `${metadata.slugPrefix}.${key}.${title}`;
                                    fields.push({
                                        type: "field-v1",
                                        objectID: uuid(),
                                        value: {
                                            title,
                                            description: variant.description,
                                            availability: variant.availability,
                                            breadcrumbs: metadata.breadcrumbs.concat({
                                                title,
                                                slug,
                                            }),
                                            slug,
                                            version: metadata.version,
                                            indexSegmentId: metadata.indexSegmentId,
                                            ...additionalProperties,
                                        },
                                    });
                                }
                            });
                        },
                    });
                }
            });
        }

        return fields;
    }

    private generateAlgoliaSearchRecordsForChangelogNode(
        root: FernNavigation.ChangelogNode,
        context: NavigationContext,
    ): AlgoliaSearchRecord[] {
        const records: AlgoliaSearchRecord[] = [];

        const breadcrumbs = context.pathParts.map((part) => part.name);

        const version =
            context.indexSegment.type === "versioned"
                ? {
                      id: context.indexSegment.version.id,
                      slug: context.indexSegment.version.urlSlug ?? context.indexSegment.version.id,
                  }
                : undefined;

        function toBreadcrumbs(parents: FernNavigation.NavigationNode[]): string[] {
            return [
                ...breadcrumbs,
                ...parents
                    .filter(FernNavigation.hasMetadata)
                    .filter((parent) =>
                        parent.type === "apiReference"
                            ? parent.hideTitle !== true
                            : parent.type === "changelogMonth" || parent.type === "changelogYear"
                              ? false
                              : true,
                    )
                    .map((parent) => parent.title),
            ];
        }

        FernNavigation.utils.traverseNavigation(root, (node, _index, parents) => {
            if (!FernNavigation.hasMetadata(node)) {
                return;
            }

            if (node.hidden) {
                return "skip";
            }

            if (FernNavigation.hasMarkdown(node)) {
                const pageId = FernNavigation.utils.getPageId(node);
                if (pageId == null) {
                    return;
                }

                const md = this.config.docsDefinition.pages[pageId]?.markdown;
                if (md == null) {
                    LOGGER.error("Failed to find markdown for node", node);
                    return;
                }

                records.push(
                    compact({
                        type: "page-v3",
                        objectID: uuid(),
                        title: node.title,
                        content: md,
                        breadcrumbs: toBreadcrumbs(parents),
                        slug: node.slug,
                        version,
                        indexSegmentId: context.indexSegment.id,
                    }),
                );
            }
            return;
        });

        return records;
    }

    private generateAlgoliaSearchRecordsForChangelogSection(
        changelog: DocsV1Read.ChangelogSection,
        context: NavigationContext,
        fallbackTitle: string = "Changelog",
    ): AlgoliaSearchRecord[] {
        if (changelog.hidden) {
            return [];
        }
        const records: AlgoliaSearchRecord[] = [];
        if (changelog.pageId != null) {
            const changelogPageContent = this.config.docsDefinition.pages[changelog.pageId];
            const urlSlug = changelog.urlSlug;
            const title = changelog.title ?? fallbackTitle;

            if (changelogPageContent != null) {
                const processedContent = convertMarkdownToText(changelogPageContent.markdown);
                const { indexSegment } = context;
                const pageContext = context.withPathPart({
                    // TODO: parse from frontmatter?
                    name: title,
                    urlSlug,
                });
                records.push(
                    compact({
                        type: "page-v2",
                        objectID: uuid(),
                        title,
                        // TODO: Set to something more than 10kb on prod
                        // See: https://support.algolia.com/hc/en-us/articles/4406981897617-Is-there-a-size-limit-for-my-index-records-/
                        content: truncateToBytes(processedContent, 10_000 - 1),
                        path: {
                            parts: pageContext.pathParts,
                        },
                        version:
                            indexSegment.type === "versioned"
                                ? {
                                      id: indexSegment.version.id,
                                      urlSlug: indexSegment.version.urlSlug ?? indexSegment.version.id,
                                  }
                                : undefined,
                        indexSegmentId: indexSegment.id,
                    }),
                );
            }

            changelog.items.forEach((changelogItem) => {
                const changelogItemContext = context.withPathPart({
                    name: `${title} - ${changelogItem.date}`,
                    urlSlug, // changelogs are all under the same page
                });

                const changelogPageContent = this.config.docsDefinition.pages[changelogItem.pageId];
                if (changelogPageContent != null) {
                    const processedContent = convertMarkdownToText(changelogPageContent.markdown);
                    const { indexSegment } = context;

                    records.push(
                        compact({
                            type: "page-v2",
                            objectID: uuid(),
                            title: `${title} - ${changelogItem.date}`,
                            // TODO: Set to something more than 10kb on prod
                            // See: https://support.algolia.com/hc/en-us/articles/4406981897617-Is-there-a-size-limit-for-my-index-records-/
                            content: truncateToBytes(processedContent, 10_000 - 1),
                            path: {
                                parts: changelogItemContext.pathParts,
                                // TODO: add anchor
                            },
                            version:
                                indexSegment.type === "versioned"
                                    ? {
                                          id: indexSegment.version.id,
                                          urlSlug: indexSegment.version.urlSlug ?? indexSegment.version.id,
                                      }
                                    : undefined,
                            indexSegmentId: indexSegment.id,
                        }),
                    );
                }
            });
        }

        return records;
    }

    private generateAlgoliaSearchRecordsForChangelogSectionV2(
        changelog: DocsV1Read.ChangelogSection,
        context: NavigationContext,
        fallbackTitle: string = "Changelog",
    ): AlgoliaSearchRecord[] {
        if (changelog.hidden) {
            return [];
        }
        const records: AlgoliaSearchRecord[] = [];
        if (changelog.pageId != null) {
            const changelogPageContent = this.config.docsDefinition.pages[changelog.pageId];
            const urlSlug = changelog.urlSlug;
            const title = changelog.title ?? fallbackTitle;

            if (changelogPageContent != null) {
                const { indexSegment } = context;
                const markdownTree = getMarkdownSectionTree(changelogPageContent.markdown);
                const markdownSections = getMarkdownSections(markdownTree, [], indexSegment.id, urlSlug);

                if (markdownTree.content && markdownTree.content.trim().length > 0) {
                    records.push(
                        compact({
                            type: "page-v4",
                            objectID: uuid(),
                            title,
                            description: markdownTree.content,
                            breadcrumbs: [
                                {
                                    title,
                                    slug: urlSlug,
                                },
                            ],
                            slug: urlSlug,
                            version:
                                indexSegment.type === "versioned"
                                    ? {
                                          id: indexSegment.version.id,
                                          slug: indexSegment.version.urlSlug ?? indexSegment.version.id,
                                      }
                                    : undefined,
                            indexSegmentId: indexSegment.id,
                        }),
                    );
                }
                records.push(...markdownSections);
            }

            changelog.items.forEach((changelogItem) => {
                const changelogItemContext = context.withPathPart({
                    name: `${title} - ${changelogItem.date}`,
                    urlSlug, // changelogs are all under the same page
                });

                const changelogPageContent = this.config.docsDefinition.pages[changelogItem.pageId];
                if (changelogPageContent != null) {
                    const { indexSegment } = context;

                    const markdownTree = getMarkdownSectionTree(changelogPageContent.markdown);
                    const markdownSections = getMarkdownSections(markdownTree, [], indexSegment.id, urlSlug);

                    records.push(...markdownSections.map(compact));
                    records.push(
                        compact({
                            type: "page-v4",
                            objectID: uuid(),
                            title: `${title} - ${changelogItem.date}`,
                            // TODO: Set to something more than 10kb on prod
                            // See: https://support.algolia.com/hc/en-us/articles/4406981897617-Is-there-a-size-limit-for-my-index-records-/
                            description: markdownTree.content,
                            breadcrumbs: [
                                {
                                    title,
                                    slug: urlSlug,
                                },
                            ],
                            slug: urlSlug,
                            version:
                                indexSegment.type === "versioned"
                                    ? {
                                          id: indexSegment.version.id,
                                          slug: indexSegment.version.urlSlug ?? indexSegment.version.id,
                                      }
                                    : undefined,
                            indexSegmentId: indexSegment.id,
                        }),
                    );
                }
            });
        }

        return records;
    }

    private generateAlgoliaSearchRecordsForApiDefinition(
        apiDef: APIV1Db.DbApiDefinition,
        context: NavigationContext,
    ): AlgoliaSearchRecord[] {
        const { rootPackage, subpackages } = apiDef;
        const subpackagePathParts = getPathPartsBySubpackage({ definition: apiDef });

        const records: AlgoliaSearchRecord[] = [];

        rootPackage.endpoints.forEach((e) => {
            const endpointRecords = this.generateAlgoliaSearchRecordsForEndpointDefinition(e, context);
            records.push(...endpointRecords);
        });

        Object.entries(subpackages).forEach(([id, subpackage]) => {
            const pathParts = subpackagePathParts[id];
            if (pathParts == null) {
                LOGGER.error("Excluding subpackage from search. Failed to find path parts for subpackage id=", id);
                return;
            }
            subpackage.endpoints.forEach((e) => {
                const endpointRecords = this.generateAlgoliaSearchRecordsForEndpointDefinition(
                    e,
                    context.withPathParts(pathParts),
                );
                records.push(...endpointRecords);
            });
        });

        return records;
    }

    private generateAlgoliaSearchRecordsForEndpointDefinition(
        endpointDef: APIV1Db.DbEndpointDefinition,
        context: NavigationContext,
    ): AlgoliaSearchRecord[] {
        const records: AlgoliaSearchRecord[] = [];
        if (endpointDef.name != null || endpointDef.description != null) {
            const endpointContext = context.withPathPart({
                name: endpointDef.name ?? "",
                urlSlug: endpointDef.urlSlug,
            });
            const { indexSegment } = context;
            records.push(
                compact({
                    type: "endpoint-v2",
                    objectID: uuid(),
                    endpoint: {
                        name: endpointDef.name,
                        description:
                            endpointDef.description != null
                                ? convertMarkdownToText(endpointDef.description)
                                : undefined,
                        method: endpointDef.method,
                        path: {
                            parts: endpointDef.path.parts,
                        },
                    },
                    path: {
                        parts: endpointContext.pathParts,
                    },
                    version:
                        indexSegment.type === "versioned"
                            ? {
                                  id: indexSegment.version.id,
                                  urlSlug: indexSegment.version.urlSlug ?? indexSegment.version.id,
                              }
                            : undefined,
                    indexSegmentId: indexSegment.id,
                }),
            );
        }
        // Add records for query parameters, request/response body etc.
        return records;
    }
}

interface PathPart {
    name: string;
    urlSlug: string;
    skipUrlSlug?: boolean;
}

function getPathPartsBySubpackage({
    definition,
}: {
    definition: APIV1Db.DbApiDefinition;
}): Record<APIV1Read.SubpackageId, PathPart[]> {
    return getPathPartsBySubpackageHelper({
        definition,
        subpackages: getSubpackagesMap({ definition, subpackages: definition.rootPackage.subpackages }),
        pathParts: [],
    });
}

function getPathPartsBySubpackageHelper({
    definition,
    subpackages,
    pathParts,
}: {
    definition: APIV1Db.DbApiDefinition;
    subpackages: Record<APIV1Read.SubpackageId, APIV1Db.DbApiDefinitionSubpackage>;
    pathParts: PathPart[];
}): Record<APIV1Read.SubpackageId, PathPart[]> {
    let result: Record<APIV1Read.SubpackageId, PathPart[]> = {};
    for (const [id, subpackage] of Object.entries(subpackages)) {
        if (subpackage.pointsTo != null) {
            const pointedToSubpackage = definition.subpackages[subpackage.pointsTo];
            if (pointedToSubpackage == null) {
                LOGGER.error("Failed to find pointedTo subpackage for API. id=", id);
                continue;
            }
            result = {
                ...result,
                ...getPathPartsBySubpackageHelper({
                    definition,
                    subpackages: {
                        [subpackage.pointsTo]: {
                            ...pointedToSubpackage,
                            urlSlug: subpackage.urlSlug,
                            name: subpackage.name,
                        },
                    },
                    pathParts,
                }),
            };
        } else {
            const path: PathPart[] = [...pathParts, { name: subpackage.name, urlSlug: subpackage.urlSlug }];
            result[id] = path;
            result = {
                ...result,
                ...getPathPartsBySubpackageHelper({
                    definition,
                    subpackages: getSubpackagesMap({ definition, subpackages: subpackage.subpackages }),
                    pathParts: path,
                }),
            };
        }
    }
    return result;
}

function getSubpackagesMap({
    definition,
    subpackages,
}: {
    definition: APIV1Db.DbApiDefinition;
    subpackages: APIV1Read.SubpackageId[];
}): Record<APIV1Read.SubpackageId, APIV1Db.DbApiDefinitionSubpackage> {
    return Object.fromEntries(
        subpackages.map((id) => {
            const subpackage = definition.subpackages[id];
            if (subpackage == null) {
                LOGGER.error("Failed to find subpackage for API. id=", id);
                return [];
            }
            return [id, subpackage];
        }),
    );
}

interface Frontmatter {
    title?: string; // overrides sidebar title
}

export function getFrontmatter(content: string): Frontmatter {
    try {
        const gm = grayMatter(content);
        return gm.data;
    } catch (e) {
        return {};
    }
}

export function getMarkdownSectionTree(markdown: string): MarkdownNode {
    const lines: string[] = markdown.split("\n");
    let insideCodeBlock = false;
    const root: MarkdownNode = { level: 0, heading: "", content: "", children: [] };
    const collectedNodes = [root];

    for (const line of lines) {
        const trimmedLine = line.trim();

        if (trimmedLine.startsWith("```") || trimmedLine.startsWith("~~~")) {
            insideCodeBlock = !insideCodeBlock;
        }

        let currentNode = collectedNodes.pop();
        if (!insideCodeBlock && trimmedLine.startsWith("#")) {
            const headerMatch = trimmedLine.match(/^(#{1,6})\s+(.*)$/);
            if (headerMatch) {
                const level = headerMatch[1]?.length;
                const heading = headerMatch[2]?.trim();
                if (currentNode != null && level != null && heading != null) {
                    while (currentNode != null && currentNode.level >= level) {
                        currentNode = collectedNodes.pop();
                    }
                    const newNode = { level, heading, content: "", children: [] };
                    if (currentNode != null && currentNode.level < level) {
                        currentNode.children.push(newNode);
                    }

                    if (currentNode) {
                        collectedNodes.push(currentNode);
                        collectedNodes.push(newNode);
                    }
                    continue;
                }
            }
        }

        if (currentNode) {
            currentNode.content += trimmedLine + "\n";
            collectedNodes.push(currentNode);
        }
    }

    return root;
}

export function getMarkdownSections(
    markdownSection: MarkdownNode,
    breadcrumbs: BreadcrumbsInfo[],
    indexSegmentId: string,
    slug: string,
    firstNode = true,
): AlgoliaSearchRecord[] {
    const sectionBreadcrumbs = markdownSection.heading
        ? breadcrumbs.concat([
              {
                  title: markdownSection.heading,
                  slug: firstNode ? slug : `${slug}#${markdownSection.heading}`,
              },
          ])
        : breadcrumbs.slice(0);
    const records: AlgoliaSearchRecord[] = firstNode
        ? []
        : [
              compact({
                  type: "markdown-section-v1",
                  objectID: uuid(),
                  title: markdownSection.heading,
                  content: markdownSection.content,
                  breadcrumbs: sectionBreadcrumbs,
                  indexSegmentId,
                  slug,
              }),
          ];
    return records.concat(
        markdownSection.children.reduce((acc: AlgoliaSearchRecord[], markdownSectionChild: MarkdownNode) => {
            return acc.concat(
                getMarkdownSections(markdownSectionChild, sectionBreadcrumbs, indexSegmentId, slug, false),
            );
        }, []),
    );
}

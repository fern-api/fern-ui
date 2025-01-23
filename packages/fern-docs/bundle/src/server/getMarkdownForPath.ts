import { ApiDefinition, FernNavigation } from "@fern-api/fdr-sdk";
import {
  EndpointDefinition,
  TypeDefinition,
  TypeShape,
} from "@fern-api/fdr-sdk/api-definition";
import { MarkdownText } from "@fern-api/fdr-sdk/docs";
import { isNonNullish } from "@fern-api/ui-core-utils";
import { DocsLoader } from "@fern-docs/cache";
import { removeLeadingSlash } from "@fern-docs/utils";
import { isString } from "es-toolkit/predicate";
import { pascalCaseHeaderKey } from "./headerKeyCase";
import { convertToLlmTxtMarkdown } from "./llm-txt-md";

export async function getMarkdownForPath(
  node: FernNavigation.NavigationNodePage,
  loader: DocsLoader
): Promise<{ content: string; contentType: "markdown" | "mdx" } | undefined> {
  const pages = await loader.getAllPages();

  if (FernNavigation.isApiLeaf(node)) {
    const apiDefinition = await loader
      .getApiDefinitionLoader(node.apiDefinitionId)
      .then((loader) => loader?.load());

    if (apiDefinition == null) {
      return undefined;
    }

    if (node.type === "endpoint") {
      const endpoint = apiDefinition.endpoints[node.endpointId];
      if (endpoint == null) {
        return undefined;
      }
      return {
        content: endpointDefinitionToMarkdown(
          endpoint,
          apiDefinition.globalHeaders,
          apiDefinition.types,
          node.title
        ),
        contentType: "mdx",
      };
    }
  }

  const pageId = FernNavigation.getPageId(node);
  if (pageId == null) {
    return undefined;
  }

  const page = pages[pageId];
  if (!page) {
    return undefined;
  }

  return {
    content: convertToLlmTxtMarkdown(
      page.markdown,
      node.title,
      pageId.endsWith(".mdx") ? "mdx" : "md"
    ),
    contentType: pageId.endsWith(".mdx") ? "mdx" : "markdown",
  };
}

export function getPageNodeForPath(
  root: FernNavigation.RootNode | undefined,
  path: string
): FernNavigation.NavigationNodePage | undefined {
  if (root == null) {
    return undefined;
  }
  const found = FernNavigation.utils.findNode(
    root,
    FernNavigation.Slug(removeLeadingSlash(path))
  );
  if (found.type !== "found" || !FernNavigation.isPage(found.node)) {
    return undefined;
  }
  return found.node;
}

export function endpointDefinitionToMarkdown(
  endpoint: EndpointDefinition,
  globalHeaders: ApiDefinition.ObjectProperty[] | undefined,
  types: Record<FernNavigation.TypeId, TypeDefinition>,
  nodeTitle: string
): string {
  const headers = [
    ...(endpoint.requestHeaders ?? []),
    ...(globalHeaders ?? []),
  ];
  return [
    `# ${nodeTitle}`,
    [
      "```http",
      `${endpoint.method} ${endpoint.environments?.find((env) => env.id === endpoint.defaultEnvironment)?.baseUrl ?? endpoint.environments?.[0]?.baseUrl ?? ""}${ApiDefinition.toCurlyBraceEndpointPathLiteral(endpoint.path)}`,
      endpoint.requests?.[0] != null
        ? `Content-Type: ${endpoint.requests[0].contentType}`
        : undefined,
      "```",
    ]
      .filter(isNonNullish)
      .join("\n"),
    typeof endpoint.description === "string" ? endpoint.description : undefined,
    headers.length ? "## Request Headers" : undefined,
    headers
      ?.map(
        (header) =>
          `- ${pascalCaseHeaderKey(header.key)}${getShorthand(header.valueShape, types, header.description)}`
      )
      .join("\n"),
    endpoint.pathParameters?.length ? "## Path Parameters" : undefined,
    endpoint.pathParameters
      ?.map(
        (param) =>
          `- ${pascalCaseHeaderKey(param.key)}${getShorthand(param.valueShape, types, param.description)}`
      )
      .join("\n"),
    endpoint.queryParameters?.length ? "## Query Parameters" : undefined,
    endpoint.queryParameters
      ?.map(
        (param) =>
          `- ${pascalCaseHeaderKey(param.key)}${getShorthand(param.valueShape, types, param.description)}`
      )
      .join("\n"),
    endpoint.responseHeaders?.length ? "## Response Headers" : undefined,
    endpoint.responseHeaders
      ?.map(
        (header) =>
          `- ${pascalCaseHeaderKey(header.key)}${getShorthand(header.valueShape, types, header.description)}`
      )
      .join("\n"),
    endpoint.responses?.[0] != null || endpoint.errors?.length
      ? "## Response Body"
      : undefined,
    endpoint.responses?.[0] != null || endpoint.errors?.length
      ? [
          typeof endpoint.responses?.[0]?.description === "string"
            ? `- ${endpoint.responses?.[0]?.statusCode}: ${endpoint.responses?.[0]?.description}`
            : undefined,
          ...(endpoint.errors
            ?.filter((error) => typeof error.description === "string")
            .map((error) => `- ${error.statusCode}: ${error.description}`) ??
            []),
        ].join("\n")
      : undefined,

    "## Examples",
    endpoint.examples
      ?.flatMap((example) =>
        Object.entries(example.snippets ?? {}).flatMap(([language, snippets]) =>
          snippets.map(
            (snippet) =>
              ({
                language,
                snippet,
                name: snippet.name ?? example.name,
              }) as const
          )
        )
      )
      .map(
        ({ language, snippet, name }) =>
          `\`\`\`${language === "curl" ? "shell" : language}${name != null ? ` ${name}` : ""}\n${snippet.code}\n\`\`\``
      )
      .join("\n\n"),
  ]
    .filter(isNonNullish)
    .join("\n\n");
}

function getShorthand(
  shape: TypeShape,
  types: Record<FernNavigation.TypeId, TypeDefinition>,
  shapeDescription: MarkdownText | undefined
): string | undefined {
  const unwrapped = ApiDefinition.unwrapReference(shape, types);
  const description = [shapeDescription, ...unwrapped.descriptions].filter(
    isString
  )[0];
  if (unwrapped.isOptional) {
    return description ? ` (optional): ${description}` : " (optional)";
  }

  return description ? ` (required): ${description}` : " (required)";
}

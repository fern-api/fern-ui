import type * as FernRegistryDocsRead from "@fern-fern/registry-browser/api/resources/docs/resources/v1/resources/read";
import { resolve } from "path";

const PATH_TO_DOCS_DEFINITIONS = resolve(__dirname, "../docs-definitions");

export function loadDocsDefinition(
    name: string,
    revision: number | string
): FernRegistryDocsRead.DocsDefinition | undefined {
    const filePath = resolve(PATH_TO_DOCS_DEFINITIONS, name, `${revision}.json`);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(filePath) as FernRegistryDocsRead.DocsDefinition | undefined;
}

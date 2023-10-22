import { FernRegistry } from "@fern-api/fdr-sdk";

export class DefinitionObjectFactory {
    public static createDocsDefinition(): FernRegistry.docs.v1.read.DocsDefinition {
        return {
            pages: {},
            apis: {},
            files: {},
            config: {
                colorsV3: {
                    type: "dark",
                    accentPrimary: { r: 0, g: 0, b: 0 },
                    background: { type: "solid", r: 0, g: 0, b: 0 },
                },
                navbarLinks: [],
                navigation: { items: [] },
            },
            search: {
                type: "singleAlgoliaIndex",
                value: {
                    type: "unversioned",
                    indexSegment: {
                        id: "",
                        searchApiKey: "",
                    },
                },
            },
        };
    }
}

import * as FernRegistryDocsRead from "@fern-fern/registry-browser/api/resources/docs/resources/v1/resources/read";
import { DocsDefinitionSummary } from "../../../types";

export const DEFINITION_VERSIONED_UNTABBED: DocsDefinitionSummary = {
    apis: {},
    docsConfig: {
        colorsV3: {
            type: "dark",
            accentPrimary: { r: 0, g: 0, b: 0 },
            background: { type: "solid", r: 0, g: 0, b: 0 },
        },
        navbarLinks: [],
        navigation: {
            versions: [
                {
                    version: FernRegistryDocsRead.VersionId("v2"),
                    urlSlug: "v2",
                    config: {
                        items: [
                            {
                                type: "section",
                                title: "Introduction",
                                urlSlug: "introduction",
                                skipUrlSlug: false,
                                collapsed: false,
                                items: [
                                    {
                                        type: "page",
                                        id: FernRegistryDocsRead.PageId("introduction/getting-started.mdx"),
                                        title: "Getting Started",
                                        urlSlug: "getting-started",
                                    },
                                    {
                                        type: "page",
                                        id: FernRegistryDocsRead.PageId("introduction/authentication.mdx"),
                                        title: "Authentication",
                                        urlSlug: "authentication",
                                    },
                                    {
                                        type: "page",
                                        id: FernRegistryDocsRead.PageId("introduction/changelog.mdx"),
                                        title: "Changelog",
                                        urlSlug: "changelog",
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    version: FernRegistryDocsRead.VersionId("v1.2"),
                    urlSlug: "v1-2",
                    config: {
                        items: [
                            {
                                type: "section",
                                title: "Welcome",
                                urlSlug: "introduction",
                                skipUrlSlug: false,
                                collapsed: false,
                                items: [
                                    {
                                        type: "page",
                                        id: FernRegistryDocsRead.PageId("introduction/getting-started.mdx"),
                                        title: "Getting Started",
                                        urlSlug: "getting-started",
                                    },
                                    {
                                        type: "page",
                                        id: FernRegistryDocsRead.PageId("introduction/authentication.mdx"),
                                        title: "Authentication",
                                        urlSlug: "authentication",
                                    },
                                ],
                            },
                        ],
                    },
                },
            ],
        },
    },
};

/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../index";

/**
 * @example
 *     {
 *         "x-fern-cli-version": "string",
 *         config: {
 *             id: FernRegistry.DocsConfigId("string"),
 *             updatedAt: "2024-01-15T09:30:00Z",
 *             domain: "string",
 *             basePath: "string",
 *             title: "string",
 *             defaultLanguage: "typescript",
 *             announcement: {
 *                 text: "string"
 *             },
 *             navbarLinks: [{
 *                     type: "filled"
 *                 }],
 *             footerLinks: [{
 *                     type: "github",
 *                     value: {
 *                         "key": "value"
 *                     }
 *                 }],
 *             logoHeight: 1.1,
 *             logoHref: FernRegistry.Url("string"),
 *             favicon: FernRegistry.docs.v3.FilePath("string"),
 *             metadata: {
 *                 og:site_name: "string",
 *                 og:title: "string",
 *                 og:description: "string",
 *                 og:url: "string",
 *                 og:image: {
 *                     type: "fileId",
 *                     value: {
 *                         "key": "value"
 *                     }
 *                 },
 *                 og:image:width: 1.1,
 *                 og:image:height: 1.1,
 *                 og:locale: "string",
 *                 og:logo: {
 *                     type: "fileId",
 *                     value: {
 *                         "key": "value"
 *                     }
 *                 },
 *                 twitter:title: "string",
 *                 twitter:description: "string",
 *                 twitter:handle: "string",
 *                 twitter:image: {
 *                     type: "fileId",
 *                     value: {
 *                         "key": "value"
 *                     }
 *                 },
 *                 twitter:site: "string",
 *                 twitter:url: "string",
 *                 twitter:card: "summary",
 *                 noindex: true,
 *                 nofollow: true
 *             },
 *             redirects: [{
 *                     source: "string",
 *                     destination: "string",
 *                     permanent: {
 *                         "key": "value"
 *                     }
 *                 }],
 *             colors: {
 *                 dark: {
 *                     logo: {
 *                         "key": "value"
 *                     },
 *                     backgroundImage: {
 *                         "key": "value"
 *                     },
 *                     accentPrimary: {
 *                         r: 1,
 *                         g: 1,
 *                         b: 1,
 *                         a: {
 *                             "key": "value"
 *                         }
 *                     },
 *                     background: {
 *                         type: "solid",
 *                         r: 1,
 *                         g: 1,
 *                         b: 1,
 *                         a: {
 *                             "key": "value"
 *                         }
 *                     },
 *                     border: {
 *                         "key": "value"
 *                     },
 *                     sidebarBackground: {
 *                         "key": "value"
 *                     },
 *                     headerBackground: {
 *                         "key": "value"
 *                     },
 *                     cardBackground: {
 *                         "key": "value"
 *                     }
 *                 },
 *                 light: {
 *                     logo: {
 *                         "key": "value"
 *                     },
 *                     backgroundImage: {
 *                         "key": "value"
 *                     },
 *                     accentPrimary: {
 *                         r: 1,
 *                         g: 1,
 *                         b: 1,
 *                         a: {
 *                             "key": "value"
 *                         }
 *                     },
 *                     background: {
 *                         type: "solid",
 *                         r: 1,
 *                         g: 1,
 *                         b: 1,
 *                         a: {
 *                             "key": "value"
 *                         }
 *                     },
 *                     border: {
 *                         "key": "value"
 *                     },
 *                     sidebarBackground: {
 *                         "key": "value"
 *                     },
 *                     headerBackground: {
 *                         "key": "value"
 *                     },
 *                     cardBackground: {
 *                         "key": "value"
 *                     }
 *                 }
 *             },
 *             fonts: {
 *                 headingsFont: {
 *                     type: "custom"
 *                 },
 *                 bodyFont: {
 *                     type: "custom"
 *                 },
 *                 codeFont: {
 *                     type: "custom"
 *                 }
 *             },
 *             layout: {
 *                 pageWidth: {
 *                     type: "px",
 *                     value: {
 *                         "key": "value"
 *                     }
 *                 },
 *                 contentWidth: {
 *                     type: "px",
 *                     value: {
 *                         "key": "value"
 *                     }
 *                 },
 *                 sidebarWidth: {
 *                     type: "px",
 *                     value: {
 *                         "key": "value"
 *                     }
 *                 },
 *                 headerHeight: {
 *                     type: "px",
 *                     value: {
 *                         "key": "value"
 *                     }
 *                 },
 *                 searchbarPlacement: "HEADER",
 *                 tabsPlacement: "HEADER",
 *                 contentAlignment: "CENTER",
 *                 headerPosition: "FIXED",
 *                 disableHeader: true
 *             },
 *             analytics: {
 *                 segment: {
 *                     writeKey: "string"
 *                 },
 *                 fullstory: {
 *                     orgId: "string"
 *                 },
 *                 intercom: {
 *                     appId: "string",
 *                     apiBase: {
 *                         "key": "value"
 *                     }
 *                 },
 *                 posthog: {
 *                     apiKey: "string",
 *                     endpoint: {
 *                         "key": "value"
 *                     }
 *                 },
 *                 gtm: {
 *                     containerId: "string"
 *                 },
 *                 ga4: {
 *                     measurementId: "string"
 *                 },
 *                 amplitude: {
 *                     apiKey: "string"
 *                 },
 *                 mixpanel: {
 *                     apiKey: "string"
 *                 },
 *                 hotjar: {
 *                     hjid: "string",
 *                     hjsv: "string"
 *                 },
 *                 koala: {
 *                     apiKey: "string"
 *                 },
 *                 logrocket: {
 *                     apiKey: "string"
 *                 },
 *                 pirsch: {
 *                     id: "string"
 *                 },
 *                 plausible: {
 *                     domain: "string"
 *                 },
 *                 fathom: {
 *                     siteId: "string"
 *                 },
 *                 clearbit: {
 *                     apiKey: "string"
 *                 },
 *                 heap: {
 *                     appId: "string"
 *                 }
 *             },
 *             integrations: {
 *                 intercom: "string"
 *             },
 *             search: {
 *                 type: "unversioned"
 *             },
 *             css: {
 *                 inline: [{
 *                         "key": "value"
 *                     }]
 *             },
 *             js: {
 *                 remote: [{
 *                         "key": "value"
 *                     }],
 *                 files: [{
 *                         fileId: FernRegistry.FileId("string"),
 *                         strategy: {
 *                             "key": "value"
 *                         }
 *                     }],
 *                 inline: [{
 *                         "key": "value"
 *                     }]
 *             },
 *             playground: {
 *                 oauth: true
 *             },
 *             files: [FernRegistry.docs.v3.FilePath("string")],
 *             markdownFiles: [FernRegistry.docs.v3.FilePath("string")],
 *             mdxBundlerFile: [FernRegistry.docs.v3.FilePath("string")]
 *         },
 *         navigation: {
 *             type: "root",
 *             version: "v2",
 *             child: {
 *                 type: "versioned",
 *                 children: [{
 *                         type: "version",
 *                         default: true,
 *                         versionId: FernRegistry.VersionId("string"),
 *                         child: {
 *                             type: "tabbed",
 *                             children: [{
 *                                     "key": "value"
 *                                 }],
 *                             id: FernRegistry.navigation.latest.NodeId("string")
 *                         },
 *                         availability: {
 *                             "key": "value"
 *                         },
 *                         landingPage: {
 *                             "key": "value"
 *                         },
 *                         title: "string",
 *                         slug: FernRegistry.navigation.latest.Slug("string"),
 *                         canonicalSlug: FernRegistry.navigation.latest.Slug("string"),
 *                         icon: "string",
 *                         hidden: true,
 *                         authed: true,
 *                         audience: [{
 *                                 "key": "value"
 *                             }],
 *                         id: FernRegistry.navigation.latest.NodeId("string"),
 *                         pointsTo: {
 *                             "key": "value"
 *                         }
 *                     }],
 *                 id: FernRegistry.navigation.latest.NodeId("string")
 *             },
 *             title: "string",
 *             slug: FernRegistry.navigation.latest.Slug("string"),
 *             canonicalSlug: FernRegistry.navigation.latest.Slug("string"),
 *             icon: "string",
 *             hidden: true,
 *             authed: true,
 *             audience: [{
 *                     "key": "value"
 *                 }],
 *             id: FernRegistry.navigation.latest.NodeId("string"),
 *             pointsTo: {
 *                 "key": "value"
 *             }
 *         },
 *         files: {
 *             "string": {
 *                 type: "image",
 *                 width: 1.1,
 *                 height: 1.1,
 *                 blurDataUrl: "string",
 *                 alt: "string"
 *             }
 *         }
 *     }
 */
export interface PutDocsMetadata {
    "x-fern-cli-version"?: string;
    config: FernRegistry.docs.v3.DocsConfig;
    navigation: FernRegistry.navigation.latest.RootNode;
    files: Record<FernRegistry.docs.v3.FilePath, FernRegistry.docs.v3.FileMetadata>;
}

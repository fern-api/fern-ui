/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../index";

/**
 * @example
 *     {
 *         docsDefinition: {
 *             pages: {
 *                 "string": {
 *                     markdown: "string",
 *                     editThisPageUrl: FernRegistry.Url("string")
 *                 }
 *             },
 *             config: {
 *                 title: "string",
 *                 defaultLanguage: "typescript",
 *                 announcement: {
 *                     text: "string"
 *                 },
 *                 navigation: {
 *                     tabs: [{
 *                             "key": "value"
 *                         }],
 *                     tabsV2: [{
 *                             "key": "value"
 *                         }],
 *                     landingPage: {
 *                         id: FernRegistry.PageId("string"),
 *                         title: "string",
 *                         icon: {
 *                             "key": "value"
 *                         },
 *                         hidden: {
 *                             "key": "value"
 *                         },
 *                         urlSlugOverride: {
 *                             "key": "value"
 *                         },
 *                         fullSlug: {
 *                             "key": "value"
 *                         }
 *                     }
 *                 },
 *                 root: {
 *                     type: "root",
 *                     version: "v1",
 *                     child: {
 *                         type: "versioned",
 *                         children: [{
 *                                 type: "version",
 *                                 default: true,
 *                                 versionId: FernRegistry.VersionId("string"),
 *                                 child: {
 *                                     type: "tabbed",
 *                                     children: [{
 *                                             "key": "value"
 *                                         }],
 *                                     id: FernRegistry.navigation.v1.NodeId("string")
 *                                 },
 *                                 availability: {
 *                                     "key": "value"
 *                                 },
 *                                 landingPage: {
 *                                     "key": "value"
 *                                 },
 *                                 title: "string",
 *                                 slug: FernRegistry.navigation.v1.Slug("string"),
 *                                 icon: {
 *                                     "key": "value"
 *                                 },
 *                                 hidden: {
 *                                     "key": "value"
 *                                 },
 *                                 authed: {
 *                                     "key": "value"
 *                                 },
 *                                 id: FernRegistry.navigation.v1.NodeId("string"),
 *                                 viewers: {
 *                                     "key": "value"
 *                                 },
 *                                 orphaned: {
 *                                     "key": "value"
 *                                 },
 *                                 pointsTo: {
 *                                     "key": "value"
 *                                 }
 *                             }],
 *                         id: FernRegistry.navigation.v1.NodeId("string")
 *                     },
 *                     title: "string",
 *                     slug: FernRegistry.navigation.v1.Slug("string"),
 *                     icon: {
 *                         "key": "value"
 *                     },
 *                     hidden: {
 *                         "key": "value"
 *                     },
 *                     authed: {
 *                         "key": "value"
 *                     },
 *                     id: FernRegistry.navigation.v1.NodeId("string"),
 *                     viewers: {
 *                         "key": "value"
 *                     },
 *                     orphaned: {
 *                         "key": "value"
 *                     },
 *                     pointsTo: {
 *                         "key": "value"
 *                     }
 *                 },
 *                 navbarLinks: [{
 *                         type: "filled"
 *                     }],
 *                 footerLinks: [{
 *                         type: "github",
 *                         value: {
 *                             "key": "value"
 *                         }
 *                     }],
 *                 logoHeight: 1.1,
 *                 logoHref: FernRegistry.Url("string"),
 *                 favicon: FernRegistry.FileId("string"),
 *                 metadata: {
 *                     og:site_name: "string",
 *                     og:title: "string",
 *                     og:description: "string",
 *                     og:url: "string",
 *                     og:image: {
 *                         type: "fileId",
 *                         value: {
 *                             "key": "value"
 *                         }
 *                     },
 *                     og:image:width: 1.1,
 *                     og:image:height: 1.1,
 *                     og:locale: "string",
 *                     og:logo: {
 *                         type: "fileId",
 *                         value: {
 *                             "key": "value"
 *                         }
 *                     },
 *                     twitter:title: "string",
 *                     twitter:description: "string",
 *                     twitter:handle: "string",
 *                     twitter:image: {
 *                         type: "fileId",
 *                         value: {
 *                             "key": "value"
 *                         }
 *                     },
 *                     twitter:site: "string",
 *                     twitter:url: "string",
 *                     twitter:card: "summary",
 *                     noindex: true,
 *                     nofollow: true
 *                 },
 *                 redirects: [{
 *                         source: "string",
 *                         destination: "string",
 *                         permanent: {
 *                             "key": "value"
 *                         }
 *                     }],
 *                 colorsV3: {
 *                     type: "dark"
 *                 },
 *                 layout: {
 *                     pageWidth: {
 *                         type: "px",
 *                         value: {
 *                             "key": "value"
 *                         }
 *                     },
 *                     contentWidth: {
 *                         type: "px",
 *                         value: {
 *                             "key": "value"
 *                         }
 *                     },
 *                     sidebarWidth: {
 *                         type: "px",
 *                         value: {
 *                             "key": "value"
 *                         }
 *                     },
 *                     headerHeight: {
 *                         type: "px",
 *                         value: {
 *                             "key": "value"
 *                         }
 *                     },
 *                     searchbarPlacement: "HEADER",
 *                     tabsPlacement: "HEADER",
 *                     contentAlignment: "CENTER",
 *                     headerPosition: "FIXED",
 *                     disableHeader: true
 *                 },
 *                 typographyV2: {
 *                     headingsFont: {
 *                         type: "custom"
 *                     },
 *                     bodyFont: {
 *                         type: "custom"
 *                     },
 *                     codeFont: {
 *                         type: "custom"
 *                     }
 *                 },
 *                 analyticsConfig: {
 *                     segment: {
 *                         writeKey: "string"
 *                     },
 *                     fullstory: {
 *                         orgId: "string"
 *                     },
 *                     intercom: {
 *                         appId: "string",
 *                         apiBase: {
 *                             "key": "value"
 *                         }
 *                     },
 *                     posthog: {
 *                         apiKey: "string",
 *                         endpoint: {
 *                             "key": "value"
 *                         }
 *                     },
 *                     gtm: {
 *                         containerId: "string"
 *                     },
 *                     ga4: {
 *                         measurementId: "string"
 *                     },
 *                     amplitude: {
 *                         apiKey: "string"
 *                     },
 *                     mixpanel: {
 *                         apiKey: "string"
 *                     },
 *                     hotjar: {
 *                         hjid: "string",
 *                         hjsv: "string"
 *                     },
 *                     koala: {
 *                         apiKey: "string"
 *                     },
 *                     logrocket: {
 *                         apiKey: "string"
 *                     },
 *                     pirsch: {
 *                         id: "string"
 *                     },
 *                     plausible: {
 *                         domain: "string"
 *                     },
 *                     fathom: {
 *                         siteId: "string"
 *                     },
 *                     clearbit: {
 *                         apiKey: "string"
 *                     },
 *                     heap: {
 *                         appId: "string"
 *                     }
 *                 },
 *                 integrations: {
 *                     intercom: "string"
 *                 },
 *                 css: {
 *                     inline: [{
 *                             "key": "value"
 *                         }]
 *                 },
 *                 js: {
 *                     remote: [{
 *                             "key": "value"
 *                         }],
 *                     files: [{
 *                             fileId: FernRegistry.FileId("string"),
 *                             strategy: {
 *                                 "key": "value"
 *                             }
 *                         }],
 *                     inline: [{
 *                             "key": "value"
 *                         }]
 *                 },
 *                 playground: {
 *                     oauth: true
 *                 },
 *                 backgroundImage: FernRegistry.FileId("string"),
 *                 logoV2: {
 *                     dark: FernRegistry.FileId("string"),
 *                     light: FernRegistry.FileId("string")
 *                 },
 *                 logo: FernRegistry.FileId("string"),
 *                 colors: {
 *                     accentPrimary: {
 *                         r: 1,
 *                         g: 1,
 *                         b: 1,
 *                         a: {
 *                             "key": "value"
 *                         }
 *                     }
 *                 },
 *                 colorsV2: {
 *                     accentPrimary: {
 *                         type: "unthemed"
 *                     },
 *                     background: {
 *                         type: "unthemed"
 *                     }
 *                 },
 *                 typography: {
 *                     headingsFont: {
 *                         name: "string",
 *                         fontFile: FernRegistry.FileId("string")
 *                     },
 *                     bodyFont: {
 *                         name: "string",
 *                         fontFile: FernRegistry.FileId("string")
 *                     },
 *                     codeFont: {
 *                         name: "string",
 *                         fontFile: FernRegistry.FileId("string")
 *                     }
 *                 }
 *             },
 *             jsFiles: {
 *                 "string": "string"
 *             }
 *         }
 *     }
 */
export interface RegisterDocsRequest {
    docsDefinition: FernRegistry.docs.v1.write.DocsDefinition;
}

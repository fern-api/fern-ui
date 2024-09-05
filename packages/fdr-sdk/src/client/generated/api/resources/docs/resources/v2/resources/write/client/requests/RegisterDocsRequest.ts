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
 *                     editThisPageUrl: "string"
 *                 }
 *             },
 *             config: {
 *                 title: "string",
 *                 defaultLanguage: FernRegistry.docs.v1.commons.ProgrammingLanguage.Typescript,
 *                 announcement: {
 *                     text: "string"
 *                 },
 *                 navigation: {
 *                     tabs: [{
 *                             title: "string",
 *                             items: [{
 *                                     "key": "value"
 *                                 }],
 *                             skipUrlSlug: {
 *                                 "key": "value"
 *                             },
 *                             icon: {
 *                                 "key": "value"
 *                             },
 *                             hidden: {
 *                                 "key": "value"
 *                             },
 *                             urlSlugOverride: {
 *                                 "key": "value"
 *                             },
 *                             fullSlug: {
 *                                 "key": "value"
 *                             }
 *                         }],
 *                     tabsV2: [{
 *                             type: "group",
 *                             title: "string",
 *                             items: [{
 *                                     "key": "value"
 *                                 }],
 *                             skipUrlSlug: {
 *                                 "key": "value"
 *                             },
 *                             icon: {
 *                                 "key": "value"
 *                             },
 *                             hidden: {
 *                                 "key": "value"
 *                             },
 *                             urlSlugOverride: {
 *                                 "key": "value"
 *                             },
 *                             fullSlug: {
 *                                 "key": "value"
 *                             }
 *                         }],
 *                     landingPage: {
 *                         id: "string",
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
 *                 logoHref: "string",
 *                 favicon: "string",
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
 *                     twitter:card: FernRegistry.docs.v1.commons.TwitterCardSetting.Summary,
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
 *                     searchbarPlacement: FernRegistry.docs.v1.commons.SearchbarPlacement.Header,
 *                     tabsPlacement: FernRegistry.docs.v1.commons.TabsPlacement.Header,
 *                     contentAlignment: FernRegistry.docs.v1.commons.ContentAlignment.Center,
 *                     headerPosition: FernRegistry.docs.v1.commons.HeaderPosition.Fixed,
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
 *                             fileId: "string",
 *                             strategy: {
 *                                 "key": "value"
 *                             }
 *                         }],
 *                     inline: [{
 *                             "key": "value"
 *                         }]
 *                 },
 *                 backgroundImage: "string",
 *                 logoV2: {
 *                     dark: "string",
 *                     light: "string"
 *                 },
 *                 logo: "string",
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
 *                         fontFile: "string"
 *                     },
 *                     bodyFont: {
 *                         name: "string",
 *                         fontFile: "string"
 *                     },
 *                     codeFont: {
 *                         name: "string",
 *                         fontFile: "string"
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

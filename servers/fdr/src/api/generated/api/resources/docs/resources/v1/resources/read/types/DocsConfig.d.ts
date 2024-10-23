/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../index";
export interface DocsConfig {
    title: string | undefined;
    defaultLanguage: FernRegistry.docs.v1.commons.ProgrammingLanguage | undefined;
    announcement: FernRegistry.docs.v1.commons.AnnouncementConfig | undefined;
    navigation: FernRegistry.docs.v1.read.NavigationConfig | undefined;
    root: FernRegistry.navigation.v1.RootNode | undefined;
    navbarLinks: FernRegistry.docs.v1.commons.NavbarLink[] | undefined;
    footerLinks: FernRegistry.docs.v1.commons.FooterLink[] | undefined;
    logoHeight: FernRegistry.docs.v1.read.Height | undefined;
    logoHref: FernRegistry.Url | undefined;
    favicon: FernRegistry.FileId | undefined;
    metadata: FernRegistry.docs.v1.commons.MetadataConfig | undefined;
    redirects: FernRegistry.docs.v1.commons.RedirectConfig[] | undefined;
    colorsV3: FernRegistry.docs.v1.read.ColorsConfigV3 | undefined;
    layout: FernRegistry.docs.v1.commons.DocsLayoutConfig | undefined;
    typographyV2: FernRegistry.docs.v1.commons.DocsTypographyConfigV2 | undefined;
    analyticsConfig: FernRegistry.docs.v1.commons.AnalyticsConfig | undefined;
    integrations: FernRegistry.docs.v1.commons.IntegrationsConfig | undefined;
    css: FernRegistry.docs.v1.commons.CssConfig | undefined;
    js: FernRegistry.docs.v1.commons.JsConfig | undefined;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../index";

export interface DocsConfig {
    title?: string;
    defaultLanguage?: FernRegistry.docs.v1.commons.ProgrammingLanguage;
    banner?: FernRegistry.docs.v1.commons.BannerConfig;
    navigation: FernRegistry.docs.v1.read.NavigationConfig;
    navbarLinks?: FernRegistry.docs.v1.commons.NavbarLink[];
    footerLinks?: FernRegistry.docs.v1.commons.FooterLink[];
    logoHeight?: FernRegistry.docs.v1.read.Height;
    logoHref?: FernRegistry.docs.v1.commons.Url;
    favicon?: FernRegistry.docs.v1.commons.FileId;
    metadata?: FernRegistry.docs.v1.commons.MetadataConfig;
    redirects?: FernRegistry.docs.v1.commons.RedirectConfig[];
    colorsV3?: FernRegistry.docs.v1.read.ColorsConfigV3;
    layout?: FernRegistry.docs.v1.commons.DocsLayoutConfig;
    typographyV2?: FernRegistry.docs.v1.commons.DocsTypographyConfigV2;
    analyticsConfig?: FernRegistry.docs.v1.commons.AnalyticsConfig;
    integrations?: FernRegistry.docs.v1.commons.IntegrationsConfig;
    css?: FernRegistry.docs.v1.commons.CssConfig;
    js?: FernRegistry.docs.v1.commons.JsConfig;
}

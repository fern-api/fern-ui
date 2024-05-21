/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../..";
export interface DocsConfig {
    title?: string;
    navigation: FernRegistry.docs.v1.read.NavigationConfig;
    navbarLinks?: FernRegistry.docs.v1.read.NavbarLink[];
    footerLinks?: FernRegistry.docs.v1.read.FooterLink[];
    logoHeight?: FernRegistry.docs.v1.read.Height;
    logoHref?: FernRegistry.docs.v1.commons.Url;
    favicon?: FernRegistry.docs.v1.commons.FileId;
    metadata?: FernRegistry.docs.v1.read.MetadataConfig;
    redirects?: FernRegistry.docs.v1.read.RedirectConfig[];
    colorsV3?: FernRegistry.docs.v1.read.ColorsConfigV3;
    layout?: FernRegistry.docs.v1.read.DocsLayoutConfig;
    typographyV2?: FernRegistry.docs.v1.read.DocsTypographyConfigV2;
    integrations?: FernRegistry.docs.v1.read.IntegrationsConfig;
    css?: FernRegistry.docs.v1.read.CssConfig;
    js?: FernRegistry.docs.v1.read.JsConfig;
    backgroundImage?: FernRegistry.docs.v1.commons.FileId;
    logoV2?: FernRegistry.docs.v1.read.LogoV2;
    logo?: FernRegistry.docs.v1.commons.FileId;
    colors?: FernRegistry.docs.v1.read.ColorsConfig;
    colorsV2?: FernRegistry.docs.v1.read.ColorsConfigV2;
    typography?: FernRegistry.docs.v1.read.DocsTypographyConfig;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../..";
export interface DocsConfig {
    title?: string;
    navigation: FernRegistry.docs.v1.write.NavigationConfig;
    navbarLinks?: FernRegistry.docs.v1.commons.NavbarLink[];
    footerLinks?: FernRegistry.docs.v1.commons.FooterLink[];
    logoHeight?: FernRegistry.docs.v1.write.Height;
    logoHref?: FernRegistry.docs.v1.commons.Url;
    favicon?: FernRegistry.docs.v1.commons.FileId;
    metadata?: FernRegistry.docs.v1.commons.MetadataConfig;
    redirects?: FernRegistry.docs.v1.commons.RedirectConfig[];
    colorsV3?: FernRegistry.docs.v1.write.ColorsConfigV3;
    layout?: FernRegistry.docs.v1.write.DocsLayoutConfig;
    typographyV2?: FernRegistry.docs.v1.commons.DocsTypographyConfigV2;
    integrations?: FernRegistry.docs.v1.commons.IntegrationsConfig;
    css?: FernRegistry.docs.v1.commons.CssConfig;
    js?: FernRegistry.docs.v1.commons.JsConfig;
    backgroundImage?: FernRegistry.docs.v1.commons.FileId;
    logoV2?: FernRegistry.docs.v1.commons.ThemedFileId;
    logo?: FernRegistry.docs.v1.commons.FileId;
    colors?: FernRegistry.docs.v1.commons.ColorsConfig;
    colorsV2?: FernRegistry.docs.v1.commons.ColorsConfigV2;
    typography?: FernRegistry.docs.v1.commons.DocsTypographyConfig;
}

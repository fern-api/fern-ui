/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../..";
export interface DocsConfig {
    title?: string;
    navigation: FernRegistry.docs.v1.write.NavigationConfig;
    navbarLinks?: FernRegistry.docs.v1.write.NavbarLink[];
    footerLinks?: FernRegistry.docs.v1.write.FooterLink[];
    logoHeight?: FernRegistry.docs.v1.write.Height;
    logoHref?: FernRegistry.docs.v1.write.Url;
    favicon?: FernRegistry.docs.v1.write.FileId;
    metadata?: FernRegistry.docs.v1.write.MetadataConfig;
    redirects?: FernRegistry.docs.v1.write.RedirectConfig[];
    colorsV3?: FernRegistry.docs.v1.write.ColorsConfigV3;
    layout?: FernRegistry.docs.v1.write.DocsLayoutConfig;
    typographyV2?: FernRegistry.docs.v1.write.DocsTypographyConfigV2;
    integrations?: FernRegistry.docs.v1.write.IntegrationsConfig;
    css?: FernRegistry.docs.v1.write.CssConfig;
    js?: FernRegistry.docs.v1.write.JsConfig;
    backgroundImage?: FernRegistry.docs.v1.write.FileId;
    logoV2?: FernRegistry.docs.v1.write.ThemedFileId;
    logo?: FernRegistry.docs.v1.write.FileId;
    colors?: FernRegistry.docs.v1.write.ColorsConfig;
    colorsV2?: FernRegistry.docs.v1.write.ColorsConfigV2;
    typography?: FernRegistry.docs.v1.write.DocsTypographyConfig;
}

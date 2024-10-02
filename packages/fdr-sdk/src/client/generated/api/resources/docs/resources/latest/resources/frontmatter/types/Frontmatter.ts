/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../index";

export interface Frontmatter
    extends FernRegistry.docs.latest.WithMetadataConfig,
        FernRegistry.docs.latest.WithJsonLdBreadcrumbs {
    /** The layout of the page. This will determine the width of the content. */
    layout: FernRegistry.docs.latest.Layout | undefined;
    /** if provided, the frontmatter slug will be used instead of tying to piece it together from the navigation hierarchy. */
    slug: FernRegistry.navigation.latest.Slug | undefined;
    /**
     * The title of the page. If not set, the title will inherit from what's set in the sidebar.
     * This is also used for the <title> tag in the HTML.
     */
    title: string | undefined;
    /** The SEO title of the page. If not set, the title will inherit what's set in the sidebar. */
    headline: string | undefined;
    /** The description of the page. This is used for the <meta name="description"> tag in the HTML. */
    description: string | undefined;
    /**
     * The subtitle of the page. This is a markdown string that is rendered below the title.
     * If `description` is not set, this will be used for the <meta name="description"> tag in the HTML.
     */
    subtitle: string | undefined;
    /** The URL to this page's image. This is currently an alias for `og:image`, but its purpose may change to a be a cover-image (pre-title). */
    image: FernRegistry.docs.latest.FileIdOrUrl | undefined;
    /** Reners an "Edit this page" link at the bottom of the page. */
    "edit-this-page-url": string | undefined;
    /** Hides the table of contents. */
    "hide-toc": boolean | undefined;
    /** Forces the table of contents to be generated for steps, accordions, and tabs. */
    "force-toc": boolean | undefined;
    /** Hides the (prev, next) navigation links at the bottom of the page. */
    "hide-nav-links": boolean | undefined;
    /** Hides the feedback form at the bottom of the page */
    "hide-feedback": boolean | undefined;
    /** Disables click-to-zoom on all imgages on this page. */
    "no-image-zoom": boolean | undefined;
    /** By default, this is inferred from docs.yml, but can be overridden. */
    breadcrumb: FernRegistry.navigation.latest.BreadcrumbItem[] | undefined;
    /** Use subtitle instead. */
    excerpt: string | undefined;
    /** The canonical URL of the page. This is used for the <link rel="canonical"> tag in the HTML. */
    "canonical-url": string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

export interface NavigationNodeMetadata {
    icon?: string;
    hidden?: boolean;
    /** Optional slug to override the generated slug, which is `kebabCase(title)`. This is ignored if `fullSlug` is provided. */
    urlSlugOverride?: string;
    /** If provided, ignores `urlSlugOverride`, and its parent slugs, and instead uses `/${basepath}/${fullSlug.join('/')}` this page's pathname. */
    fullSlug?: string[];
}

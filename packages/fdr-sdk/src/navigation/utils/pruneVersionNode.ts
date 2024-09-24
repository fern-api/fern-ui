import { FernNavigation } from "../..";
import { NavigationNode, hasMetadata } from "../types";
import { hasRedirect } from "../types/NavigationNodeWithRedirect";
import { traverseNavigation } from "./traverseNavigation";

export function pruneVersionNode<T extends NavigationNode>(
    node: T,
    rootSlug: FernNavigation.Slug,
    versionSlug: FernNavigation.Slug,
): T;
export function pruneVersionNode<T extends NavigationNode>(
    node: T | undefined,
    rootSlug: FernNavigation.Slug,
    versionSlug: FernNavigation.Slug,
): T | undefined;
export function pruneVersionNode<T extends NavigationNode>(
    node: T | undefined,
    rootSlug: FernNavigation.Slug,
    versionSlug: FernNavigation.Slug,
): T | undefined {
    if (node == null) {
        return undefined;
    }
    traverseNavigation(node, (node) => {
        if (hasMetadata(node)) {
            const newSlug = toDefaultSlug(node.slug, rootSlug, versionSlug);
            // children of this node was already pruned
            if (node.slug === newSlug) {
                return "skip";
            }
            node.slug = newSlug;
        }

        if (hasRedirect(node)) {
            node.pointsTo = toDefaultSlug(node.pointsTo, rootSlug, versionSlug);
        }
        return;
    });
    return node;
}

/**
 * All versioned slugs are prefixed with the version slug, but the default version may be accessed without the version prefix.
 * toDefaultSlug creates the "unversioned" slug for pages under the default version.
 * This should be treated as the cannonical slug for that page.
 */
export function toDefaultSlug(
    slug: FernNavigation.Slug,
    rootSlug: FernNavigation.Slug,
    versionSlug: FernNavigation.Slug,
): FernNavigation.Slug;
export function toDefaultSlug(
    slug: FernNavigation.Slug | undefined,
    rootSlug: FernNavigation.Slug,
    versionSlug: FernNavigation.Slug,
): FernNavigation.Slug | undefined;
export function toDefaultSlug(
    slug: FernNavigation.Slug | undefined,
    rootSlug: FernNavigation.Slug,
    versionSlug: FernNavigation.Slug,
): FernNavigation.Slug | undefined {
    if (slug == null) {
        return undefined;
    }
    if (slug.startsWith(versionSlug)) {
        return FernNavigation.Slug(
            slug.replace(new RegExp(`^${versionSlug.replaceAll("/", "\\/")}`), rootSlug).replace(/^\//, ""),
        );
    }
    return slug;
}

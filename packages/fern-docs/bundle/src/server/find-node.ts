import { AuthState, getAuthState } from "@/server/auth/getAuthState";
import { DocsLoader } from "@/server/cached-docs-loader";
import { FernNavigation } from "@fern-api/fdr-sdk";
import { addLeadingSlash, getRedirectForPath } from "@fern-docs/utils";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import "server-only";
import { UnreachableCaseError } from "ts-essentials";

export function createFindNode(docsLoader: DocsLoader): (
  slug: FernNavigation.Slug
) => Promise<{
  node: FernNavigation.NavigationNodePage;
  parents: readonly FernNavigation.WithNodeMetadata[];
  versions: readonly Omit<FernNavigation.VersionNode, "child">[];
  tabs: readonly Omit<FernNavigation.TabChild, "child" | "children">[];
  currentVersion: Omit<FernNavigation.VersionNode, "child"> | undefined;
  currentTab: Omit<FernNavigation.TabChild, "child" | "children"> | undefined;
  authState: AuthState;
}> {
  return async (slug: FernNavigation.Slug) => {
    const baseUrl = await docsLoader.getBaseUrl();
    const config = await docsLoader.getConfig();

    const matchedRedirect = getRedirectForPath(
      addLeadingSlash(slug),
      baseUrl,
      config?.redirects
    );

    // if there is a redirect, redirect to the destination
    if (matchedRedirect) {
      if (matchedRedirect.permanent) {
        permanentRedirect(matchedRedirect.destination);
      } else {
        redirect(matchedRedirect.destination);
      }
    }

    const root = await docsLoader.getRoot(docsLoader.fern_token);

    // this should not happen, but if it does, we should return a 404
    if (!root) {
      console.warn("root not found");
      notFound();
    }

    // the root slug is the basepath, so if the current does not start with the root slug, redirect to the root slug
    if (!slug.startsWith(root.slug)) {
      return redirect(addLeadingSlash(root.pointsTo ?? root.slug));
    }

    // find the node that is currently being viewed
    const found = FernNavigation.utils.findNode(root, slug);

    if (found.type === "redirect") {
      return redirect(addLeadingSlash(found.redirect));
    }

    const authState = await getAuthState(
      baseUrl.domain,
      docsLoader.host,
      docsLoader.fern_token,
      addLeadingSlash(slug)
    );

    // this is a special case for when the user is not authenticated, but the not-found status originates from an authed node
    if (
      found.type === "notFound" &&
      found.authed &&
      !authState.authed &&
      authState.authorizationUrl != null
    ) {
      return redirect(authState.authorizationUrl);
    }

    if (found.type === "notFound") {
      if (found.redirect) {
        return redirect(addLeadingSlash(found.redirect));
      }
      console.warn("node not found", slug);
      return notFound();
    }

    // if the current node requires authentication and the user is not authenticated, redirect to the auth page
    if (found.node.authed && !authState.authed) {
      // if the page can be considered an edge node when it's unauthed, then we'll follow the redirect
      if (FernNavigation.hasRedirect(found.node)) {
        return redirect(addLeadingSlash(found.node.pointsTo));
      }

      if (authState.authorizationUrl == null) {
        // TODO: after upgrading to Next.js 15, use https://nextjs.org/docs/app/api-reference/functions/unauthorized
        console.warn("unauthorized", slug);
        return notFound();
      }
      return redirect(authState.authorizationUrl);
    }

    return {
      node: found.node,
      parents: (
        found.parents.filter(
          FernNavigation.hasMetadata
        ) as FernNavigation.WithNodeMetadata[]
      ).map(extractMetadata),
      versions: found.versions.map(extractVersionMetadata),
      tabs: found.tabs.map(extractTabMetadata),
      currentVersion: found.currentVersion
        ? extractVersionMetadata(found.currentVersion)
        : undefined,
      currentTab: found.currentTab
        ? extractTabMetadata(found.currentTab)
        : undefined,
      authState,
    };
  };
}

function extractMetadata<T extends FernNavigation.WithNodeMetadata>(
  node: T
): FernNavigation.WithNodeMetadata {
  return {
    id: node.id,
    title: node.title,
    slug: node.slug,
    canonicalSlug: node.canonicalSlug,
    icon: node.icon,
    hidden: node.hidden,
    authed: node.authed,
    viewers: node.viewers,
    orphaned: node.orphaned,
    featureFlags: node.featureFlags,
  };
}

function extractVersionMetadata(
  node: FernNavigation.VersionNode
): Omit<FernNavigation.VersionNode, "child"> {
  return {
    ...node,
    ...extractMetadata(node),
  };
}

function extractTabMetadata(
  node: FernNavigation.TabChild
): Omit<FernNavigation.TabChild, "child" | "children"> {
  if (node.type === "link") {
    return node;
  } else if (node.type === "changelog") {
    const { children, ...changelog } = node;
    return changelog;
  } else if (node.type === "tab") {
    const { child, ...tab } = node;
    return tab;
  }
  throw new UnreachableCaseError(node);
}

import { FernNavigation } from "@fern-api/fdr-sdk";
import {
    NavigationNodeParent,
    Pruner,
    hasMetadata,
    isPage,
    type NavigationNode,
    type RootNode,
} from "@fern-api/fdr-sdk/navigation";
import { EMPTY_ARRAY } from "@fern-api/ui-core-utils";
import type { AuthEdgeConfigBasicTokenVerification } from "@fern-ui/fern-docs-auth";
import { EVERYONE_ROLE, matchPath } from "@fern-ui/fern-docs-utils";
import { addLeadingSlash } from "./addLeadingSlash";

export enum Gate {
    DENY,
    ALLOW,
}

interface AuthRulesPathName {
    /**
     * List of paths that should be allowed to pass through without authentication
     */
    allowlist?: string[];

    /**
     * List of paths that should be denied access without authentication
     */
    denylist?: string[];

    /**
     * List of paths that should be allowed to pass through without authentication, but should be hidden when the user is authenticated
     */
    anonymous?: string[];
}

/**
 * @returns true if the request should should be denied
 */
export function withBasicTokenAnonymous(auth: AuthRulesPathName, pathname: string): Gate {
    // if the path is in the denylist, deny the request
    if (auth.denylist?.find((path) => matchPath(path, pathname))) {
        return Gate.DENY;
    }

    // if the path is in the allowlist, allow the request to pass through
    if (
        auth.allowlist?.find((path) => matchPath(path, pathname)) ||
        auth.anonymous?.find((path) => matchPath(path, pathname))
    ) {
        return Gate.ALLOW;
    }

    // if the path is not in the allowlist, deny the request
    return Gate.DENY;
}

/**
 * @internal visibleForTesting
 */
export function withBasicTokenAnonymousCheck(
    auth: AuthRulesPathName,
): (node: NavigationNode, parents?: readonly NavigationNodeParent[]) => Gate {
    return (node, parents = EMPTY_ARRAY) => {
        if (isPage(node) && withBasicTokenAnonymous(auth, addLeadingSlash(node.slug))) {
            return Gate.ALLOW;
        }

        const predicate = rbacViewGate([], false);
        return predicate(node, parents);
    };
}

function withDenied<T extends (...args: any[]) => Gate>(predicate: T): (...args: Parameters<T>) => boolean {
    return (...args) => predicate(...args) === Gate.DENY;
}

function withAllowed<T extends (...args: any[]) => Gate>(predicate: T): (...args: Parameters<T>) => boolean {
    return (...args) => predicate(...args) === Gate.ALLOW;
}

export function pruneWithBasicTokenAnonymous(auth: AuthEdgeConfigBasicTokenVerification, node: RootNode): RootNode {
    const result = Pruner.from(node)
        // mark nodes that are authed
        .authed(withDenied(withBasicTokenAnonymousCheck(auth)))
        .get();

    // TODO: handle this more gracefully
    if (result == null) {
        throw new Error("Failed to prune navigation tree");
    }

    return result;
}

/**
 * @internal
 * @param roles current viewer's roles
 * @param filters rbac filters for the current node
 * @param authed whether the viewer is authenticated
 * @returns true if the roles matches the filters (i.e. the viewer is allowed to view the node)
 */
export function matchRoles(roles: string[] | "anonymous", filters: string[][]): Gate {
    // filters must include "everyone" if the viewer is authenticated
    if (filters.length === 0 || filters.every((filter) => filter.length === 0)) {
        return roles === "anonymous" ? Gate.DENY : Gate.ALLOW;
    }

    roles = roles === "anonymous" ? [EVERYONE_ROLE] : [EVERYONE_ROLE, ...roles];
    return filters.every((filter) => filter.some((aud) => roles.includes(aud))) ? Gate.ALLOW : Gate.DENY;
}

export function pruneWithBasicTokenAuthed(auth: AuthRulesPathName, node: RootNode, roles: string[] = []): RootNode {
    const result = Pruner.from(node)
        // apply rbac
        .keep(withAllowed(rbacViewGate(roles, true)))
        // hide nodes that are not authed
        .hide((n) => node.hidden || auth.anonymous?.find((path) => matchPath(path, addLeadingSlash(n.slug))) != null)
        // mark all nodes as unauthed since we are currently authenticated
        .authed(() => false)
        .get();

    // TODO: handle this more gracefully
    if (result == null) {
        throw new Error("Failed to prune navigation tree");
    }

    return result;
}

/**
 * @param nodes - navigation nodes to get the viewer filters for
 * @returns the viewer filters for the given nodes
 * @internal visibleForTesting
 */
export function getViewerFilters(...nodes: FernNavigation.WithPermissions[]): string[][] {
    // ignore permissions of parents of the parents of an orphaned node
    const lastOrphanedIdx = nodes.findLastIndex((n) => n.orphaned);
    return (
        nodes
            .slice(Math.max(lastOrphanedIdx, 0))
            // TODO: if we ever support editors, we need to update this
            .map((n) => n.viewers ?? [])
            .filter((roles) => roles.length > 0)
    );
}

function rbacViewGate(
    roles: string[],
    authed: boolean,
): (node: NavigationNode, parents: readonly NavigationNodeParent[]) => Gate {
    return (node, parents) => {
        if (!hasMetadata(node)) {
            return Gate.ALLOW;
        }

        if (!authed && node.authed) {
            return Gate.DENY;
        }

        const nodes = [...parents, node];
        const filters = getViewerFilters(...nodes.filter(FernNavigation.hasMetadata));

        return matchRoles(authed ? roles : "anonymous", filters);
    };
}

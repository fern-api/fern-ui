/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../index";

/**
 * @example
 *     {
 *         page: 1,
 *         pageSize: 1,
 *         repositoryName: "string",
 *         repositorOwner: "string",
 *         organizationId: "string"
 *     }
 */
export interface ListPullRequestsRequest {
    /**
     * The page integer to retrieve. Defaults to 0.
     */
    page?: number;
    /**
     * The integer of items to retrieve per page. Defaults to 20.
     */
    pageSize?: number;
    /**
     * The name of the repository to filter pull requests by (ex: full-platform).
     */
    repositoryName?: string;
    /**
     * The organization name of the repository owner to filter pull requests by (ex: fern-api).
     */
    repositorOwner?: string;
    /**
     * The Fern organization ID to filter repositories by.
     */
    organizationId?: FernRegistry.OrgId;
}

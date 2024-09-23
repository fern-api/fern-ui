/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../index";

export interface PullRequest {
    pullRequestNumber: number;
    repositoryName: string;
    repositoryOwner: string;
    author: FernRegistry.GithubUser | undefined;
    reviewers: FernRegistry.PullRequestReviewer[];
    title: string;
    url: string;
    checks: FernRegistry.CheckRun[];
    state: FernRegistry.PullRequestState;
    createdAt: string;
    updatedAt: string | undefined;
    mergedAt: string | undefined;
    closedAt: string | undefined;
}

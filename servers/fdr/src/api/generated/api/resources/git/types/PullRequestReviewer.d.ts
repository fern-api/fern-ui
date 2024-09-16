/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../index";
export declare type PullRequestReviewer = FernRegistry.PullRequestReviewer.User | FernRegistry.PullRequestReviewer.Team;
export declare namespace PullRequestReviewer {
    interface User extends FernRegistry.GithubUser {
        type: "user";
    }
    interface Team extends FernRegistry.GithubTeam {
        type: "team";
    }
}

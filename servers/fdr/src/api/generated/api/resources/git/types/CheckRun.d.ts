/**
 * This file was auto-generated by Fern from our API Definition.
 */
export interface CheckRun {
    checkId: string;
    repositoryOwner: string;
    repositoryName: string;
    ref: string;
    name: string;
    status: string;
    conclusion: string;
    checkRunUrl: string;
    createdAt: string;
    completedAt: string | undefined;
    rawCheckRun: unknown;
}

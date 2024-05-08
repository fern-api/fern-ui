import { generateChangelog, generateCommitMessage } from "@libs/cohere";
import { Env } from "@libs/env";
import { execFernCli } from "@libs/fern";
import { setupGithubApp } from "@libs/github/octokit";
import {
    DEFAULT_REMOTE_NAME,
    cloneRepo,
    configureGit,
    createOrUpdatePullRequest,
    getOrUpdateBranch,
} from "@libs/github/utilities";
import { components } from "@octokit/openapi-types";
import { App, Octokit } from "octokit";

const OPENAPI_UPDATE_BRANCH = "fern/update-api-specs";
type Repository = components["schemas"]["repository"];

async function updateOpenApiSpecInternal(
    octokit: Octokit,
    repository: Repository,
    fernBotLoginName: string,
    fernBotLoginId: string,
): Promise<void> {
    const [git, fullRepoPath] = await configureGit(repository);
    console.log(`Cloning repo: ${repository.clone_url} to ${fullRepoPath}`);
    await cloneRepo(git, repository, octokit, fernBotLoginName, fernBotLoginId);

    const originDefaultBranch = `${DEFAULT_REMOTE_NAME}/${repository.default_branch}`;
    await getOrUpdateBranch(git, originDefaultBranch, OPENAPI_UPDATE_BRANCH);

    try {
        // Run API update command which will pull the new spec from the specified
        // origin and write it to disk we can then commit it to github from there.
        await execFernCli("api update", fullRepoPath);
    } catch (error) {
        return;
    }

    console.log("Checking for changes to commit and push");
    if (!(await git.status()).isClean()) {
        console.log("Changes detected, committing and pushing");
        // Add + commit files
        const commitDiff = await git.diff();
        await git.add(["-A"]);
        await git.commit(await generateCommitMessage(commitDiff));

        // Push the changes
        await git.push([
            "--force-with-lease",
            DEFAULT_REMOTE_NAME,
            `${OPENAPI_UPDATE_BRANCH}:refs/heads/${OPENAPI_UPDATE_BRANCH}`,
        ]);

        const fullDiff = await git.diff([originDefaultBranch]);
        // Open a PR
        await createOrUpdatePullRequest(
            octokit,
            {
                title: ":herb: :sparkles: [Scheduled] Update API Spec",
                base: "main",
                body: await generateChangelog(fullDiff),
            },
            repository.full_name,
            repository.full_name,
            OPENAPI_UPDATE_BRANCH,
        );
    }
}

export async function updateOpenApiSpecsInternal(env: Env): Promise<void> {
    const app: App = setupGithubApp(env);

    if (env.REPO_TO_RUN_ON !== undefined) {
        console.log("REPO_TO_RUN_ON has been specified, only running on:", env.REPO_TO_RUN_ON);
    }
    await app.eachRepository(async (installation) => {
        if (env.REPO_TO_RUN_ON !== undefined && installation.repository.full_name !== env.REPO_TO_RUN_ON) {
            return;
        } else if (env.REPO_TO_RUN_ON !== undefined) {
            console.log("REPO_TO_RUN_ON has been found, running logic.");
        }
        console.log("Encountered installation", installation.repository.full_name);
        await updateOpenApiSpecInternal(
            installation.octokit,
            installation.repository,
            env.GITHUB_APP_LOGIN_NAME,
            env.GITHUB_APP_LOGIN_ID,
        );
    });
}

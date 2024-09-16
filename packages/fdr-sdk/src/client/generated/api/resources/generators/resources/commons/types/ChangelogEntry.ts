/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../index";

/**
 * Following `keep a changelog` format for the entries here. These are effectively your release notes, the strings are meant to be markdown.
 */
export interface ChangelogEntry {
    type: FernRegistry.generators.ChangelogEntryType;
    summary: string;
    /**
     * The URL to the pull request that introduced this change. This is optional for backcompat.
     * You do not always need to specify the URL as the CLI can fill it in with the current PR, but given you can choose to not
     * release within the same PR as the change is introduced, this should be specified for divorcing the two.
     */
    pullRequestUrl?: string;
    upgradeNotes?: string;
    added?: string[];
    changed?: string[];
    deprecated?: string[];
    removed?: string[];
    fixed?: string[];
}

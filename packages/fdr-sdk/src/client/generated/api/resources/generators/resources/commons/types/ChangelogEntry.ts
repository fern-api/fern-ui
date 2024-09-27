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
     * Any URLs that are relevant to the change, such as a PR or issue. This is optional for backcompat.
     *
     * You do not always need to specify the URL as the CLI can fill it in with the current PR, but given you can choose to not
     * release within the same PR as the change is introduced, this should be specified for divorcing the two.
     */
    links: string[] | undefined;
    upgradeNotes: string | undefined;
    added: string[] | undefined;
    changed: string[] | undefined;
    deprecated: string[] | undefined;
    removed: string[] | undefined;
    fixed: string[] | undefined;
}

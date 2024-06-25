/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernGeneratorCli from "../../../index";

/**
 * The top-level snippet is one which appears when the endpoint's reference is collapsed.
 * It is meant to give a high-level overview of the endpoint -- e.g. the method name and it's return value.
 *
 * Note this is a separate object to make it easier to add additional properties down the road, for example if
 * we wanted to be specific about what portion of the snippet we hyperlink, etc.
 */
export interface TopLevelSnippet {
    snippet: string;
    location?: FernGeneratorCli.RelativeLocation;
}

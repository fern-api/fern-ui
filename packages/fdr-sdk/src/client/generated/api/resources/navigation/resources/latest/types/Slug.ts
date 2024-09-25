/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../index";

/**
 * The full url pathname of the node, excluding leading or trailing slashes.
 * e.g. `getting-started` or `api-reference/overview`, but not `/getting-started` or `/api-reference/overview` or `/getting-started/`
 */
export type Slug = string & {
    navigation_latest_Slug: void;
};

export function Slug(value: string): FernRegistry.navigation.latest.Slug {
    return value as unknown as FernRegistry.navigation.latest.Slug;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../index";

export interface NavigationTabGroup {
    title: string;
    icon: string | undefined;
    items: FernRegistry.docs.v1.db.NavigationItem[];
    urlSlug: string;
    skipUrlSlug: boolean | undefined;
}

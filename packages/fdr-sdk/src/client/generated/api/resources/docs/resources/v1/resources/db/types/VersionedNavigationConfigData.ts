/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../..";

export interface VersionedNavigationConfigData {
    version: string;
    urlSlug?: string;
    availability?: FernRegistry.docs.v1.read.VersionAvailability;
    config: FernRegistry.docs.v1.db.UnversionedNavigationConfig;
}

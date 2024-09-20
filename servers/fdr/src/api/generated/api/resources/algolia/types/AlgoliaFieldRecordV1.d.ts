/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../index";
export interface AlgoliaFieldRecordV1 {
    title?: string;
    description?: string;
    availability?: string;
    breadcrumbs: FernRegistry.Breadcrumbs;
    slug: FernRegistry.navigation.Slug;
    version?: FernRegistry.AlgoliaRecordVersionV3;
    indexSegmentId: FernRegistry.IndexSegmentId;
    extends?: string[];
}

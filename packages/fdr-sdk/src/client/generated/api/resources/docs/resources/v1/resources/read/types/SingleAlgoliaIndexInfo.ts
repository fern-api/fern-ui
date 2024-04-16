/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../..";

export type SingleAlgoliaIndexInfo =
    | FernRegistry.docs.v1.read.SingleAlgoliaIndexInfo.Unversioned
    | FernRegistry.docs.v1.read.SingleAlgoliaIndexInfo.Versioned;

export declare namespace SingleAlgoliaIndexInfo {
    interface Unversioned extends FernRegistry.docs.v1.read.UnversionedSingleAlgoliaIndexInfo {
        type: "unversioned";
    }

    interface Versioned extends FernRegistry.docs.v1.read.VersionedSingleAlgoliaIndexInfo {
        type: "versioned";
    }
}

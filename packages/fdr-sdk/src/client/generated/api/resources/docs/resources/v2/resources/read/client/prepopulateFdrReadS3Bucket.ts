/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../index";
import * as core from "../../../../../../../../core";

export type Error = FernRegistry.docs.v2.read.prepopulateFdrReadS3Bucket.Error._Unknown;

export declare namespace Error {
    interface _Unknown {
        error: void;
        content: core.Fetcher.Error;
    }

    interface _Visitor<_Result> {
        _other: (value: core.Fetcher.Error) => _Result;
    }
}

export const Error = {
    _unknown: (
        fetcherError: core.Fetcher.Error
    ): FernRegistry.docs.v2.read.prepopulateFdrReadS3Bucket.Error._Unknown => {
        return {
            error: undefined,
            content: fetcherError,
        };
    },

    _visit: <_Result>(
        value: FernRegistry.docs.v2.read.prepopulateFdrReadS3Bucket.Error,
        visitor: FernRegistry.docs.v2.read.prepopulateFdrReadS3Bucket.Error._Visitor<_Result>
    ): _Result => {
        switch (value.error) {
            default:
                return visitor._other(value as any);
        }
    },
} as const;

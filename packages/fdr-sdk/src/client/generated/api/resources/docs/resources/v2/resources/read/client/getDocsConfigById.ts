/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../..";
import * as core from "../../../../../../../../core";

export type Error =
    | FernRegistry.docs.v2.read.getDocsConfigById.Error.DocsDefinitionNotFoundError
    | FernRegistry.docs.v2.read.getDocsConfigById.Error._Unknown;

export declare namespace Error {
    interface DocsDefinitionNotFoundError {
        error: "DocsDefinitionNotFoundError";
    }

    interface _Unknown {
        error: void;
        content: core.Fetcher.Error;
    }

    interface _Visitor<_Result> {
        docsDefinitionNotFoundError: () => _Result;
        _other: (value: core.Fetcher.Error) => _Result;
    }
}

export const Error = {
    docsDefinitionNotFoundError: (): FernRegistry.docs.v2.read.getDocsConfigById.Error.DocsDefinitionNotFoundError => {
        return {
            error: "DocsDefinitionNotFoundError",
        };
    },

    _unknown: (fetcherError: core.Fetcher.Error): FernRegistry.docs.v2.read.getDocsConfigById.Error._Unknown => {
        return {
            error: undefined,
            content: fetcherError,
        };
    },

    _visit: <_Result>(
        value: FernRegistry.docs.v2.read.getDocsConfigById.Error,
        visitor: FernRegistry.docs.v2.read.getDocsConfigById.Error._Visitor<_Result>
    ): _Result => {
        switch (value.error) {
            case "DocsDefinitionNotFoundError":
                return visitor.docsDefinitionNotFoundError();
            default:
                return visitor._other(value as any);
        }
    },
} as const;

/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../..";
import * as core from "../../../../../../../../core";

export type Error =
    | FernRegistry.docs.v2.read.getOrganizationForUrl.Error.DomainNotRegisteredError
    | FernRegistry.docs.v2.read.getOrganizationForUrl.Error._Unknown;

export declare namespace Error {
    interface DomainNotRegisteredError {
        error: "DomainNotRegisteredError";
    }

    interface _Unknown {
        error: void;
        content: core.Fetcher.Error;
    }

    interface _Visitor<_Result> {
        domainNotRegisteredError: () => _Result;
        _other: (value: core.Fetcher.Error) => _Result;
    }
}

export const Error = {
    domainNotRegisteredError: (): FernRegistry.docs.v2.read.getOrganizationForUrl.Error.DomainNotRegisteredError => {
        return {
            error: "DomainNotRegisteredError",
        };
    },

    _unknown: (fetcherError: core.Fetcher.Error): FernRegistry.docs.v2.read.getOrganizationForUrl.Error._Unknown => {
        return {
            error: undefined,
            content: fetcherError,
        };
    },

    _visit: <_Result>(
        value: FernRegistry.docs.v2.read.getOrganizationForUrl.Error,
        visitor: FernRegistry.docs.v2.read.getOrganizationForUrl.Error._Visitor<_Result>
    ): _Result => {
        switch (value.error) {
            case "DomainNotRegisteredError":
                return visitor.domainNotRegisteredError();
            default:
                return visitor._other(value as any);
        }
    },
} as const;

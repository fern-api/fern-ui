/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../index";
import * as core from "../../../../../../../../core";

export type Error =
    | FernRegistry.docs.v2.write.startDocsPreviewRegister.Error.UnauthorizedError
    | FernRegistry.docs.v2.write.startDocsPreviewRegister.Error.UnavailableError
    | FernRegistry.docs.v2.write.startDocsPreviewRegister.Error.UserNotInOrgError
    | FernRegistry.docs.v2.write.startDocsPreviewRegister.Error.InvalidDomainError
    | FernRegistry.docs.v2.write.startDocsPreviewRegister.Error._Unknown;

export declare namespace Error {
    interface UnauthorizedError {
        error: "UnauthorizedError";
        content: string;
    }

    interface UnavailableError {
        error: "UnavailableError";
        content: string;
    }

    interface UserNotInOrgError {
        error: "UserNotInOrgError";
    }

    interface InvalidDomainError {
        error: "InvalidDomainError";
    }

    interface _Unknown {
        error: void;
        content: core.Fetcher.Error;
    }

    interface _Visitor<_Result> {
        unauthorizedError: (value: string) => _Result;
        unavailableError: (value: string) => _Result;
        userNotInOrgError: () => _Result;
        invalidDomainError: () => _Result;
        _other: (value: core.Fetcher.Error) => _Result;
    }
}

export const Error = {
    unauthorizedError: (value: string): FernRegistry.docs.v2.write.startDocsPreviewRegister.Error.UnauthorizedError => {
        return {
            content: value,
            error: "UnauthorizedError",
        };
    },

    unavailableError: (value: string): FernRegistry.docs.v2.write.startDocsPreviewRegister.Error.UnavailableError => {
        return {
            content: value,
            error: "UnavailableError",
        };
    },

    userNotInOrgError: (): FernRegistry.docs.v2.write.startDocsPreviewRegister.Error.UserNotInOrgError => {
        return {
            error: "UserNotInOrgError",
        };
    },

    invalidDomainError: (): FernRegistry.docs.v2.write.startDocsPreviewRegister.Error.InvalidDomainError => {
        return {
            error: "InvalidDomainError",
        };
    },

    _unknown: (
        fetcherError: core.Fetcher.Error
    ): FernRegistry.docs.v2.write.startDocsPreviewRegister.Error._Unknown => {
        return {
            error: undefined,
            content: fetcherError,
        };
    },

    _visit: <_Result>(
        value: FernRegistry.docs.v2.write.startDocsPreviewRegister.Error,
        visitor: FernRegistry.docs.v2.write.startDocsPreviewRegister.Error._Visitor<_Result>
    ): _Result => {
        switch (value.error) {
            case "UnauthorizedError":
                return visitor.unauthorizedError(value.content);
            case "UnavailableError":
                return visitor.unavailableError(value.content);
            case "UserNotInOrgError":
                return visitor.userNotInOrgError();
            case "InvalidDomainError":
                return visitor.invalidDomainError();
            default:
                return visitor._other(value as any);
        }
    },
} as const;

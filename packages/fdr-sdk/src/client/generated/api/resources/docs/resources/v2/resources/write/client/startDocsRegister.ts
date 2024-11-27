/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../index";
import * as core from "../../../../../../../../core";

export type Error =
    | FernRegistry.docs.v2.write.startDocsRegister.Error.UnauthorizedError
    | FernRegistry.docs.v2.write.startDocsRegister.Error.UnavailableError
    | FernRegistry.docs.v2.write.startDocsRegister.Error.UserNotInOrgError
    | FernRegistry.docs.v2.write.startDocsRegister.Error.InvalidDomainError
    | FernRegistry.docs.v2.write.startDocsRegister.Error.InvalidCustomDomainError
    | FernRegistry.docs.v2.write.startDocsRegister.Error.DomainBelongsToAnotherOrgError
    | FernRegistry.docs.v2.write.startDocsRegister.Error.InvalidUrlError
    | FernRegistry.docs.v2.write.startDocsRegister.Error._Unknown;

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
        content: string;
    }

    interface InvalidDomainError {
        error: "InvalidDomainError";
    }

    interface InvalidCustomDomainError {
        error: "InvalidCustomDomainError";
    }

    interface DomainBelongsToAnotherOrgError {
        error: "DomainBelongsToAnotherOrgError";
        content: string;
    }

    interface InvalidUrlError {
        error: "InvalidURLError";
        content: string;
    }

    interface _Unknown {
        error: void;
        content: core.Fetcher.Error;
    }

    interface _Visitor<_Result> {
        unauthorizedError: (value: string) => _Result;
        unavailableError: (value: string) => _Result;
        userNotInOrgError: (value: string) => _Result;
        invalidDomainError: () => _Result;
        invalidCustomDomainError: () => _Result;
        domainBelongsToAnotherOrgError: (value: string) => _Result;
        invalidUrlError: (value: string) => _Result;
        _other: (value: core.Fetcher.Error) => _Result;
    }
}

export const Error = {
    unauthorizedError: (value: string): FernRegistry.docs.v2.write.startDocsRegister.Error.UnauthorizedError => {
        return {
            content: value,
            error: "UnauthorizedError",
        };
    },

    unavailableError: (value: string): FernRegistry.docs.v2.write.startDocsRegister.Error.UnavailableError => {
        return {
            content: value,
            error: "UnavailableError",
        };
    },

    userNotInOrgError: (value: string): FernRegistry.docs.v2.write.startDocsRegister.Error.UserNotInOrgError => {
        return {
            content: value,
            error: "UserNotInOrgError",
        };
    },

    invalidDomainError: (): FernRegistry.docs.v2.write.startDocsRegister.Error.InvalidDomainError => {
        return {
            error: "InvalidDomainError",
        };
    },

    invalidCustomDomainError: (): FernRegistry.docs.v2.write.startDocsRegister.Error.InvalidCustomDomainError => {
        return {
            error: "InvalidCustomDomainError",
        };
    },

    domainBelongsToAnotherOrgError: (
        value: string
    ): FernRegistry.docs.v2.write.startDocsRegister.Error.DomainBelongsToAnotherOrgError => {
        return {
            content: value,
            error: "DomainBelongsToAnotherOrgError",
        };
    },

    invalidUrlError: (value: string): FernRegistry.docs.v2.write.startDocsRegister.Error.InvalidUrlError => {
        return {
            content: value,
            error: "InvalidURLError",
        };
    },

    _unknown: (fetcherError: core.Fetcher.Error): FernRegistry.docs.v2.write.startDocsRegister.Error._Unknown => {
        return {
            error: undefined,
            content: fetcherError,
        };
    },

    _visit: <_Result>(
        value: FernRegistry.docs.v2.write.startDocsRegister.Error,
        visitor: FernRegistry.docs.v2.write.startDocsRegister.Error._Visitor<_Result>
    ): _Result => {
        switch (value.error) {
            case "UnauthorizedError":
                return visitor.unauthorizedError(value.content);
            case "UnavailableError":
                return visitor.unavailableError(value.content);
            case "UserNotInOrgError":
                return visitor.userNotInOrgError(value.content);
            case "InvalidDomainError":
                return visitor.invalidDomainError();
            case "InvalidCustomDomainError":
                return visitor.invalidCustomDomainError();
            case "DomainBelongsToAnotherOrgError":
                return visitor.domainBelongsToAnotherOrgError(value.content);
            case "InvalidURLError":
                return visitor.invalidUrlError(value.content);
            default:
                return visitor._other(value as any);
        }
    },
} as const;

/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../index";
import * as core from "../../../../core";

export type Error =
    | FernRegistry.snippetsFactory.createSnippetsForSdk.Error.UnauthorizedError
    | FernRegistry.snippetsFactory.createSnippetsForSdk.Error.UserNotInOrgError
    | FernRegistry.snippetsFactory.createSnippetsForSdk.Error.OrgIdNotFound
    | FernRegistry.snippetsFactory.createSnippetsForSdk.Error.SdkNotFound
    | FernRegistry.snippetsFactory.createSnippetsForSdk.Error._Unknown;

export declare namespace Error {
    interface UnauthorizedError {
        error: "UnauthorizedError";
        content: string;
    }

    interface UserNotInOrgError {
        error: "UserNotInOrgError";
        content: string;
    }

    interface OrgIdNotFound {
        error: "OrgIdNotFound";
        content: string;
    }

    interface SdkNotFound {
        error: "SDKNotFound";
        content: string;
    }

    interface _Unknown {
        error: void;
        content: core.Fetcher.Error;
    }

    interface _Visitor<_Result> {
        unauthorizedError: (value: string) => _Result;
        userNotInOrgError: (value: string) => _Result;
        orgIdNotFound: (value: string) => _Result;
        sdkNotFound: (value: string) => _Result;
        _other: (value: core.Fetcher.Error) => _Result;
    }
}

export const Error = {
    unauthorizedError: (value: string): FernRegistry.snippetsFactory.createSnippetsForSdk.Error.UnauthorizedError => {
        return {
            content: value,
            error: "UnauthorizedError",
        };
    },

    userNotInOrgError: (value: string): FernRegistry.snippetsFactory.createSnippetsForSdk.Error.UserNotInOrgError => {
        return {
            content: value,
            error: "UserNotInOrgError",
        };
    },

    orgIdNotFound: (value: string): FernRegistry.snippetsFactory.createSnippetsForSdk.Error.OrgIdNotFound => {
        return {
            content: value,
            error: "OrgIdNotFound",
        };
    },

    sdkNotFound: (value: string): FernRegistry.snippetsFactory.createSnippetsForSdk.Error.SdkNotFound => {
        return {
            content: value,
            error: "SDKNotFound",
        };
    },

    _unknown: (fetcherError: core.Fetcher.Error): FernRegistry.snippetsFactory.createSnippetsForSdk.Error._Unknown => {
        return {
            error: undefined,
            content: fetcherError,
        };
    },

    _visit: <_Result>(
        value: FernRegistry.snippetsFactory.createSnippetsForSdk.Error,
        visitor: FernRegistry.snippetsFactory.createSnippetsForSdk.Error._Visitor<_Result>
    ): _Result => {
        switch (value.error) {
            case "UnauthorizedError":
                return visitor.unauthorizedError(value.content);
            case "UserNotInOrgError":
                return visitor.userNotInOrgError(value.content);
            case "OrgIdNotFound":
                return visitor.orgIdNotFound(value.content);
            case "SDKNotFound":
                return visitor.sdkNotFound(value.content);
            default:
                return visitor._other(value as any);
        }
    },
} as const;

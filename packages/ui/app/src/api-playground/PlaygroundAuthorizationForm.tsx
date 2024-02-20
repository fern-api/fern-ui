import { APIV1Read } from "@fern-api/fdr-sdk";
import { visitDiscriminatedUnion } from "@fern-ui/core-utils";
import { Cross1Icon, GlobeIcon, PersonIcon } from "@radix-ui/react-icons";
import { isEmpty } from "lodash-es";
import { Dispatch, FC, ReactElement, SetStateAction } from "react";
import { Key } from "react-feather";
import { FernButton } from "../components/FernButton";
import { FernInput } from "../components/FernInput";
import { ResolvedEndpointDefinition } from "../util/resolver";
import { PasswordInputGroup } from "./PasswordInputGroup";
import { SecretBearer, SecretSpan } from "./PlaygroundSecretsModal";
import { PlaygroundRequestFormAuth, PlaygroundRequestFormState } from "./types";

interface PlaygroundAuthorizationFormProps {
    auth: APIV1Read.ApiAuth;
    value: PlaygroundRequestFormAuth | undefined;
    onChange: (newAuthValue: PlaygroundRequestFormAuth) => void;
    openSecretsModal: () => void;
    secrets: SecretBearer[];
}

export const PlaygroundAuthorizationForm: FC<PlaygroundAuthorizationFormProps> = ({
    auth,
    value,
    onChange,
    secrets,
    openSecretsModal,
}) => {
    return (
        <ul className="list-none px-4">
            {visitDiscriminatedUnion(auth, "type")._visit({
                bearerAuth: (bearerAuth) => (
                    <li className="-mx-4 space-y-2 p-4">
                        <label className="inline-flex flex-wrap items-baseline">
                            <span className="font-mono text-sm">{bearerAuth.tokenName ?? "Bearer token"}</span>
                        </label>

                        <div>
                            {value?.type === "bearerAuth" &&
                            secrets.some((secret) => value?.type === "bearerAuth" && value.token === secret.token) ? (
                                <span className="inline-flex items-center gap-1">
                                    <SecretSpan secret={value.token} className="text-sm" />
                                    <FernButton
                                        icon={<Cross1Icon className="size-4" />}
                                        variant="minimal"
                                        size="small"
                                        onClick={() => {
                                            onChange({
                                                type: "bearerAuth",
                                                token: "",
                                            });
                                        }}
                                        className="-mr-2"
                                    />
                                </span>
                            ) : (
                                <PasswordInputGroup
                                    onValueChange={(newValue) =>
                                        onChange({
                                            type: "bearerAuth",
                                            token: newValue,
                                        })
                                    }
                                    value={value?.type === "bearerAuth" ? value.token : ""}
                                    autoComplete="off"
                                    data-1p-ignore="true"
                                    rightElement={
                                        <FernButton
                                            onClick={openSecretsModal}
                                            icon={<GlobeIcon className="size-4" />}
                                            variant="minimal"
                                        />
                                    }
                                />
                            )}
                        </div>
                    </li>
                ),
                basicAuth: (basicAuth) => (
                    <>
                        <li className="-mx-4 space-y-2 p-4">
                            <label className="inline-flex flex-wrap items-baseline">
                                <span className="font-mono text-sm">{basicAuth.usernameName ?? "Username"}</span>
                            </label>
                            <div>
                                <FernInput
                                    onValueChange={(newValue) =>
                                        onChange({
                                            type: "basicAuth",
                                            username: newValue,
                                            password: value?.type === "basicAuth" ? value.password : "",
                                        })
                                    }
                                    value={value?.type === "basicAuth" ? value.username : ""}
                                    leftIcon={<PersonIcon className="size-4" />}
                                    rightElement={<span className="t-muted text-xs">{"string"}</span>}
                                />
                            </div>
                        </li>

                        <li className="-mx-4 space-y-2 p-4">
                            <label className="inline-flex flex-wrap items-baseline">
                                <span className="font-mono text-sm">{basicAuth.passwordName ?? "Password"}</span>
                            </label>

                            <div>
                                <PasswordInputGroup
                                    onValueChange={(newValue) =>
                                        onChange({
                                            type: "basicAuth",
                                            username: value?.type === "basicAuth" ? value.username : "",
                                            password: newValue,
                                        })
                                    }
                                    value={value?.type === "basicAuth" ? value.password : ""}
                                />
                            </div>
                        </li>
                    </>
                ),
                header: (header) => (
                    <li className="-mx-4 space-y-2 p-4">
                        <label className="inline-flex flex-wrap items-baseline">
                            <span className="font-mono text-sm">{header.nameOverride ?? header.headerWireValue}</span>
                        </label>
                        <div>
                            <PasswordInputGroup
                                onValueChange={(newValue) =>
                                    onChange({
                                        type: "header",
                                        headers: { [header.headerWireValue]: newValue },
                                    })
                                }
                                value={value?.type === "header" ? value.headers[header.headerWireValue] : ""}
                                autoComplete="off"
                                data-1p-ignore="true"
                            />
                        </div>
                    </li>
                ),
                _other: () => null,
            })}
        </ul>
    );
};

interface PlaygroundAuthorizationFormCardProps {
    endpoint: ResolvedEndpointDefinition;
    auth: APIV1Read.ApiAuth | undefined;
    formState: PlaygroundRequestFormState | undefined;
    setFormState: Dispatch<SetStateAction<PlaygroundRequestFormState>>;
    openSecretsModal: () => void;
    secrets: SecretBearer[];
}

export function PlaygroundAuthorizationFormCard({
    endpoint,
    auth,
    formState,
    // setFormState,
    // openSecretsModal,
    // secrets,
}: PlaygroundAuthorizationFormCardProps): ReactElement | null {
    // const setAuthorization = useCallback(
    //     (newAuthValue: PlaygroundRequestFormAuth) => {
    //         setFormState((state) => ({
    //             ...state,
    //             auth: newAuthValue,
    //         }));
    //     },
    //     [setFormState],
    // );

    if (!endpoint.authed || auth == null || isAuthed(auth, formState?.auth)) {
        return null;
    }

    // return (
    //     <FernCard className="border-border-danger-soft rounded-xl shadow-sm">
    //         <PlaygroundAuthorizationForm
    //             auth={auth}
    //             value={formState?.auth}
    //             onChange={setAuthorization}
    //             openSecretsModal={openSecretsModal}
    //             secrets={secrets}
    //         />
    //     </FernCard>
    // );

    return (
        <FernButton
            className="w-full text-left"
            size="large"
            intent="danger"
            variant="outlined"
            text="Authenticate with your API key to send a real request"
            icon={<Key />}
            rightIcon={
                <span className="bg-tag-danger text-intent-danger flex items-center rounded-[4px] p-1 font-mono text-xs uppercase leading-none">
                    Connect
                </span>
            }
        />
    );
}

function isAuthed(auth: APIV1Read.ApiAuth, authState: PlaygroundRequestFormAuth | undefined): boolean {
    if (authState == null) {
        return false;
    }

    return visitDiscriminatedUnion(auth, "type")._visit({
        bearerAuth: () => authState.type === "bearerAuth" && !isEmpty(authState.token.trim()),
        basicAuth: () =>
            authState.type === "basicAuth" &&
            !isEmpty(authState.username.trim()) &&
            !isEmpty(authState.password.trim()),
        header: (header) => authState.type === "header" && !isEmpty(authState.headers[header.headerWireValue]?.trim()),
        _other: () => false,
    });
}

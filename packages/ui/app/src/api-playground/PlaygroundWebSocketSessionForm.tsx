import { APIV1Read } from "@fern-api/fdr-sdk";
import classNames from "classnames";
import { Dispatch, FC, SetStateAction, useCallback } from "react";
import { WebSocketMessage, WebSocketMessages } from "../api-page/web-socket/WebSocketMessages";
import { FernButton } from "../components/FernButton";
import { FernCard } from "../components/FernCard";
import { FernScrollArea } from "../components/FernScrollArea";
import { ResolvedTypeDefinition, ResolvedWebSocketChannel, ResolvedWebSocketMessage } from "../util/resolver";
import { titleCase } from "../util/titleCase";
import { PlaygroundTypeReferenceForm } from "./form/PlaygroundTypeReferenceForm";
import { PlaygroundWebSocketHandshakeForm } from "./PlaygroundWebSocketHandshakeForm";
import { PlaygroundWebSocketRequestFormState } from "./types";
import { HorizontalSplitPane } from "./VerticalSplitPane";

interface PlaygroundWebSocketSessionFormProps {
    auth: APIV1Read.ApiAuth | null | undefined;
    websocket: ResolvedWebSocketChannel;
    formState: PlaygroundWebSocketRequestFormState;
    setFormState: Dispatch<SetStateAction<PlaygroundWebSocketRequestFormState>>;
    // response: Loadable<ResponsePayload>;
    // sendRequest: () => void;
    types: Record<string, ResolvedTypeDefinition>;
    scrollAreaHeight: number;
    messages: WebSocketMessage[];
    sendMessage: (message: ResolvedWebSocketMessage, data: unknown) => void;
    startSession: () => void;
    connected: boolean;
    error: string | null;
}

export const PlaygroundWebSocketSessionForm: FC<PlaygroundWebSocketSessionFormProps> = ({
    auth,
    websocket,
    formState,
    setFormState,
    types,
    scrollAreaHeight,
    messages,
    sendMessage,
    connected,
    error,
}) => {
    const setMessage = useCallback(
        (message: ResolvedWebSocketMessage, data: unknown) => {
            setFormState((old) => ({
                ...old,
                messages: {
                    ...old.messages,
                    [message.type]: typeof data === "function" ? data(old.messages[message.type]) : data,
                },
            }));
        },
        [setFormState],
    );

    return (
        <HorizontalSplitPane
            rizeBarHeight={scrollAreaHeight}
            leftClassName="pl-6 pr-1 mt relative"
            rightClassName="pl-1"
        >
            <div className="mx-auto w-full max-w-5xl space-y-6 pt-6">
                <div className="space-y-8">
                    <PlaygroundWebSocketHandshakeForm
                        auth={auth}
                        websocket={websocket}
                        formState={formState}
                        setFormState={setFormState}
                        types={types}
                        error={error}
                        disabled={connected}
                    />

                    <hr />

                    {websocket.messages
                        .filter((message) => message.origin === "client")
                        .map((message) => (
                            <div key={message.type}>
                                <div className="mb-4 px-4">
                                    <h5 className="t-muted m-0">{message.displayName ?? titleCase(message.type)}</h5>
                                </div>
                                <FernCard className="divide-default divide-y rounded-xl shadow-sm">
                                    <div className="p-4">
                                        <PlaygroundTypeReferenceForm
                                            id={message.type}
                                            shape={message.body}
                                            onChange={(data) => setMessage(message, data)}
                                            value={formState?.messages[message.type]}
                                            types={types}
                                        />
                                    </div>

                                    <div className="flex justify-end p-4">
                                        <FernButton
                                            text="Send message"
                                            rightIcon="send"
                                            intent="primary"
                                            onClick={() => {
                                                sendMessage(message, formState?.messages[message.type]);
                                            }}
                                        />
                                    </div>
                                </FernCard>
                            </div>
                        ))}
                </div>
            </div>

            <div className="sticky inset-0 flex py-6 pr-6" style={{ height: scrollAreaHeight }}>
                <FernCard className="flex min-w-0 flex-1 shrink flex-col overflow-hidden rounded-xl shadow-sm">
                    <div className="border-default flex h-10 w-full shrink-0 items-center justify-between border-b px-3 py-2">
                        <span className="t-muted text-xs uppercase">Messages</span>
                        <span
                            className={classNames("-mr-1 inline-flex items-center gap-2 rounded-lg px-2 py-0.5", {
                                "bg-tag-primary text-accent": connected,
                                "bg-tag-danger text-intent-danger": !connected,
                            })}
                        >
                            <span className="relative inline-flex size-2">
                                {connected && (
                                    <span className="bg-accent absolute inline-flex size-full animate-ping rounded-full opacity-75" />
                                )}
                                <span
                                    className={classNames("relative inline-flex size-2 rounded-full", {
                                        "bg-accent": connected,
                                        "bg-border-danger": !connected,
                                    })}
                                ></span>
                            </span>
                            <span className="font-mono text-sm">{connected ? "Connected" : "Not connected"}</span>
                        </span>
                    </div>
                    <FernScrollArea className="flex-1 rounded-b-[inherit]">
                        <WebSocketMessages messages={messages} />
                    </FernScrollArea>
                </FernCard>
            </div>
        </HorizontalSplitPane>
    );
};

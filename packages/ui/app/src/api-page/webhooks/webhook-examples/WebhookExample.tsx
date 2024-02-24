import { APIV1Read } from "@fern-api/fdr-sdk";
import { createRef, useEffect, useMemo } from "react";
import { CodeSnippetExample, getJsonLineNumbers } from "../../examples/CodeSnippetExample";
import { useWebhookContext } from "../webhook-context/useWebhookContext";

export declare namespace WebhookExample {
    export interface Props {
        example: APIV1Read.ExampleWebhookPayload;
    }
}

export const WebhookExample: React.FC<WebhookExample.Props> = ({ example }) => {
    const { hoveredPayloadPropertyPath = [] } = useWebhookContext();

    const payloadJsonString = useMemo(() => JSON.stringify(example.payload, null, 2), [example.payload]);

    const requestHighlightLines = useMemo(() => {
        if (hoveredPayloadPropertyPath.length === 0) {
            return [];
        }
        return getJsonLineNumbers(payloadJsonString, hoveredPayloadPropertyPath);
    }, [hoveredPayloadPropertyPath, payloadJsonString]);

    const requestViewportRef = createRef<HTMLDivElement>();

    useEffect(() => {
        if (requestViewportRef.current != null && requestHighlightLines[0] != null) {
            const lineNumber = Array.isArray(requestHighlightLines[0])
                ? requestHighlightLines[0][0]
                : requestHighlightLines[0];
            const offsetTop = lineNumber * 20 - 14;
            requestViewportRef.current.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
    }, [requestHighlightLines, requestViewportRef]);

    return (
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <div className="flex min-h-0 min-w-0 flex-1 shrink flex-col">
                {example.payload != null && (
                    <CodeSnippetExample
                        className="max-h-full"
                        title="Payload"
                        type="primary"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        copyToClipboardText={() => payloadJsonString}
                        content={payloadJsonString}
                        language="json"
                        hoveredPropertyPath={hoveredPayloadPropertyPath}
                        json={example.payload}
                    />
                )}
            </div>
        </div>
    );
};

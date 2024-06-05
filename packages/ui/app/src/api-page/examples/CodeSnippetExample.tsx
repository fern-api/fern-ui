import clsx from "clsx";
import { createRef, FC, useCallback, useEffect, useMemo } from "react";
import { FernErrorBoundary } from "../../components/FernErrorBoundary.js";
import { useFeatureFlags } from "../../contexts/FeatureFlagContext.js";
import { FernSyntaxHighlighter } from "../../syntax-highlighting/FernSyntaxHighlighter.js";
import { ScrollToHandle } from "../../syntax-highlighting/FernSyntaxHighlighterTokens.js";
import { getJsonLineNumbers } from "./getJsonLineNumbers.js";
import { JsonPropertyPath } from "./JsonPropertyPath.js";
import { TitledExample } from "./TitledExample.js";

export declare namespace CodeSnippetExample {
    export interface Props extends Omit<TitledExample.Props, "copyToClipboardText"> {
        // hast: Root;
        id?: string;
        code: string;
        language: string;
        hoveredPropertyPath?: JsonPropertyPath | undefined;
        json: unknown;
        jsonStartLine?: number;
        scrollAreaStyle?: React.CSSProperties;
        measureHeight?: (height: number) => void;
    }
}

const CodeSnippetExampleInternal: FC<CodeSnippetExample.Props> = ({
    id,
    code,
    language,
    hoveredPropertyPath,
    json,
    jsonStartLine,
    scrollAreaStyle,
    measureHeight,
    className,
    ...props
}) => {
    const { isDarkCodeEnabled } = useFeatureFlags();
    const codeBlockRef = createRef<HTMLPreElement>();
    const viewportRef = createRef<ScrollToHandle>();

    useEffect(() => {
        if (measureHeight == null || codeBlockRef.current == null) {
            return;
        }

        const resizeObserver = new ResizeObserver(([entry]) => {
            if (entry != null) {
                measureHeight(entry.contentRect.height);
            }
        });

        resizeObserver.observe(codeBlockRef.current);
        return () => {
            resizeObserver.disconnect();
        };
    }, [codeBlockRef, measureHeight]);

    const requestHighlightLines = useMemo(() => {
        if (hoveredPropertyPath == null || hoveredPropertyPath.length === 0 || jsonStartLine === -1) {
            return [];
        }
        const startLine = jsonStartLine ?? 0;
        return getJsonLineNumbers(json, hoveredPropertyPath, startLine + 1);
    }, [hoveredPropertyPath, jsonStartLine, json]);

    useEffect(() => {
        if (viewportRef.current != null && requestHighlightLines[0] != null) {
            const lineNumber = Array.isArray(requestHighlightLines[0])
                ? requestHighlightLines[0][0]
                : requestHighlightLines[0];
            const offsetTop = (lineNumber - 1) * 19.5 - viewportRef.current.clientHeight / 4;
            viewportRef.current.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
    }, [requestHighlightLines, viewportRef]);

    return (
        <TitledExample
            copyToClipboardText={useCallback(() => code, [code])}
            {...props}
            className={clsx(className, {
                "dark bg-card-solid": isDarkCodeEnabled,
            })}
        >
            <FernSyntaxHighlighter
                id={id}
                className="rounded-t-0 rounded-b-[inherit]"
                ref={codeBlockRef}
                style={scrollAreaStyle}
                viewportRef={viewportRef}
                language={language}
                fontSize="sm"
                highlightLines={requestHighlightLines}
                code={code}
            />
        </TitledExample>
    );
};

export const CodeSnippetExample: FC<CodeSnippetExample.Props> = (props) => {
    return (
        <FernErrorBoundary component="CodeSnippetExample">
            <CodeSnippetExampleInternal {...props} />
        </FernErrorBoundary>
    );
};

export declare namespace JsonCodeSnippetExample {
    export interface Props extends Omit<CodeSnippetExample.Props, "language" | "jsonStartLine" | "code"> {}
}

export const JsonCodeSnippetExample: FC<JsonCodeSnippetExample.Props> = (props) => {
    const code = useMemo(() => JSON.stringify(props.json, null, 2), [props.json]);
    return <CodeSnippetExample {...props} language="json" code={code} />;
};

import { type Theme } from "@fern-ui/theme";
import classNames from "classnames";
import React, { useMemo } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import * as prism from "react-syntax-highlighter/dist/cjs/styles/prism";

type CodeBlockSkeletonProps = {
    className?: string;
    theme?: Theme;
    language: string;
    content: string;
};

function processCodeBlockContent(content: string): string {
    return content.replace(/(?:\\(.))/g, "$1");
}

export const CodeBlockSkeleton: React.FC<CodeBlockSkeletonProps> = ({ className, theme, language, content }) => {
    const processedContent = useMemo(() => processCodeBlockContent(content), [content]);
    return (
        <div
            className={classNames(
                "w-full border-l border-r border-b rounded-bl-lg rounded-br-lg bg-gray-100/90 dark:bg-gray-950/90 border-border-default-light dark:border-border-default-dark",
                "typography-font-code-block",
                className
            )}
        >
            <SyntaxHighlighter
                style={theme === "dark" ? prism.vscDarkPlus : prism.oneLight}
                customStyle={{
                    width: "100%",
                    overflowX: "auto",
                    margin: 0,
                    paddingRight: 16,
                    paddingLeft: 16,
                    paddingBottom: 20,
                    fontSize: 12,
                    background: "unset",
                    backgroundColor: "unset",
                    fontFamily: "inherit",
                }}
                codeTagProps={{
                    style: {
                        background: "unset",
                        fontFamily: "unset",
                        fontSize: "unset",
                    },
                }}
                language={language}
                PreTag="pre"
            >
                {processedContent}
            </SyntaxHighlighter>
        </div>
    );
};

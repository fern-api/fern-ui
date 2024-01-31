import { useTheme } from "next-themes";
import { FC, memo } from "react";
import { FernSyntaxHighlighter } from "../commons/CodeBlockSkeleton";
import { CopyToClipboardButton } from "../commons/CopyToClipboardButton";

interface PlaygroundResponsePreviewProps {
    responseBody: unknown;
}

export const PlaygroundResponsePreview: FC<PlaygroundResponsePreviewProps> = memo(function PlaygroundResponsePreview({
    responseBody,
}) {
    const { resolvedTheme: theme } = useTheme();
    const responseJson = JSON.stringify(responseBody, null, 2);
    return (
        <div className="group relative min-h-0 flex-1 shrink">
            <CopyToClipboardButton
                className="absolute right-2 top-2 z-10 opacity-0 transition-opacity group-hover:opacity-100"
                content={responseJson}
            />
            <div className="h-full overflow-auto font-mono text-xs">
                <FernSyntaxHighlighter
                    language={"json"}
                    customStyle={{ height: "100%", paddingLeft: 0 }}
                    showLineNumbers={true}
                    lineNumberStyle={{
                        position: "sticky",
                        left: 0,
                        // paddingLeft: 8,
                        backgroundColor: theme === "dark" ? "rgb(var(--background-dark))" : "rgb(var(--background))",
                    }}
                >
                    {responseJson}
                </FernSyntaxHighlighter>
            </div>
        </div>
    );
});

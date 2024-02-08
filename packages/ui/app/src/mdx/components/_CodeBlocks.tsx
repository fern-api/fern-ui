import classNames from "classnames";
import dynamic from "next/dynamic";
import { useState } from "react";
import { CopyToClipboardButton } from "../../commons/CopyToClipboardButton";
import type { CodeBlockItem } from "./common/types";

const CodeBlockSkeleton = dynamic(
    () => import("../../commons/CodeBlockSkeleton").then(({ CodeBlockSkeleton }) => CodeBlockSkeleton),
    { ssr: false },
);

export declare namespace _CodeBlocks {
    export interface Props {
        items: CodeBlockItem[];
    }
}

export const _CodeBlocks: React.FC<React.PropsWithChildren<_CodeBlocks.Props>> = ({ items }) => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const codeBlockItem = items[selectedTabIndex];
    if (codeBlockItem == null) {
        return null;
    }
    return (
        <div className="mb-5 w-full min-w-0 max-w-full">
            <div className="border-default flex items-center justify-between rounded-t-lg border bg-gray-200/90 dark:bg-[#19181C]">
                <div className="flex overflow-x-auto">
                    {items.map((item, idx) => (
                        <button
                            className={classNames("border-b py-2.5 px-4 transition text-xs", {
                                "t-accent border-accent-primary": selectedTabIndex === idx,
                                "t-muted border-transparent hover:t-accent hover:dark:text-text-default-dark":
                                    selectedTabIndex !== idx,
                            })}
                            key={idx}
                            onClick={() => setSelectedTabIndex(idx)}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>

                <CopyToClipboardButton className="ml-2 mr-1" content={codeBlockItem.content} />
            </div>
            <CodeBlockSkeleton
                className="max-h-[350px] overflow-y-auto"
                language={codeBlockItem.language}
                content={codeBlockItem.content}
                fontSize="lg"
            />
        </div>
    );
};

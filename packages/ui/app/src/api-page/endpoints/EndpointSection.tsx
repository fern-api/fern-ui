import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { createElement, useRef } from "react";
import { AbsolutelyPositionedAnchor } from "../../commons/AbsolutelyPositionedAnchor";
import { FernButton, FernButtonGroup } from "../../components/FernButton";
import { getAnchorId } from "../../util/anchor";
import { Markdown } from "../markdown/Markdown";

export declare namespace EndpointSection {
    export type Props = React.PropsWithChildren<{
        headerType?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
        title: string;
        description?: string;
        anchorIdParts: string[];
        route: string;
        expandAll?: () => void;
        collapseAll?: () => void;
        showExpandCollapse?: boolean;
    }>;
}

export const EndpointSection: React.FC<EndpointSection.Props> = ({
    headerType = "h3",
    title,
    description,
    anchorIdParts,
    route,
    children,
    showExpandCollapse,
    expandAll: handleExpandAll,
    collapseAll: handleCollapseAll,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const anchorId = getAnchorId(anchorIdParts);
    const anchorRoute = `${route}#${anchorId}`;
    return (
        <div ref={ref} data-route={anchorRoute.toLowerCase()} className="scroll-mt-header-height-padded flex flex-col">
            <div className="group/anchor-container relative flex items-baseline justify-between gap-4 pb-3">
                {createElement(
                    headerType,
                    { className: "relative mt-0 flex items-center" },
                    <AbsolutelyPositionedAnchor href={anchorRoute} />,
                    <span>{title}</span>,
                )}
                {showExpandCollapse && (
                    <FernButtonGroup className="invisible group-hover/anchor-container:visible">
                        <FernButton onClick={handleExpandAll} icon={<PlusIcon />} size="small" variant="minimal">
                            Expand all
                        </FernButton>
                        <FernButton onClick={handleCollapseAll} icon={<MinusIcon />} size="small" variant="minimal">
                            Collapse all
                        </FernButton>
                    </FernButtonGroup>
                )}
            </div>
            {description != null && (
                <div className="mb-2">
                    <Markdown className="text-base">{description}</Markdown>
                </div>
            )}
            <div className="flex flex-col">{children}</div>
        </div>
    );
};

import * as ScrollArea from "@radix-ui/react-scroll-area";
import cn from "clsx";
import { forwardRef, PropsWithChildren, RefObject } from "react";
import { useIsReady } from "../contexts/useIsReady";
import "./FernScrollArea.css";

interface FernScrollAreaProps extends ScrollArea.ScrollAreaProps {
    className?: string;
    viewportClassName?: string;
    viewportRef?: RefObject<HTMLDivElement>;
    scrollbars?: "both" | "vertical" | "horizontal";
}
export const FernScrollArea = forwardRef<HTMLDivElement, PropsWithChildren<FernScrollAreaProps>>((props, ref) => {
    const { children, className, viewportClassName, viewportRef, scrollbars = "both", ...innerProps } = props;
    const hydrated = useIsReady();
    if (!hydrated) {
        const { type, dir, scrollHideDelay, ...divProps } = innerProps;
        return (
            <div className={cn("fern-scroll-area", className)} ref={ref} {...divProps}>
                <div ref={viewportRef} className={cn("fern-scroll-area-viewport", viewportClassName)}>
                    <div style={{ minWidth: "100%", display: "table" }}>{children}</div>
                </div>
            </div>
        );
    }
    return (
        <ScrollArea.Root className={cn("fern-scroll-area", className)} ref={ref} {...innerProps}>
            <ScrollArea.Viewport ref={viewportRef} className={cn("fern-scroll-area-viewport", viewportClassName)}>
                {children}
            </ScrollArea.Viewport>
            {scrollbars !== "horizontal" && (
                <ScrollArea.Scrollbar orientation="vertical" className="fern-scroll-area-scrollbar">
                    <ScrollArea.Thumb className="fern-scroll-area-thumb" />
                </ScrollArea.Scrollbar>
            )}
            {scrollbars !== "vertical" && (
                <ScrollArea.Scrollbar orientation="horizontal" className="fern-scroll-area-scrollbar">
                    <ScrollArea.Thumb className="fern-scroll-area-thumb" />
                </ScrollArea.Scrollbar>
            )}
            {props.scrollbars === "both" && <ScrollArea.Corner className="fern-scroll-area-corner" />}
        </ScrollArea.Root>
    );
});

FernScrollArea.displayName = "FernScrollArea";

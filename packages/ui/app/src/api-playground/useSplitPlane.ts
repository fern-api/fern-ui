import { useCallback, useState } from "react";

export function useResizeY(set: (y: number) => void): {
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
    onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
    isResizing: boolean;
} {
    const [isResizing, setIsResizing] = useState(false);

    const onMouseDown = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            const handleMouseMove = (e: MouseEvent | TouchEvent) => {
                if (e instanceof MouseEvent) {
                    set(e.clientY);
                    setIsResizing(true);
                }
            };
            const handleMouseUp = () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
                setIsResizing(false);
            };
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        },
        [set],
    );

    const onTouchStart = useCallback(
        (e: React.TouchEvent<HTMLDivElement>) => {
            if (e.touches.length !== 1) {
                return;
            }
            e.stopPropagation();
            const handleTouchMove = (e: TouchEvent) => {
                const touch = e.touches[0];
                if (touch == null) {
                    return;
                }
                set(touch.clientY);
                setIsResizing(true);
            };
            const handleTouchUp = () => {
                window.removeEventListener("touchmove", handleTouchMove);
                window.removeEventListener("touchend", handleTouchUp);
                setIsResizing(false);
            };
            window.addEventListener("touchmove", handleTouchMove);
            window.addEventListener("touchend", handleTouchUp);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [set],
    );

    return { onMouseDown, onTouchStart, isResizing };
}

export function useHorizontalSplitPane(
    setWidth: (width: number) => void,
): (e: React.MouseEvent<HTMLDivElement>) => void {
    return useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            // disable if the event is not a left click
            if (e.button !== 0) {
                return;
            }

            e.preventDefault();
            e.stopPropagation();
            const handleMouseMove = (e: MouseEvent | TouchEvent) => {
                if (e instanceof MouseEvent) {
                    setWidth(e.clientX);
                }
            };
            const handleMouseUp = () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
            };
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        },
        [setWidth],
    );
}

import { useIsHovering } from "@fern-ui/react-commons";
import classNames from "classnames";
import { useCallback } from "react";
import { FernLogo } from "./FernLogo";

export const BuiltWithFern: React.FC = () => {
    const onClick = useCallback(() => {
        window.open("https://buildwithfern.com", "_blank", "noopener noreferrer");
    }, []);

    const { isHovering, ...containerCallbacks } = useIsHovering();

    return (
        <div
            className={classNames("flex cursor-pointer items-center justify-center gap-2 p-3")}
            onClick={onClick}
            {...containerCallbacks}
        >
            <div className="relative">
                <div className="absolute inset-y-0 -left-6 flex items-center justify-center">
                    <div className="h-4 w-4">
                        <FernLogo fill={isHovering ? undefined : "rgb(82, 82, 82)"} />
                    </div>
                </div>
                <div
                    className={classNames("whitespace-nowrap text-xs transition", {
                        "t-muted": isHovering,
                        "text-text-disabled-light dark:text-text-disabled-dark": !isHovering,
                    })}
                >
                    Built with Fern
                </div>
            </div>
        </div>
    );
};

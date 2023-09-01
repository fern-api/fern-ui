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
            className={classNames("flex cursor-pointer items-center space-x-2 pl-5 py-3")}
            onClick={onClick}
            {...containerCallbacks}
        >
            <div className="h-4 w-4">
                <FernLogo fill={isHovering ? undefined : "rgb(82, 82, 82)"} />
            </div>
            <div
                className={classNames("whitespace-nowrap text-xs transition font-light", {
                    "t-muted": isHovering,
                    "text-text-disabled-light dark:text-text-disabled-dark": !isHovering,
                })}
            >
                Built with Fern
            </div>
        </div>
    );
};

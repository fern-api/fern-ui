import * as FernNavigation from "@fern-api/fdr-sdk/navigation";
import { FernButton, FernTooltip, FernTooltipProvider } from "@fern-ui/components";
import { PlaySolid } from "iconoir-react";
import { useAtomValue } from "jotai";
import { FC } from "react";
import { HAS_PLAYGROUND_ATOM, useSetAndOpenPlayground } from "../atoms";
import { usePlaygroundSettings } from "../hooks/usePlaygroundSettings";

export const PlaygroundButton: FC<{
    state: FernNavigation.NavigationNodeApiLeaf;
}> = ({ state }) => {
    const openPlayground = useSetAndOpenPlayground();
    const hasPlayground = useAtomValue(HAS_PLAYGROUND_ATOM);
    const settings = usePlaygroundSettings(state.id);

    if (!hasPlayground) {
        return null;
    }

    return (
        <FernTooltipProvider>
            <FernTooltip
                content={
                    <span>
                        Customize and run in <span className="font-semibold t-accent">API Playground</span>
                    </span>
                }
            >
                <FernButton
                    onClick={() => {
                        if (settings?.button?.href) {
                            // open custom playground in new tab
                            // note: this code implies the current page as the Referrer and the new window can refer
                            // to the current `window` through their `window.opener`.
                            window.open(settings.button.href, "_blank");
                        } else {
                            openPlayground(state);
                        }
                    }}
                    rightIcon={<PlaySolid />}
                    variant="outlined"
                    intent="primary"
                    size="small"
                    mono={true}
                >
                    Play
                </FernButton>
            </FernTooltip>
        </FernTooltipProvider>
    );
};

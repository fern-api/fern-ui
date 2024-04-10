import { FC } from "react";
import { FernButton } from "../components/FernButton";
import { FernTooltip, FernTooltipProvider } from "../components/FernTooltip";
import { usePlaygroundContext } from "./PlaygroundContext";
import { PlaygroundSelectionState } from "./PlaygroundDrawer";

export const PlaygroundButton: FC<{ state: PlaygroundSelectionState }> = ({ state }) => {
    const { hasPlayground, setSelectionStateAndOpen } = usePlaygroundContext();

    if (!hasPlayground) {
        return null;
    }

    return (
        <FernTooltipProvider>
            <FernTooltip
                content={
                    <span>
                        Customize and run in <span className="text-accent-primary font-semibold">API Playground</span>
                    </span>
                }
            >
                <FernButton
                    onClick={() => {
                        setSelectionStateAndOpen(state);
                    }}
                    rightIcon="play"
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

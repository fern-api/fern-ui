import { usePrevious } from "@fern-ui/react-commons";
import { EnterFullScreenIcon } from "@radix-ui/react-icons";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
    ComponentProps,
    ReactElement,
    RefObject,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { FernButton } from "../../components/FernButton";

export declare namespace IFrame {
    export interface Props extends ComponentProps<"iframe"> {
        experimental_enableRequestFullscreen?: boolean;
        experimental_onFullscreenChange?: (isFullscreen: boolean) => void;
        experimental_onReceiveMessage?: (event: MessageEvent) => void;
    }
}

export const IFrame = forwardRef<HTMLIFrameElement, IFrame.Props>(
    (
        {
            experimental_enableRequestFullscreen,
            experimental_onFullscreenChange,
            experimental_onReceiveMessage,
            ...props
        },
        ref,
    ): ReactElement => {
        const iframeRef = useRef<HTMLIFrameElement>(null);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        useImperativeHandle(ref, () => iframeRef.current!);

        useEffect(() => {
            const contentWindow = iframeRef.current?.contentWindow;
            if (contentWindow == null || experimental_onReceiveMessage == null) {
                return;
            }
            contentWindow.addEventListener("message", experimental_onReceiveMessage);
            return () => {
                contentWindow.removeEventListener("message", experimental_onReceiveMessage);
            };
        }, [experimental_onReceiveMessage]);

        if (experimental_enableRequestFullscreen && document.fullscreenEnabled) {
            return (
                <ExperimentalIFrameWithFullscreen
                    iframeRef={iframeRef}
                    onFullscreenChange={experimental_onFullscreenChange}
                >
                    <iframe ref={iframeRef} {...props} />
                </ExperimentalIFrameWithFullscreen>
            );
        }

        return <iframe ref={ref} {...props} />;
    },
);

IFrame.displayName = "IFrame";

interface ExperimentalIFrameWithFullscreenProps {
    onFullscreenChange?: (isFullscreen: boolean) => void;
    iframeRef: RefObject<HTMLIFrameElement>;
    children: ReactElement<ComponentProps<"iframe">>;
}

const ExperimentalIFrameWithFullscreen = ({
    onFullscreenChange,
    iframeRef,
    children,
}: ExperimentalIFrameWithFullscreenProps) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const wasFullscreen = usePrevious(isFullscreen);
    useEffect(() => {
        if (wasFullscreen !== isFullscreen) {
            onFullscreenChange?.(isFullscreen);
        }
    }, [onFullscreenChange, isFullscreen, wasFullscreen]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(document.fullscreenElement === iframeRef.current);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, [iframeRef]);
    const enterFullscreen = () => {
        if (iframeRef.current == null) {
            return;
        }

        const iframe = iframeRef.current;
        if (document.fullscreenElement != null) {
            void document.exitFullscreen();
        } else {
            void iframe.requestFullscreen();
        }
    };
    return (
        <Tooltip.TooltipProvider delayDuration={300}>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content side="right" align="start" sideOffset={6} className="animate-popover">
                        <FernButton variant="outlined" icon={<EnterFullScreenIcon />} onClick={enterFullscreen} />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.TooltipProvider>
    );
};

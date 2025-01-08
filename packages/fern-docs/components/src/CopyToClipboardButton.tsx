import { useCopyToClipboard } from "@fern-ui/react-commons";
import { composeEventHandlers } from "@radix-ui/primitive";
import { Slot } from "@radix-ui/react-slot";
import { Check, Copy } from "iconoir-react";
import {
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
  useState,
} from "react";
import { cn } from "./cn";
import { FernButton } from "./FernButton";
import { FernTooltip, FernTooltipProvider } from "./FernTooltip";

const CopyIconButton = forwardRef<
  HTMLButtonElement,
  Omit<ComponentPropsWithoutRef<typeof FernButton>, "children"> & {
    wasJustCopied?: boolean;
  }
>(({ wasJustCopied, ...props }, ref) => {
  return (
    <FernButton
      {...props}
      ref={ref}
      className={cn("fern-copy-button group", props.className)}
      icon={wasJustCopied ? <Check /> : <Copy />}
      variant="minimal"
    />
  );
});

CopyIconButton.displayName = "CopyIconButton";

export const CopyToClipboardButton = forwardRef<
  HTMLButtonElement,
  Omit<ComponentPropsWithoutRef<"button">, "content"> & {
    content?: string | (() => string | Promise<string>);
    tooltipContent?:
      | ReactNode
      | ((props: {
          copyToClipboard: undefined | (() => void);
          setTooltipOpen: (open: boolean) => void;
        }) => ReactNode);
    asChild?: boolean;
    tooltipContentAsChild?: boolean;
    delayDuration?: number;
  }
>((props, ref) => {
  const {
    content,
    tooltipContent,
    children,
    asChild,
    tooltipContentAsChild,
    delayDuration,
    ...otherProps
  } = props;

  const [open, setOpen] = useState(false);
  const { copyToClipboard, wasJustCopied } = useCopyToClipboard(content);
  const Comp = asChild ? Slot : "button";
  const onClick = composeEventHandlers(props.onClick, copyToClipboard, {
    checkForDefaultPrevented: true,
  });

  return (
    <FernTooltipProvider>
      <FernTooltip
        content={
          wasJustCopied ? (
            "Copied!"
          ) : tooltipContent != null ? (
            typeof tooltipContent === "function" ? (
              tooltipContent({ copyToClipboard, setTooltipOpen: setOpen })
            ) : (
              tooltipContent
            )
          ) : (
            <p>{"Copy to clipboard"}</p>
          )
        }
        open={wasJustCopied || open}
        onOpenChange={setOpen}
        asChild
        contentAsChild={tooltipContentAsChild}
        delayDuration={delayDuration}
      >
        {!children ? (
          <CopyIconButton
            ref={ref}
            wasJustCopied={wasJustCopied}
            disabled={copyToClipboard == null}
            onClick={onClick}
            {...otherProps}
          />
        ) : (
          <Comp
            {...otherProps}
            ref={ref}
            disabled={copyToClipboard == null}
            onClick={onClick}
          >
            {children}
          </Comp>
        )}
      </FernTooltip>
    </FernTooltipProvider>
  );
});

CopyToClipboardButton.displayName = "CopyToClipboardButton";

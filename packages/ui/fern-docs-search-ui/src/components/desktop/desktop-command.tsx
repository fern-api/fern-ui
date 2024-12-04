import { composeEventHandlers } from "@radix-ui/primitive";
import { Command } from "cmdk";
import { ComponentProps, ComponentPropsWithoutRef, KeyboardEvent, forwardRef, useRef, useState } from "react";
import { useSearchBox } from "react-instantsearch";
import { CommandUxProvider } from "../shared/command-ux";
import "../shared/common.scss";
import { useFacetFilters } from "../shared/search-client";
import { DesktopBackButton } from "./desktop-back-button";
import { DesktopCommandAction } from "./desktop-command-action";
import { DesktopCommandBadges } from "./desktop-command-badges";
import { DesktopCommandInput } from "./desktop-command-input";
import "./desktop.scss";

export type DesktopCommandSharedProps = Omit<ComponentProps<typeof Command>, "onSelect">;

export interface DesktopCommandProps {
    onClose?: () => void;
}

/**
 * The desktop command is intended to be used within a dialog component.
 */
export const DesktopCommand = forwardRef<
    HTMLDivElement,
    DesktopCommandProps & ComponentPropsWithoutRef<typeof Command>
>((props, ref) => {
    const { onClose, children, ...rest } = props;
    const { query, refine, clear } = useSearchBox();
    const { filters, popFilter, clearFilters } = useFacetFilters();
    const [inputError, setInputError] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const focus = () => {
        // add a slight delay so that the focus doesn't get stolen
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const scrollTop = () => {
        // add a slight delay so that the scroll doesn't get stolen
        setTimeout(() => {
            scrollRef.current?.scrollTo({ top: 0 });
        }, 0);
    };

    const onEsc = (e: KeyboardEvent<HTMLDivElement>) => {
        if (query.length > 0) {
            clear();
            focus();
            scrollTop();
        } else if (filters.length > 0) {
            if (e.metaKey) {
                clearFilters();
            } else {
                popFilter();
            }
            focus();
            scrollTop();
        } else {
            onClose?.();
        }
        e.stopPropagation();
    };

    return (
        <Command
            data-fern-docs-search-ui="desktop"
            label="Search"
            ref={ref}
            {...rest}
            onKeyDownCapture={composeEventHandlers(
                rest.onKeyDownCapture,
                (e) => {
                    // on keydown, clear input error
                    setInputError(null);

                    // if escape, handle it
                    if (e.key === "Escape") {
                        return onEsc(e);
                    }

                    // if input is focused, do nothing
                    if (document.activeElement === inputRef.current) {
                        return;
                    }

                    // if input is alphanumeric, focus input
                    // note: this func is onKeyDownCapture so it will fire before the input
                    // which is important so that the first character typed isn't swallowed
                    if (/^[a-zA-Z0-9]$/.test(e.key)) {
                        // focus input _immediately_:
                        inputRef.current?.focus();
                    }
                },
                { checkForDefaultPrevented: false },
            )}
        >
            <DesktopCommandBadges
                // isAskAI={isAskAI}
                onClick={focus}
                onDropdownClose={() => {
                    focus();
                    scrollTop();
                }}
            />

            {/* header */}
            <div data-cmdk-fern-header="" onClick={focus}>
                {filters.length > 0 && (
                    <DesktopBackButton
                        pop={() => {
                            popFilter();
                            focus();
                            scrollTop();
                        }}
                        clear={() => {
                            clearFilters();
                            focus();
                            scrollTop();
                        }}
                    />
                )}

                <DesktopCommandInput
                    ref={inputRef}
                    inputError={inputError}
                    query={query}
                    placeholder="Search"
                    onValueChange={(value) => {
                        refine(value);
                        scrollTop();
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Backspace" && query.length === 0) {
                            if (e.metaKey) {
                                clearFilters();
                            } else {
                                popFilter();
                            }
                            focus();
                        }
                    }}
                />

                <DesktopCommandAction
                    onClose={onClose}
                    // isAskAI={isAskAI}
                    // isAskAILoading={chat.isLoading}
                    // onClickAskAI={() => askAI(query)}
                    // onStopAskAI={() => chat.stop()}
                />
            </div>

            {/* body */}
            <Command.List ref={scrollRef} tabIndex={-1}>
                <CommandUxProvider focus={focus} scrollTop={scrollTop} setInputError={setInputError}>
                    {children}
                </CommandUxProvider>
            </Command.List>
        </Command>
    );
});

DesktopCommand.displayName = "DesktopCommand";

import { composeRefs } from "@radix-ui/react-compose-refs";
import { Slot } from "@radix-ui/react-slot";
import { Command, useCommandState } from "cmdk";
import { ComponentPropsWithoutRef, forwardRef, useCallback, useEffect, useRef } from "react";

export const CommandLink = forwardRef<
    HTMLAnchorElement,
    Omit<ComponentPropsWithoutRef<typeof Command.Item>, "value"> & {
        href: string;
        target?: string;
        rel?: string;
        prefetch?: (href: string) => Promise<void>;
    }
>(({ href, target, rel, onSelect, prefetch, ...props }, forwardedRef) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const isSelected = useCommandState((state) => state.value === href) as boolean;

    const getPathname = useCallback(() => {
        try {
            return new URL(href, window.location.origin).pathname;
        } catch (e) {
            return undefined;
        }
    }, [href]);

    useEffect(() => {
        const pathname = getPathname();
        if (isSelected && pathname) {
            void prefetch?.(pathname);
        }
    }, [getPathname, isSelected, prefetch]);

    // the following mirrors the `onSelect` handling in the original cmdk codebase
    useEffect(() => {
        const element = ref.current;
        if (!element) {
            return;
        }
        const listener = () => onSelect?.(href);
        element.addEventListener("cmdk-item-select", listener);
        return () => element.removeEventListener("cmdk-item-select", listener);
    }, [href, isSelected, onSelect, prefetch]);

    const Comp = props.asChild ? Slot : "a";
    // Note: `onSelect` is purposely not passed in here because these command items must be rendered as
    // `<a>` elements to allow opening the links in a new tab, an new window, etc + showing the default browser context menu.
    return (
        <Command.Item {...props} value={href} asChild>
            <Comp
                ref={composeRefs(forwardedRef, ref)}
                href={href}
                target={target}
                rel={rel}
                onPointerOver={() => {
                    const pathname = getPathname();
                    if (pathname) {
                        void prefetch?.(pathname);
                    }
                }}
                onClick={(e) => {
                    // if the user clicked this link without any modifier keys, and it's a left click, then we want to
                    // navigate to the link using the `onSelect` handler to defer the behavior to the NextJS router.
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && (e.button === 0 || e.button === 1)) {
                        e.preventDefault();
                        onSelect?.(href);
                    }
                }}
            >
                {props.children}
            </Comp>
        </Command.Item>
    );
});

CommandLink.displayName = "CommandLink";

import { PLATFORM } from "@fern-ui/core-utils";
import { useKeyboardCommand, useKeyboardPress } from "@fern-ui/react-commons";
import { Cross1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { atom, useSetAtom } from "jotai";
import { forwardRef, ReactElement, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useSearchBox, UseSearchBoxProps } from "react-instantsearch";
import { FernButton } from "../components/FernButton";
import { FernInput } from "../components/FernInput";

interface SearchBoxProps extends UseSearchBoxProps {
    className?: string;
    inputClassName?: string;
    placeholder?: string;
    onFocus?: () => void;
}

export const SEARCH_BOX_MOUNTED = atom(false);

export const SearchBox = forwardRef<HTMLInputElement, SearchBoxProps>(function SearchBox(
    { queryHook, className, inputClassName, placeholder },
    ref,
): ReactElement {
    const { query, refine } = useSearchBox({ queryHook });
    const [inputValue, setInputValue] = useState(query);
    const inputRef = useRef<HTMLInputElement>(null);

    const setMounted = useSetAtom(SEARCH_BOX_MOUNTED);

    useEffect(() => {
        setMounted(true);

        return () => {
            setMounted(false);
        };
    }, [setMounted]);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    useImperativeHandle(ref, () => inputRef.current!);

    const setQuery = useCallback(
        (newQuery: string) => {
            setInputValue(newQuery);
            refine(newQuery);
        },
        [refine],
    );

    const focusInput = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useKeyboardCommand({
        key: "A",
        platform: PLATFORM,
        onCommand: focusInput,
        preventDefault: false,
    });

    useKeyboardPress({
        key: "Backspace",
        onPress: focusInput,
        preventDefault: false,
        capture: true,
    });

    useKeyboardPress({
        key: "Space",
        onPress: focusInput,
        preventDefault: false,
        capture: true,
    });

    useKeyboardPress({
        key: "Delete",
        onPress: focusInput,
        preventDefault: false,
        capture: true,
    });

    return (
        <div className={className}>
            <form
                action=""
                role="search"
                noValidate
                onSubmit={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    if (inputRef.current) {
                        inputRef.current.blur();
                    }
                }}
                onReset={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    setQuery("");

                    if (inputRef.current) {
                        inputRef.current.focus();
                    }
                }}
            >
                <input
                    ref={inputRef}
                    className={inputClassName}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    placeholder={placeholder}
                    spellCheck={false}
                    maxLength={512}
                    type="search"
                    value={inputValue}
                    onChange={(event) => {
                        setQuery(event.currentTarget.value);
                    }}
                    autoFocus
                />
            </form>
        </div>
    );
});

export const SearchMobileBox = forwardRef<HTMLInputElement, SearchBoxProps>(function SearchBox(
    { queryHook, className, inputClassName, placeholder, onFocus },
    ref,
): ReactElement {
    const { query, refine } = useSearchBox({ queryHook });
    const [inputValue, setInputValue] = useState(query);
    const inputRef = useRef<HTMLInputElement>(null);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    useImperativeHandle(ref, () => inputRef.current!);

    const setQuery = useCallback(
        (newQuery: string) => {
            setInputValue(newQuery);
            refine(newQuery);
        },
        [refine],
    );

    return (
        <div className={className}>
            <form
                action=""
                role="search"
                noValidate
                onSubmit={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    if (inputRef.current) {
                        inputRef.current.blur();
                    }
                }}
                onReset={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    setQuery("");

                    if (inputRef.current) {
                        inputRef.current.focus();
                    }
                }}
            >
                <FernInput
                    ref={inputRef}
                    className={inputClassName}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    placeholder={placeholder}
                    spellCheck={false}
                    maxLength={512}
                    type="search"
                    value={inputValue}
                    onValueChange={setQuery}
                    leftIcon={<MagnifyingGlassIcon className="t-muted size-5" />}
                    rightElement={
                        inputValue.length > 0 && (
                            <FernButton
                                variant="minimal"
                                icon={<Cross1Icon className="t-muted" />}
                                onClick={() => {
                                    setQuery("");
                                    inputRef.current?.focus();
                                }}
                            />
                        )
                    }
                    onFocus={onFocus}
                />
            </form>
        </div>
    );
});

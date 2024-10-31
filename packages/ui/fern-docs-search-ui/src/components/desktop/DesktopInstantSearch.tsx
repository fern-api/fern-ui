import { liteClient as algoliasearch } from "algoliasearch/lite";
import "instantsearch.css/themes/reset.css";
import {
    FormEvent,
    FormHTMLAttributes,
    PropsWithChildren,
    forwardRef,
    useEffect,
    useRef,
    type ReactElement,
} from "react";
import { Configure } from "react-instantsearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { LinkComponentType } from "../shared/LinkComponent";
import { SearchResults } from "../shared/SearchResults";
import { useTrapFocus } from "../shared/useTrapFocus";
import { DesktopSearchBox } from "./DesktopSearchBox";

interface DesktopInstantSearchProps {
    appId: string;
    apiKey: string;
    LinkComponent: LinkComponentType;
    onSubmit: (path: string) => void;
    disabled?: boolean;
    initialResults: {
        tabs: { title: string; pathname: string }[];
        products: { id: string; title: string; pathname: string }[];
        versions: { id: string; title: string; pathname: string }[];
    };
}

export function DesktopInstantSearch({
    appId,
    apiKey,
    LinkComponent,
    onSubmit,
    disabled,
    initialResults,
}: DesktopInstantSearchProps): ReactElement {
    const ref = useRef(algoliasearch(appId, apiKey));
    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        ref.current.setClientApiKey({ apiKey });
        void ref.current.clearCache();
    }, [apiKey]);

    useTrapFocus({ container: formRef.current });

    return (
        <InstantSearchNext
            searchClient={ref.current}
            indexName="fern-docs-search"
            future={{ preserveSharedStateOnUnmount: true }}
        >
            <Configure
                restrictHighlightAndSnippetArrays={true}
                distinct={true}
                attributesToSnippet={["description:20", "content:20"]}
                ignorePlurals
            />
            <DesktopSearchForm
                className="flex flex-col gap-2 border border-[#DBDBDB] dark:border-white/10 rounded-lg overflow-hidden bg-[#F2F2F2]/30 dark:bg-[#1A1919]/30 backdrop-blur-xl"
                ref={formRef}
                onSubmit={onSubmit}
            >
                <div
                    className="p-4 border-b last:border-b-0 border-[#DBDBDB] dark:border-white/10 cursor-text"
                    onClick={() => inputRef.current?.focus()}
                >
                    <DesktopSearchBox
                        disabled={disabled}
                        autoFocus={false}
                        inputClassName="w-full focus:outline-none bg-transparent text-lg placeholder:text-[#969696] dark:placeholder:text-white/50"
                        placeholder="Search"
                        inputRef={inputRef}
                        isFromSelection={false}
                    />
                </div>
                <SearchResults inputRef={inputRef} LinkComponent={LinkComponent} initialResults={initialResults} />
            </DesktopSearchForm>
        </InstantSearchNext>
    );
}

interface DesktopSearchFormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
    onSubmit: (path: string) => void;
}

const DesktopSearchForm = forwardRef<HTMLFormElement, PropsWithChildren<DesktopSearchFormProps>>(
    ({ children, onSubmit, ...props }, ref): ReactElement => {
        const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const radioGroup = event.currentTarget.elements.namedItem("fern-docs-search-selected-hit");
            if (radioGroup instanceof RadioNodeList) {
                const path = radioGroup.value;
                onSubmit(path);
            }
        };
        return (
            <form ref={ref} onSubmit={handleSubmit} {...props}>
                {children}
            </form>
        );
    },
);

DesktopSearchForm.displayName = "DesktopSearchForm";

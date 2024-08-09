import { useAtom, useSetAtom } from "jotai";
import { MutableRefObject, ReactElement } from "react";
import { FERN_STREAM_ATOM, SLUG_ATOM } from "../../atoms";
import { ResolvedEndpointDefinition } from "../../resolver/types";
import { StreamingEnabledToggle } from "./StreamingEnabledToggle";

export function EndpointStreamingEnabledToggle({
    endpointProp,
    container,
}: {
    endpointProp: ResolvedEndpointDefinition;
    container: MutableRefObject<HTMLElement | null>;
}): ReactElement {
    const [isStream, setIsStream] = useAtom(FERN_STREAM_ATOM);
    const setSlug = useSetAtom(SLUG_ATOM);
    return (
        <StreamingEnabledToggle
            className="ml-2 w-[200px]"
            value={isStream}
            setValue={(value) => {
                setIsStream(value);
                const endpoint = value && endpointProp.stream != null ? endpointProp.stream : endpointProp;
                setSlug(endpoint.slug);
                setTimeout(() => {
                    if (container.current != null) {
                        container.current.scrollIntoView({ behavior: "instant" });
                    }
                }, 0);
            }}
        />
    );
}

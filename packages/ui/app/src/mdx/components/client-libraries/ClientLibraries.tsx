import { FERN_LANGUAGE_ATOM } from "@/atoms";
import { FernSdk } from "@fern-ui/components";
import { useAtom } from "jotai";
import { ComponentProps, FC } from "react";

export const ClientLibraries: FC<Pick<ComponentProps<typeof FernSdk>, "sdks">> = ({ sdks }) => {
    const [selectedLanguage, setSelectedLanguage] = useAtom(FERN_LANGUAGE_ATOM);
    return <FernSdk sdks={sdks} language={selectedLanguage} onChange={setSelectedLanguage} />;
};

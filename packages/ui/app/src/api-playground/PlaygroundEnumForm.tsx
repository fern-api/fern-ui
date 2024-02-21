import { APIV1Read } from "@fern-api/fdr-sdk";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { FC, useMemo } from "react";
import { FernButton } from "../components/FernButton";
import { FernDropdown } from "../components/FernDropdown";

// const Markdown = dynamic(() => import("../api-page/markdown/Markdown").then(({ Markdown }) => Markdown), {
//     ssr: true,
// });

interface PlaygroundEnumFormProps {
    enumValues: APIV1Read.EnumValue[];
    onChange: (value: unknown) => void;
    value: unknown;
    id: string;
}

export const PlaygroundEnumForm: FC<PlaygroundEnumFormProps> = ({ enumValues, onChange, value, id }) => {
    const options = useMemo(
        () =>
            enumValues.map(
                (enumValue): FernDropdown.Option => ({
                    type: "value",
                    label: enumValue.value,
                    helperText: enumValue.description,
                    value: enumValue.value,
                    // tooltip:
                    //     enumValue.description != null && enumValues.length >= ENUM_RADIO_BREAKPOINT ? (
                    //         <Markdown className="text-xs">{enumValue.description}</Markdown>
                    //     ) : undefined,
                    labelClassName: "font-mono",
                }),
            ),
        [enumValues],
    );

    if (enumValues.length === 0) {
        return null;
    }

    // if (enumValues.length < ENUM_RADIO_BREAKPOINT) {
    //     return (
    //         <div className="w-full">
    //             <FernRadioGroup
    //                 options={options}
    //                 value={typeof value === "string" ? value : undefined}
    //                 onValueChange={onChange}
    //                 compact={true}
    //             />
    //         </div>
    //     );
    // }

    const activeItem = enumValues.find((enumValue) => enumValue.value === value);

    return (
        <FernDropdown options={options} onValueChange={onChange} value={activeItem?.value}>
            <FernButton
                id={id}
                text={
                    activeItem != null ? (
                        <span className="font-mono">{activeItem.value}</span>
                    ) : (
                        <span className="t-muted">Select an enum...</span>
                    )
                }
                variant="outlined"
                rightIcon={<CaretDownIcon />}
                className="w-full text-left"
            />
        </FernDropdown>
    );
};

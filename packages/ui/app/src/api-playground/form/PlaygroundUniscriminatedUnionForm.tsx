import { FernButton, FernDropdown, FernSegmentedControl } from "@fern-ui/components";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { memo, useCallback, useMemo, useState } from "react";
import { Markdown } from "../../mdx/Markdown";
import { ResolvedTypeDefinition, ResolvedUndiscriminatedUnionShape } from "../../resolver/types";
import { getDefaultValueForType, matchesTypeReference } from "../utils";
import { PlaygroundTypeReferenceForm } from "./PlaygroundTypeReferenceForm";

interface PlaygroundUniscriminatedUnionFormProps {
    undiscriminatedUnion: ResolvedUndiscriminatedUnionShape;
    onChange: (value: unknown) => void;
    value: unknown;
    id: string;
    types: Record<string, ResolvedTypeDefinition>;
    disabled?: boolean;
}

export const PlaygroundUniscriminatedUnionForm = memo<PlaygroundUniscriminatedUnionFormProps>((props) => {
    const { undiscriminatedUnion, onChange, value, id, types, disabled } = props;
    const [internalSelectedVariant, setInternalSelectedVariant] = useState<number>(() => {
        return Math.max(
            undiscriminatedUnion.variants.findIndex((variant) => matchesTypeReference(variant.shape, value, types)),
            0,
        );
    });

    const selectedVariant = undiscriminatedUnion.variants[internalSelectedVariant];

    const setSelectedVariant = useCallback(
        (variantIdxAsString: string) => {
            const variantIdx = parseInt(variantIdxAsString, 10);
            const variant = undiscriminatedUnion.variants[variantIdx];
            if (variantIdx !== internalSelectedVariant && variant != null) {
                setInternalSelectedVariant(variantIdx);
                onChange(getDefaultValueForType(variant.shape, types));
            }
        },
        [internalSelectedVariant, onChange, types, undiscriminatedUnion.variants],
    );

    const options = useMemo(
        () =>
            undiscriminatedUnion.variants.map((variant, idx): FernDropdown.Option => {
                let labelFallback: string;
                switch (variant.shape.type) {
                    // We should also likely handle literals here to make it not just say
                    // "literal" but the actual value of the literal, but not positive the best UX
                    case "primitive":
                        labelFallback = variant.shape.value.type;
                        break;
                    case "optional":
                        labelFallback = variant.shape.shape.type;
                        break;
                    default:
                        labelFallback = variant.shape.type;
                        break;
                }
                const capitalizedFallbacklabel = labelFallback.charAt(0).toUpperCase() + labelFallback.slice(1);
                return {
                    type: "value",
                    label: variant.displayName ?? capitalizedFallbacklabel,
                    value: idx.toString(),
                    // todo: handle availability
                    tooltip:
                        variant.description != null ? (
                            <Markdown className="text-xs" mdx={variant.description} />
                        ) : undefined,
                };
            }),
        [undiscriminatedUnion.variants],
    );

    return (
        <div className="w-full">
            {undiscriminatedUnion.variants.length < 5 ? (
                <FernSegmentedControl
                    options={options}
                    value={internalSelectedVariant.toString()}
                    onValueChange={setSelectedVariant}
                    className="mb-4 w-full"
                    muted={disabled}
                />
            ) : (
                <FernDropdown
                    options={options}
                    onValueChange={setSelectedVariant}
                    value={internalSelectedVariant.toString()}
                >
                    <FernButton
                        text={
                            selectedVariant != null ? (
                                <span className="font-mono">{selectedVariant.displayName}</span>
                            ) : (
                                <span className="t-muted">Select a variant...</span>
                            )
                        }
                        rightIcon={<CaretDownIcon />}
                        className="w-full text-left"
                        variant="outlined"
                        mono={true}
                        disabled={disabled}
                    />
                </FernDropdown>
            )}
            {selectedVariant != null && (
                <div className="border-l border-border-default-soft pl-4">
                    <PlaygroundTypeReferenceForm
                        id={`${id}[${internalSelectedVariant}]`}
                        shape={selectedVariant.shape}
                        onChange={onChange}
                        value={value}
                        types={types}
                        disabled={disabled}
                    />
                </div>
            )}
        </div>
    );
});

PlaygroundUniscriminatedUnionForm.displayName = "PlaygroundUniscriminatedUnionForm";

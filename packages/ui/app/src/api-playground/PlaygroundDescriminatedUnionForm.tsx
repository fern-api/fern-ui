import { MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { CaretDownIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { FC, useCallback } from "react";
import { FernButton } from "../components/FernButton";
import { FernSegmentedControl } from "../components/FernSegmentedControl";
import { FernTooltip } from "../components/FernTooltip";
import { ResolvedDiscriminatedUnionShape, ResolvedDiscriminatedUnionShapeVariant } from "../util/resolver";
import { titleCase } from "../util/titleCase";
import { PlaygroundObjectPropertiesForm } from "./PlaygroundObjectPropertyForm";
import { castToRecord, getDefaultValueForObjectProperties } from "./utils";

interface PlaygroundDiscriminatedUnionFormProps {
    discriminatedUnion: ResolvedDiscriminatedUnionShape;
    onChange: (value: unknown) => void;
    value: unknown;
}

export const PlaygroundDiscriminatedUnionForm: FC<PlaygroundDiscriminatedUnionFormProps> = ({
    discriminatedUnion,
    onChange,
    value,
}) => {
    const selectedVariant =
        value != null ? (castToRecord(value)[discriminatedUnion.discriminant] as string) : undefined;

    const setSelectedVariant = useCallback(
        (variantKey: string) => {
            onChange((oldValue: unknown) => {
                const currentVariantKey = castToRecord(oldValue)[discriminatedUnion.discriminant] as string | undefined;
                if (currentVariantKey === variantKey) {
                    return oldValue;
                }
                const selectedVariant = discriminatedUnion.variants.find(
                    (variant) => variant.discriminantValue === variantKey,
                );
                if (selectedVariant == null) {
                    // eslint-disable-next-line no-console
                    console.error(`Could not find variant with discriminant value ${variantKey}`);
                    return oldValue;
                }
                return {
                    [discriminatedUnion.discriminant]: variantKey,
                    ...getDefaultValueForObjectProperties(selectedVariant.additionalProperties),
                };
            });
        },
        [discriminatedUnion.discriminant, discriminatedUnion.variants, onChange],
    );

    const activeVariant = discriminatedUnion.variants.find((variant) => variant.discriminantValue === selectedVariant);

    return (
        <div className="w-full">
            {discriminatedUnion.variants.length < 4 ? (
                <FernSegmentedControl
                    options={discriminatedUnion.variants.map((variant) => ({
                        label: titleCase(variant.discriminantValue),
                        value: variant.discriminantValue,
                    }))}
                    value={selectedVariant}
                    onValueChange={setSelectedVariant}
                    className="mb-4 w-full"
                />
            ) : (
                <Select<ResolvedDiscriminatedUnionShapeVariant>
                    items={discriminatedUnion.variants}
                    itemRenderer={(variant, { ref, handleClick, handleFocus, modifiers }) =>
                        modifiers.matchesPredicate && (
                            <MenuItem
                                ref={ref}
                                active={modifiers.active}
                                disabled={modifiers.disabled}
                                key={variant.discriminantValue}
                                text={<span className="font-mono text-sm">{variant.discriminantValue}</span>}
                                onClick={handleClick}
                                onFocus={handleFocus}
                                roleStructure="listoption"
                                labelElement={
                                    <FernTooltip content={variant.description}>
                                        <InfoCircledIcon />
                                    </FernTooltip>
                                }
                            />
                        )
                    }
                    itemPredicate={(query, variant) =>
                        variant.discriminantValue.toLowerCase().includes(query.toLowerCase())
                    }
                    onItemSelect={(variant) => setSelectedVariant(variant.discriminantValue)}
                    activeItem={activeVariant}
                    popoverProps={{ minimal: true, matchTargetWidth: true }}
                    fill={true}
                >
                    <FernButton
                        text={
                            activeVariant != null ? (
                                <span className="font-mono">{activeVariant.discriminantValue}</span>
                            ) : (
                                <span className="t-muted">Select a variant...</span>
                            )
                        }
                        rightIcon={<CaretDownIcon />}
                        className="w-full text-left"
                    />
                </Select>
            )}
            {activeVariant != null && (
                <PlaygroundObjectPropertiesForm
                    properties={activeVariant.additionalProperties}
                    value={value}
                    onChange={onChange}
                    hideObjects={false}
                    sortProperties={false}
                />
            )}
        </div>
    );
};

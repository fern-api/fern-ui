import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { FC, useCallback } from "react";
import { FernButton } from "../components/FernButton";
import { ResolvedTypeReference } from "../util/resolver";
import { PlaygroundTypeReferenceForm } from "./PlaygroundTypeReferenceForm";
import { getDefaultValueForType, shouldRenderInline } from "./utils";

interface PlaygroundListFormProps {
    itemShape: ResolvedTypeReference;
    onChange: (value: unknown) => void;
    value: unknown;
    id: string;
}

export const PlaygroundListForm: FC<PlaygroundListFormProps> = ({ itemShape, onChange, value, id }) => {
    const appendItem = useCallback(() => {
        onChange((oldValue: unknown) => {
            const oldArray = Array.isArray(oldValue) ? oldValue : [];
            return [...oldArray, getDefaultValueForType(itemShape)];
        });
    }, [itemShape, onChange]);
    const valueAsList = Array.isArray(value) ? value : [];
    const handleChangeItem = useCallback(
        (idx: number, newValue: unknown) => {
            onChange((oldValue: unknown) => {
                const oldArray = Array.isArray(oldValue) ? oldValue : [];
                return [...oldArray.slice(0, idx), newValue, ...oldArray.slice(idx + 1)];
            });
        },
        [onChange],
    );
    const handleRemoveItem = useCallback(
        (idx: number) => {
            onChange((oldValue: unknown) => {
                const oldArray = Array.isArray(oldValue) ? oldValue : [];
                return [...oldArray.slice(0, idx), ...oldArray.slice(idx + 1)];
            });
        },
        [onChange],
    );

    const renderInline = shouldRenderInline(itemShape);
    return (
        <>
            {valueAsList.length > 0 && (
                <ul className="divide-border-default border-default w-full max-w-full list-none divide-y divide-dashed border-t border-dashed">
                    {valueAsList.map((item, idx) => (
                        <li
                            key={idx}
                            className={classNames("min-h-12 w-full space-y-2", {
                                "py-2": renderInline,
                                "pt-2 pb-4": !renderInline,
                            })}
                        >
                            <div className="flex min-w-0 shrink items-center justify-between gap-2">
                                <label className="inline-flex flex-wrap items-baseline">
                                    <span className="t-muted bg-tag-default min-w-6 rounded-xl p-1 text-center text-xs font-semibold uppercase">
                                        {idx + 1}
                                    </span>
                                </label>

                                {renderInline && (
                                    <PlaygroundTypeReferenceForm
                                        shape={itemShape}
                                        value={item}
                                        onChange={(newItem) =>
                                            handleChangeItem(
                                                idx,
                                                typeof newItem === "function" ? newItem(item) : newItem,
                                            )
                                        }
                                        renderAsPanel={true}
                                        id={`${id}[${idx}]`}
                                    />
                                )}

                                <FernButton
                                    icon={<Cross1Icon />}
                                    onClick={() => handleRemoveItem(idx)}
                                    variant="minimal"
                                    size="small"
                                    className="-mx-1"
                                />
                            </div>

                            {!renderInline && (
                                <PlaygroundTypeReferenceForm
                                    shape={itemShape}
                                    value={item}
                                    onChange={(newItem) =>
                                        handleChangeItem(idx, typeof newItem === "function" ? newItem(item) : newItem)
                                    }
                                    renderAsPanel={true}
                                    id={`${id}[${idx}]`}
                                />
                            )}
                        </li>
                    ))}
                    <li className="pt-2">
                        <FernButton
                            icon={<PlusIcon />}
                            text="Add new item"
                            onClick={appendItem}
                            variant="outlined"
                            className="w-full"
                        />
                    </li>
                </ul>
            )}
            {valueAsList.length === 0 && (
                <FernButton
                    icon={<PlusIcon />}
                    text="Add new item"
                    className="w-full"
                    onClick={appendItem}
                    variant="outlined"
                />
            )}
        </>
    );
};

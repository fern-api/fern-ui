import { Collapse, Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import classNames from "classnames";
import React, { useState } from "react";
import { Chip } from "../../../components/common/Chip";
import { SearchInput } from "../../../components/common/SearchInput";
import { TypeDefinitionContext, TypeDefinitionContextValue } from "../context/TypeDefinitionContext";
import { EnumDefinitionDetails } from "./EnumDefinitionDetails";

type EnumTypeDefinitionProps = {
    elements: JSX.Element[];
    isCollapsed: boolean;
    originalButtonWidth: number | undefined;
    toggleIsCollapsed: () => void;
    collapsibleContentContextValue: () => TypeDefinitionContextValue;
    showText: string;
};

export type Ref = React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;

export const EnumTypeDefinition = ({
    elements,
    isCollapsed,
    originalButtonWidth,
    toggleIsCollapsed,
    collapsibleContentContextValue,
    showText,
}: EnumTypeDefinitionProps): JSX.Element => {
    const [searchInput, setSearchInput] = useState("");

    return (
        <>
            {elements.length < 5 ? (
                <div className="t-muted flex flex-row gap-2 ">
                    <div className="shrink-0 text-sm"> Allowed values: </div>
                    <div className="t-muted flex flex-row flex-wrap gap-2">
                        {elements.map((item) => (
                            <Chip key={item.key} name={item.props.name} description={item.props.description} />
                        ))}
                    </div>
                </div>
            ) : (
                <div
                    className="border-border-default-light dark:border-border-default-dark flex flex-col overflow-visible rounded border"
                    style={{
                        width: isCollapsed ? originalButtonWidth : "100%",
                    }}
                    // ref={ref}
                >
                    <div
                        className={classNames(
                            "flex gap-1 items-center border-b hover:bg-tag-default-light dark:hover:bg-tag-default-dark cursor-pointer px-2 py-1 transition t-muted",
                            {
                                "border-transparent": isCollapsed,
                                "border-border-default-light dark:border-border-default-dark": !isCollapsed,
                            }
                        )}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleIsCollapsed();
                        }}
                    >
                        {isCollapsed && (
                            <Icon
                                className={classNames("transition", {
                                    "rotate-45": isCollapsed,
                                })}
                                icon={IconNames.CROSS}
                            />
                        )}

                        <div
                            className="select-none whitespace-nowrap"
                            style={{ width: "100%" }}
                            data-show-text={showText}
                        >
                            {isCollapsed ? (
                                showText
                            ) : (
                                <div className="flex flex-row items-center justify-between">
                                    <div style={{ width: "95%" }}>
                                        <SearchInput
                                            searchInput={searchInput}
                                            handleSearchInput={setSearchInput}
                                            border={false}
                                            clear={false}
                                        />
                                    </div>
                                    <Icon
                                        className={classNames("transition", {
                                            "rotate-45": isCollapsed,
                                        })}
                                        icon={IconNames.CROSS}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <Collapse isOpen={!isCollapsed}>
                        <TypeDefinitionContext.Provider value={collapsibleContentContextValue}>
                            <EnumDefinitionDetails elements={elements} searchInput={searchInput} />
                        </TypeDefinitionContext.Provider>
                    </Collapse>
                </div>
            )}
        </>
    );
};

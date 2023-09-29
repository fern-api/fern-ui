import { Collapse, Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import * as FernRegistryApiRead from "@fern-fern/registry-browser/api/resources/api/resources/v1/resources/read";
import { visitDiscriminatedUnion } from "@fern-ui/core-utils";
import { useBooleanState, useIsHovering } from "@fern-ui/react-commons";
import classNames from "classnames";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useApiDefinitionContext } from "../../../api-context/useApiDefinitionContext";
import { NavigationInfo, NavigationStatus } from "../../../navigation-context/NavigationContext";
import { useNavigationContext } from "../../../navigation-context/useNavigationContext";
import { getAnchorId } from "../../../util/anchor";
import { getAllObjectProperties } from "../../utils/getAllObjectProperties";
import {
    TypeDefinitionContext,
    TypeDefinitionContextValue,
    useTypeDefinitionContext,
} from "../context/TypeDefinitionContext";
import { DiscriminatedUnionVariant } from "../discriminated-union/DiscriminatedUnionVariant";
import { EnumValue } from "../enum/EnumValue";
import { ObjectProperty } from "../object/ObjectProperty";
import { UndiscriminatedUnionVariant } from "../undiscriminated-union/UndiscriminatedUnionVariant";
import styles from "./InternalTypeDefinition.module.scss";
import { TypeDefinitionDetails } from "./TypeDefinitionDetails";

export declare namespace InternalTypeDefinition {
    export interface Props {
        typeShape: FernRegistryApiRead.TypeShape;
        isCollapsible: boolean;
        anchorIdParts: string[];
    }
}

interface CollapsibleContent {
    elements: JSX.Element[];
    elementNameSingular: string;
    elementNamePlural: string;
    separatorText?: string;
}

function shouldExpandDefinition(navigation: NavigationInfo, curAnchorId: string) {
    if (navigation.status !== NavigationStatus.INITIAL_NAVIGATION_TO_ANCHOR) {
        return false;
    }
    const { anchorId: destAnchorId } = navigation;
    return destAnchorId.startsWith(`${curAnchorId}-`);
}

export const InternalTypeDefinition: React.FC<InternalTypeDefinition.Props> = ({
    typeShape,
    isCollapsible,
    anchorIdParts,
}) => {
    const { resolveTypeById } = useApiDefinitionContext();
    const { navigation } = useNavigationContext();

    const collapsableContent = useMemo(
        () =>
            visitDiscriminatedUnion(typeShape, "type")._visit<CollapsibleContent | undefined>({
                alias: () => undefined,
                object: (object) => ({
                    elements: getAllObjectProperties(object, resolveTypeById).map((property) => (
                        <ObjectProperty
                            key={property.key}
                            property={property}
                            anchorIdParts={[...anchorIdParts, property.key]}
                        />
                    )),
                    elementNameSingular: "property",
                    elementNamePlural: "properties",
                }),
                undiscriminatedUnion: (union) => ({
                    elements: union.variants.map((variant, variantIdx) => (
                        <UndiscriminatedUnionVariant
                            key={variantIdx}
                            unionVariant={variant}
                            anchorIdParts={anchorIdParts}
                        />
                    )),
                    elementNameSingular: "variant",
                    elementNamePlural: "variants",
                    separatorText: "OR",
                }),
                discriminatedUnion: (union) => ({
                    elements: union.variants.map((variant) => (
                        <DiscriminatedUnionVariant
                            key={variant.discriminantValue}
                            discriminant={union.discriminant}
                            unionVariant={variant}
                            anchorIdParts={anchorIdParts}
                        />
                    )),
                    elementNameSingular: "variant",
                    elementNamePlural: "variants",
                    separatorText: "OR",
                }),
                enum: (enum_) => ({
                    elements: enum_.values.map((enumValue) => (
                        <EnumValue key={enumValue.value} enumValue={enumValue} />
                    )),
                    elementNameSingular: "enum value",
                    elementNamePlural: "enum values",
                }),
                _other: () => undefined,
            }),
        [resolveTypeById, typeShape, anchorIdParts]
    );

    const { value: isCollapsed, toggleValue: toggleIsCollapsed, setFalse: expandDefinition } = useBooleanState(true);

    const anchorIdSoFar = getAnchorId(anchorIdParts);

    useEffect(() => {
        if (shouldExpandDefinition(navigation, anchorIdSoFar)) {
            expandDefinition();
        }
    }, [navigation, anchorIdSoFar, expandDefinition]);

    const { isHovering, ...containerCallbacks } = useIsHovering();

    // we need to set a pixel width for the button for the transition to work
    const [originalButtonWidth, setOriginalButtonWidth] = useState<number>();
    const [buttonRef, setButtonRef] = useState<HTMLDivElement | null>(null);
    useEffect(() => {
        if (originalButtonWidth != null || buttonRef == null) {
            return;
        }

        // in case we're being expanded right now, wait for animation to finish
        const timeout = setTimeout(() => {
            setOriginalButtonWidth(buttonRef.getBoundingClientRect().width);
        }, 500);

        return () => {
            clearTimeout(timeout);
        };
    }, [buttonRef, originalButtonWidth]);

    const contextValue = useTypeDefinitionContext();
    const collapsibleContentContextValue = useCallback(
        (): TypeDefinitionContextValue => ({
            ...contextValue,
            isRootTypeDefinition: false,
        }),
        [contextValue]
    );

    if (collapsableContent == null || collapsableContent.elements.length === 0) {
        return null;
    }

    if (!isCollapsible) {
        return (
            <TypeDefinitionDetails
                elements={collapsableContent.elements}
                separatorText={collapsableContent.separatorText}
            />
        );
    }

    const showText =
        collapsableContent.elements.length === 1
            ? `Show ${collapsableContent.elementNameSingular}`
            : `Show ${collapsableContent.elements.length} ${collapsableContent.elementNamePlural}`;
    const hideText =
        collapsableContent.elements.length === 1
            ? `Hide ${collapsableContent.elementNameSingular}`
            : `Hide ${collapsableContent.elements.length} ${collapsableContent.elementNamePlural}`;

    return (
        <div className="mt-2 flex flex-col">
            <div className="flex flex-col items-start">
                <div
                    className="border-border-default-light dark:border-border-default-dark flex flex-col overflow-visible rounded border"
                    style={{
                        width: isCollapsed ? originalButtonWidth : "100%",
                    }}
                    ref={setButtonRef}
                >
                    <div
                        {...containerCallbacks}
                        className={classNames(
                            "flex gap-1 items-center border-b hover:bg-tag-default-light dark:hover:bg-tag-default-dark cursor-pointer px-2 py-1 transition t-muted",
                            {
                                "border-transparent": isCollapsed,
                                "border-border-default-light dark:border-border-default-dark": !isCollapsed,
                            }
                        )}
                        onClick={(e) => {
                            toggleIsCollapsed();
                            e.stopPropagation();
                        }}
                    >
                        <Icon
                            className={classNames("transition", {
                                "rotate-45": isCollapsed,
                            })}
                            icon={IconNames.CROSS}
                        />
                        <div
                            className={classNames(styles.showPropertiesButton, "select-none whitespace-nowrap")}
                            data-show-text={showText}
                        >
                            {isCollapsed ? showText : hideText}
                        </div>
                    </div>
                    <Collapse isOpen={!isCollapsed}>
                        <TypeDefinitionContext.Provider value={collapsibleContentContextValue}>
                            <TypeDefinitionDetails
                                elements={collapsableContent.elements}
                                separatorText={collapsableContent.separatorText}
                            />
                        </TypeDefinitionContext.Provider>
                    </Collapse>
                </div>
            </div>
        </div>
    );
};

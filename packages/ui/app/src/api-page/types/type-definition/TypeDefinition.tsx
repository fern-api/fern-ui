import { ResolvedTypeShape } from "@fern-ui/app-utils";
import React from "react";
import { JsonPropertyPath } from "../../examples/json-example/contexts/JsonPropertyPath";
import { TypeDefinitionContextProvider } from "../context/TypeDefinitionContextProvider";
import { InternalTypeDefinition } from "./InternalTypeDefinition";

export declare namespace TypeDefinition {
    export interface Props {
        typeShape: ResolvedTypeShape;
        isCollapsible: boolean;
        onHoverProperty?: (path: JsonPropertyPath, opts: { isHovering: boolean }) => void;
        anchorIdParts: string[];
        route: string;
        defaultExpandAll?: boolean;
    }
}

export const TypeDefinition: React.FC<TypeDefinition.Props> = ({
    typeShape,
    isCollapsible,
    onHoverProperty,
    anchorIdParts,
    route,
    defaultExpandAll = false,
}) => {
    return (
        <TypeDefinitionContextProvider onHoverProperty={onHoverProperty}>
            <InternalTypeDefinition
                typeShape={typeShape}
                isCollapsible={isCollapsible}
                anchorIdParts={anchorIdParts}
                route={route}
                defaultExpandAll={defaultExpandAll}
            />
        </TypeDefinitionContextProvider>
    );
};

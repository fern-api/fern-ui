import { APIV1Read, DocsV1Read } from "@fern-api/fdr-sdk";
import React, { useCallback } from "react";
import { useDocsContext } from "../docs-context/useDocsContext";
import { ApiDefinitionContext, ApiDefinitionContextValue } from "./ApiDefinitionContext";

export declare namespace ApiDefinitionContextProvider {
    export type Props = React.PropsWithChildren<{
        apiSection: DocsV1Read.ApiSection;
    }>;
}

export const ApiDefinitionContextProvider: React.FC<ApiDefinitionContextProvider.Props> = ({
    apiSection,
    children,
}) => {
    const { resolveApi } = useDocsContext();
    const apiDefinition = resolveApi(apiSection.api);
    const apiSlug = apiSection.skipUrlSlug ? "" : apiSection.urlSlug;

    const resolveSubpackageById = useCallback(
        (subpackageId: APIV1Read.SubpackageId): APIV1Read.ApiDefinitionSubpackage => {
            return resolveSubpackage(apiDefinition, subpackageId);
        },
        [apiDefinition]
    );

    const resolveTypeById = useCallback(
        (typeId: APIV1Read.TypeId): APIV1Read.TypeDefinition => {
            const type = apiDefinition.types[typeId];
            if (type == null) {
                throw new Error("Type does not exist");
            }
            return type;
        },
        [apiDefinition]
    );

    const contextValue = useCallback(
        (): ApiDefinitionContextValue => ({
            apiDefinition,
            apiSection,
            apiSlug,
            resolveTypeById,
            resolveSubpackageById,
        }),
        [apiDefinition, apiSlug, apiSection, resolveSubpackageById, resolveTypeById]
    );

    return <ApiDefinitionContext.Provider value={contextValue}>{children}</ApiDefinitionContext.Provider>;
};

export function resolveSubpackage(
    apiDefinition: APIV1Read.ApiDefinition,
    subpackageId: APIV1Read.SubpackageId
): APIV1Read.ApiDefinitionSubpackage {
    const subpackage = apiDefinition.subpackages[subpackageId];
    if (subpackage == null) {
        throw new Error("Subpackage does not exist");
    }
    if (subpackage.pointsTo != null) {
        const resolvedSubpackage = resolveSubpackage(apiDefinition, subpackage.pointsTo);
        return {
            ...resolvedSubpackage,
            name: subpackage.name,
            urlSlug: subpackage.urlSlug,
        };
    } else {
        return subpackage;
    }
}

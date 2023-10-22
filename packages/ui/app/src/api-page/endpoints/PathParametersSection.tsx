import * as FernRegistryApiRead from "@fern-api/fdr-sdk/dist/generated/api/resources/api/resources/v1/resources/read";
import { useMemo } from "react";
import { EndpointParameter } from "./EndpointParameter";
import { EndpointParametersSection } from "./EndpointParametersSection";

export declare namespace PathParametersSection {
    export interface Props {
        pathParameters: FernRegistryApiRead.PathParameter[];
        anchorIdParts: string[];
        route: string;
    }
}

export const PathParametersSection: React.FC<PathParametersSection.Props> = ({
    pathParameters,
    anchorIdParts,
    route,
}) => {
    const convertedParameters = useMemo((): EndpointParameter.Props[] => {
        return pathParameters.map(
            (pathParameter): EndpointParameter.Props => ({
                name: pathParameter.key,
                type: pathParameter.type,
                description: pathParameter.description ?? undefined,
                descriptionContainsMarkdown: pathParameter.descriptionContainsMarkdown ?? false,
                anchorIdParts: [...anchorIdParts, pathParameter.key],
                route,
            })
        );
    }, [pathParameters, anchorIdParts, route]);

    return (
        <EndpointParametersSection
            title="Path parameters"
            parameters={convertedParameters}
            anchorIdParts={anchorIdParts}
            route={route}
        />
    );
};

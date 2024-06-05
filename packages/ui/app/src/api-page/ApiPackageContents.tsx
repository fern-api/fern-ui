import { FdrAPI } from "@fern-api/fdr-sdk";
import { EMPTY_ARRAY } from "@fern-ui/core-utils";
import { memo, useMemo } from "react";
import { FernErrorBoundary } from "../components/FernErrorBoundary.js";
import {
    ResolvedPackageItem,
    ResolvedTypeDefinition,
    ResolvedWithApiDefinition,
    isResolvedSubpackage,
} from "../resolver/types.js";
import { ApiSectionMarkdownPage } from "./ApiSectionMarkdownPage.js";
import { Endpoint } from "./endpoints/Endpoint.js";
import { ApiSubpackage } from "./subpackages/ApiSubpackage.js";
import { WebSocket } from "./web-socket/WebSocket.js";
import { Webhook } from "./webhooks/Webhook.js";

export declare namespace ApiPackageContents {
    export interface Props {
        api: FdrAPI.ApiDefinitionId;
        types: Record<string, ResolvedTypeDefinition>;
        showErrors: boolean;
        apiDefinition: ResolvedWithApiDefinition;
        isLastInParentPackage: boolean;
        anchorIdParts: readonly string[];
        breadcrumbs?: readonly string[];
    }
}

const UnmemoizedApiPackageContents: React.FC<ApiPackageContents.Props> = ({
    api,
    types,
    showErrors,
    apiDefinition,
    isLastInParentPackage,
    anchorIdParts,
    breadcrumbs = EMPTY_ARRAY,
}) => {
    const { items } = apiDefinition;
    const subpackageTitle = isResolvedSubpackage(apiDefinition) ? apiDefinition.title : undefined;
    const currentBreadcrumbs = useMemo(
        () => (subpackageTitle != null ? [...breadcrumbs, subpackageTitle] : breadcrumbs),
        [breadcrumbs, subpackageTitle],
    );

    return (
        <>
            {items.map((item, idx) => (
                <FernErrorBoundary component="ApiPackageContents" key={item.id}>
                    {ResolvedPackageItem.visit(item, {
                        endpoint: (endpoint) => (
                            <Endpoint
                                api={api}
                                showErrors={showErrors}
                                endpoint={endpoint}
                                breadcrumbs={currentBreadcrumbs}
                                isLastInApi={isLastInParentPackage && idx === items.length - 1}
                                types={types}
                            />
                        ),
                        webhook: (webhook) => (
                            <Webhook
                                key={webhook.id}
                                webhook={webhook}
                                breadcrumbs={breadcrumbs}
                                isLastInApi={isLastInParentPackage && idx === items.length - 1}
                                types={types}
                            />
                        ),
                        websocket: (websocket) => (
                            <WebSocket
                                api={api}
                                websocket={websocket}
                                isLastInApi={isLastInParentPackage && idx === items.length - 1}
                                types={types}
                            />
                        ),
                        subpackage: (subpackage) => (
                            <ApiSubpackage
                                api={api}
                                types={types}
                                showErrors={showErrors}
                                apiDefinition={subpackage}
                                isLastInParentPackage={isLastInParentPackage && idx === items.length - 1}
                                anchorIdParts={anchorIdParts}
                                breadcrumbs={currentBreadcrumbs}
                            />
                        ),
                        page: (page) => (
                            <ApiSectionMarkdownPage
                                page={page}
                                hideBottomSeparator={isLastInParentPackage && idx === items.length - 1}
                            />
                        ),
                    })}
                </FernErrorBoundary>
            ))}
        </>
    );
};

export const ApiPackageContents = memo(UnmemoizedApiPackageContents);

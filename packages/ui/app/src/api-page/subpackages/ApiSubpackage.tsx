import { joinUrlSlugs } from "@fern-api/fdr-sdk";
import { ResolvedApiDefinitionPackage, ResolvedNavigationItemApiSection } from "@fern-ui/app-utils";
import { ApiPackageContents } from "../ApiPackageContents";
import { ApiPageMargins } from "../page-margins/ApiPageMargins";
import { useApiPageCenterElement } from "../useApiPageCenterElement";

export declare namespace ApiSubpackage {
    export interface Props {
        apiSection: ResolvedNavigationItemApiSection;
        apiDefinition: ResolvedApiDefinitionPackage;
        isLastInParentPackage: boolean;
        anchorIdParts: string[];
    }
}

export const ApiSubpackage: React.FC<ApiSubpackage.Props> = ({
    apiSection,
    apiDefinition,
    isLastInParentPackage,
    anchorIdParts,
}) => {
    const subpackageSlug = joinUrlSlugs(...apiDefinition.slug);
    const { setTargetRef } = useApiPageCenterElement({ slug: subpackageSlug });
    return (
        <>
            <ApiPageMargins>
                <div ref={setTargetRef} data-route={`/${subpackageSlug}`.toLowerCase()} className="scroll-mt-[74px]" />
            </ApiPageMargins>
            {apiSection != null && (
                <ApiPackageContents
                    apiSection={apiSection}
                    apiDefinition={apiDefinition}
                    isLastInParentPackage={isLastInParentPackage}
                    anchorIdParts={anchorIdParts}
                />
            )}
        </>
    );
};

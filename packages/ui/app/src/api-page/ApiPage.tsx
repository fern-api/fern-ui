import { useApiDefinitionContext } from "../api-context/useApiDefinitionContext";
import { BottomNavigationButtons } from "../bottom-navigation-buttons/BottomNavigationButtons";
import { ApiPackageContents } from "./ApiPackageContents";
import { ApiArtifacts } from "./artifacts/ApiArtifacts";
import { areApiArtifactsNonEmpty } from "./artifacts/areApiArtifactsNonEmpty";

export declare namespace ApiPage {
    export interface Props {
        headerHeight: number;
    }
}

export const ApiPage: React.FC<ApiPage.Props> = ({ headerHeight }) => {
    const { apiDefinition, apiSlug, apiSection } = useApiDefinitionContext();

    return (
        <div className="min-h-0 pb-36">
            {apiSection.artifacts != null && areApiArtifactsNonEmpty(apiSection.artifacts) && (
                <ApiArtifacts apiArtifacts={apiSection.artifacts} headerHeight={headerHeight} />
            )}
            <ApiPackageContents
                package={apiDefinition.rootPackage}
                slug={apiSlug}
                isLastInParentPackage={false}
                headerHeight={headerHeight}
            />

            <div className="pl-6 pr-4 md:pl-12">
                <BottomNavigationButtons />
            </div>
        </div>
    );
};

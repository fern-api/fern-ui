import { useApiDefinitionContext } from "../api-context/useApiDefinitionContext";
import { BottomNavigationButtons } from "../bottom-navigation-buttons/BottomNavigationButtons";
import { useDocsSelectors } from "../selectors/useDocsSelectors";
import { ApiPackageContents } from "./ApiPackageContents";
import { ApiArtifacts } from "./artifacts/ApiArtifacts";
import { areApiArtifactsNonEmpty } from "./artifacts/areApiArtifactsNonEmpty";

export declare namespace ApiPage {
    export interface Props {}
}

export const ApiPage: React.FC<ApiPage.Props> = () => {
    const { apiDefinition, apiSlug, apiSection } = useApiDefinitionContext();
    const { withVersionAndTabSlugs } = useDocsSelectors();
    const slug = withVersionAndTabSlugs(apiSlug, { omitDefault: true });

    return (
        <div className="min-h-0 pb-36">
            {apiSection.artifacts != null && areApiArtifactsNonEmpty(apiSection.artifacts) && (
                <ApiArtifacts apiArtifacts={apiSection.artifacts} />
            )}
            <ApiPackageContents
                package={apiDefinition.rootPackage}
                slug={slug}
                isLastInParentPackage={false}
                anchorIdParts={[]}
            />

            <div className="px-6 lg:px-12">
                <BottomNavigationButtons />
            </div>
        </div>
    );
};

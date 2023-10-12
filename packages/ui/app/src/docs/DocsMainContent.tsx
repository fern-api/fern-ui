import { ApiDefinitionContextProvider } from "../api-context/ApiDefinitionContextProvider";
import { ApiPage } from "../api-page/ApiPage";
import { CustomDocsPage } from "../custom-docs-page/CustomDocsPage";
import { useNavigationContext } from "../navigation-context";

export declare namespace DocsMainContent {
    export interface Props {}
}

export const DocsMainContent: React.FC<DocsMainContent.Props> = () => {
    const { activeNavigatable, serializedMdxContent } = useNavigationContext();

    switch (activeNavigatable.type) {
        case "page":
            return <CustomDocsPage serializedMdxContent={serializedMdxContent} navigatable={activeNavigatable} />;
        case "top-level-endpoint":
        case "top-level-webhook":
        case "endpoint":
        case "webhook":
            return (
                <ApiDefinitionContextProvider apiSection={activeNavigatable.section}>
                    <ApiPage />
                </ApiDefinitionContextProvider>
            );
        default:
            return null;
    }
};

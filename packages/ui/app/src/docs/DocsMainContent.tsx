import { assertNever } from "@fern-api/core-utils";
import { ApiDefinitionContextProvider } from "../api-context/ApiDefinitionContextProvider";
import { ApiPage } from "../api-page/ApiPage";
import { CustomDocsPage } from "../custom-docs-page/CustomDocsPage";
import { useDocsContext } from "../docs-context/useDocsContext";
import { RedirectToFirstNavigationItem } from "./RedirectToFirstNavigationItem";

export const DocsMainContent: React.FC = () => {
    const { resolvedPathFromUrl } = useDocsContext();

    switch (resolvedPathFromUrl.type) {
        case "mdx-page":
            return <CustomDocsPage path={resolvedPathFromUrl} />;
        case "api":
            return (
                <ApiDefinitionContextProvider
                    apiSection={resolvedPathFromUrl.apiSection}
                    apiSlug={resolvedPathFromUrl.slug}
                >
                    <ApiPage />
                </ApiDefinitionContextProvider>
            );
        case "clientLibraries":
        case "apiSubpackage":
        case "endpoint":
        case "topLevelEndpoint":
            return (
                <ApiDefinitionContextProvider
                    apiSection={resolvedPathFromUrl.apiSection}
                    apiSlug={resolvedPathFromUrl.apiSlug}
                >
                    <ApiPage />
                </ApiDefinitionContextProvider>
            );
        case "section":
            return (
                <RedirectToFirstNavigationItem
                    items={resolvedPathFromUrl.section.items}
                    slug={resolvedPathFromUrl.slug}
                />
            );
        default:
            assertNever(resolvedPathFromUrl);
    }
};

import { DEFAULT_LOGO_HEIGHT } from "../config";
import { useDocsContext } from "../docs-context/useDocsContext";
import { useDocsSelectors } from "../selectors/useDocsSelectors";
import { VersionDropdown } from "./VersionDropdown";

export declare namespace HeaderLogoSection {}

export const HeaderLogoSection: React.FC = () => {
    const { resolveFile, docsDefinition, theme } = useDocsContext();
    const { definitionInfo } = useDocsSelectors();
    const { logo, logoV2, logoHeight, logoHref } = docsDefinition.config;

    if (theme == null) {
        return null;
    }

    const logoForTheme = logoV2 != null ? logoV2[theme] : logo;
    const hasMultipleVersions = definitionInfo.type === "versioned";
    const hasLogo = logoForTheme != null;
    const hasLogoHref = logoHref != null;

    const logoContent = hasLogo ? (
        <img
            src={resolveFile(logoForTheme)}
            className="max-h-full object-contain"
            style={{
                height: logoHeight ?? DEFAULT_LOGO_HEIGHT,
            }}
        />
    ) : null;

    if (!hasLogo) {
        return null;
    }

    return (
        <div className="relative flex h-full items-center space-x-3 py-1">
            {hasLogoHref ? (
                <a href={logoHref} className="flex items-center">
                    {logoContent}
                </a>
            ) : (
                <div className="flex items-center">{logoContent}</div>
            )}
            {hasMultipleVersions && (
                <div>
                    <VersionDropdown
                        versions={docsInfo.versions}
                        selectedVersionName={docsInfo.activeVersionName}
                        selectedVersionSlug={docsInfo.activeVersionSlug}
                        onClickVersion={(versionSlug) => {
                            // TODO: Reimplement with new resolver
                        }}
                    />
                </div>
            )}
        </div>
    );
};

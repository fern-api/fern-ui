import { useTheme } from "@fern-ui/theme";
import { DEFAULT_LOGO_HEIGHT } from "../config";
import { useDocsContext } from "../docs-context/useDocsContext";
import { VersionDropdown } from "./VersionDropdown";

export declare namespace HeaderLogoSection {}

export const HeaderLogoSection: React.FC = () => {
    const { resolveFile, docsDefinition, lightModeEnabled, docsInfo, setActiveVersion, navigateToPath } =
        useDocsContext();
    const { theme } = useTheme(lightModeEnabled);
    const { logo, logoV2, logoHeight, logoHref } = docsDefinition.config;

    if (theme == null) {
        return null;
    }

    const logoForTheme = logoV2 != null ? logoV2[theme] : logo;
    const hasMultipleVersions = docsInfo.type === "versioned";
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
                        isDefaultVersion={(version) => {
                            const [firstVersion] = docsInfo.versions;
                            // TODO: The first version is not necessarily the default version
                            return version === firstVersion;
                        }}
                        selectedId={docsInfo.activeVersion}
                        onClickVersion={(v) => {
                            setActiveVersion(v);
                            navigateToPath(`/${v}`, { omitVersionPrefix: true });
                        }}
                    />
                </div>
            )}
        </div>
    );
};

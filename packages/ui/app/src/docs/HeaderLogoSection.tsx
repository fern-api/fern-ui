import { DocsV1Read } from "@fern-api/fdr-sdk";
import classNames from "classnames";
import Link from "next/link";
import { FernImage } from "../components/FernImage";
import { DEFAULT_LOGO_HEIGHT } from "../config";
import { useDocsContext } from "../contexts/docs-context/useDocsContext";
import { ColorsConfig, SidebarVersionInfo } from "../sidebar/types";
import { VersionDropdown } from "./VersionDropdown";

export interface HeaderLogoSectionProps {
    colors: ColorsConfig;
    logoHeight: DocsV1Read.Height | undefined;
    logoHref: DocsV1Read.Url | undefined;

    // currentTabIndex: number | undefined;
    // tabs: SidebarTab[];
    currentVersionIndex: number | undefined;
    versions: SidebarVersionInfo[];
}

export const HeaderLogoSection: React.FC<HeaderLogoSectionProps> = ({
    colors,
    logoHeight,
    logoHref,
    // currentTabIndex,
    // tabs,
    currentVersionIndex,
    versions,
}) => {
    const { resolveFile } = useDocsContext();
    const logoImageHeight = logoHeight ?? DEFAULT_LOGO_HEIGHT;

    const imageClassName = "max-h-full object-contain";

    const renderLogoContent = () => {
        if (colors == null) {
            return null;
        }

        if (colors.dark != null && colors.light != null) {
            return (
                <>
                    {colors.light.logo != null && (
                        <FernImage
                            src={resolveFile(colors.light.logo)}
                            className={classNames(imageClassName, "block dark:hidden")}
                            height={logoImageHeight}
                            style={{ height: logoImageHeight }}
                            priority={true}
                            loading="eager"
                            quality={100}
                        />
                    )}
                    {colors.dark.logo != null && (
                        <FernImage
                            src={resolveFile(colors.dark.logo)}
                            className={classNames(imageClassName, "hidden dark:block")}
                            height={logoImageHeight}
                            style={{ height: logoImageHeight }}
                            priority={true}
                            loading="eager"
                            quality={100}
                        />
                    )}
                </>
            );
        } else {
            const logoFile = colors.light?.logo ?? colors.dark?.logo;

            if (logoFile == null) {
                return null;
            }

            return (
                <FernImage
                    src={resolveFile(logoFile)}
                    className={classNames(imageClassName, "block")}
                    height={logoImageHeight}
                    style={{ height: logoImageHeight }}
                    priority={true}
                    loading="eager"
                    quality={100}
                />
            );
        }
    };

    return (
        <div className="relative flex h-full min-w-fit flex-1 shrink-0 items-center gap-2 py-1">
            <div className="flex items-center gap-2 pr-4">
                {logoHref != null ? (
                    <Link href={logoHref} className="flex shrink-0 items-center">
                        {renderLogoContent()}
                    </Link>
                ) : (
                    <div className="flex shrink-0 items-center">{renderLogoContent()}</div>
                )}
                {/* {tabs.length > 1 && (
                <div style={{ marginBottom: -1 * logoImageHeight * 0.125 }}>
                    <span
                        className="t-accent tracking-tight"
                        style={{
                            fontSize: logoImageHeight,
                            lineHeight: `${logoImageHeight * 0.875}px`,
                            fontFamily: "var(--typography-heading-font-family)",
                        }}
                    >
                        {tabs[currentTabIndex ?? 0]?.title}
                    </span>
                </div>
            )} */}
                {versions.length > 1 && (
                    <div>
                        <VersionDropdown currentVersionIndex={currentVersionIndex} versions={versions} />
                    </div>
                )}
            </div>
        </div>
    );
};

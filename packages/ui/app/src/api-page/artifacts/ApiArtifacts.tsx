import { DocsV1Read } from "@fern-api/fdr-sdk";
import { joinUrlSlugs } from "@fern-ui/fdr-utils";
import { API_ARTIFACTS_TITLE } from "../../config";
import { ResolvedWithApiDefinition } from "../../util/resolver";
import { ApiPageMargins } from "../page-margins/ApiPageMargins";
import { useApiPageCenterElement } from "../useApiPageCenterElement";
import { DotNetLogo } from "./sdk-logos/DotNetLogo";
import { GoLogo } from "./sdk-logos/GoLogo";
import { JavaLogo } from "./sdk-logos/JavaLogo";
import { PythonLogo } from "./sdk-logos/PythonLogo";
import { RubyLogo } from "./sdk-logos/RubyLogo";
import { SdkCard } from "./SdkCard";
import { SdkCardLayout } from "./SdkCardLayout";

export declare namespace ApiArtifacts {
    export interface Props {
        apiDefinition: ResolvedWithApiDefinition | undefined;
        apiArtifacts: DocsV1Read.ApiArtifacts;
    }
}

export const ApiArtifacts: React.FC<ApiArtifacts.Props> = ({ apiDefinition, apiArtifacts }) => {
    const slug = joinUrlSlugs(...(apiDefinition?.slug ?? []), "client-libraries");

    const { setTargetRef } = useApiPageCenterElement({ slug });

    return (
        <ApiPageMargins>
            <div ref={setTargetRef} data-route={`/${slug}`.toLowerCase()} className="scroll-mt-header-height-padded">
                <h1 className="pt-20">{API_ARTIFACTS_TITLE}</h1>
                <div className="t-muted mt-5 text-lg">
                    Official open-source client libraries for your favorite platforms.
                </div>
                <div className="mt-header-height grid grid-cols-3 gap-10">
                    {apiArtifacts.sdks.map((sdk, index) => (
                        <SdkCard key={index} sdk={sdk} />
                    ))}
                    <SdkCardLayout
                        icon={<PythonLogo className="fill-text-muted" />}
                        title={<div className="t-muted">Python</div>}
                        rightElement={
                            <div className="t-muted rounded-full bg-neutral-500/20 px-3 py-1 font-medium uppercase">
                                Coming Soon
                            </div>
                        }
                    />
                    <SdkCardLayout
                        icon={<JavaLogo className="fill-text-muted" />}
                        title={<div className="t-muted">Java</div>}
                        rightElement={
                            <div className="t-muted rounded-full bg-neutral-500/20 px-3 py-1 font-medium uppercase">
                                Coming Soon
                            </div>
                        }
                    />
                    <SdkCardLayout
                        icon={<GoLogo className="fill-text-muted" />}
                        title={<div className="t-muted">Go</div>}
                        rightElement={
                            <div className="t-muted rounded-full bg-neutral-500/20 px-3 py-1 font-medium uppercase">
                                Coming Soon
                            </div>
                        }
                    />
                    <SdkCardLayout
                        icon={<RubyLogo className="fill-text-muted" />}
                        title={<div className="t-muted">Ruby</div>}
                        rightElement={
                            <div className="t-muted rounded-full bg-neutral-500/20 px-3 py-1 font-medium uppercase">
                                Coming Soon
                            </div>
                        }
                    />
                    <SdkCardLayout
                        icon={<DotNetLogo className="fill-text-muted" />}
                        title={<div className="t-muted">.NET</div>}
                        rightElement={
                            <div className="t-muted rounded-full bg-neutral-500/20 px-3 py-1 font-medium uppercase">
                                Coming Soon
                            </div>
                        }
                    />
                </div>
            </div>
        </ApiPageMargins>
    );
};

import type { APIV1Read } from "@fern-api/fdr-sdk/client/types";
import { FernButton, FernDropdown } from "@fern-ui/components";
import { useAtom } from "jotai";
import { ReactElement } from "react";
import { parse } from "url";
import { ALL_ENVIRONMENTS_ATOM, SELECTED_ENVIRONMENT_ATOM } from "../atoms/environment";

interface MaybeEnvironmentDropdownProps {
    selectedEnvironment: APIV1Read.Environment | undefined;
    urlTextStyle?: string;
    protocolTextStyle?: string;
    small?: boolean;
    environmentFilters?: APIV1Read.EnvironmentId[];
    trailingPath?: boolean;
}
export function MaybeEnvironmentDropdown({
    selectedEnvironment,
    urlTextStyle,
    protocolTextStyle,
    small,
    environmentFilters,
    trailingPath,
}: MaybeEnvironmentDropdownProps): ReactElement | null {
    const [allEnvironmentIds] = useAtom(ALL_ENVIRONMENTS_ATOM);
    const [selectedEnvironmentId, setSelectedEnvironmentId] = useAtom(SELECTED_ENVIRONMENT_ATOM);

    const environmentIds = environmentFilters
        ? environmentFilters.filter((environmentFilter) => allEnvironmentIds.includes(environmentFilter))
        : allEnvironmentIds;

    if (environmentFilters && selectedEnvironment && !environmentFilters.includes(selectedEnvironment.id)) {
        setSelectedEnvironmentId(environmentIds[0]);
    }
    const url = selectedEnvironment?.baseUrl && parse(selectedEnvironment?.baseUrl);

    return (
        <>
            <span className="max-sm:hidden">
                {environmentIds && environmentIds.length > 1 ? (
                    <FernDropdown
                        key="selectedEnvironment-selector"
                        options={environmentIds.map((env) => ({
                            value: env,
                            label: env,
                            type: "value",
                        }))}
                        onValueChange={(value) => {
                            setSelectedEnvironmentId(value);
                        }}
                        value={selectedEnvironmentId ?? selectedEnvironment?.id}
                    >
                        <FernButton
                            className="py-0 px-1 h-auto"
                            text={
                                <span key="protocol" className="whitespace-nowrap max-sm:hidden">
                                    <span className={protocolTextStyle}>{`${url && url.protocol}//`}</span>
                                    <span className={urlTextStyle}>{(url && url.host) ?? selectedEnvironmentId}</span>
                                </span>
                            }
                            size={small ? "small" : "normal"}
                            variant="outlined"
                            mono={true}
                        />
                    </FernDropdown>
                ) : (
                    <span key="protocol" className="whitespace-nowrap max-sm:hidden">
                        <span className={protocolTextStyle}>{`${url && url.protocol}//`}</span>
                        <span className={urlTextStyle}>{(url && url.host) ?? selectedEnvironmentId}</span>
                    </span>
                )}
            </span>
            {trailingPath && url && url.pathname !== "/" && <span>{url.pathname}</span>}
        </>
    );
}

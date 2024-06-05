import { APIV1Read } from "@fern-api/fdr-sdk";
import { EndpointAvailabilityTag } from "../../api-page/endpoints/EndpointAvailabilityTag.js";

export declare namespace Availability {
    export interface Props {
        type: string;
    }
}

function parseAvailability(type: unknown): APIV1Read.Availability {
    if (typeof type !== "string") {
        return "GenerallyAvailable";
    } else if (type === "GenerallyAvailable" || type.toLowerCase() === "ga") {
        return "GenerallyAvailable";
    } else if (type.toLowerCase() === "beta") {
        return "Beta";
    } else if (type.toLowerCase() === "deprecated") {
        return "Deprecated";
    } else {
        return "GenerallyAvailable";
    }
}

export const Availability: React.FC<Availability.Props> = ({ type }) => {
    return <EndpointAvailabilityTag availability={parseAvailability(type)} />;
};

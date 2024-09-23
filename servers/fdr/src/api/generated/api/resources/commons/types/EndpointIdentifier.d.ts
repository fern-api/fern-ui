/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../index";
export interface EndpointIdentifier {
    path: FernRegistry.EndpointPathLiteral;
    method: FernRegistry.HttpMethod;
    /**
     * The ID for the endpoint as declared within the IR, this is a unique name for the endpoint, whereas path and
     * method are not (specifically for the fern definition, consider chat and chat stream). This is optional to
     * remain backcompat with old snippets of yore.
     */
    identifierOverride?: string;
}

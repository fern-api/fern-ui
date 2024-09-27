/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../index";
export interface EndpointDefinition extends FernRegistry.api.latest.WithDescription, FernRegistry.api.latest.WithAvailability {
    id: FernRegistry.EndpointId;
    method: FernRegistry.HttpMethod;
    path: FernRegistry.api.latest.PathPart[];
    auth: FernRegistry.api.latest.AuthSchemeId[] | undefined;
    defaultEnvironment: FernRegistry.EnvironmentId | undefined;
    environments: FernRegistry.api.latest.Environment[] | undefined;
    pathParameters: FernRegistry.api.latest.ObjectProperty[] | undefined;
    queryParameters: FernRegistry.api.latest.ObjectProperty[] | undefined;
    requestHeaders: FernRegistry.api.latest.ObjectProperty[] | undefined;
    responseHeaders: FernRegistry.api.latest.ObjectProperty[] | undefined;
    request: FernRegistry.api.latest.HttpRequest | undefined;
    response: FernRegistry.api.latest.HttpResponse | undefined;
    errors: FernRegistry.api.latest.ErrorResponse[] | undefined;
    examples: FernRegistry.api.latest.ExampleEndpointCall[] | undefined;
    snippetTemplates: FernRegistry.api.latest.EndpointSnippetTemplates | undefined;
}

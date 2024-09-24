/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../../../index";
export interface EndpointDefinition extends FernRegistry.api.v1.WithDescription {
    /** When this is true, the api definition will have a union for auth */
    authed: boolean;
    availability: FernRegistry.api.v1.Availability | undefined;
    defaultEnvironment: FernRegistry.EnvironmentId | undefined;
    environments: FernRegistry.api.v1.Environment[];
    method: FernRegistry.HttpMethod;
    id: FernRegistry.EndpointId;
    originalEndpointId: string | undefined;
    urlSlug: string;
    migratedFromUrlSlugs: string[] | undefined;
    name: string | undefined;
    path: FernRegistry.api.v1.read.EndpointPath;
    queryParameters: FernRegistry.api.v1.read.QueryParameter[];
    headers: FernRegistry.api.v1.read.Header[];
    request: FernRegistry.api.v1.read.HttpRequest | undefined;
    response: FernRegistry.api.v1.read.HttpResponse | undefined;
    errors: FernRegistry.api.v1.read.ErrorDeclaration[];
    errorsV2: FernRegistry.api.v1.read.ErrorDeclarationV2[] | undefined;
    examples: FernRegistry.api.v1.read.ExampleEndpointCall[];
    snippetTemplates: FernRegistry.api.v1.read.EndpointSnippetTemplates | undefined;
}

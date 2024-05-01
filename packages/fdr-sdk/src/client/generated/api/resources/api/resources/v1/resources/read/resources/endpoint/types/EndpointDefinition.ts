/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../..";

export interface EndpointDefinition extends FernRegistry.api.v1.read.WithDescription {
    /** When this is true, the api definition will have a union for auth */
    authed: boolean;
    availability?: FernRegistry.api.v1.read.Availability;
    defaultEnvironment?: FernRegistry.api.v1.read.EnvironmentId;
    environments: FernRegistry.api.v1.read.Environment[];
    method: FernRegistry.api.v1.read.HttpMethod;
    id: FernRegistry.api.v1.read.EndpointId;
    urlSlug: string;
    migratedFromUrlSlugs?: string[];
    name?: string;
    path: FernRegistry.api.v1.read.EndpointPath;
    queryParameters: FernRegistry.api.v1.read.QueryParameter[];
    headers: FernRegistry.api.v1.read.Header[];
    request?: FernRegistry.api.v1.read.HttpRequest;
    response?: FernRegistry.api.v1.read.HttpResponse;
    errors: FernRegistry.api.v1.read.ErrorDeclaration[];
    errorsV2?: FernRegistry.api.v1.read.ErrorDeclarationV2[];
    examples: FernRegistry.api.v1.read.ExampleEndpointCall[];
    snippetTemplate?: FernRegistry.api.v1.read.EndpointSnippetTemplate;
}

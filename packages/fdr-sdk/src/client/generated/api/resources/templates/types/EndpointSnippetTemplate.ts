/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../..";

export interface EndpointSnippetTemplate {
    sdk: FernRegistry.Sdk;
    endpointId: FernRegistry.EndpointIdentifier;
    /** The default snippet template to use */
    snippetTemplate: FernRegistry.VersionedSnippetTemplate;
    /**
     * Additional templates to use for this endpoint, for example if you wanted
     * an async example, you could have { "async": Template(...) }.
     */
    additionalTemplates?: Record<string, FernRegistry.VersionedSnippetTemplate>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../..";
export interface ApiSection {
    title: string;
    icon?: string;
    api: FernRegistry.ApiDefinitionId;
    artifacts?: FernRegistry.docs.v1.write.ApiArtifacts;
    skipUrlSlug?: boolean;
    showErrors?: boolean;
    changelog?: FernRegistry.docs.v1.write.ChangelogSection;
    hidden?: boolean;
    fullSlug?: string[];
    navigation?: FernRegistry.docs.v1.write.ApiNavigationConfigRoot;
    longScrolling?: boolean;
    flattened?: boolean;
}

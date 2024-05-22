/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../..";
export interface ApiSection extends FernRegistry.docs.v1.write.NavigationNodeMetadata {
    title: string;
    api: FernRegistry.ApiDefinitionId;
    artifacts?: FernRegistry.docs.v1.write.ApiArtifacts;
    skipUrlSlug?: boolean;
    showErrors?: boolean;
    changelog?: FernRegistry.docs.v1.write.ChangelogSection;
    navigation?: FernRegistry.docs.v1.write.ApiNavigationConfigRootV1;
    navigationV2?: FernRegistry.docs.v1.write.ApiNavigationConfigRootV2;
    longScrolling?: boolean;
    flattened?: boolean;
}

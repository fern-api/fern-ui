/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../index";

export interface ApiSection extends FernRegistry.docs.v1.read.NavigationNodeMetadata {
    title: string;
    api: FernRegistry.ApiDefinitionId;
    skipUrlSlug: boolean;
    artifacts: FernRegistry.docs.v1.read.ApiArtifacts | undefined;
    showErrors: boolean;
    changelog: FernRegistry.docs.v1.read.ChangelogSection | undefined;
    navigation: FernRegistry.docs.v1.read.ApiNavigationConfigRoot | undefined;
    longScrolling: boolean | undefined;
    flattened: boolean | undefined;
}

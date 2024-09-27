/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../index";
export interface ApiDefinition {
    id: FernRegistry.ApiDefinitionId;
    rootPackage: FernRegistry.api.v1.read.ApiDefinitionPackage;
    types: Record<FernRegistry.TypeId, FernRegistry.api.v1.read.TypeDefinition>;
    subpackages: Record<FernRegistry.api.v1.SubpackageId, FernRegistry.api.v1.read.ApiDefinitionSubpackage>;
    auth: FernRegistry.api.v1.read.ApiAuth | undefined;
    /**
     * If empty, assume false.
     * Whether or not endpoints are being served at different
     * base urls (i.e. https://a.com and https://b.com)
     */
    hasMultipleBaseUrls: boolean | undefined;
    /** Use the docs navigation instead. */
    navigation: FernRegistry.api.v1.read.ApiNavigationConfigRoot | undefined;
    globalHeaders: FernRegistry.api.v1.read.Header[] | undefined;
}

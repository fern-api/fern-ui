/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../..";
export interface DbApiDefinition {
    id: FernRegistry.ApiDefinitionId;
    rootPackage: FernRegistry.api.v1.db.DbApiDefinitionPackage;
    types: Record<FernRegistry.api.v1.read.TypeId, FernRegistry.api.v1.read.TypeDefinition>;
    subpackages: Record<FernRegistry.api.v1.read.SubpackageId, FernRegistry.api.v1.db.DbApiDefinitionSubpackage>;
    auth?: FernRegistry.api.v1.read.ApiAuth;
    /**
     * Whether or not endpoints are being served at different
     * base urls (i.e. https://a.com and https://b.com)
     */
    hasMultipleBaseUrls: boolean;
}

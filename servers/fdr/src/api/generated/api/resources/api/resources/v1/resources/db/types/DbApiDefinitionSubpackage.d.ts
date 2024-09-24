/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../index";
export interface DbApiDefinitionSubpackage extends FernRegistry.api.v1.WithDescription, FernRegistry.api.v1.db.DbApiDefinitionPackage {
    parent: FernRegistry.api.v1.SubpackageId | undefined;
    subpackageId: FernRegistry.api.v1.SubpackageId;
    name: string;
    urlSlug: string;
    displayName: string | undefined;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../..";
export interface ApiDefinitionSubpackage extends FernRegistry.api.v1.read.WithDescription, FernRegistry.api.v1.read.ApiDefinitionPackage {
    parent?: FernRegistry.api.v1.read.SubpackageId;
    subpackageId: FernRegistry.api.v1.read.SubpackageId;
    name: string;
    urlSlug: string;
}

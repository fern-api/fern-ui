/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../../index";
export interface StartDocsRegisterRequestV2 {
    domain: string;
    customDomains: string[];
    authConfig?: FernRegistry.docs.v2.write.AuthConfig;
    orgId: FernRegistry.OrgId;
    apiId: FernRegistry.ApiId;
    filepaths: FernRegistry.docs.v1.write.FilePath[];
    images?: FernRegistry.docs.v2.write.ImageFilePath[];
}

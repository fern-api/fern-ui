/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../..";

export interface StartDocsRegisterRequest {
    domain: string;
    orgId: FernRegistry.OrgId;
    /** Relative filepath from docs folder. */
    filepaths: FernRegistry.docs.v1.write.FilePath[];
}

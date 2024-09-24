/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../index";

export interface UnionTemplateV2 {
    imports: string[] | undefined;
    /**
     * We might not need this, but the idea here is to be able to omit if it's optional and undefined,
     * or default if omitted and required.
     */
    isOptional: boolean;
    templateString: string;
    members: FernRegistry.UnionTemplateMember[];
    templateInput: FernRegistry.PayloadInput | undefined;
}

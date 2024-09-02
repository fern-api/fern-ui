/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../index";

export interface ProductNode extends FernRegistry.navigation.WithNodeMetadata, FernRegistry.navigation.WithRedirect {
    type: "product";
    default: boolean;
    productId: FernRegistry.navigation.ProductId;
    child: FernRegistry.navigation.ProductChild;
    /** Couple words for what the product is */
    subtitle: string;
}

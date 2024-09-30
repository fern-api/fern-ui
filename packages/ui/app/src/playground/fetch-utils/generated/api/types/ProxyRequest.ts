/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernProxy from "../index";

export interface ProxyRequest {
    url: string;
    method: string;
    headers: Record<string, string>;
    body: FernProxy.RequestSerializableBody;
    stream?: boolean;
    streamTerminator?: string;
}

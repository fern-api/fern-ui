/**
 * This file was auto-generated by Fern from our API Definition.
 */
export class FernGrpcProxyError extends Error {
    constructor(errorName) {
        super();
        this.errorName = errorName;
        Object.setPrototypeOf(this, FernGrpcProxyError.prototype);
    }
}

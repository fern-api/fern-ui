/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as errors from "../../../../../../errors";
import express from "express";
export declare class FailedToIncrementVersion extends errors.FernRegistryError {
    constructor();
    send(res: express.Response): Promise<void>;
}

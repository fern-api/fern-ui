/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as errors from "../../../../../../../../errors/index";
import express from "express";
export declare class DocsRegistrationIdNotFound extends errors.FernRegistryError {
    constructor();
    send(res: express.Response): Promise<void>;
}

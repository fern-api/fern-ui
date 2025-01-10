/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../index";
export interface WebhookDefinition extends FernRegistry.api.latest.WithDescription, FernRegistry.api.latest.WithAvailability, FernRegistry.api.latest.WithNamespace {
    id: FernRegistry.WebhookId;
    displayName: string | undefined;
    operationId: string | undefined;
    method: FernRegistry.api.latest.WebhookHttpMethod;
    path: string[];
    headers: FernRegistry.api.latest.ObjectProperty[] | undefined;
    payloads: FernRegistry.api.latest.WebhookPayload[] | undefined;
    examples: FernRegistry.api.v1.read.ExampleWebhookPayload[] | undefined;
}

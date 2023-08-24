import * as FernRegistryApiRead from "@fern-fern/registry-browser/api/resources/api/resources/v1/resources/read";
import { JsonExample } from "../../examples/json-example/JsonExample";
import { TitledExample } from "../../examples/TitledExample";
import { useWebhookContext } from "../webhook-context/useWebhookContext";

export declare namespace WebhookExample {
    export interface Props {
        example: FernRegistryApiRead.ExampleWebhookPayload;
    }
}

export const WebhookExample: React.FC<WebhookExample.Props> = ({ example }) => {
    const { hoveredPayloadPropertyPath } = useWebhookContext();

    return (
        <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex min-h-0 flex-1 flex-col">
                <div className="grid min-h-0 flex-1 grid-rows-[repeat(auto-fit,_minmax(0,_min-content))] flex-col gap-6">
                    {example.payload != null && (
                        <TitledExample
                            title="Payload"
                            type="primary"
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            {(parent) => (
                                <JsonExample
                                    json={example.payload}
                                    selectedProperty={hoveredPayloadPropertyPath}
                                    parent={parent}
                                />
                            )}
                        </TitledExample>
                    )}
                </div>
            </div>
        </div>
    );
};

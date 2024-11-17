import { ApiDefinition } from "@fern-api/fdr-sdk";
import { OpenAPIV3_1 } from "openapi-types";
import { BaseAPIConverterNode, BaseAPIConverterNodeContext } from "../../../BaseAPIConverterNode";

export declare namespace ObjectNode {
    interface Input extends OpenAPIV3_1.NonArraySchemaObject {
        type: "object";
    }
}

export abstract class ObjectNode extends BaseAPIConverterNode<ObjectNode.Input, ApiDefinition.ObjectType> {
    constructor(
        protected readonly input: ObjectNode.Input,
        protected readonly context: BaseAPIConverterNodeContext,
    ) {
        super(input, context);
    }

    /**
     * @returns The converted API definition in the target output format
     */
    public convert(): ApiDefinition.ObjectType {
        
    }
}

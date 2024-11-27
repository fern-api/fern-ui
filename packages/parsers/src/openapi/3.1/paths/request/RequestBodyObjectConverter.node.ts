import { FdrAPI } from "@fern-api/fdr-sdk";
import { OpenAPIV3_1 } from "openapi-types";
import { isNonNullish } from "../../../../../../commons/core-utils/src/isNonNullish";
import {
    BaseOpenApiV3_1ConverterNode,
    BaseOpenApiV3_1ConverterNodeConstructorArgs,
} from "../../../BaseOpenApiV3_1Converter.node";
import { resolveRequestReference } from "../../../utils/3.1/resolveRequestReference";
import { isReferenceObject } from "../../guards/isReferenceObject";
import { RequestMediaTypeObjectConverterNode } from "./RequestMediaTypeObjectConverter.node";

export class RequestBodyObjectConverterNode extends BaseOpenApiV3_1ConverterNode<
    OpenAPIV3_1.RequestBodyObject | OpenAPIV3_1.ReferenceObject,
    FdrAPI.api.latest.HttpRequest[]
> {
    description: string | undefined;
    requestBodiesByContentType: Record<string, RequestMediaTypeObjectConverterNode> | undefined;

    constructor(
        args: BaseOpenApiV3_1ConverterNodeConstructorArgs<OpenAPIV3_1.RequestBodyObject | OpenAPIV3_1.ReferenceObject>,
    ) {
        super(args);
        this.safeParse();
    }

    parse(): void {
        const requestBody = isReferenceObject(this.input)
            ? resolveRequestReference(this.input, this.context.document)
            : this.input;

        if (requestBody == null) {
            return;
        }

        Object.entries(requestBody.content).forEach(([contentType, contentTypeObject]) => {
            this.requestBodiesByContentType ??= {};
            this.requestBodiesByContentType[contentType] = new RequestMediaTypeObjectConverterNode(
                {
                    input: contentTypeObject,
                    context: this.context,
                    accessPath: this.accessPath,
                    pathId: "content",
                },
                contentType,
            );
        });
    }

    convert(): FdrAPI.api.latest.HttpRequest[] {
        return Object.entries(this.requestBodiesByContentType ?? {})
            .map(([contentType, mediaTypeObject]) => {
                const body = mediaTypeObject.convert();

                if (body == null) {
                    return undefined;
                }

                return {
                    description: this.description,
                    contentType,
                    body,
                };
            })
            .filter(isNonNullish);
    }
}

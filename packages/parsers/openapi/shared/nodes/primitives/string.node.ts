import { UnreachableCaseError } from "ts-essentials";
import { FdrStringType } from "../../../../fdr/fdr.types";
import { ApiNodeContext, InputApiNode } from "../../../ApiNode";
import { SchemaObject } from "../../openapi.types";
import { ConstArrayToType, OPENAPI_STRING_TYPE_FORMAT } from "./types/format.types";

export class StringNode extends InputApiNode<SchemaObject, FdrStringType> {
    type: FdrStringType["type"] | undefined;
    regex: string | undefined;
    default: string | undefined;
    minLength: number | undefined;
    maxLength: number | undefined;

    mapToFdrType = (format: ConstArrayToType<typeof OPENAPI_STRING_TYPE_FORMAT>): FdrStringType["type"] | undefined => {
        switch (format) {
            case "base64url":
            case "binary":
            case "byte":
            case "sf-binary":
                return "base64";
            case "date-time":
                return "datetime";
            case "int64":
                return "bigInteger";
            case "date":
                return "date";
            case "uuid":
                return "uuid";
            case "char":
            case "commonmark":
            case "decimal":
            case "decimal128":
            case "duration":
            case "email":
            case "hostname":
            case "html":
            case "http-date":
            case "idn-email":
            case "idn-hostname":
            case "ipv4":
            case "ipv6":
            case "iri-reference":
            case "iri":
            case "json-pointer":
            case "media-range":
            case "password":
            case "regex":
            case "relative-json-pointer":
            case "sf-boolean":
            case "sf-string":
            case "sf-token":
            case "time":
            case "uri-reference":
            case "uri-template":
            case "uri":
            case undefined:
                return "string";
            default:
                new UnreachableCaseError(format);
                return undefined;
        }
    };

    constructor(context: ApiNodeContext, input: SchemaObject, accessPath: string[], accessorKey?: string) {
        super(context, input, accessPath, accessorKey);
        if (input.type !== "string") {
            context.errorCollector.addError(
                `Expected type "string" for primitive, but got "${input.type}"`,
                accessPath,
            );
            return;
        }

        this.type = this.mapToFdrType(input.format);

        if (this.type === undefined) {
            context.errorCollector.addError(`Expected proper "string" format, but got "${input.format}"`, accessPath);
            return;
        }

        this.regex = input.pattern;
        this.default = input.default;
        this.minLength = input.minLength;
        this.maxLength = input.maxLength;
    }

    toFdrShape = (): FdrStringType | undefined => {
        if (this.type === undefined) {
            return undefined;
        }

        return {
            type: this.type,
            regex: this.regex,
            minLength: this.minLength,
            maxLength: this.maxLength,
            default: this.default,
        };
    };
}

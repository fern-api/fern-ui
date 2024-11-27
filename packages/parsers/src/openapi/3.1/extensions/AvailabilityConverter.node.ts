import { FdrAPI } from "@fern-api/fdr-sdk";
import { OpenAPIV3_1 } from "openapi-types";
import { UnreachableCaseError } from "ts-essentials";
import {
    BaseOpenApiV3_1ConverterNode,
    BaseOpenApiV3_1ConverterNodeConstructorArgs,
} from "../../BaseOpenApiV3_1Converter.node";
import { ConstArrayToType, SUPPORTED_X_FERN_AVAILABILITY_VALUES } from "../../types/format.types";
import { resolveSchemaReference } from "../../utils/3.1/resolveSchemaReference";
import { extendType } from "../../utils/extendType";
import { isReferenceObject } from "../guards/isReferenceObject";

export type Availability = ConstArrayToType<typeof SUPPORTED_X_FERN_AVAILABILITY_VALUES>;

export class AvailabilityConverterNode extends BaseOpenApiV3_1ConverterNode<
    { deprecated?: boolean } | OpenAPIV3_1.ReferenceObject,
    FdrAPI.Availability | undefined
> {
    availability?: Availability;

    constructor(
        args: BaseOpenApiV3_1ConverterNodeConstructorArgs<{ deprecated?: boolean } | OpenAPIV3_1.ReferenceObject>,
    ) {
        super(args);
        this.safeParse();
    }

    parse(): void {
        const input = isReferenceObject(this.input)
            ? resolveSchemaReference(this.input, this.context.document)
            : this.input;

        if (input.deprecated) {
            this.availability = "deprecated";
        } else {
            const maybeAvailability = extendType<{
                "x-fern-availability"?: Availability;
            }>(this.input)["x-fern-availability"];
            if (maybeAvailability != null) {
                if (SUPPORTED_X_FERN_AVAILABILITY_VALUES.includes(maybeAvailability)) {
                    this.availability = maybeAvailability;
                } else {
                    this.context.errors.warning({
                        message: `Expected one of: ${SUPPORTED_X_FERN_AVAILABILITY_VALUES.join(", ")}. Received: ${maybeAvailability}`,
                        path: this.accessPath,
                    });
                    this.availability = undefined;
                }
            }
        }
    }

    convert(): FdrAPI.Availability | undefined {
        switch (this.availability) {
            case "pre-release":
                return FdrAPI.Availability.Beta;
            case "in-development":
                return FdrAPI.Availability.InDevelopment;
            case "generally-available":
                return FdrAPI.Availability.GenerallyAvailable;
            case "deprecated":
                return FdrAPI.Availability.Deprecated;
            case undefined:
                return undefined;
            default:
                new UnreachableCaseError(this.availability);
                return undefined;
        }
    }
}

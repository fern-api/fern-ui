import { OpenAPIV3_1 } from "openapi-types";
import { FernRegistry } from "../../../client/generated";
import {
<<<<<<< HEAD
    BaseOpenApiV3_1ConverterNodeConstructorArgs,
    BaseOpenApiV3_1ConverterNodeWithExample,
=======
  BaseOpenApiV3_1ConverterNodeConstructorArgs,
  BaseOpenApiV3_1ConverterNodeWithExample,
>>>>>>> main
} from "../../BaseOpenApiV3_1Converter.node";
import { getSchemaIdFromReference } from "../../utils/3.1/getSchemaIdFromReference";
import { resolveSchemaReference } from "../../utils/3.1/resolveSchemaReference";
import { SchemaConverterNode } from "./SchemaConverter.node";

export class ReferenceConverterNode extends BaseOpenApiV3_1ConverterNodeWithExample<
<<<<<<< HEAD
    OpenAPIV3_1.ReferenceObject,
    FernRegistry.api.latest.TypeShape.Alias
=======
  OpenAPIV3_1.ReferenceObject,
  FernRegistry.api.latest.TypeShape.Alias
>>>>>>> main
> {
  schemaId: string | undefined;

  constructor(
    args: BaseOpenApiV3_1ConverterNodeConstructorArgs<OpenAPIV3_1.ReferenceObject>
  ) {
    super(args);
    this.safeParse();
  }

  parse(): void {
    this.schemaId = getSchemaIdFromReference(this.input);

    if (this.schemaId == null) {
      this.context.errors.error({
        message: `Unprocessable reference: ${this.input.$ref}`,
        path: this.accessPath,
      });
    }
  }

  convert(): FernRegistry.api.latest.TypeShape.Alias | undefined {
    if (this.schemaId == null) {
      return undefined;
    }

    return {
      type: "alias",
      value: {
        type: "id",
        id: FernRegistry.TypeId(this.schemaId),
        // TODO: figure out how to handle default
        default: undefined,
      },
    };
  }

  example(): unknown | undefined {
    const schema = resolveSchemaReference(this.input, this.context.document);
    if (schema == null) {
      return undefined;
    }
<<<<<<< HEAD

    example(): unknown | undefined {
        const schema = resolveSchemaReference(this.input, this.context.document);
        if (schema == null) {
            return undefined;
        }
        return new SchemaConverterNode({
            input: schema,
            context: this.context,
            accessPath: this.accessPath,
            pathId: this.pathId,
        }).example();
    }
=======
    return new SchemaConverterNode({
      input: schema,
      context: this.context,
      accessPath: this.accessPath,
      pathId: this.pathId,
    }).example();
  }
>>>>>>> main
}

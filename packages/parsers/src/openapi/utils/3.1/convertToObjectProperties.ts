import { isNonNullish } from "@fern-api/ui-core-utils";
import { FernRegistry } from "../../../client/generated";
import {
  ParameterBaseObjectConverterNode,
  SchemaConverterNode,
} from "../../3.1";
import { maybeSingleValueToArray } from "../maybeSingleValueToArray";

export function convertToObjectProperties(
  properties:
    | Record<string, SchemaConverterNode | ParameterBaseObjectConverterNode>
    | undefined,
  requiredProperties: string[] | undefined
): FernRegistry.api.latest.ObjectProperty[][] | undefined {
  if (properties == null) {
    return undefined;
  }

  const rawProperties = Object.entries(properties)
    .map(([key, node]) => {
      const maybeValueShapes = maybeSingleValueToArray(node.convert());

      return maybeValueShapes
        ?.map((valueShape) => {
          if (requiredProperties != null && !requiredProperties.includes(key)) {
            valueShape = {
              type: "alias",
              value: {
                type: "optional",
                shape: valueShape,
                default:
                  valueShape.type === "enum" ? valueShape.default : undefined,
              },
            };
          }

          return {
            key: FernRegistry.PropertyKey(key),
            valueShape,
            description: node.description,
            availability: node.availability?.convert(),
          };
        })
        .filter(isNonNullish);
    })
    .filter(isNonNullish);

  return rawProperties.reduce<FernRegistry.api.latest.ObjectProperty[][]>(
    (acc, curr) => {
      return acc.flatMap((a) =>
        curr.length > 0 ? curr.map((b) => [...a, b]) : [[...a]]
      );
    },
    [[]]
  );
}

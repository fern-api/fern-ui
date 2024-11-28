import { isNonNullish } from "@fern-api/ui-core-utils";
import { FernRegistry } from "@fern-fern/fdr-cjs-sdk";
import { AvailabilityConverterNode } from "../../3.1/extensions/AvailabilityConverter.node";

export function convertToObjectProperties(
    properties:
        | Record<
              string,
              {
                  availability?: AvailabilityConverterNode;
                  description?: string;
                  convert: () => FernRegistry.api.latest.TypeShape | undefined;
              }
          >
        | undefined,
): FernRegistry.api.latest.ObjectProperty[] | undefined {
    if (properties == null) {
        return undefined;
    }
    return Object.entries(properties)
        .map(([key, node]) => {
            const valueShape = node.convert();
            if (valueShape == null) {
                return undefined;
            }
            return {
                key: FernRegistry.PropertyKey(key),
                valueShape,
                description: node.description,
                availability: node.availability?.convert(),
            };
        })
        .filter(isNonNullish);
}

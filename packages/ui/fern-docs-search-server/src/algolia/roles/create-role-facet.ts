import { EVERYONE_ROLE } from "@fern-ui/fern-docs-utils";
import { binaryStringToHex, removeLeadingZeros } from "./role-utils";

/**
 * Create a facet for the given roles.
 *
 * This is used to create the `visible_by` facet in the Algolia record.
 *
 * everyone -> 0
 * a -> 1
 * [a, b] -> 3
 */
export function createRoleFacet(roles: string[], roleIndexes: Map<string, number>): string {
    if (roles[0] === EVERYONE_ROLE) {
        return "0";
    }

    let encodedString = "0".repeat(roleIndexes.size);

    roles.forEach((role) => {
        const maybeRolePosition = roleIndexes.get(role);
        if (maybeRolePosition != null) {
            const index = roleIndexes.size - 1 - maybeRolePosition;
            if (index != null) {
                encodedString = encodedString.slice(0, index) + "1" + encodedString.slice(index + 1);
            }
        }
    });

    // can add `role/` prefix if needed, but please update tests
    return removeLeadingZeros(binaryStringToHex(encodedString));
}

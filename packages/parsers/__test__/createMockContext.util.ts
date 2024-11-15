import { vi } from "vitest";
import { ApiNodeContext } from "../openapi/ApiNode";

import { Logger } from "@playwright/test";

export function createMockContext(): ApiNodeContext {
    return {
        orgId: "orgId",
        apiId: "apiId",
        logger: {} as Logger,
        errorCollector: {
            addError: vi.fn(),
            errors: [],
        },
    };
}

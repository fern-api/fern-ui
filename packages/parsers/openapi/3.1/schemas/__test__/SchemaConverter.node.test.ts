import { OpenAPIV3_1 } from "openapi-types";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createMockContext } from "../../../../__test__/createMockContext.util";
import { ObjectConverterNode } from "../ObjectConverter.node";
import { ReferenceConverterNode } from "../ReferenceConverter.node";
import { SchemaConverterNode } from "../SchemaConverter.node";

describe("SchemaConverterNode", () => {
    const mockContext = createMockContext();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("constructor", () => {
        it("should handle reference object", () => {
            const input: OpenAPIV3_1.ReferenceObject = {
                $ref: "#/components/schemas/Pet",
            };
            const node = new SchemaConverterNode(input, mockContext, [], "test");
            expect(node.typeShapeNode).toBeInstanceOf(ReferenceConverterNode);
        });

        it("should handle object type", () => {
            const input: OpenAPIV3_1.SchemaObject = {
                type: "object",
                properties: {
                    name: { type: "string" },
                },
            };
            const node = new SchemaConverterNode(input, mockContext, [], "test");
            expect(node.typeShapeNode).toBeInstanceOf(ObjectConverterNode);
        });

        it("should handle boolean type", () => {
            const input: OpenAPIV3_1.SchemaObject = {
                type: "boolean",
            };
            const node = new SchemaConverterNode(input, mockContext, [], "test");
            expect(node.typeShapeNode).toBeDefined();
        });

        it("should handle integer type", () => {
            const input: OpenAPIV3_1.SchemaObject = {
                type: "integer",
            };
            const node = new SchemaConverterNode(input, mockContext, [], "test");
            expect(node.typeShapeNode).toBeDefined();
        });

        it("should handle number type", () => {
            const input: OpenAPIV3_1.SchemaObject = {
                type: "number",
            };
            const node = new SchemaConverterNode(input, mockContext, [], "test");
            expect(node.typeShapeNode).toBeDefined();
        });

        it("should handle string type", () => {
            const input: OpenAPIV3_1.SchemaObject = {
                type: "string",
            };
            const node = new SchemaConverterNode(input, mockContext, [], "test");
            expect(node.typeShapeNode).toBeDefined();
        });

        it("should set description", () => {
            const input: OpenAPIV3_1.SchemaObject = {
                type: "string",
                description: "test description",
            };
            const node = new SchemaConverterNode(input, mockContext, [], "test");
            expect(node.description).toBe("test description");
        });
    });

    describe("convert", () => {
        it("should convert primitive type", () => {
            const input: OpenAPIV3_1.SchemaObject = {
                type: "string",
            };
            const node = new SchemaConverterNode(input, mockContext, [], "test");
            const result = node.convert();
            expect(result).toEqual({
                type: "alias",
                value: {
                    type: "primitive",
                    value: {
                        type: "string",
                        default: undefined,
                    },
                },
            });
        });

        it("should return undefined if typeShapeNode is undefined", () => {
            const input: OpenAPIV3_1.SchemaObject = {
                type: "unknown" as any,
            };
            const node = new SchemaConverterNode(input, mockContext, [], "test");
            expect(node.convert()).toBeUndefined();
        });
    });

    describe("convertPrimitive", () => {
        it("should handle undefined conversion result", () => {
            const mockInput = {
                convert: () => undefined,
            } as any;
            const node = new SchemaConverterNode({ type: "string" }, mockContext, [], "test");
            const converter = node.convertPrimitive(mockInput);
            expect(converter.convert()).toBeUndefined();
        });

        it("should convert primitive type correctly", () => {
            const mockInput = {
                convert: () => ({ type: "string" as const }),
            } as any;
            const node = new SchemaConverterNode({ type: "string" }, mockContext, [], "test");
            const converter = node.convertPrimitive(mockInput);
            expect(converter.convert()).toEqual({
                type: "alias",
                value: {
                    type: "primitive",
                    value: { type: "string" },
                },
            });
        });
    });
});

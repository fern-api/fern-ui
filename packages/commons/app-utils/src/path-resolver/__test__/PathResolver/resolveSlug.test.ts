import { PathCollisionError } from "../../errors";
import { PathResolver } from "../../PathResolver";
import { DefinitionNodeType, FullSlug } from "../../types";
import { expectDocsSectionNode, expectNode, expectPageNode } from "../util";
import { DEFINITION_UNVERSIONED_TABBED } from "./mock-definitions/unversioned-tabbed";
import { DEFINITION_UNVERSIONED_UNTABBED } from "./mock-definitions/unversioned-untabbed";
import { DEFINITION_VERSIONED_TABBED } from "./mock-definitions/versioned-tabbed";
import { DEFINITION_VERSIONED_UNTABBED } from "./mock-definitions/versioned-untabbed";
import { DEFINITION_WITH_API } from "./mock-definitions/with-api-definition";
import { DEFINITION_WITH_COLLIDING_SLUGS } from "./mock-definitions/with-colliding-slugs";
import { DEFINITION_WITH_SKIPPED_SLUGS } from "./mock-definitions/with-skipped-slugs";

describe("resolveSlug", () => {
    describe("resolves invalid slug to undefined", () => {
        it("with versioned and untabbed docs", () => {
            const resolver = new PathResolver({
                docsDefinition: DEFINITION_VERSIONED_UNTABBED,
            });
            const resolvedNode = resolver.resolveSlug("abc");
            expect(resolvedNode).toBeUndefined();
        });
    });

    describe("resolves slug to the correct node", () => {
        it("with unversioned and untabbed docs", () => {
            const resolver = new PathResolver({
                docsDefinition: DEFINITION_UNVERSIONED_UNTABBED,
            });
            const resolvedNode = resolver.resolveSlug("introduction");
            expectDocsSectionNode(resolvedNode);
        });

        it("with unversioned and tabbed docs", () => {
            const resolver = new PathResolver({
                docsDefinition: DEFINITION_UNVERSIONED_TABBED,
            });
            const resolvedNode = resolver.resolveSlug("help-center/documents/deleting-documents");
            expectPageNode(resolvedNode);
        });

        it("with versioned and untabbed docs", () => {
            const resolver = new PathResolver({
                docsDefinition: DEFINITION_VERSIONED_UNTABBED,
            });
            const tuples: [FullSlug, DefinitionNodeType][] = [
                ["v2/introduction/changelog", "page"],
                ["introduction/changelog", "page"],
                ["v1-2/introduction/authentication", "page"],
            ];
            tuples.forEach(([slug, type]) => {
                const resolvedNode = resolver.resolveSlug(slug);
                expectNode(resolvedNode).toBeOfType(type);
            });
        });

        it("with versioned and tabbed docs", () => {
            const resolver = new PathResolver({
                docsDefinition: DEFINITION_VERSIONED_TABBED,
            });
            const tuples: [FullSlug, DefinitionNodeType][] = [
                ["v2/help-center/documents/deleting-documents", "page"],
                ["help-center/documents/deleting-documents", "page"],
                ["v1-2/welcome/advanced-concepts", "docs-section"],
            ];
            tuples.forEach(([slug, type]) => {
                const resolvedNode = resolver.resolveSlug(slug);
                expectNode(resolvedNode).toBeOfType(type);
            });
        });

        it("with api definition", () => {
            const resolver = new PathResolver({
                docsDefinition: DEFINITION_WITH_API,
            });
            const resolvedNode = resolver.resolveSlug("api-reference/client-api/generate-completion");
            expectNode(resolvedNode).toBeOfType("endpoint");
        });

        it("with skipped slugs", () => {
            const resolver = new PathResolver({
                docsDefinition: DEFINITION_WITH_SKIPPED_SLUGS,
            });
            const tuples: [FullSlug, DefinitionNodeType | undefined][] = [
                ["help-center", "tab"],
                ["help-center/documents", undefined],
                ["help-center/documents/uploading-documents", undefined],
                ["help-center/uploading-documents", "page"],
                ["api-reference/api-reference/generate-completion", undefined],
                ["api-reference/generate-completion", "endpoint"],
            ];
            tuples.forEach(([slug, type]) => {
                const resolvedNode = resolver.resolveSlug(slug);
                expectNode(resolvedNode).toBeOfType(type);
            });
        });

        it("with collisions", () => {
            const resolver = new PathResolver({
                docsDefinition: DEFINITION_WITH_COLLIDING_SLUGS,
            });
            expect(() => resolver.resolveSlug("v1")).toThrow(PathCollisionError);
            expect(() => resolver.resolveSlug("v1/introduction")).toThrow(PathCollisionError);
            expect(() => resolver.resolveSlug("v1/introduction/getting-started")).toThrow(PathCollisionError);
        });
    });
});

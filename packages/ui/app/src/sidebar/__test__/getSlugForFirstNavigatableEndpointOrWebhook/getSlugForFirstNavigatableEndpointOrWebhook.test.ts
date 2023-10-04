import {
    assertIsUnversionedUntabbedNavigationConfig,
    assertIsVersionedNavigationConfig,
    UrlPathResolver,
} from "@fern-ui/app-utils";
import { loadDocsDefinition } from "@fern-ui/test-utils";
import { getFullSlug } from "../../../docs-context/getFullSlug";
import { resolveFirstNavigatableSlug, type ResolveResult } from "../../resolveFirstNavigatableSlug";

interface TabbedVersionedFixture {
    type: "tabbed-versioned";
    name: string;
    revision: number | string;
    activeVersionId: string;
    activeTabSlug: string;
}

interface TabbedUnversionedFixture {
    type: "tabbed-unversioned";
    name: string;
    revision: number | string;
    activeTabSlug: string;
}

interface UntabbedVersionedFixture {
    type: "untabbed-versioned";
    name: string;
    revision: number | string;
    activeVersionId: string;
}

interface UntabbedUnversionedFixture {
    type: "untabbed-unversioned";
    name: string;
    revision: number | string;
}

type Fixture =
    | TabbedVersionedFixture
    | TabbedUnversionedFixture
    | UntabbedVersionedFixture
    | UntabbedUnversionedFixture;

const FIXTURES: Fixture[] = [
    {
        type: "untabbed-versioned",
        name: "primer",
        revision: 1,
        activeVersionId: "v2.2",
    },
];

describe("resolveFirstNavigatableSlug()", () => {
    for (const fixture of FIXTURES) {
        it(`${fixture.name}-${fixture.revision}`, async () => {
            const docsDefinition = loadDocsDefinition(fixture.name, fixture.revision);
            if (docsDefinition == null) {
                throw new Error("Fixture docs definition does not exist.");
            }

            const navigationConfig = docsDefinition.config.navigation;
            const navigatablesByApiId: Record<string, ResolveResult[]> = {};
            await Promise.all(
                Object.values(docsDefinition.apis).map(async (apiDef) => {
                    let activeVersionSlug: string | undefined;
                    let items;
                    if (fixture.type === "untabbed-versioned") {
                        assertIsVersionedNavigationConfig(navigationConfig);
                        const versionConfigData = navigationConfig.versions.find(
                            (v) => v.version === fixture.activeVersionId
                        );
                        if (versionConfigData == null) {
                            throw new Error(
                                `Expected version config data for version "${fixture.activeVersionId}" to be defined.`
                            );
                        }
                        assertIsUnversionedUntabbedNavigationConfig(versionConfigData.config);
                        items = versionConfigData.config.items;
                        activeVersionSlug = versionConfigData.urlSlug;
                    } else {
                        // TODO: Implement after new resolver
                        throw new Error("Not yet implemented");
                    }

                    const activeVersionSlugConst = activeVersionSlug;

                    const resolver = new UrlPathResolver({
                        items,
                        loadApiDefinition: (id) => docsDefinition.apis[id],
                        loadApiPage: (id) => docsDefinition.pages[id],
                    });

                    await Promise.all(
                        Object.values(apiDef.subpackages).map(async (s) => {
                            const result = await resolveFirstNavigatableSlug(s.urlSlug, resolver, {
                                docsDefinition,
                                getFullSlug: (slug) =>
                                    getFullSlug(slug, activeVersionSlugConst, undefined, "versioned", true),
                            });
                            if (navigatablesByApiId[apiDef.id] == null) {
                                navigatablesByApiId[apiDef.id] = [];
                            }
                            navigatablesByApiId[apiDef.id]?.push(result);
                        })
                    );
                })
            );
            expect(navigatablesByApiId).toMatchSnapshot();
        }, 90_000);
    }
});

import { FernNavigation } from "../..";
import { slugjoin } from "../utils/slugjoin";

export class SlugGenerator {
    public static init(baseSlug: string): SlugGenerator {
        return new SlugGenerator(baseSlug, undefined, baseSlug);
    }
    private constructor(
        private baseSlug: string,
        private versionSlug: string | undefined,
        private slug: string,
    ) {}

    public get(): FernNavigation.Slug {
        return FernNavigation.Slug(slugjoin(this.slug));
    }

    public setVersionSlug(versionSlug: string): SlugGenerator {
        if (this.versionSlug != null) {
            if (this.versionSlug === slugjoin(this.baseSlug, versionSlug)) {
                return this;
            }
            throw new Error("Version already set");
        }
        const slug = slugjoin(this.baseSlug, versionSlug);
        if (this.baseSlug === versionSlug) {
            throw new Error("Version slug is the same as base slug");
        }
        return new SlugGenerator(this.baseSlug, slug, slug);
    }

    public append(slug: string): SlugGenerator {
        return new SlugGenerator(this.baseSlug, this.versionSlug, slugjoin(this.slug, slug));
    }

    public set(slug: string): SlugGenerator {
        slug = slugjoin(slug); // normalize slug
        if (this.versionSlug != null) {
            if (slug.startsWith(this.versionSlug)) {
                return new SlugGenerator(this.baseSlug, this.versionSlug, slug);
            } else if (this.baseSlug.length > 0 && slug.startsWith(this.baseSlug)) {
                return new SlugGenerator(
                    this.baseSlug,
                    this.versionSlug,
                    slugjoin(this.versionSlug, slug.substring(this.baseSlug.length)),
                );
            } else {
                return new SlugGenerator(this.baseSlug, this.versionSlug, slugjoin(this.versionSlug, slug));
            }
        }
        if (this.baseSlug.length > 0) {
            if (slug.startsWith(this.baseSlug)) {
                return new SlugGenerator(this.baseSlug, this.versionSlug, slug);
            } else {
                return new SlugGenerator(this.baseSlug, this.versionSlug, slugjoin(this.baseSlug, slug));
            }
        }
        return new SlugGenerator(this.baseSlug, this.versionSlug, slug);
    }

    public apply({
        fullSlug,
        urlSlug,
        skipUrlSlug,
    }: {
        fullSlug?: string[];
        skipUrlSlug?: boolean;
        urlSlug: string;
    }): SlugGenerator {
        if (fullSlug != null) {
            return this.set(fullSlug.join("/"));
        }

        if (skipUrlSlug) {
            return this;
        }

        return this.append(urlSlug);
    }
}

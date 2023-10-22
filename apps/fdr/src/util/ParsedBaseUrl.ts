const HAS_HTTPS_REGEX = /^https?:\/\//i;

export class ParsedBaseUrl {
    public readonly hostname: string;
    public readonly path: string | undefined;

    private constructor({ hostname, path }: { hostname: string; path: string | undefined }) {
        this.hostname = hostname;
        this.path = path;
    }

    public getFullUrl(): string {
        if (this.path == null) {
            return `${this.hostname}`;
        }
        return `${this.hostname}${this.path}`;
    }

    public static parse(url: string): ParsedBaseUrl {
        let domain = url;
        if (!HAS_HTTPS_REGEX.test(domain)) {
            domain = "https://" + domain;
        }
        const parsedUrl = new URL(domain);
        return new ParsedBaseUrl({
            hostname: parsedUrl.hostname,
            path: parsedUrl.pathname === "/" ? undefined : parsedUrl.pathname,
        });
    }
}

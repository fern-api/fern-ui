/**
 * This file was auto-generated by Fern from our API Definition.
 */

export type Language = "JAVA" | "PYTHON" | "GO" | "RUBY" | "CSHARP" | "TYPESCRIPT";

export const Language = {
    Java: "JAVA",
    Python: "PYTHON",
    Go: "GO",
    Ruby: "RUBY",
    Csharp: "CSHARP",
    Typescript: "TYPESCRIPT",
    _visit: <R>(value: Language, visitor: Language.Visitor<R>) => {
        switch (value) {
            case Language.Java:
                return visitor.java();
            case Language.Python:
                return visitor.python();
            case Language.Go:
                return visitor.go();
            case Language.Ruby:
                return visitor.ruby();
            case Language.Csharp:
                return visitor.csharp();
            case Language.Typescript:
                return visitor.typescript();
            default:
                return visitor._other();
        }
    },
} as const;

export declare namespace Language {
    interface Visitor<R> {
        java: () => R;
        python: () => R;
        go: () => R;
        ruby: () => R;
        csharp: () => R;
        typescript: () => R;
        _other: () => R;
    }
}

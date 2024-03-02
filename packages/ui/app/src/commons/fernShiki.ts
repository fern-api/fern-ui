import {
    BundledLanguage,
    BundledTheme,
    getHighlighter,
    Highlighter,
    SpecialLanguage,
    ThemedTokenWithVariants,
} from "shiki/index.mjs";

let highlighter: Highlighter;
export async function getHighlighterInstance(): Promise<Highlighter> {
    if (!highlighter) {
        highlighter = await getHighlighter({
            langs: LANGUAGES,
            themes: [LIGHT_THEME, DARK_THEME],
        });
    }

    return highlighter;
}

// export function highlight(
//     highlighter: Highlighter,
//     code: string,
//     rawLang: string,
//     meta?: Record<string, unknown>,
// ): { hast: Root; language: string } {
//     const lang = parseLang(rawLang);
//     const root = highlighter.codeToHast(code, {
//         lang,
//         themes: {
//             light: LIGHT_THEME,
//             dark: DARK_THEME,
//         },
//         transformers: [transformerMetaHighlight()],
//         meta,
//     });
//     return { hast: root as Root, language: lang };
// }

interface ThemeMetadata {
    name: string;
    type: "light" | "dark";
    bg: string;
    fg: string;
}

export interface HighlightedTokens {
    code: string;
    lang: string;
    tokens: ThemedTokenWithVariants[][];
    light: ThemeMetadata;
    dark: ThemeMetadata;
}

export function highlightTokens(highlighter: Highlighter, code: string, rawLang: string): HighlightedTokens {
    code = trimCode(code);
    const lang = parseLang(rawLang);
    const tokens = highlighter.codeToTokensWithThemes(code, {
        lang,
        themes: {
            light: LIGHT_THEME,
            dark: DARK_THEME,
        },
    });
    const lightTheme = highlighter.getTheme(LIGHT_THEME);
    const darkTheme = highlighter.getTheme(DARK_THEME);
    return {
        code,
        lang,
        tokens,
        light: {
            name: lightTheme.name,
            type: "light",
            bg: lightTheme.bg,
            fg: lightTheme.fg,
        },
        dark: {
            name: darkTheme.name,
            type: "dark",
            bg: darkTheme.bg,
            fg: darkTheme.fg,
        },
    };
}

// remove leading and trailing newlines
export function trimCode(code: string): string {
    return code.replace(/^\n+|\n+$/g, "");
}

export const LIGHT_THEME: BundledTheme = "min-light";
export const DARK_THEME: BundledTheme = "material-theme-darker";
export const LANGUAGES: Array<BundledLanguage | SpecialLanguage> = [
    "bash",
    "c#",
    "csharp",
    "css",
    "docker",
    "dockerfile",
    "go",
    "java",
    "javascript",
    "js",
    "json",
    "kotlin",
    "plaintext",
    "python",
    "ruby",
    "shell",
    "text",
    "ts",
    "typescript",
    "txt",
    "xml",
    "yaml",
    "yml",
    "sql",
];

function parseLang(lang: string): BundledLanguage | SpecialLanguage {
    lang = lang.toLowerCase();
    if (LANGUAGES.includes(lang as BundledLanguage)) {
        return lang as BundledLanguage;
    }
    if (lang === "golang") {
        return "go";
    }
    if (lang === "curl") {
        return "bash";
    }
    return "txt";
}

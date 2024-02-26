import { Root } from "hast";
import { sortBy } from "lodash-es";
import { ResolvedExampleEndpointCall } from "../../util/resolver";
import { titleCase } from "../../util/titleCase";

export interface CodeExample {
    key: string;
    exampleIndex: number;
    language: string;
    name: string;
    code: string;
    hast: Root;
    install: string | null | undefined;
    exampleCall: ResolvedExampleEndpointCall;
}

export interface CodeExampleGroup {
    language: string;
    languageDisplayName: string;
    icon: string;
    examples: CodeExample[];
}

// key is the language
export function generateCodeExamples(examples: ResolvedExampleEndpointCall[]): CodeExampleGroup[] {
    const codeExamples = new Map<string, CodeExample[]>();
    examples.forEach((example, i) => {
        example.snippets.forEach((snippet, j) => {
            codeExamples.set(snippet.language, [
                ...(codeExamples.get(snippet.language) ?? []),
                {
                    key: `${snippet.language}-${i}/${j}`,
                    exampleIndex: i,
                    language: snippet.language,
                    name: snippet.name ?? example.name ?? `Example ${i + 1}`,
                    code: snippet.code,
                    hast: snippet.hast,
                    install: snippet.install,
                    exampleCall: example,
                },
            ]);
        });
    });

    // always keep curl at the top
    const curlExamples = codeExamples.get("curl");
    codeExamples.delete("curl");
    return [
        {
            language: "curl",
            languageDisplayName: "cURL",
            icon: getIconForClient("curl"),
            examples: [...(curlExamples ?? [])],
        },
        ...sortBy(
            Array.from(codeExamples.entries()).map(([language, examples]) => ({
                language,
                languageDisplayName: titleCase(language),
                icon: getIconForClient(language),
                examples,
            })),
            "language",
        ),
    ];
}

function getIconForClient(clientId: string) {
    switch (clientId) {
        case "curl":
        case "shell":
        case "bash":
            return "fa-solid fa-terminal";
        case "python":
            return "fa-brands fa-python";
        case "javascript":
        case "typescript":
            return "fa-brands fa-js";
        case "golang":
            return "fa-brands fa-go";
        case "ruby":
            return "fa-solid fa-gem";
        case "java":
        case "kotlin":
            return "fa-brands fa-java";
        case "php":
            return "fa-brands fa-php";
        default:
            return "fa-solid fa-code";
    }
}

// export interface CodeExampleClientCurl {
//     id: "curl";
//     name: string;
// }

// export interface PythonCodeExample {
//     id: "python" | "python-async";
//     name: string;
//     language: string;
//     example: string;
// }

// export interface TypescriptCodeExample {
//     id: "typescript";
//     name: string;
//     language: string;
//     example: string;
// }

// export type CodeExampleClient = CodeExampleClientCurl | PythonCodeExample | TypescriptCodeExample;

// export type CodeExampleClientId = CodeExampleClient["id"];

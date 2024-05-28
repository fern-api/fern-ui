import { testGenerateReadme } from "./testGenerateReadme";

describe("cohere-go", () => {
    testGenerateReadme({
        fixtureName: "cohere-go",
        featuresConfigFilename: "features.yml",
        readmeConfigFilename: "readme.json",
        snippetsFilename: "snippet.json",
    });
});

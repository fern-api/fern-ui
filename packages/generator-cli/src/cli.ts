import { AbsoluteFilePath, cwd, doesPathExist, resolve } from "@fern-api/fs-utils";
import fs from "fs";
import { mkdir, readFile } from "fs/promises";
import path from "path";
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";
import { loadFeaturesConfig } from "./configuration/loadFeaturesConfig";
import { loadReadmeConfig } from "./configuration/loadReadmeConfig";
import { loadSnippets } from "./configuration/loadSnippets";
import { ReadmeGenerator } from "./readme/ReadmeGenerator";
import { ReadmeParser } from "./readme/ReadmeParser";

void yargs(hideBin(process.argv))
    .scriptName(process.env.CLI_NAME ?? "generator-cli")
    .strict()
    .command(
        "generate readme",
        "Generate a README.md using the provided configuration files",
        (argv) =>
            argv
                .option("feature-config", {
                    string: true,
                    requred: true,
                })
                .option("readme-config", {
                    string: true,
                    requred: true,
                })
                .option("snippets", {
                    string: true,
                    requred: true,
                })
                .option("original-readme", {
                    string: true,
                    requred: false,
                })
                .option("output", {
                    string: true,
                    requred: false,
                }),
        async (argv) => {
            if (argv.featureConfig == null || argv.readmeConfig == null || argv.snippets == null) {
                process.stderr.write(
                    "Missing required arguments; please specify the --feature-config, --readme-config, and --snippets flags\n",
                );
                process.exit(1);
            }
            const wd = cwd();
            const readmeConfig = await loadReadmeConfig({
                absolutePathToConfig: resolve(wd, argv.readmeConfig),
            });
            const featuresConfig = await loadFeaturesConfig({
                absolutePathToConfig: resolve(wd, argv.featureConfig),
            });
            const snippets = await loadSnippets({
                absolutePathToConfig: resolve(wd, argv.snippets),
            });
            const generator = new ReadmeGenerator({
                readmeParser: new ReadmeParser(),
                readmeConfig,
                featuresConfig,
                snippets,
                originalReadme: argv.originalReadme != null ? await readFile(argv.originalReadme, "utf8") : undefined,
            });
            await generator.generateReadme({
                output: await createWriteStream(argv.output),
            });
            process.exit(0);
        },
    )
    .demandCommand()
    .showHelpOnFail(true)
    .parse();

async function createWriteStream(outputPath: string | undefined): Promise<fs.WriteStream> {
    return outputPath != null
        ? await createWriteStreamFromFile(resolve(cwd(), outputPath))
        : (process.stdout as unknown as fs.WriteStream);
}

async function createWriteStreamFromFile(filepath: AbsoluteFilePath): Promise<fs.WriteStream> {
    if (!doesPathExist(filepath)) {
        await mkdir(path.dirname(filepath), { recursive: true });
    }
    return fs.createWriteStream(filepath);
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * The configuration used to generate a .mock directory, which is
 * used to create a mock server with the `fern test` command.
 */
export interface MockConfig {
    organization: string;
    /**
     * The user's CLI version. This version is the same version
     * used in the generated `fern.config.json`.
     */
    cliVersion: string;
    /**
     * The URL used to fetch the user's Fern definition files. This
     * is used to retrieve the files copied into the generated
     * `.mock` directory.
     */
    definitionUrl: string;
}

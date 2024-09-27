/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * A yank is a metadata object that declares if a version is safe to upgrade to, if present the answer is no.
 */
export interface Yank {
    /**
     * The remediation strategy to be used when a yank is detected. If one is not specified, we'll likely go backwards by publishing time
     * to find the last unyanked version.
     */
    remediationVerision: string | undefined;
}

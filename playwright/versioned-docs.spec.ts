import { expect, test } from "@playwright/test";
import * as fs from "fs";

/**
 * This test will run on a sample of urls from customer docs using versions.
 */

const deploymentUrl = fs.readFileSync("deployment-url.txt", "utf-8").trim();

const samples = [
    "https://humanloop.com/docs/v5/getting-started/overview",
    "https://humanloop.com/docs/v5/api-reference",
    "https://primer.io/docs/api/v2.2/introduction/getting-started",
    "https://primer.io/docs/api/v2.1/api-reference/client-session-api/retrieve-client-side-token",
    "https://docs.flagright.com/guides/overview/introduction",
    "https://docs.flagright.com/framl-api/guides/overview/introduction",
    "https://docs.flagright.com/framl-api/api-reference/webhooks/user/user-state-update",
    "https://docs.flagright.com/management-api/api-reference/api-reference/get-rules",
].map((url) => ({
    preview: `${deploymentUrl}/api/fern-docs/preview?host=${encodeURIComponent(new URL(url).host)}`,
    url,
}));

samples.forEach((sample) => {
    test(`Check if ${sample.url} is online`, async ({ page }) => {
        await page.goto(sample.preview);
        const response = await page.goto(sample.url);
        expect(response?.status()).toBe(200);
    });
});

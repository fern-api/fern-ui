import { expect, test } from "@playwright/test";
import { getPlaywrightTestUrls } from "./test-runner";

const existenceUrls = getPlaywrightTestUrls("existence");
existenceUrls.forEach((testUrl) => {
    test(`Check if ${testUrl} is online`, async ({ page }) => {
        const response = await page.goto(testUrl);
        expect(response?.status()).toBe(200);
    });
});

const faviconUrls = getPlaywrightTestUrls("favicon");
faviconUrls.forEach((testUrl) => {
    test(`Check if favicon exists and URL does not return 404 for ${testUrl}`, async ({ page }) => {
        await page.goto(testUrl);

        const faviconUrl = await page.getAttribute('link[rel="icon"]', "href", {
            timeout: 5000,
        });

        expect(faviconUrl).not.toBeNull();

        if (faviconUrl) {
            const response = await page.goto(faviconUrl);
            expect(response?.status()).toBe(200);
        } else {
            throw new Error("Favicon link not found");
        }
    });
});

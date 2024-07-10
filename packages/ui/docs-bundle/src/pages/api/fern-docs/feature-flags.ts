import { FeatureFlags } from "@fern-ui/ui";
import { getAll } from "@vercel/edge-config";
import { NextRequest, NextResponse } from "next/server";
import { getXFernHostEdge } from "../../../utils/xFernHost";

export const runtime = "edge";

const FEATURE_FLAGS = [
    "api-playground-enabled" as const,
    "api-scrolling-disabled" as const,
    "whitelabeled" as const,
    "seo-disabled" as const,
    "toc-default-enabled" as const,
    "snippet-template-enabled" as const,
    "http-snippets-enabled" as const,
    "inline-feedback-enabled" as const,
    "dark-code-enabled" as const,
    "proxy-uses-app-buildwithfern" as const,
    "image-zoom-disabled" as const,
    "use-javascript-as-typescript" as const,
    "always-enable-javascript-fetch" as const,
    "scroll-in-container-enabled" as const,
];

type FeatureFlag = (typeof FEATURE_FLAGS)[number];
type EdgeConfigResponse = Record<FeatureFlag, string[]>;

export default async function handler(req: NextRequest): Promise<NextResponse<FeatureFlags>> {
    const domain = getXFernHostEdge(req);
    return NextResponse.json(await getFeatureFlags(domain));
}

export async function getFeatureFlags(domain: string): Promise<FeatureFlags> {
    try {
        const config = await getAll<EdgeConfigResponse>(FEATURE_FLAGS);

        const isApiPlaygroundEnabled = checkDomainMatchesCustomers(domain, config["api-playground-enabled"]);
        const isApiScrollingDisabled = checkDomainMatchesCustomers(domain, config["api-scrolling-disabled"]);
        const isWhitelabeled = checkDomainMatchesCustomers(domain, config.whitelabeled);
        const isSeoDisabled = checkDomainMatchesCustomers(domain, config["seo-disabled"]);
        const isTocDefaultEnabled = checkDomainMatchesCustomers(domain, config["toc-default-enabled"]);
        const isSnippetTemplatesEnabled = checkDomainMatchesCustomers(domain, config["snippet-template-enabled"]);
        const isHttpSnippetsEnabled = checkDomainMatchesCustomers(domain, config["http-snippets-enabled"]);
        const isInlineFeedbackEnabled = checkDomainMatchesCustomers(domain, config["inline-feedback-enabled"]);
        const isDarkCodeEnabled = checkDomainMatchesCustomers(domain, config["dark-code-enabled"]);
        const proxyShouldUseAppBuildwithfernCom = checkDomainMatchesCustomers(
            domain,
            config["proxy-uses-app-buildwithfern"],
        );
        const isImageZoomDisabled = checkDomainMatchesCustomers(domain, config["image-zoom-disabled"]);
        const useJavaScriptAsTypeScript = checkDomainMatchesCustomers(domain, config["use-javascript-as-typescript"]);
        const alwaysEnableJavaScriptFetch = checkDomainMatchesCustomers(
            domain,
            config["always-enable-javascript-fetch"],
        );
        const scrollInContainerEnabled = checkDomainMatchesCustomers(domain, config["scroll-in-container-enabled"]);

        return {
            isApiPlaygroundEnabled: isApiPlaygroundEnabledOverrides(domain) || isApiPlaygroundEnabled,
            isApiScrollingDisabled,
            isWhitelabeled,
            isSeoDisabled: isSeoDisabledOverrides(domain) || isSeoDisabled,
            isTocDefaultEnabled,
            isSnippetTemplatesEnabled: isSnippetTemplatesEnabled || isDevelopment(domain),
            isHttpSnippetsEnabled,
            isInlineFeedbackEnabled,
            isDarkCodeEnabled,
            proxyShouldUseAppBuildwithfernCom,
            isImageZoomDisabled,
            useJavaScriptAsTypeScript,
            alwaysEnableJavaScriptFetch,
            scrollInContainerEnabled,
        };
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        return {
            isApiPlaygroundEnabled: isApiPlaygroundEnabledOverrides(domain),
            isApiScrollingDisabled: false,
            isWhitelabeled: false,
            isSeoDisabled: isSeoDisabledOverrides(domain),
            isTocDefaultEnabled: false,
            isSnippetTemplatesEnabled: isDevelopment(domain),
            isHttpSnippetsEnabled: false,
            isInlineFeedbackEnabled: isFern(domain),
            isDarkCodeEnabled: false,
            proxyShouldUseAppBuildwithfernCom: false,
            isImageZoomDisabled: false,
            useJavaScriptAsTypeScript: false,
            alwaysEnableJavaScriptFetch: false,
            scrollInContainerEnabled: false,
        };
    }
}

function checkDomainMatchesCustomers(domain: string, customers: readonly string[]): boolean {
    return customers.some((customer) => domain.toLowerCase().includes(customer.toLowerCase()));
}

function isApiPlaygroundEnabledOverrides(domain: string): boolean {
    if (
        ["docs.buildwithfern.com", "fern.docs.buildwithfern.com", "fern.docs.dev.buildwithfern.com"].some(
            (d) => d === domain,
        )
    ) {
        return true;
    }

    if (process.env.NODE_ENV !== "production") {
        return true;
    }
    return false;
}

function isSeoDisabledOverrides(domain: string): boolean {
    if (domain.includes(".docs.staging.buildwithfern.com")) {
        return true;
    }
    return isDevelopment(domain);
}

function isDevelopment(domain: string): boolean {
    if (domain.includes(".docs.dev.buildwithfern.com") || domain.includes(".docs.staging.buildwithfern.com")) {
        return true;
    }

    if (process.env.NODE_ENV !== "production") {
        return true;
    }
    return false;
}

function isFern(domain: string): boolean {
    if (
        ["docs.buildwithfern.com", "fern.docs.buildwithfern.com", "fern.docs.dev.buildwithfern.com"].some(
            (d) => d === domain,
        )
    ) {
        return true;
    }

    return false;
}

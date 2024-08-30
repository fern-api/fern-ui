/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../../index";

export interface AnalyticsConfig {
    segment?: FernRegistry.docs.v1.commons.SegmentConfig;
    fullstory?: FernRegistry.docs.v1.commons.FullStoryAnalyticsConfig;
    intercom?: FernRegistry.docs.v1.commons.IntercomConfig;
    posthog?: FernRegistry.docs.v1.commons.PostHogConfig;
    gtm?: FernRegistry.docs.v1.commons.GtmConfig;
    ga4?: FernRegistry.docs.v1.commons.GoogleAnalytics4Config;
    amplitude?: FernRegistry.docs.v1.commons.AmplitudeConfig;
    mixpanel?: FernRegistry.docs.v1.commons.MixpanelConfig;
    hotjar?: FernRegistry.docs.v1.commons.HotJarConfig;
    koala?: FernRegistry.docs.v1.commons.KoalaConfig;
    logrocket?: FernRegistry.docs.v1.commons.LogRocketConfig;
    pirsch?: FernRegistry.docs.v1.commons.PirschConfig;
    plausible?: FernRegistry.docs.v1.commons.PlausibleConfig;
    fathom?: FernRegistry.docs.v1.commons.FathomConfig;
    clearbit?: FernRegistry.docs.v1.commons.ClearBitConfig;
    heap?: FernRegistry.docs.v1.commons.HeapConfig;
}

export interface FeatureFlags {
    isApiPlaygroundEnabled: boolean;
    isApiScrollingDisabled: boolean;
    isWhitelabeled: boolean;
    isSeoDisabled: boolean;
    isTocDefaultEnabled: boolean;
    isSnippetTemplatesEnabled: boolean;
    isHttpSnippetsEnabled: boolean;
    isInlineFeedbackEnabled: boolean;
    isDarkCodeEnabled: boolean;
    proxyShouldUseAppBuildwithfernCom: boolean;
    isImageZoomDisabled: boolean;
    useJavaScriptAsTypeScript: boolean;
    alwaysEnableJavaScriptFetch: boolean;
    scrollInContainerEnabled: boolean;
    useMdxBundler: boolean;
}

export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
    isApiPlaygroundEnabled: false,
    isApiScrollingDisabled: false,
    isWhitelabeled: false,
    isSeoDisabled: false,
    isTocDefaultEnabled: false,
    isSnippetTemplatesEnabled: false,
    isHttpSnippetsEnabled: false,
    isInlineFeedbackEnabled: false,
    isDarkCodeEnabled: false,
    proxyShouldUseAppBuildwithfernCom: false,
    isImageZoomDisabled: false,
    useJavaScriptAsTypeScript: false,
    alwaysEnableJavaScriptFetch: false,
    scrollInContainerEnabled: false,
    useMdxBundler: false,
};

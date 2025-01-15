import { FernNavigation } from "@fern-api/fdr-sdk";
import { getLaunchDarklySettings } from "@fern-docs/edge-config";
import * as ld from "@launchdarkly/node-server-sdk";
import { isEqual } from "es-toolkit/predicate";
import { camelCase } from "es-toolkit/string";
import { AuthState } from "./auth/getAuthState";

async function withLaunchDarklyContext(
  endpoint: string,
  authState: AuthState,
  node: FernNavigation.utils.Node,
  rawCookie: string | undefined
): Promise<ld.LDContext> {
  try {
    const url = new URL(endpoint);
    url.searchParams.set("anonymous", String(!authState.authed));
    if (node.type === "found") {
      if (node.currentVersion) {
        url.searchParams.set("version", node.currentVersion.versionId);
      }
    }

    const headers = new Headers();

    // TODO: this forwards the cookie to an adapter that should generate a LaunchDarkly context
    // if we migrate from edge config to docs.yml, we need to maintain an strict allowlist
    if (rawCookie != null) {
      headers.set("Cookie", rawCookie);
    }

    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch LaunchDarkly context: ${response.statusText}`
      );
    }
    const context = await response.json();

    return context;
  } catch (error) {
    console.error(error);
    return { kind: "user", key: "anonymous", anonymous: true };
  }
}

interface LaunchDarklyInfo {
  clientSideId: string;
  contextEndpoint: string;
  context: ld.LDContext | undefined;
  defaultFlags: Record<string, unknown> | undefined;
}

export async function withLaunchDarkly(
  domain: string,
  authState: AuthState,
  node: FernNavigation.utils.Node,
  rawCookie: string | undefined
): Promise<
  [
    LaunchDarklyInfo | undefined,
    (node: FernNavigation.WithFeatureFlags) => boolean,
  ]
> {
  const launchDarklyConfig = await getLaunchDarklySettings(domain);
  if (launchDarklyConfig) {
    const context = await withLaunchDarklyContext(
      launchDarklyConfig["context-endpoint"],
      authState,
      node,
      rawCookie
    );
    const defaultFlags = launchDarklyConfig["sdk-key"]
      ? await fetchInitialFlags(launchDarklyConfig["sdk-key"], context)
      : undefined;
    return [
      {
        clientSideId: launchDarklyConfig["client-side-id"],
        contextEndpoint: launchDarklyConfig["context-endpoint"],
        context,
        defaultFlags,
      },
      // Note: if sdk-key is set, then middleware will automatically switch to 100% getServerSideProps
      // because getServerSideProps must determine whether any given page should be rendered or not.
      launchDarklyConfig["sdk-key"]
        ? await createLdPredicate({ flags: defaultFlags })
        : createDefaultFeatureFlagPredicate(),
    ];
  }
  return [undefined, createDefaultFeatureFlagPredicate()];
}

function createDefaultFeatureFlagPredicate(): (
  node: FernNavigation.WithFeatureFlags
) => boolean {
  return (node) =>
    node.featureFlags == null ||
    node.featureFlags.length === 0 ||
    node.featureFlags.some((flag) => {
      const fallbackValue = flag.fallbackValue ?? false;
      const match = flag.match ?? true;
      return isEqual(fallbackValue, match);
    });
}

export const createLdPredicate = async ({
  flags = {},
}: {
  flags?: Record<string, unknown>;
}): Promise<(node: FernNavigation.WithFeatureFlags) => boolean> => {
  return (node) => {
    if (node.featureFlags == null || node.featureFlags.length === 0) {
      return true;
    }
    return node.featureFlags.some((flag) => {
      const key = camelCase(flag.flag);
      const flagValue = flags[key] ?? flag.fallbackValue ?? false;
      const match = flag.match ?? true;
      return isEqual(flagValue, match);
    });
  };
};

function fetchInitialFlags(
  sdkKey: string,
  context: ld.LDContext
): Promise<Record<string, unknown>> | undefined {
  try {
    const ldClient = ld.init(sdkKey);
    return ldClient.allFlagsState(context).then((flags) => flags.allValues());
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

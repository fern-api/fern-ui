import dynamic from "next/dynamic";
import { FernErrorBoundary } from "../../../components/FernErrorBoundary";
import type { FeatureProps } from "../../../feature-flags/types";

// note: this is a dynamic import because we don't want to load the LD Feature component on every page load
const LDFeature = dynamic(
  () => import("../../../feature-flags/LDFeature").then((mod) => mod.LDFeature),
  // however, we do need the default evaluation to be SSR'd
  { ssr: true }
);

// TODO: This becomes an indirection point where we can use different feature flag implementations
// with different providers depending on config
export const Feature = <T,>(props: FeatureProps<T>): React.ReactNode => (
  <FernErrorBoundary>
    <LDFeature {...props} />
  </FernErrorBoundary>
);

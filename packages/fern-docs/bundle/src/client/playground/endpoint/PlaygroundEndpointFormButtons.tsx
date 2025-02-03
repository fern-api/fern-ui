import * as FernNavigation from "@fern-api/fdr-sdk/navigation";
import { FernButton, FernButtonGroup } from "@fern-docs/components";
import { useAtomValue } from "jotai";
import { ArrowUpRight } from "lucide-react";
import { ReactElement } from "react";
import { FernLink } from "../../../components/link";
import { CURRENT_NODE_ATOM, useClosePlayground } from "../../atoms";

const USE_EXAMPLE_TEXT = "Use example";
const CLEAR_FORM_TEXT = "Clear form";

interface PlaygroundEndpointFormButtonsProps {
  node: FernNavigation.EndpointNode;
  resetWithExample: () => void;
  resetWithoutExample: () => void;
}

export function PlaygroundEndpointFormButtons({
  node,
  resetWithExample,
  resetWithoutExample,
}: PlaygroundEndpointFormButtonsProps): ReactElement {
  const activeNavigatable = useAtomValue(CURRENT_NODE_ATOM);
  const apiReferenceId =
    FernNavigation.utils.getApiReferenceId(activeNavigatable);
  const closePlayground = useClosePlayground();
  return (
    <div className="flex items-center justify-between">
      <FernButtonGroup>
        <FernButton onClick={resetWithExample} size="small" variant="minimal">
          {USE_EXAMPLE_TEXT}
        </FernButton>
        <FernButton
          onClick={resetWithoutExample}
          size="small"
          variant="minimal"
        >
          {CLEAR_FORM_TEXT}
        </FernButton>
      </FernButtonGroup>

      <FernLink
        href={`/${node.slug}`}
        shallow={apiReferenceId === node.apiDefinitionId}
        className="t-muted hover:t-accent inline-flex items-center gap-1 text-sm font-semibold underline decoration-1 underline-offset-4 hover:decoration-2"
        onClick={closePlayground}
      >
        <span>View in API Reference</span>
        <ArrowUpRight className="size-icon" />
      </FernLink>
    </div>
  );
}

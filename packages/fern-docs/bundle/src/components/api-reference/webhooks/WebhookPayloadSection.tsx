import * as ApiDefinition from "@fern-api/fdr-sdk/api-definition";
import * as FernNavigation from "@fern-api/fdr-sdk/navigation";
import { renderTypeShorthand } from "../../type-shorthand";
import { TypeReferenceDefinitions } from "../types/type-reference/TypeReferenceDefinitions";

export declare namespace WebhookPayloadSection {
  export interface Props {
    payload: ApiDefinition.WebhookPayload;
    anchorIdParts: readonly string[];
    slug: FernNavigation.Slug;
    types: Record<string, ApiDefinition.TypeDefinition>;
  }
}

export const WebhookPayloadSection: React.FC<WebhookPayloadSection.Props> = ({
  payload,
  anchorIdParts,
  slug,
  types,
}) => {
  return (
    <div className="flex flex-col">
      <div className="t-muted border-default border-b pb-5 text-sm leading-6">
        {`The payload of this webhook request is ${renderTypeShorthand(payload.shape, { withArticle: true }, types)}.`}
      </div>
      <TypeReferenceDefinitions
        shape={payload.shape}
        isCollapsible={false}
        anchorIdParts={anchorIdParts}
        applyErrorStyles={false}
        slug={slug}
        types={types}
      />
    </div>
  );
};

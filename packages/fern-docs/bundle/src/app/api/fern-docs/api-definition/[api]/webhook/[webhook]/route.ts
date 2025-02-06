import { serializeMdx } from "@/components/mdx/bundlers/mdx-bundler";
import { createGetAuthStateEdge } from "@/server/auth/getAuthStateEdge";
import * as ApiDefinition from "@fern-api/fdr-sdk/api-definition";
import { ApiDefinitionLoader } from "@fern-docs/cache";
import { getEdgeFlags } from "@fern-docs/edge-config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { api: string; webhook: string } }
): Promise<NextResponse> {
  const { api, webhook } = params;

  const { getAuthState, domain } = await createGetAuthStateEdge(req);
  const [authState, flags] = await Promise.all([
    getAuthState(),
    getEdgeFlags(domain),
  ]);

  if (!authState.ok) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: authState.authed ? 403 : 401 }
    );
  }

  const apiDefinition = await ApiDefinitionLoader.create(
    domain,
    ApiDefinition.ApiDefinitionId(api)
  )
    .withEdgeFlags(flags)
    .withMdxBundler(serializeMdx, "mdx-bundler")
    .withPrune({
      type: "webhook",
      webhookId: ApiDefinition.WebhookId(webhook),
    })
    .withResolveDescriptions()
    .withEnvironment(process.env.NEXT_PUBLIC_FDR_ORIGIN)
    .load();

  if (!apiDefinition) {
    return NextResponse.json(
      { error: "API Definition not found" },
      { status: 404 }
    );
  }

  const response = NextResponse.json(apiDefinition, { status: 200 });
  response.headers.set(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400"
  );

  return response;
}

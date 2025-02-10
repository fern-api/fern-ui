import { COOKIE_FERN_TOKEN } from "@fern-docs/utils";
import { cookies } from "next/headers";
import { Metadata } from "next/types";
import Page, { generateMetadata as _generateMetadata } from "../../_page";

export default async function StaticPage(props: {
  params: Promise<{ slug?: string[]; domain: string }>;
}) {
  const params = await props.params;
  const fern_token = (await cookies()).get(COOKIE_FERN_TOKEN)?.value;
  return <Page params={params} fern_token={fern_token} />;
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[]; domain: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const fern_token = (await cookies()).get(COOKIE_FERN_TOKEN)?.value;
  return _generateMetadata({ params, fern_token });
}

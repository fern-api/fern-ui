import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fas as fasPro } from "@fortawesome/pro-solid-svg-icons";
import { NextRequest, NextResponse } from "next/server";
import { svgResponse } from "../../../svgResponse";

const prefix = "fas";
library.add(fas, fasPro);

export const runtime = "edge";

export async function GET(_req: NextRequest, { params }: { params: { icon: string } }): Promise<NextResponse> {
    return svgResponse(prefix, params.icon);
}

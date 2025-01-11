import urljoin from "url-join";
import { ProxyRequest } from "../types";
import { PlaygroundResponse } from "../types/playgroundResponse";
import { toBodyInit } from "./requestToBodyInit";

const PROXY_URL = "https://proxy.ferndocs.com/";

export async function executeProxyRest(
  req: ProxyRequest
): Promise<PlaygroundResponse> {
  const requestHeaders = { ...req.headers };
  requestHeaders["X-Fern-Proxy-Request-Headers"] = Object.keys(
    req.headers
  ).join(",");

  const res = await fetch(urljoin(PROXY_URL, req.url), {
    method: req.method,
    headers: requestHeaders,
    body: await toBodyInit(req.body),
    mode: "cors",
  });

  const responseHeadersList = (
    res.headers.get("X-Fern-Proxy-Response-Headers") ?? ""
  ).split(",");

  const responseHeaders: Record<string, string> = {};
  responseHeadersList.forEach((header) => {
    if (header) {
      const value = res.headers.get(header);
      if (value != null) {
        responseHeaders[header] = value;
      }
    }
  });

  if (
    res.headers.get("Content-Type")?.toLowerCase()?.includes("application/json")
  ) {
    const startTime = Date.now();
    const json = await res.json();
    const endTime = Date.now();

    const fallbackTime =
      Number(res.headers.get("X-Fern-Proxy-Origin-Latency") ?? 0) +
      endTime -
      startTime;

    return {
      type: "json",
      response: {
        headers: responseHeaders,
        ok: res.ok,
        redirected: res.redirected,
        status: res.status,
        statusText: res.statusText,
        type: res.type,
        url: res.url,
        body: json,
      },
      contentType: res.headers.get("Content-Type") ?? "application/json",
      time: Number(
        res.headers.get("X-Fern-Proxy-Response-Time") ?? fallbackTime
      ),
      size:
        res.headers.get("Content-Length") ??
        String(new TextEncoder().encode(JSON.stringify(json)).length),
    };
  }

  const startTime = Date.now();
  const blob = await res.blob();
  const endTime = Date.now();

  const fallbackTime =
    Number(res.headers.get("X-Fern-Proxy-Origin-Latency") ?? 0) +
    endTime -
    startTime;

  return {
    type: "file",
    response: {
      headers: responseHeaders,
      ok: res.ok,
      redirected: res.redirected,
      status: res.status,
      statusText: res.statusText,
      type: res.type,
      url: res.url,
      body: URL.createObjectURL(blob),
    },
    contentType: res.headers.get("Content-Type") ?? "application/octet-stream",
    time: Number(res.headers.get("X-Fern-Proxy-Response-Time") ?? fallbackTime),
    size: res.headers.get("Content-Length") ?? String(blob.size),
  };
}

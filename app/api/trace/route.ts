import { NextResponse } from "next/server";

export const runtime = "nodejs";

const WINDOW_MS = 30_000;
const recent = new Map<string, number>();

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  const key = clientKey(request);
  const now = Date.now();
  const previous = recent.get(key) || 0;

  if (now - previous < WINDOW_MS) {
    return NextResponse.json(
      { delivered: false, reason: "rate_limited" },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { delivered: false, reason: "invalid_json" },
      { status: 400 },
    );
  }

  const data = body as {
    name?: unknown;
    response?: unknown;
    link?: unknown;
    website?: unknown;
  };

  // Honeypot: bots often fill hidden fields.
  if (typeof data.website === "string" && data.website.trim()) {
    return NextResponse.json({ delivered: true });
  }

  const name =
    typeof data.name === "string" ? data.name.trim().slice(0, 120) : "";
  const response =
    typeof data.response === "string" ? data.response.trim().slice(0, 3000) : "";
  const link =
    typeof data.link === "string" ? data.link.trim().slice(0, 500) : "";

  if (!response) {
    return NextResponse.json(
      { delivered: false, reason: "response_required" },
      { status: 400 },
    );
  }

  recent.set(key, now);

  const webhook = process.env.TRACE_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      {
        delivered: false,
        reason: "delivery_not_configured",
        fallback: "clipboard",
      },
      { status: 202 },
    );
  }

  try {
    const webhookResponse = await fetch(webhook, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.TRACE_WEBHOOK_BEARER
          ? { authorization: `Bearer ${process.env.TRACE_WEBHOOK_BEARER}` }
          : {}),
      },
      body: JSON.stringify({
        type: "portfolio_trace",
        name: name || "Anonymous",
        response,
        link: link || null,
        sentAt: new Date().toISOString(),
      }),
      cache: "no-store",
    });

    if (!webhookResponse.ok) {
      return NextResponse.json(
        {
          delivered: false,
          reason: "delivery_failed",
          fallback: "clipboard",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ delivered: true });
  } catch {
    return NextResponse.json(
      {
        delivered: false,
        reason: "delivery_failed",
        fallback: "clipboard",
      },
      { status: 502 },
    );
  }
}

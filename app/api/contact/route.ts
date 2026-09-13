import { NextResponse } from "next/server";
import {
  cleanText,
  getClientAddress,
  insertRow,
  rateLimit,
  validEmail,
  verifyTurnstile,
} from "@/lib/submission-backend";

const allowedTypes = new Set(["question", "collaboration", "project", "other"]);

export async function POST(request: Request) {
  const ip = getClientAddress(request);
  const limit = rateLimit(`contact:${ip}`);

  if (!limit.ok) {
    return NextResponse.json(
      { error: `Too many messages. Try again in ${limit.retryAfter}s.` },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (cleanText(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = cleanText(body.name, 80);
  const email = cleanText(body.email, 180).toLowerCase();
  const type = cleanText(body.type, 40);
  const message = cleanText(body.message, 3000);

  if (name.length < 2 || !validEmail(email) || !allowedTypes.has(type) || message.length < 10) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const turnstileOk = await verifyTurnstile(body.turnstileToken, ip);
  if (!turnstileOk) {
    return NextResponse.json({ error: "Verification failed. Please refresh and try again." }, { status: 403 });
  }

  try {
    await insertRow("contact_queries", {
      name,
      email,
      type,
      message,
      status: "new",
      source: "portfolio",
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not store the message.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}

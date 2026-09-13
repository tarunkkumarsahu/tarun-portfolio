import { NextResponse } from "next/server";
import {
  cleanText,
  cleanUrl,
  getClientAddress,
  insertRow,
  rateLimit,
  validEmail,
  verifyTurnstile,
} from "@/lib/submission-backend";

export async function POST(request: Request) {
  const ip = getClientAddress(request);
  const limit = rateLimit(`share:${ip}`);

  if (!limit.ok) {
    return NextResponse.json(
      { error: `Too many submissions. Try again in ${limit.retryAfter}s.` },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (cleanText(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = cleanText(body.name, 80);
  const email = cleanText(body.email, 180).toLowerCase();
  const title = cleanText(body.title, 120);
  const category = cleanText(body.category, 80);
  const description = cleanText(body.description, 3500);
  const whyShare = cleanText(body.whyShare, 1800);
  const projectUrl = cleanUrl(body.projectUrl);
  const githubUrl = cleanUrl(body.githubUrl);

  if (
    name.length < 2 ||
    !validEmail(email) ||
    title.length < 2 ||
    category.length < 2 ||
    description.length < 20 ||
    whyShare.length < 10
  ) {
    return NextResponse.json({ error: "Please check the submission and try again." }, { status: 400 });
  }

  const turnstileOk = await verifyTurnstile(body.turnstileToken, ip);
  if (!turnstileOk) {
    return NextResponse.json({ error: "Verification failed. Please refresh and try again." }, { status: 403 });
  }

  try {
    await insertRow("work_submissions", {
      name,
      email,
      title,
      category,
      description,
      why_share: whyShare,
      project_url: projectUrl,
      github_url: githubUrl,
      status: "pending",
      source: "portfolio",
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not store the submission.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}

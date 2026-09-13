type JsonRecord = Record<string, unknown>;

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 6;
const buckets = new Map<string, { count: number; resetAt: number }>();

export function getClientAddress(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export function rateLimit(key: string) {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, retryAfter: 0 };
  }

  if (existing.count >= MAX_REQUESTS) {
    return { ok: false, retryAfter: Math.ceil((existing.resetAt - now) / 1000) };
  }

  existing.count += 1;
  return { ok: true, retryAfter: 0 };
}

export function cleanText(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\u0000/g, "").trim().slice(0, max);
}

export function cleanUrl(value: unknown) {
  const text = cleanText(value, 500);
  if (!text) return null;
  try {
    const url = new URL(text);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function verifyTurnstile(token: unknown, remoteip?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return process.env.NODE_ENV !== "production";
  }

  if (typeof token !== "string" || !token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (remoteip && remoteip !== "unknown") body.set("remoteip", remoteip);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
    cache: "no-store",
  });

  if (!response.ok) return false;
  const result = await response.json() as { success?: boolean };
  return result.success === true;
}

export async function insertRow(table: string, row: JsonRecord) {
  const baseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!baseUrl || !serviceKey) {
    throw new Error("Submission backend is not configured yet.");
  }

  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error(`Supabase insert failed for ${table}:`, response.status, detail);
    throw new Error("The control desk could not store this submission.");
  }
}

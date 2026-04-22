/**
 * Simple sliding-window limiter (per Node instance).
 * On serverless with many instances, use Redis/Upstash for shared limits.
 */

type Bucket = { hits: number[] };

const buckets = new Map<string, Bucket>();

function prune(bucket: Bucket, windowMs: number, now: number) {
  bucket.hits = bucket.hits.filter((t) => now - t < windowMs);
}

export function checkReframeRateLimit(
  key: string,
  max: number,
  windowMs: number,
): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now();
  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { hits: [] };
    buckets.set(key, bucket);
  }
  prune(bucket, windowMs, now);
  if (bucket.hits.length >= max) {
    const oldest = bucket.hits[0] ?? now;
    const retryAfterMs = windowMs - (now - oldest);
    return { ok: false, retryAfterSec: Math.max(1, Math.ceil(retryAfterMs / 1000)) };
  }
  bucket.hits.push(now);
  return { ok: true };
}

export function clientIpFromRequest(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}

import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { getCharacter, isCharacterId } from "@/lib/characters";
import { parseReframeJson } from "@/lib/parse-reframe-json";
import { buildReframeSystemPrompt } from "@/lib/reframe-system-prompt";
import { checkReframeRateLimit, clientIpFromRequest } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_MESSAGE_CHARS = 8000;

function parseIntEnv(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const message =
    typeof body === "object" && body !== null && "message" in body
      ? (body as { message?: unknown }).message
      : undefined;
  const characterIdRaw =
    typeof body === "object" && body !== null && "characterId" in body
      ? (body as { characterId?: unknown }).characterId
      : undefined;

  if (typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  if (message.length > MAX_MESSAGE_CHARS) {
    return NextResponse.json(
      { error: `message too long (max ${MAX_MESSAGE_CHARS} characters)` },
      { status: 400 },
    );
  }

  const ip = clientIpFromRequest(req);
  const maxHits = parseIntEnv("REFRAME_RATE_LIMIT_MAX", 12);
  const windowMs = parseIntEnv("REFRAME_RATE_LIMIT_WINDOW_MS", 60_000);
  const limited = checkReframeRateLimit(`reframe:${ip}`, maxHits, windowMs);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } },
    );
  }

  if (!isCharacterId(characterIdRaw)) {
    return NextResponse.json(
      { error: "characterId is required — pick a coach from the app." },
      { status: 400 },
    );
  }

  const character = getCharacter(characterIdRaw);
  if (!character) {
    return NextResponse.json({ error: "Unknown character" }, { status: 400 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server missing GROQ_API_KEY. Add it to .env.local (never commit secrets)." },
      { status: 500 },
    );
  }

  const model = process.env.GROQ_MODEL?.trim() || "llama-3.3-70b-versatile";
  const groq = new Groq({ apiKey });

  const system = buildReframeSystemPrompt();
  const userContent = `CHARACTER COACH (use this voice for howItMayLand + validationSummary; use persona only for reframedMessage tone):
- id: ${character.id}
- display name: ${character.name}
- tagline: ${character.tagline}
- inner tone for the final sendable message: ${character.persona}

USER DRAFT (blunt / logical / flat — help them):
"""
${message.trim()}
"""`;

  try {
    const completion = await groq.chat.completions.create({
      model,
      temperature: 0.7,
      max_tokens: 1200,
      messages: [
        { role: "system", content: system },
        { role: "user", content: userContent },
      ],
    });

    const raw = completion.choices[0]?.message?.content?.trim();
    if (!raw) {
      return NextResponse.json({ error: "Empty model response" }, { status: 502 });
    }

    const parsed = parseReframeJson(raw);
    if (!parsed) {
      return NextResponse.json(
        { error: "Model returned unreadable JSON. Try again or switch GROQ_MODEL." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      characterId: character.id,
      characterName: character.name,
      howItMayLand: parsed.howItMayLand,
      validationSummary: parsed.validationSummary,
      reframedMessage: parsed.reframedMessage,
      model,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Groq request failed";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}

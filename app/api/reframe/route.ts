import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { buildReframeSystemPrompt } from "@/lib/reframe-system-prompt";

export const runtime = "nodejs";

const PERSONAS = [
  "Standard",
  "Comic Relief",
  "Mildly Spicy",
  "Blunt-But-Kind",
  "Fabio Heartthrob",
] as const;

type Persona = (typeof PERSONAS)[number];

function isPersona(value: unknown): value is Persona {
  return typeof value === "string" && (PERSONAS as readonly string[]).includes(value);
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
  const personaRaw =
    typeof body === "object" && body !== null && "persona" in body
      ? (body as { persona?: unknown }).persona
      : undefined;

  if (typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  if (!isPersona(personaRaw)) {
    return NextResponse.json(
      {
        error: "persona must be one of: " + PERSONAS.join(", "),
      },
      { status: 400 },
    );
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
  const userContent = `Selected persona: ${personaRaw}

User's blunt or logical message to reframe:
"""
${message.trim()}
"""`;

  try {
    const completion = await groq.chat.completions.create({
      model,
      temperature: 0.7,
      max_tokens: 1024,
      messages: [
        { role: "system", content: system },
        { role: "user", content: userContent },
      ],
    });

    const text = completion.choices[0]?.message?.content?.trim();
    if (!text) {
      return NextResponse.json({ error: "Empty model response" }, { status: 502 });
    }

    return NextResponse.json({ text, model });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Groq request failed";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}

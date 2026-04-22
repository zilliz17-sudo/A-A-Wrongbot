"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Character } from "@/lib/characters";
import type { ReframePayload } from "@/lib/parse-reframe-json";

type Props = {
  character: Character;
  payload: ReframePayload;
  onCopy: (text: string) => void | Promise<void>;
};

export function CharacterStage({ character, payload, onCopy }: Props) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    if (copyState === "idle") return;
    const t = window.setTimeout(() => setCopyState("idle"), 2200);
    return () => window.clearTimeout(t);
  }, [copyState]);

  async function handleCopy() {
    try {
      await onCopy(payload.reframedMessage);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div
        className={[
          "relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br p-8 shadow-xl",
          character.stageFrom,
          character.stageTo,
        ].join(" ")}
      >
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-8">
          <div className="flex h-28 w-28 shrink-0 animate-character-bob items-center justify-center rounded-full border-4 border-white/70 bg-white/40 text-6xl shadow-inner">
            <span aria-hidden>{character.emoji}</span>
          </div>
          <div className="min-w-0 flex-1 space-y-1 text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-rose-900/60">
              You&apos;re with
            </p>
            <h2 className="text-2xl font-extrabold text-rose-950">{character.name}</h2>
            <p className="text-sm text-rose-900/80">{character.tagline}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <SpeechBubble title="How this might land" className={character.bubble}>
          {payload.howItMayLand || "—"}
        </SpeechBubble>
        <SpeechBubble title="What I get about you" className={character.bubble}>
          {payload.validationSummary || "—"}
        </SpeechBubble>
        <SpeechBubble title="Try sending this" className={character.bubble} emphasize>
          <p className="whitespace-pre-wrap">{payload.reframedMessage}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => void handleCopy()}
              className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-rose-700"
            >
              Copy message
            </button>
            <span
              className="text-sm font-medium text-rose-800"
              role="status"
              aria-live="polite"
            >
              {copyState === "copied"
                ? "Copied to clipboard."
                : copyState === "error"
                  ? "Could not copy — select the text manually."
                  : ""}
            </span>
          </div>
        </SpeechBubble>
      </div>
    </div>
  );
}

function SpeechBubble({
  title,
  children,
  className,
  emphasize,
}: {
  title: string;
  children: ReactNode;
  className: string;
  emphasize?: boolean;
}) {
  return (
    <section
      className={[
        "rounded-2xl border-2 p-4 shadow-md backdrop-blur-sm",
        className,
        emphasize ? "ring-1 ring-rose-300/40" : "",
      ].join(" ")}
    >
      <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-rose-800/70">{title}</h3>
      <div className={`text-sm leading-relaxed text-rose-950 ${emphasize ? "text-base" : ""}`}>
        {children}
      </div>
    </section>
  );
}

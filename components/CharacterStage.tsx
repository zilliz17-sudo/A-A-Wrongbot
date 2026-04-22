"use client";

import type { ReactNode } from "react";
import type { Character } from "@/lib/characters";
import type { ReframePayload } from "@/lib/parse-reframe-json";

type Props = {
  character: Character;
  payload: ReframePayload;
  onCopy: (text: string) => void;
};

export function CharacterStage({ character, payload, onCopy }: Props) {
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
          <button
            type="button"
            onClick={() => onCopy(payload.reframedMessage)}
            className="mt-3 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-rose-700"
          >
            Copy message
          </button>
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

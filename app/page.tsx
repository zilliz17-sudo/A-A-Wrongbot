"use client";

import { useState } from "react";
import { CharacterPicker } from "@/components/CharacterPicker";
import { CharacterStage } from "@/components/CharacterStage";
import { CHARACTERS, type CharacterId, getCharacter } from "@/lib/characters";
import type { ReframePayload } from "@/lib/parse-reframe-json";

type ApiOk = ReframePayload & {
  characterId: CharacterId;
  characterName: string;
  model: string;
};

export default function Home() {
  const [message, setMessage] = useState("");
  const [characterId, setCharacterId] = useState<CharacterId>(CHARACTERS[0].id);
  const [result, setResult] = useState<ApiOk | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function reframe() {
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/reframe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, characterId }),
      });
      const data = (await res.json()) as Partial<ApiOk> & { error?: string; debug?: string };
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }
      if (
        typeof data.reframedMessage !== "string" ||
        typeof data.characterId !== "string" ||
        typeof data.characterName !== "string" ||
        typeof data.model !== "string"
      ) {
        setError("Unexpected response from server");
        return;
      }
      setResult({
        characterId: data.characterId,
        characterName: data.characterName,
        howItMayLand: typeof data.howItMayLand === "string" ? data.howItMayLand : "",
        validationSummary:
          typeof data.validationSummary === "string" ? data.validationSummary : "",
        reframedMessage: data.reframedMessage,
        model: data.model,
      });
    } catch {
      setError("Network error — try again.");
    } finally {
      setLoading(false);
    }
  }

  const coach = result ? getCharacter(result.characterId) : getCharacter(characterId);
  const displayCharacter = coach ?? CHARACTERS[0];

  function copyText(text: string) {
    void navigator.clipboard.writeText(text);
  }

  return (
    <div className="relative min-h-full overflow-hidden bg-[radial-gradient(1200px_circle_at_20%_-10%,#ffe4e6,transparent),radial-gradient(900px_circle_at_90%_20%,#e0f2fe,transparent),linear-gradient(180deg,#fff1f2,#fdf2f8_40%,#ffffff)]">
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2740%27%20height=%2740%27%20viewBox=%270%200%2040%2040%27%3E%3Cg%20fill=%27none%27%20fill-rule=%27evenodd%27%3E%3Cg%20fill=%27%23fda4af%27%20fill-opacity=%270.12%27%3E%3Cpath%20d=%27M0%2038.59l2.83-2.83%201.41%201.41L1.41%2040H0v-1.41zM0%201.4l2.83%202.83%201.41-1.41L1.41%200H0v1.41zM38.59%2040l-2.83-2.83%201.41-1.41L40%2038.59V40h-1.41zM40%201.41l-2.83%202.83-1.41-1.41L38.59%200H40v1.41zM20%2018.6l2.83-2.83%201.41%201.41L21.41%2020H20v-1.41zM20%2021.4l2.83%202.83-1.41%201.41L20%2022.59V21.4zm9.9-1.4l2.83-2.83%201.41%201.41L30.41%2020H29v-1.41zm-19.8%200l-2.83-2.83-1.41%201.41L9.59%2020H11v-1.41zM20%209.6l2.83-2.83%201.41%201.41L21.41%2011H20V9.6zm0%2010.8l2.83%202.83-1.41%201.41L20%2029v-1.41z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60" />

      <main className="relative z-10 mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-12 sm:py-16">
        <header className="space-y-3 text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">
            Pick a face. Get the grace.
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-rose-950 sm:text-5xl">
            A-A-Wrongbot
          </h1>
          <p className="text-lg leading-relaxed text-rose-900/80">
            Choose who talks you through it. They&apos;ll show how your words might land, then hand
            you something kinder to send — without erasing what you meant.
          </p>
        </header>

        <section className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl shadow-rose-200/40 backdrop-blur-md sm:p-8">
          <div className="flex flex-col gap-8">
            <CharacterPicker value={characterId} onChange={setCharacterId} disabled={loading} />

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-rose-900/80">What you want to say</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={loading}
                rows={5}
                placeholder={`e.g. "You're overreacting — none of this is a big deal."`}
                className="w-full resize-y rounded-2xl border border-rose-100 bg-white/90 px-4 py-3 text-rose-950 shadow-inner outline-none ring-rose-300/40 placeholder:text-rose-300 focus:ring-2"
              />
            </label>

            <button
              type="button"
              onClick={reframe}
              disabled={loading || !message.trim()}
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-rose-500 to-fuchsia-500 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-rose-300/50 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? `${displayCharacter.name} is thinking…` : `Ask ${displayCharacter.name}`}
            </button>
          </div>
        </section>

        {error ? (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50/90 px-4 py-3 text-sm text-red-900"
          >
            {error}
          </div>
        ) : null}

        {result ? (
          <CharacterStage
            character={getCharacter(result.characterId) ?? CHARACTERS[0]}
            payload={{
              howItMayLand: result.howItMayLand,
              validationSummary: result.validationSummary,
              reframedMessage: result.reframedMessage,
            }}
            onCopy={copyText}
          />
        ) : null}

        <p className="text-center text-xs text-rose-800/60 sm:text-left">
          Communication support — not therapy. Keys stay on the server; add{" "}
          <code className="rounded bg-rose-100/80 px-1">GROQ_API_KEY</code> in{" "}
          <code className="rounded bg-rose-100/80 px-1">.env.local</code>.
        </p>
      </main>
    </div>
  );
}

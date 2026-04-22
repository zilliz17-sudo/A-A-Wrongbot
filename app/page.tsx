"use client";

import { useState } from "react";
import { PersonaSelector, type Persona } from "@/components/PersonaSelector";

export default function Home() {
  const [message, setMessage] = useState("");
  const [persona, setPersona] = useState<Persona>("Standard");
  const [result, setResult] = useState<string | null>(null);
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
        body: JSON.stringify({ message, persona }),
      });
      const data = (await res.json()) as { text?: string; error?: string };
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }
      if (!data.text) {
        setError("No text returned");
        return;
      }
      setResult(data.text);
    } catch {
      setError("Network error — try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-full overflow-hidden bg-[radial-gradient(1200px_circle_at_20%_-10%,#ffe4e6,transparent),radial-gradient(900px_circle_at_90%_20%,#e0f2fe,transparent),linear-gradient(180deg,#fff1f2,#fdf2f8_40%,#ffffff)]">
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2740%27%20height=%2740%27%20viewBox=%270%200%2040%2040%27%3E%3Cg%20fill=%27none%27%20fill-rule=%27evenodd%27%3E%3Cg%20fill=%27%23fda4af%27%20fill-opacity=%270.12%27%3E%3Cpath%20d=%27M0%2038.59l2.83-2.83%201.41%201.41L1.41%2040H0v-1.41zM0%201.4l2.83%202.83%201.41-1.41L1.41%200H0v1.41zM38.59%2040l-2.83-2.83%201.41-1.41L40%2038.59V40h-1.41zM40%201.41l-2.83%202.83-1.41-1.41L38.59%200H40v1.41zM20%2018.6l2.83-2.83%201.41%201.41L21.41%2020H20v-1.41zM20%2021.4l2.83%202.83-1.41%201.41L20%2022.59V21.4zm9.9-1.4l2.83-2.83%201.41%201.41L30.41%2020H29v-1.41zm-19.8%200l-2.83-2.83-1.41%201.41L9.59%2020H11v-1.41zM20%209.6l2.83-2.83%201.41%201.41L21.41%2011H20V9.6zm0%2010.8l2.83%202.83-1.41%201.41L20%2029v-1.41z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60" />

      <main className="relative z-10 mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-12 sm:py-16">
        <header className="space-y-3 text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">
            Emotional firmware upgrade
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-rose-950 sm:text-5xl">
            A-A-Wrongbot
          </h1>
          <p className="text-lg leading-relaxed text-rose-900/80">
            Drop the blunt thing you want to say. Pick a tone. Get a version that actually lands —
            without losing what you meant.
          </p>
        </header>

        <section className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl shadow-rose-200/40 backdrop-blur-md sm:p-8">
          <div className="flex flex-col gap-6">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-rose-900/80">Your message</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={loading}
                rows={5}
                placeholder={`e.g. "You're overreacting — none of this is a big deal."`}
                className="w-full resize-y rounded-2xl border border-rose-100 bg-white/90 px-4 py-3 text-rose-950 shadow-inner outline-none ring-rose-300/40 placeholder:text-rose-300 focus:ring-2"
              />
            </label>

            <PersonaSelector value={persona} onChange={setPersona} disabled={loading} />

            <button
              type="button"
              onClick={reframe}
              disabled={loading || !message.trim()}
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-rose-500 to-fuchsia-500 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-rose-300/50 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Reframing…" : "Reframe it"}
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
          <section
            aria-live="polite"
            className="rounded-3xl border border-rose-100 bg-white/85 p-6 shadow-lg shadow-rose-100/60 backdrop-blur-md sm:p-8"
          >
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-rose-500">
              Your reframe
            </h2>
            <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed text-rose-950">
              {result}
            </pre>
          </section>
        ) : null}

        <p className="text-center text-xs text-rose-800/60 sm:text-left">
          For relationship communication support — not therapy or medical advice. Keys stay on the
          server; add <code className="rounded bg-rose-100/80 px-1">GROQ_API_KEY</code> in{" "}
          <code className="rounded bg-rose-100/80 px-1">.env.local</code>.
        </p>
      </main>
    </div>
  );
}

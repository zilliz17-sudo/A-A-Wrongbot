"use client";

import { CHARACTERS, type CharacterId } from "@/lib/characters";

type Props = {
  value: CharacterId;
  onChange: (id: CharacterId) => void;
  disabled?: boolean;
};

export function CharacterPicker({ value, onChange, disabled }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <span className="text-sm font-semibold text-rose-900">Choose your coach</span>
        <p className="text-xs text-rose-800/70">Who do you want talking you through this?</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {CHARACTERS.map((c) => {
          const active = c.id === value;
          return (
            <button
              key={c.id}
              type="button"
              disabled={disabled}
              onClick={() => onChange(c.id)}
              className={[
                "group flex flex-col items-start rounded-2xl border-2 p-3 text-left transition",
                "bg-gradient-to-br",
                c.stageFrom,
                c.stageTo,
                active
                  ? "border-rose-600 shadow-lg ring-2 ring-rose-400/50"
                  : "border-white/50 hover:border-rose-300/80",
                disabled ? "cursor-not-allowed opacity-60" : "hover:scale-[1.02]",
              ].join(" ")}
            >
              <span className="text-2xl drop-shadow-sm" aria-hidden>
                {c.emoji}
              </span>
              <span className="mt-1 font-bold text-rose-950">{c.name}</span>
              <span className="text-xs leading-snug text-rose-900/80">{c.tagline}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

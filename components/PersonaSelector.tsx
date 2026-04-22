"use client";

import { PERSONAS, type Persona } from "@/lib/personas";

export { PERSONAS, type Persona };

type Props = {
  value: Persona;
  onChange: (p: Persona) => void;
  disabled?: boolean;
};

/** Legacy tone chips — prefer CharacterPicker for the main UX. */
export function PersonaSelector({ value, onChange, disabled }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-rose-900/80">Tone</span>
      <div className="flex flex-wrap gap-2">
        {PERSONAS.map((p) => {
          const active = p === value;
          return (
            <button
              key={p}
              type="button"
              disabled={disabled}
              onClick={() => onChange(p)}
              className={[
                "rounded-full border px-3 py-1.5 text-sm transition",
                active
                  ? "border-rose-500 bg-rose-500 text-white shadow-sm"
                  : "border-rose-200 bg-white/70 text-rose-900 hover:border-rose-300",
                disabled ? "cursor-not-allowed opacity-60" : "",
              ].join(" ")}
            >
              {p}
            </button>
          );
        })}
      </div>
    </div>
  );
}

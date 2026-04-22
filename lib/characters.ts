import type { Persona } from "@/lib/personas";

export const CHARACTERS = [
  {
    id: "hearth",
    name: "Hearth",
    tagline: "Soft, steady, gets it.",
    persona: "Standard" as Persona,
    emoji: "🫶",
    stageFrom: "from-rose-200",
    stageTo: "to-orange-100",
    bubble: "border-rose-200/80 bg-rose-50/95",
  },
  {
    id: "opossum",
    name: "Oops Opossum",
    tagline: "Nervous giggles, big heart.",
    persona: "Comic Relief",
    emoji: "🍃",
    stageFrom: "from-emerald-200",
    stageTo: "to-lime-100",
    bubble: "border-emerald-200/80 bg-emerald-50/95",
  },
  {
    id: "pixie",
    name: "Sass Pixie",
    tagline: "Sparkly side-eye, still kind.",
    persona: "Mildly Spicy",
    emoji: "✨",
    stageFrom: "from-fuchsia-300",
    stageTo: "to-violet-200",
    bubble: "border-fuchsia-200/80 bg-fuchsia-50/95",
  },
  {
    id: "tender_truth",
    name: "Tender Truth",
    tagline: "Direct, no dodge, no cruelty.",
    persona: "Blunt-But-Kind",
    emoji: "🎯",
    stageFrom: "from-sky-300",
    stageTo: "to-indigo-100",
    bubble: "border-sky-200/80 bg-sky-50/95",
  },
  {
    id: "fabio_cloud",
    name: "Heartthrob Horizon",
    tagline: "Dramatic breeze not included.",
    persona: "Fabio Heartthrob",
    emoji: "💨",
    stageFrom: "from-pink-300",
    stageTo: "to-amber-100",
    bubble: "border-pink-200/80 bg-pink-50/95",
  },
] as const;

export type Character = (typeof CHARACTERS)[number];
export type CharacterId = Character["id"];

export function getCharacter(id: string): Character | undefined {
  return CHARACTERS.find((c) => c.id === id);
}

export function isCharacterId(value: unknown): value is CharacterId {
  return typeof value === "string" && CHARACTERS.some((c) => c.id === value);
}

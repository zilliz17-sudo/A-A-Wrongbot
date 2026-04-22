export const PERSONAS = [
  "Standard",
  "Comic Relief",
  "Mildly Spicy",
  "Blunt-But-Kind",
  "Fabio Heartthrob",
] as const;

export type Persona = (typeof PERSONAS)[number];

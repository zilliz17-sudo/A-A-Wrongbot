export type ReframePayload = {
  howItMayLand: string;
  validationSummary: string;
  reframedMessage: string;
};

export function parseReframeJson(raw: string): ReframePayload | null {
  const trimmed = raw.trim();
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    const obj = JSON.parse(trimmed.slice(start, end + 1)) as Record<string, unknown>;
    const howItMayLand =
      typeof obj.howItMayLand === "string" ? obj.howItMayLand.trim() : "";
    const validationSummary =
      typeof obj.validationSummary === "string" ? obj.validationSummary.trim() : "";
    const reframedMessage =
      typeof obj.reframedMessage === "string" ? obj.reframedMessage.trim() : "";
    if (!reframedMessage) return null;
    return { howItMayLand, validationSummary, reframedMessage };
  } catch {
    return null;
  }
}

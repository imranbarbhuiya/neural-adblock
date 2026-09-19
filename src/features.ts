import type { RequestDetails } from "./types";
export const FEATURE_COUNT = 128;
const CUES = ["ad", "ads", "advert", "banner", "sponsor", "promo", "campaign", "click", "pixel", "beacon", "track", "tracker", "tracking", "analytics", "metrics", "telemetry", "collect", "event", "impression", "pageview", "static", "assets", "image", "font", "style", "app", "main", "bundle", "api", "cdn"];
function hash(text: string): number { let value = 2166136261; for (let i = 0; i < text.length; i++) { value ^= text.charCodeAt(i); value = Math.imul(value, 16777619); } return value >>> 0; }
function parts(text: string): string[] { return text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean); }
export function vectorize(request: RequestDetails): number[] {
  const vector = Array<number>(FEATURE_COUNT).fill(0); let parsed: URL | undefined; try { parsed = new URL(request.url); } catch {}
  const tokens = parts(`${parsed?.hostname ?? ""} ${parsed?.pathname ?? request.url} ${parsed?.search ?? ""}`), tokenSet = new Set(tokens);
  for (let i = 0; i < CUES.length; i++) if (tokenSet.has(CUES[i])) vector[i] += 1.5;
  const offset = CUES.length, hashed = (text: string) => offset + hash(text) % (FEATURE_COUNT - offset);
  for (const token of tokens) { vector[hashed(`w:${token}`)] += 1; const padded = `^${token}$`; for (let i = 0; i < padded.length - 2; i++) vector[hashed(`t:${padded.slice(i, i + 3)}`)] += 0.25; }
  vector[hashed(`type:${request.resourceType ?? "other"}`)] += 1.2; vector[hashed(`third:${request.thirdParty === true ? "yes" : request.thirdParty === false ? "no" : "unknown"}`)] += 1;
  if (request.sourceUrl) try { const source = new URL(request.sourceUrl); vector[hashed(`source:${source.hostname.split(".").slice(-2).join(".")}`)] += 0.5; } catch {}
  const norm = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0)) || 1; return vector.map((value) => value / norm);
}

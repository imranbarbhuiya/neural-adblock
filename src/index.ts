import { vectorize } from "./features"; import { predict } from "./model"; import { CATEGORIES, type Category, type Classification, type ModelWeights, type RequestDetails } from "./types";
export type { Category, Classification, ModelWeights, RequestDetails }; export { CATEGORIES };
export function classifyRequest(input: RequestDetails | string, options: { weights?: ModelWeights; rule?: "allow" | "block"; blockThreshold?: number } = {}): Classification {
  const request = typeof input === "string" ? { url: input } : input; if (!request?.url || typeof request.url !== "string") throw new TypeError("request.url must be a string");
  if (options.rule) { const category = options.rule === "allow" ? "content" : "ad"; return { input: request, category, confidence: 1, action: options.rule, source: "rule", alternatives: [{ category, confidence: 1 }] }; }
  const alternatives = predict(vectorize(request), options.weights).slice(0, 3), best = alternatives[0], threshold = options.blockThreshold ?? 0.85; const action = best.category === "content" ? "allow" : best.confidence >= threshold ? "block" : "review";
  return { input: request, category: best.category, confidence: best.confidence, action, source: "model", alternatives };
}
export function classifyMany(requests: readonly (RequestDetails | string)[], options: { weights?: ModelWeights; blockThreshold?: number } = {}): Classification[] { return requests.map((request) => classifyRequest(request, options)); }

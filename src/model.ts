import { CATEGORIES, type Category, type ModelWeights } from "./types"; import { WEIGHTS } from "./weights";
export function predict(input: readonly number[], weights: ModelWeights = WEIGHTS): Array<{ category: Category; confidence: number }> {
  const hidden = Array<number>(weights.hidden); for (let h = 0; h < weights.hidden; h++) { let sum = weights.b1[h]; for (let i = 0; i < weights.input; i++) sum += input[i] * weights.w1[i * weights.hidden + h]; hidden[h] = Math.max(0, sum); }
  const logits = Array<number>(weights.labels); for (let c = 0; c < weights.labels; c++) { let sum = weights.b2[c]; for (let h = 0; h < weights.hidden; h++) sum += hidden[h] * weights.w2[h * weights.labels + c]; logits[c] = sum; }
  const max = Math.max(...logits), exp = logits.map((v) => Math.exp(v - max)), total = exp.reduce((a, b) => a + b, 0); return exp.map((v, i) => ({ category: CATEGORIES[i], confidence: v / total })).sort((a, b) => b.confidence - a.confidence);
}

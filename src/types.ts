export const CATEGORIES = ["content", "ad", "tracker"] as const;
export type Category = typeof CATEGORIES[number];
export interface RequestDetails { url: string; sourceUrl?: string; resourceType?: "script" | "image" | "stylesheet" | "font" | "media" | "xmlhttprequest" | "sub_frame" | "other"; thirdParty?: boolean }
export interface Classification { input: RequestDetails; category: Category; confidence: number; action: "allow" | "block" | "review"; source: "rule" | "model"; alternatives: Array<{ category: Category; confidence: number }> }
export interface ModelWeights { input: number; hidden: number; labels: number; w1: readonly number[]; b1: readonly number[]; w2: readonly number[]; b2: readonly number[] }

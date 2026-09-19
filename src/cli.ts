#!/usr/bin/env node
import { classifyMany, classifyRequest } from "./index";
function parse(text: string): unknown { try { return JSON.parse(text); } catch { return text; } }
function emit(value: unknown): void { process.stdout.write(`${JSON.stringify(Array.isArray(value) ? classifyMany(value) : classifyRequest(value as never))}\n`); }
const argument = process.argv.slice(2).join(" ").trim(); if (argument) emit(parse(argument)); else { let buffer = ""; for await (const chunk of process.stdin) buffer += chunk; for (const line of buffer.split(/\r?\n/).filter(Boolean)) emit(parse(line)); }

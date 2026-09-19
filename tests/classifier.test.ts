import { describe, expect, test } from "bun:test"; import { classifyRequest } from "../src/index";
describe("classifyRequest", () => {
  test.each([
    [{ url: "https://ads.vendor.test/ads/banner.js", resourceType: "script", thirdParty: true }, "ad"],
    [{ url: "https://pixel.collector.test/tracking/pixel.gif", resourceType: "image", thirdParty: true }, "tracker"],
    [{ url: "https://static.example.test/assets/app.js", resourceType: "script", thirdParty: false }, "content"],
  ] as const)("classifies %o as %s", (request, category) => expect(classifyRequest(request).category).toBe(category));
  test("lets exact rules override the model", () => { expect(classifyRequest("https://example.test/ads.js", { rule: "allow" }).action).toBe("allow"); expect(classifyRequest("https://example.test/app.js", { rule: "block" }).action).toBe("block"); });
  test("cli accepts JSON", () => { const p = Bun.spawnSync([process.execPath, new URL("../src/cli.ts", import.meta.url).pathname, '{"url":"https://ads.vendor.test/ads/banner.js","resourceType":"script","thirdParty":true}']); expect(p.exitCode).toBe(0); expect(JSON.parse(p.stdout.toString()).category).toBe("ad"); });
});

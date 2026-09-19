# neural-adblock

A tiny local fallback model that classifies network requests as `content`, `ad`, or `tracker`.

```ts
import { classifyRequest } from "neural-adblock";

classifyRequest({
  url: "https://ads.vendor.test/ads/banner.js",
  resourceType: "script",
  thirdParty: true,
});
// { category: "ad", action: "block", source: "model", ... }
```

## CLI

```sh
npx neural-adblock '{"url":"https://analytics.vendor.test/collect/event","resourceType":"xmlhttprequest","thirdParty":true}'
```

Plain URLs and JSON Lines are also accepted.

## Design

Exact EasyList-compatible rules remain authoritative. Pass an existing engine's decision as `rule: "allow" | "block"`; it bypasses inference. Unknown requests use a dependency-free `128 → 20 → 3` network over URL tokens, resource type, third-party status, and initiator context. Low-confidence ad or tracker predictions return `review` rather than `block`.

The model has 2,643 parameters and no server, telemetry, bundled browsing history, or runtime dependency. It classifies requests only; it does not intercept traffic or modify pages.

## Development

```sh
bun run train
bun run check
bun run benchmark
```

The checked-in proof uses deterministic synthetic request families. It does not establish accuracy on arbitrary production traffic. See [MODEL_CARD.md](./MODEL_CARD.md) and [docs/prior-art.md](./docs/prior-art.md).

## License

MIT

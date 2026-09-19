# Prior art and project boundary

[EasyList](https://easylist.to/) maintains human-reviewed rules for ads, while EasyPrivacy covers tracking. Exact list matching remains the primary signal.

[Ghostery's adblocker](https://github.com/ghostery/adblocker) is a production TypeScript engine compatible with EasyList and uBlock Origin syntax, including network and cosmetic filters. [Brave's adblock-rust](https://github.com/brave/adblock-rust) provides a high-performance Rust engine for the same broad problem.

`neural-adblock` does not replace these engines or bundle their lists. It provides a small local fallback score for requests that receive no exact decision. This narrow boundary keeps the package experimental, auditable, and usable alongside established blockers.

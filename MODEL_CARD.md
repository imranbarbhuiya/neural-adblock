# Model card

## Summary

`neural-adblock` is a tiny three-class request classifier intended as a fallback after exact filter-list matching.

## Architecture

- 128 normalized hashed URL and context features
- 20 ReLU hidden units
- 3-way softmax: content, ad, tracker
- 2,643 parameters
- Zero runtime dependencies

## Data and evaluation

Training uses 3,600 deterministic synthetic requests. Evaluation uses 1,200 requests from a separate seed and currently reports 100% accuracy. Both sets share the same generator and vocabulary, so this result proves reproducibility and implementation consistency rather than real-world blocking quality. No browsing history or user data is included.

## Safety and limitations

Filter-list allow and block decisions should override the model. The default action blocks only non-content predictions at confidence 0.85 or higher. URL classification cannot inspect response content, CNAME cloaking, runtime behavior, consent, or site-specific breakage. Integrators should measure false positives on representative traffic before enabling blocking.

# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this site or its codebase, please report it responsibly. Do not open a public issue.

Send a private email to **howdy@lanebelone.com** with:

- A description of the vulnerability
- Steps to reproduce
- Potential impact

We will respond within 5 business days.

## Supported Versions

Only the current production deployment at lanebelone.com is actively maintained.

| Version | Supported |
|---|---|
| Current production | Yes |
| Previous deployments | No |

## Known Deferred Items

The following items are acknowledged technical debt. They are documented here for transparency and tracked in `docs/architecture-review.md`.

- **Blog HTML rendering:** Post content is injected via `dangerouslySetInnerHTML` in `src/app/blog/f/[slug]/page.tsx`. Content is sourced from a controlled internal pipeline, not user input. Migration to a sanitized renderer is planned.

# THE TARUN — Platform Blueprint

This repository is evolving from a static portfolio into a living personal engineering platform.

## Product layers

- **Identity** — the homepage answers who Tarun is without turning into a résumé.
- **Work** — curated major systems and deep case studies.
- **Workstation** — what is actively being built, researched, tested and questioned now.
- **Lab** — small experiments and strange tests.
- **Open Channel** — private questions, collaboration and project conversations.
- **Incoming Signals** — work submitted by other builders for private review.

## Route map

```text
/
/work
/work/[slug]
/station
/lab
/about
/contact
/share
```

A private `/admin` control desk will be added only after authentication is in place. It must never be shipped as an unauthenticated public dashboard.

## Homepage motion language

1. Entry / assembly
2. Integrated typography + 3D identity
3. Hero unfold / explosion transition
4. Manifesto typography
5. Identity
6. Selected systems
7. Process
8. Workstation preview
9. Lab
10. Tarun Protocol
11. Open Channel

Each chapter should have a distinct motion language. Avoid repeating the same fade/slide pattern across the site.

## 3D rule

3D is not decoration. Use it only when it communicates a system or creates a meaningful transition.

- Hero: Tarun Entity
- JARVIS: architecture/intelligence visualization
- Weed Removal Robot: mechanical/perception exploded model
- FreshFusion: sensing chamber / sensor fusion
- Lab: optional small experiments

The hero typography and WebGL scene share one white stage. Never place the entity in a separate dark card.

## Data ownership

Keep editorial case studies in code/content files because each page needs bespoke art direction.

Database-driven content:

- contact queries
- work submissions
- station updates
- review state / admin metadata

## Backend

Current route handlers use server-only Supabase REST access. Required variables are documented in `.env.example`.

Security baseline:

- service role key is never exposed to the browser
- RLS enabled on submission tables
- honeypot field
- request throttling as a best-effort first layer
- Cloudflare Turnstile server verification when configured
- no submission is published automatically

`supabase/schema.sql` contains the initial schema.

## Build gates

Do not skip these gates:

1. UX and information architecture
2. art direction / spatial composition
3. motion prototype
4. 3D silhouette approval
5. detailed 3D production
6. case-study production
7. backend/admin
8. performance/accessibility QA

A rejected blockout should be replaced, not polished indefinitely.

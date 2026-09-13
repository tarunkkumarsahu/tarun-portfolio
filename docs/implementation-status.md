# Implementation Status — Platform Pass 01

## Implemented

- Expanded navigation: Work / Station / Lab / About / Open Channel.
- New `/station` route with active desk, research, operating notes and Incoming Signals.
- New homepage Workstation preview replacing the old standalone NOW block.
- New `/contact` route with intent-based private message form.
- New `/share` route for private work submissions.
- Server route handlers for contact and work submissions.
- Supabase REST server integration scaffold.
- Supabase schema with RLS enabled and no public table policies.
- Cloudflare Turnstile component + server verification path.
- Honeypot and lightweight request throttling.
- `.env.example` documenting server configuration.
- Global Lenis smooth-scroll controller with reduced-motion opt-out.
- Integrated hero composition: typography and transparent WebGL share the same white stage.
- Rebuilt procedural Tarun Entity blockout with a faceted head, visor, crown fins, split chest, core, shoulder structure and inspect/explode states.
- Dedicated platform and integrated-hero CSS layers.
- CI workflow that installs dependencies and runs the Next.js production build.

## Intentionally not implemented yet

- Final Blender-authored Tarun Entity. The current R3F entity is a spatial blockout for composition and interaction tuning.
- Private `/admin` route. It should be added only with proper authentication.
- File uploads for shared work. V1 accepts project/GitHub URLs; Storage upload comes after the moderation flow is stable.
- Public community feed. Submissions remain private until a deliberate review/publish system exists.
- Final GSAP hero master timeline. Current hero uses Framer/R3F progress so spatial composition can be approved first.

## Next gate

Run locally, review the homepage at desktop and mobile widths, and capture screenshots of:

1. hero at rest
2. hero clicked / inspect state
3. hero around 60–70% scroll progress
4. `/station`
5. `/contact`
6. `/share`

Use those screenshots for the next art-direction pass before producing the final Blender model.

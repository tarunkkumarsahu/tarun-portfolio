# Portfolio launch notes

## Required predeploy check

Run before production deployment:

```bash
npm install
npm run predeploy:check
npm run build
```

The predeploy check verifies the final 3D GLB, canonical resume, all ten project covers and all six Off The Clock images.

## 3D hero

The interactive Three.js/R3F hero is loaded from:

```text
/public/models/tarun_hero_web.glb
```

If the model is not present, the portfolio intentionally falls back to the lightweight portrait instead of breaking the first fold. Production should ship with the GLB present.

The Canvas pauses while offscreen or while the document is hidden. Mobile/coarse-pointer devices use a lower DPR and lighter antialiasing path.

## Project archive

The archive contains ten projects with generated WebP artwork, project metadata and GitHub source links.

The wheel supports:

- drag / wheel navigation
- deterministic snapping
- direct project selection
- keyboard navigation
- selected-project dossier sync
- Escape-to-close
- compact desktop, tablet and mobile layouts

Browser CI checks the archive at 1440×1000, 1366×768, 820×1180 and 390×844.

## Resume

The Download Resume button points only to:

```text
/public/resume/Tarun-Kumar-Sahu-Resume.pdf
```

There is no generated fallback resume.

## Personal media

The final Off The Clock media lives in:

```text
/public/media/off-clock/
```

All six visuals are WebP assets and are lazy-loaded.

## Response delivery

The final "Leave Your Trace" form posts to `/api/trace`.

For real delivery set:

```env
TRACE_WEBHOOK_URL=https://your-private-endpoint
TRACE_WEBHOOK_BEARER=optional-token
```

The endpoint can be a private Slack workflow, Make/n8n webhook or custom API. If no webhook is configured, the UI returns a safe fallback state and copies the packed trace to the visitor's clipboard instead of pretending it was delivered.

## Production URL / social metadata

For a custom domain set:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

When it is not set on Vercel, metadata falls back to `VERCEL_PROJECT_PRODUCTION_URL` automatically.

The app includes Open Graph/Twitter artwork, robots metadata and a sitemap.

## Final production QA

After deployment verify:

1. 3D model renders rather than the portrait fallback.
2. Resume downloads correctly.
3. All project and Off The Clock images return 200.
4. Glass `TAP HERE` gate opens the archive.
5. Wheel selection, dossier sync, GitHub links and Escape close work.
6. Leave Your Trace delivers to the configured endpoint.
7. Chrome/Brave/Edge and a phone viewport show no horizontal clipping.
8. Browser console and network panel are free of production errors.

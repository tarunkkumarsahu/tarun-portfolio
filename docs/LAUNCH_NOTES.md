# Portfolio launch notes

## Response delivery

The final "Leave Your Trace" form posts to `/api/trace`.

Set:

```env
TRACE_WEBHOOK_URL=https://your-private-endpoint
TRACE_WEBHOOK_BEARER=optional-token
```

If no webhook is configured, the UI keeps the visitor's text in the browser and copies the packed trace to the clipboard instead of pretending it was delivered.

## Resume

The portfolio first looks for:

```text
/public/resume/Tarun-Kumar-Sahu-Resume.pdf
```

If that verified resume is not present, the Download Resume button generates a clearly labelled portfolio snapshot from the public information already shown on the site. This avoids inventing education, employment dates, achievements, or contact details.

## Personal media

The Off The Clock section is already structured for personal media. When final photography, sketches, edits, or Blender renders are available, they can replace the current motion motifs without changing the section layout.

## 3D hero

The Three.js/R3F bundle is lazy-loaded only if this file exists:

```text
/public/models/tarun_hero_web.glb
```

Until then the lightweight portrait fallback is used.

import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";

const required = [
  ["3D hero", "public/models/tarun_hero_web.glb", 1_000_000],
  ["resume", "public/resume/Tarun-Kumar-Sahu-Resume.pdf", 50_000],
  ["Jarvis project art", "public/media/projects/jarvis-os.webp", 20_000],
  ["Exocortex project art", "public/media/projects/exocortex.webp", 20_000],
  ["FreshFusion project art", "public/media/projects/freshfusion.webp", 20_000],
  ["Raksha Grid project art", "public/media/projects/raksha-grid.webp", 20_000],
  ["Precision Weeding project art", "public/media/projects/precision-weeding.webp", 20_000],
  ["AgriNexus project art", "public/media/projects/agrinexus.webp", 20_000],
  ["AWR Bot project art", "public/media/projects/awr-bot.webp", 20_000],
  ["Sakti Band project art", "public/media/projects/sakti-band.webp", 20_000],
  ["Play With Your Mind project art", "public/media/projects/play-with-your-mind.webp", 20_000],
  ["Travex project art", "public/media/projects/travex.webp", 20_000],
  ["Blender media", "public/media/off-clock/blender.webp", 20_000],
  ["Photography media", "public/media/off-clock/photography.webp", 20_000],
  ["Sketching media", "public/media/off-clock/sketching.webp", 20_000],
  ["Editing media", "public/media/off-clock/editing.webp", 20_000],
  ["Gaming media", "public/media/off-clock/gaming.webp", 20_000],
  ["Web motion media", "public/media/off-clock/web-motion.webp", 20_000],
];

let failed = false;

for (const [label, relativePath, minimumBytes] of required) {
  const path = resolve(relativePath);
  if (!existsSync(path)) {
    console.error(`MISSING  ${label}: ${relativePath}`);
    failed = true;
    continue;
  }

  const bytes = statSync(path).size;
  if (bytes < minimumBytes) {
    console.error(`INVALID  ${label}: ${relativePath} is only ${bytes} bytes`);
    failed = true;
    continue;
  }

  console.log(`OK       ${label}: ${relativePath} (${Math.round(bytes / 1024)} KB)`);
}

if (!process.env.TRACE_WEBHOOK_URL) {
  console.warn("WARN     TRACE_WEBHOOK_URL is not set; Leave Your Trace will use its clipboard fallback.");
} else {
  console.log("OK       Leave Your Trace delivery webhook is configured.");
}

if (failed) {
  console.error("\nPredeploy check failed. Fix missing/invalid launch assets before deploying.");
  process.exit(1);
}

console.log("\nPredeploy asset check passed.");

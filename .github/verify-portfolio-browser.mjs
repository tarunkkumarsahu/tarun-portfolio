// Verification revision: strict glass activation + canonical resume download.
import { chromium } from "playwright";
import { createHash } from "node:crypto";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(250);
await page.keyboard.press("Escape");
await page.waitForTimeout(350);

const resumeResponse = await page.request.get("http://127.0.0.1:3000/resume/Tarun-Kumar-Sahu-Resume.pdf");
assert(resumeResponse.ok(), "Canonical resume PDF is not reachable.");
const resumeBytes = await resumeResponse.body();
const resumeHash = createHash("sha256").update(resumeBytes).digest("hex");
assert(resumeBytes.length === 122311, "Canonical resume PDF byte size changed.");
assert(
  resumeHash === "1705d6f4d5339e84ae9be6b30ce488eeeac79f915809d58d12f9feeb6663b8c8",
  "Canonical resume PDF does not match the uploaded file.",
);

const resumeButton = page.getByRole("button", { name: "DOWNLOAD RESUME" });
await resumeButton.scrollIntoViewIfNeeded();
const resumeDownloadPromise = page.waitForEvent("download");
await resumeButton.click();
const resumeDownload = await resumeDownloadPromise;
assert(
  resumeDownload.suggestedFilename() === "Tarun-Kumar-Sahu-Resume.pdf",
  "Resume button did not download the canonical filename.",
);

const sense = page.locator(".signalLane").filter({ hasText: "SENSE" }).first();
await sense.scrollIntoViewIfNeeded();
await sense.hover();
await page.waitForTimeout(250);
const senseOpacity = await sense.locator(".signalLaneHoverNote").evaluate((el) =>
  Number.parseFloat(getComputedStyle(el).opacity),
);
assert(senseOpacity > 0.5, "SENSE hover note did not reveal.");

const problem = page.locator(".methodNode").filter({ hasText: "PROBLEM" }).first();
await problem.scrollIntoViewIfNeeded();
await problem.hover();
await page.waitForTimeout(250);
const problemOpacity = await problem.locator(".methodNodeHoverNote").evaluate((el) =>
  Number.parseFloat(getComputedStyle(el).opacity),
);
assert(problemOpacity > 0.5, "PROBLEM hover note did not reveal.");

const research = page.locator(".methodNode").filter({ hasText: "RESEARCH" }).first();
await research.hover();
await page.waitForTimeout(220);
assert(
  await page.locator(".methodSignature > span.is-active").filter({ hasText: "RESEARCH" }).count(),
  "Method signature did not couple to RESEARCH.",
);

const firstInterest = page.locator(".interestTile").first();
await firstInterest.scrollIntoViewIfNeeded();
await firstInterest.hover();
await page.waitForTimeout(250);
const thoughtOpacity = await firstInterest.locator(".interestThought").evaluate((el) =>
  Number.parseFloat(getComputedStyle(el).opacity),
);
assert(thoughtOpacity > 0.5, "Off The Clock personal thought did not reveal.");

const gate = page.locator(".projectGlassGate");
await gate.scrollIntoViewIfNeeded();
const iframe = page.frameLocator('iframe[title="Glass AI Button"]');
await iframe.locator("#activate").waitFor({ state: "visible", timeout: 20000 });
await iframe.locator("#activate").hover();
await iframe.locator("#activate").click();
await page.waitForTimeout(850);
assert(
  await page.locator(".projectArchive").count(),
  "Authored Glass AI button activation did not open the project archive.",
);

const panel = page.locator(".projectDetailPanel");
await panel.waitFor({ state: "visible" });
assert((await panel.locator("h3").innerText()).includes("JARVIS OS"), "Initial project detail is wrong.");
assert(
  (await panel.locator(".projectDetailLink").getAttribute("href"))?.includes("github.com/tarunkkumarsahu/Jarvis-OS"),
  "Initial GitHub source link is wrong.",
);

const rakshaIndex = page.locator(".projectArchiveWheel ol button", { hasText: "RAKSHA GRID" });
await rakshaIndex.click();
await page.waitForTimeout(300);
assert((await panel.locator("h3").innerText()).includes("RAKSHA GRID"), "Raksha Grid detail did not sync from the wheel.");
assert(
  (await panel.locator(".projectDetailLink").getAttribute("href"))?.includes("github.com/tarunkkumarsahu/raksha-grid"),
  "Raksha Grid GitHub source link is wrong.",
);

await page.screenshot({ path: "portfolio-browser-check.png", fullPage: false });

console.log("Browser verification passed.");
await browser.close();

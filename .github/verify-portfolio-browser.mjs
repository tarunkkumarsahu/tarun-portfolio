// Verification revision: stable project layout + glass gateway + canonical resume.
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

const sense = page.locator(".signalLane").filter({ hasText: "SENSE" }).first();
await sense.scrollIntoViewIfNeeded();
await sense.hover();
await page.waitForTimeout(220);
const senseOpacity = await sense.locator(".signalLaneHoverNote").evaluate((el) =>
  Number.parseFloat(getComputedStyle(el).opacity),
);
assert(senseOpacity > 0.5, "SENSE hover note did not reveal.");

const problem = page.locator(".methodNode").filter({ hasText: "PROBLEM" }).first();
await problem.scrollIntoViewIfNeeded();
await problem.hover();
await page.waitForTimeout(220);
const problemOpacity = await problem.locator(".methodNodeHoverNote").evaluate((el) =>
  Number.parseFloat(getComputedStyle(el).opacity),
);
assert(problemOpacity > 0.5, "PROBLEM hover note did not reveal.");

const gate = page.locator(".projectGlassGate");
await gate.scrollIntoViewIfNeeded();

const gateBox = await gate.boundingBox();
assert(gateBox && gateBox.width <= 330, "Glass gateway is too large for the project composition.");

const iframe = page.frameLocator('iframe[title="Glass project archive button"]');
const activate = iframe.locator("#activate");
await activate.waitFor({ state: "visible", timeout: 20000 });
assert(
  (await activate.getAttribute("aria-label"))?.includes("TAP HERE"),
  "Portfolio glass button label was not adapted to TAP HERE.",
);

await activate.click();
await page.waitForTimeout(500);
assert(await page.locator(".projectArchive").count(), "Project archive did not open.");

const panel = page.locator(".projectDetailPanel");
const wheel = page.locator(".projectArchiveWheel");
await panel.waitFor({ state: "visible" });

const panelBox = await panel.boundingBox();
const wheelBox = await wheel.boundingBox();
assert(panelBox && wheelBox, "Project archive layout boxes were not measurable.");
assert(
  panelBox.x + panelBox.width + 20 <= wheelBox.x,
  "Project detail panel overlaps the interactive project wheel.",
);

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

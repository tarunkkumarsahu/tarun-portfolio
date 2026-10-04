// Production browser verification: interactions, canonical assets and responsive safety.
import { chromium } from "playwright";
import { createHash } from "node:crypto";

const BASE = "http://127.0.0.1:3000";
const browser = await chromium.launch({ headless: true });

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function openPortfolio(viewport) {
  const page = await browser.newPage({ viewport });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(250);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(350);
  return page;
}

async function assertViewportSafety(page, label) {
  const metrics = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    clientWidth: document.documentElement.clientWidth,
    bodyWidth: document.body.getBoundingClientRect().width,
  }));

  assert(
    metrics.bodyWidth <= metrics.innerWidth + 2,
    `${label}: body is wider than the viewport.`,
  );

  const selectors = [
    ".introducingGrid",
    ".signalWorldStage",
    ".methodV3Layout",
    ".interestOrbit",
    ".systemFileGrid",
    ".projectGatewayCenter",
  ];

  for (const selector of selectors) {
    const locator = page.locator(selector).first();
    if (!(await locator.count())) continue;
    await locator.scrollIntoViewIfNeeded();
    const box = await locator.boundingBox();
    if (!box) continue;
    assert(box.width <= metrics.innerWidth + 6, `${label}: ${selector} exceeds viewport width.`);
    assert(box.x >= -4, `${label}: ${selector} starts outside the viewport.`);
  }
}

const page = await openPortfolio({ width: 1440, height: 1000 });

const resumeResponse = await page.request.get(`${BASE}/resume/Tarun-Kumar-Sahu-Resume.pdf`);
assert(resumeResponse.ok(), "Canonical resume PDF is not reachable.");
const resumeBytes = await resumeResponse.body();
const resumeHash = createHash("sha256").update(resumeBytes).digest("hex");
assert(resumeBytes.length === 122311, "Canonical resume PDF byte size changed.");
assert(
  resumeHash === "1705d6f4d5339e84ae9be6b30ce488eeeac79f915809d58d12f9feeb6663b8c8",
  "Canonical resume PDF does not match the uploaded file.",
);

for (const asset of [
  "/media/projects/jarvis-os.webp",
  "/media/projects/raksha-grid.webp",
  "/media/off-clock/blender.webp",
  "/media/off-clock/photography.webp",
]) {
  const response = await page.request.get(`${BASE}${asset}`);
  assert(response.ok(), `Portfolio artwork is not reachable: ${asset}`);
}

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
assert(
  (await panel.count()) === 0,
  "Project detail should stay hidden while the archive is still in its neutral ring state.",
);

const wheelBox = await wheel.boundingBox();
assert(wheelBox, "Project wheel layout box was not measurable.");
assert(
  wheelBox.x < 12 && wheelBox.width > 1400 - 24,
  "Project wheel is no longer centered across the archive viewport.",
);

const rakshaIndex = page.locator(".projectArchiveWheel ol button", { hasText: "RAKSHA GRID" });
await rakshaIndex.click();
await page.waitForTimeout(360);
await panel.waitFor({ state: "visible" });
assert((await panel.locator("h3").innerText()).includes("RAKSHA GRID"), "Raksha Grid detail did not sync from the wheel.");
assert(
  (await panel.locator(".projectDetailLink").getAttribute("href"))?.includes("github.com/tarunkkumarsahu/raksha-grid"),
  "Raksha Grid GitHub source link is wrong.",
);
assert(
  (await page.locator('#works-wheel-3').getAttribute("aria-selected")) === "true",
  "Selected project card and project detail are out of sync.",
);

await page.keyboard.press("Escape");
await page.waitForTimeout(180);
assert((await page.locator(".projectArchive").count()) === 0, "ESC did not close the project archive.");

await assertViewportSafety(page, "desktop-1440");
await page.screenshot({ path: "portfolio-browser-check.png", fullPage: false });
await page.close();

const compactDesktop = await openPortfolio({ width: 1366, height: 768 });
await assertViewportSafety(compactDesktop, "compact-desktop-1366x768");
await compactDesktop.screenshot({ path: "portfolio-browser-1366.png", fullPage: false });
await compactDesktop.close();

const tablet = await openPortfolio({ width: 820, height: 1180 });
await assertViewportSafety(tablet, "tablet-820x1180");
await tablet.screenshot({ path: "portfolio-browser-tablet.png", fullPage: false });
await tablet.close();

const mobile = await openPortfolio({ width: 390, height: 844 });
await assertViewportSafety(mobile, "mobile-390x844");
const mobileGate = mobile.locator(".projectGlassGate");
await mobileGate.scrollIntoViewIfNeeded();
const mobileActivate = mobile.frameLocator('iframe[title="Glass project archive button"]').locator("#activate");
await mobileActivate.waitFor({ state: "visible", timeout: 20000 });
await mobileActivate.click();
await mobile.waitForTimeout(420);
await mobile.locator("#works-wheel-3").click({ force: true });
await mobile.waitForTimeout(360);
const mobilePanel = mobile.locator(".projectDetailPanel");
await mobilePanel.waitFor({ state: "visible" });
const mobilePanelBox = await mobilePanel.boundingBox();
assert(mobilePanelBox, "Mobile project detail panel is not measurable.");
assert(mobilePanelBox.x >= 8, "Mobile project detail panel spills off the left edge.");
assert(
  mobilePanelBox.x + mobilePanelBox.width <= 390 - 8,
  "Mobile project detail panel spills off the right edge.",
);
await mobile.screenshot({ path: "portfolio-browser-mobile.png", fullPage: false });
await mobile.close();

console.log("Browser verification passed across desktop, compact desktop, tablet and mobile.");
await browser.close();

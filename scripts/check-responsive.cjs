const { chromium } = require("playwright");
const fs = require("node:fs");

(async () => {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const page = await browser.newPage();
  await page.emulateMedia({ reducedMotion: "reduce" });
  fs.mkdirSync("artifacts", { recursive: true });
  const failures = [];
  for (const width of [320, 375, 390, 414, 480, 640, 768, 1024, 1280, 1920]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("http://localhost:3000/?skipintro", { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise(resolve => setTimeout(resolve, 80));
      }
    });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    const result = await page.evaluate(() => {
      const width = document.documentElement.clientWidth;
      const clipped = [];
      const walker = document.createTreeWalker(document.querySelector("main"), NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (!node.textContent.trim() || node.parentElement.closest("svg,script,style")) continue;
        if (node.parentElement.getBoundingClientRect().height === 0) continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        for (const rect of range.getClientRects()) {
          if (rect.width && (rect.left < -1 || rect.right > width + 1)) clipped.push(node.textContent.trim());
        }
      }
      return { overflow: document.documentElement.scrollWidth > width, clipped: [...new Set(clipped)] };
    });
    if (result.overflow || result.clipped.length) failures.push({ width, ...result });
    if ([375, 1280].includes(width)) {
      await page.screenshot({ path: `artifacts/responsive-${width}.png`, fullPage: true });
    }
    await page.getByRole("button", { name: "Open RSVP form" }).click();
    const dialog = page.getByRole("dialog");
    const bounds = await dialog.boundingBox();
    if (Math.abs(bounds.width - width) > 1 || Math.abs(bounds.height - 844) > 1) failures.push({ width, dialog: bounds });
    await dialog.evaluate(el => { el.scrollTop = el.scrollHeight; });
    const submit = page.getByRole("button", { name: "Submit", exact: true });
    const submitBounds = await submit.boundingBox();
    if (submitBounds.y < 0 || submitBounds.y + submitBounds.height > 844) failures.push({ width, submit: submitBounds });
    await page.keyboard.press("Escape");
    console.log(`Checked ${width}px`);
  }
  await browser.close();
  if (failures.length) {
    console.error(JSON.stringify(failures, null, 2));
    process.exitCode = 1;
  } else console.log("All viewport, text overflow, and RSVP scrolling checks passed.");
})().catch(error => { console.error(error); process.exitCode = 1; });

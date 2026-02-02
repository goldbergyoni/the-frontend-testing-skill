import { test, Browser, BrowserContext, Page } from "@playwright/test";
import { processTestVideo } from "./utils/video-processing";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let browser: Browser;
let context: BrowserContext;
let page: Page = undefined!;

async function login(page: Page) {
  // Fill in the instructed login approach
}

async function injectTooltipIntoPage(page: Page) {
  const tooltipScript = fs.readFileSync(
    path.join(__dirname, "tooltip.js"),
    "utf-8"
  );
  await page.evaluate((script) => {
    eval(script);
    (window as any).createTooltip = createTooltip;
  }, tooltipScript);
}

test.beforeEach(async ({ browser: testBrowser }) => {
  browser = testBrowser;
  page = await context.newPage();

  context = await browser.newContext({
    recordVideo: {
      dir: ".",
      size: { width: 1920, height: 1080 },
    },
    viewport: { width: 1920, height: 1080 },
  });

  await login(page);
  await page.goto("http://localhost:5173", { waitUntil: "domcontentloaded" });
  await injectTooltipIntoPage(page);
});

test.afterEach(async ({}, testInfo) => {
  await context.close();
  const videoPath = await page.video()?.path();
  if (videoPath) {
    try {
      await processTestVideo({
        inputVideoPath: videoPath,
        outputDir: "./videos",
        testTitle: testInfo.title,
      });
    } catch (error) {
      console.log("Error processing video:", error);
    }
  }
});

test("A host test to record user flow", async () => {
  // Copy this file and put the test here
});

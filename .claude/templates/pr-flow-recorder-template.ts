import { test, Browser, BrowserContext, Page } from '@playwright/test';
import { processTestVideo } from './utils/video-processing';
import { login } from './login';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let browser: Browser;
let context: BrowserContext;
let page: Page = undefined!;

test.beforeEach(async ({ browser: testBrowser }) => {
  test.setTimeout(180000);
  browser = testBrowser;

  context = await browser.newContext({
    recordVideo: {
      dir: './test-results/videos/',
      size: { width: 1920, height: 1080 },
    },
    viewport: { width: 1920, height: 1080 },
  });
  page = await context.newPage();
  await login(page);
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(2000);

  const tooltipScript = fs.readFileSync(
    path.join(__dirname, 'tooltip.js'),
    'utf-8',
  );
  await page.evaluate((script) => {
    eval(script);
    (window as any).createTooltip = createTooltip;
  }, tooltipScript);
});

test.afterEach(async ({}, testInfo) => {
  await context.close();
  const videoPath = await page.video()?.path();
  if (videoPath) {
    try {
      await processTestVideo({
        inputVideoPath: videoPath,
        outputDir: './videos',
        testTitle: testInfo.title,
      });
    } catch (error) {
      console.log('Error processing video:', error);
    }
  }
});

test('A host test to record user flow', async () => {
  // Copy this file and put the test here
});

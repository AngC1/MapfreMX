#!/usr/bin/env node

import { chromium, firefox } from 'playwright';

const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const found = args.find((a) => a.startsWith(`${name}=`));
  return found ? found.split('=').slice(1).join('=') : fallback;
};

const browserName = getArg('--browser', 'chromium');
const baseUrl = getArg('--base-url', 'http://127.0.0.1:8080');
const headless = getArg('--headless', 'true') !== 'false';

const browserFactory = {
  chromium,
  firefox,
};

if (!browserFactory[browserName]) {
  throw new Error(`Unsupported browser '${browserName}'. Use chromium or firefox.`);
}

const browser = await browserFactory[browserName].launch({ headless });
const context = await browser.newContext();
const page = await context.newPage();

try {
  console.log(`[E2E] Opening ${baseUrl} with ${browserName}...`);
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

  await page.waitForSelector('#policyText', { timeout: 10000 });
  await page.click('button[data-example="full"]');
  await page.click('#readBtn');

  await page.waitForSelector('#output .confidence-wrap', { timeout: 15000 });

  const fieldCount = await page.locator('#output .fields-grid .field').count();
  if (fieldCount !== 6) {
    throw new Error(`Expected 6 rendered fields, got ${fieldCount}`);
  }

  const jsonRaw = await page.locator('#output details pre').textContent();
  const parsed = JSON.parse((jsonRaw || '').trim());
  const requiredKeys = [
    'policyNumber',
    'insurerName',
    'holderName',
    'productName',
    'effectiveFrom',
    'effectiveTo',
    'confidence',
    'missingFields',
  ];

  for (const key of requiredKeys) {
    if (!(key in parsed)) {
      throw new Error(`Missing expected response key: ${key}`);
    }
  }

  const confidenceText = await page.locator('.confidence-label span').nth(1).innerText();
  if (!confidenceText.includes('%')) {
    throw new Error(`Invalid confidence value: ${confidenceText}`);
  }

  console.log(`[E2E] PASS - UI rendered expected policy fields, confidence=${confidenceText}`);
} finally {
  await context.close();
  await browser.close();
}

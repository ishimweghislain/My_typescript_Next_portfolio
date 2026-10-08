import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const projectsFilePath = path.join(rootDir, 'src', 'data', 'projects.json');
const previewsDir = path.join(rootDir, 'public', 'previews');

const isForce = process.argv.includes('--force');

async function main() {
  if (!fs.existsSync(projectsFilePath)) {
    console.error(`Error: Projects file not found at ${projectsFilePath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(projectsFilePath, 'utf8');
  const projects = JSON.parse(raw);

  if (!fs.existsSync(previewsDir)) {
    fs.mkdirSync(previewsDir, { recursive: true });
  }

  console.log(`\n======================================================`);
  console.log(`  Project Previews Generator`);
  console.log(`  Total projects in registry: ${projects.length}`);
  console.log(`  Force mode: ${isForce ? 'YES (--force)' : 'NO (skipping existing)'}`);
  console.log(`======================================================\n`);

  let browser;
  const launchOptions = [
    { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] },
    { channel: 'chrome', headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] },
    { channel: 'msedge', headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] },
  ];

  for (const opts of launchOptions) {
    try {
      browser = await chromium.launch(opts);
      if (browser) break;
    } catch {
      // try next fallback
    }
  }

  if (!browser) {
    console.error('\n[Error launching browser]: Could not launch Chromium, Chrome, or Edge.');
    console.error('Make sure Chromium is installed by running: npx playwright install chromium\n');
    process.exit(1);
  }

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    deviceScaleFactor: 1,
  });

  const results = {
    generated: [],
    skipped: [],
    failed: [],
  };

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    const { slug, title, url, previewRefresh } = project;
    const outputPath = path.join(previewsDir, `${slug}.webp`);
    const fileExists = fs.existsSync(outputPath);

    if (fileExists && !isForce && !previewRefresh) {
      console.log(`[${i + 1}/${projects.length}] [SKIP] ${title} (${slug}) -> preview already exists.`);
      results.skipped.push({ slug, title, reason: 'Already exists' });
      continue;
    }

    console.log(`[${i + 1}/${projects.length}] [FETCH] ${title} -> ${url}`);

    let page;
    try {
      page = await context.newPage();

      // Navigate with 15s timeout on domcontentloaded
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      } catch (navErr) {
        console.warn(`  DOM wait failed (${navErr.message}). Continuing with current paint...`);
      }

      // Small pause to let hero layout/fonts settle
      await page.waitForTimeout(2000);

      // Capture 1440x900 viewport with 10s timeout
      const rawBuffer = await page.screenshot({ fullPage: false, timeout: 10000 });

      // Resize/crop to 16:10 (1200x750) and encode to WebP quality 80
      await sharp(rawBuffer)
        .resize(1200, 750, { fit: 'cover', position: 'top' })
        .webp({ quality: 80 })
        .toFile(outputPath);

      console.log(`  [OK] Saved preview -> public/previews/${slug}.webp`);
      results.generated.push({ slug, title });
    } catch (err) {
      console.error(`  [FAIL] Failed to generate preview for ${title}:`, err.message);
      results.failed.push({ slug, title, url, error: err.message });
      // Keep existing preview if one existed, never crash!
    } finally {
      if (page) {
        await page.close().catch(() => {});
      }
    }
  }

  await browser.close().catch(() => {});

  console.log(`\n======================================================`);
  console.log(`  Preview Generation Summary`);
  console.log(`  Generated: ${results.generated.length}`);
  console.log(`  Skipped:   ${results.skipped.length}`);
  console.log(`  Failed:    ${results.failed.length}`);
  if (results.failed.length > 0) {
    console.log(`\n  Failed sites:`);
    results.failed.forEach((f) => {
      console.log(`   - ${f.title} (${f.url}): ${f.error}`);
    });
  }
  console.log(`======================================================\n`);
}

main().catch((err) => {
  console.error('Fatal error during preview generation:', err);
  process.exit(1);
});

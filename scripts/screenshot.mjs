// Screenshot a page at desktop and mobile widths and print rendered logo/icon sizes.
// Usage: node scripts/screenshot.mjs [page.html]   (default: about.html, the only page with timeline sections)
// Output: output/<page>-*.png (light) and output/<page>-*-dark-*.png
// One-time setup: npx playwright install chromium
import { chromium } from 'playwright';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const page = (process.argv[2] ?? 'about.html').replace(/^\.\//, '');
const file = join(root, page);
if (!existsSync(file)) {
    console.error(`No such page: ${file}`);
    process.exit(1);
}
const name = page.replace(/\.html$/, '').replaceAll('/', '-');
const outDir = join(root, 'output');
mkdirSync(outDir, { recursive: true });

const url = pathToFileURL(file).href;
const viewports = {
    desktop: { width: 1440, height: 900 },
    mobile: { width: 390, height: 844 },
};

// Rendered sizes of visible logos/icons. Some logos are toggled by scroll position,
// so this is called at each scroll stop and merged into `sizes`.
async function measure(p, sizes) {
    const found = await p.$$eval('header nav img, .timeline-image img, .entry-logo', imgs =>
        imgs
            .map(img => ({ img, r: img.getBoundingClientRect() }))
            .filter(({ r }) => r.width > 0) // skip images hidden at this width/scroll position
            .map(({ img, r }) => [
                img.id || img.alt || img.src.split('/').pop(),
                `${Math.round(r.width)}x${Math.round(r.height)}`,
            ])
    );
    for (const [key, size] of found) sizes.set(key, size);
}

// Lazy images below the fold never load in a full-page capture, so load them all first.
async function loadAllImages(p) {
    await p.evaluate(async () => {
        const imgs = [...document.images];
        imgs.forEach(img => { img.loading = 'eager'; });
        await Promise.all(imgs.map(img => img.decode().catch(() => {})));
    });
}

const browser = await chromium.launch();
try {
    for (const colorScheme of ['light', 'dark']) {
        const suffix = colorScheme === 'dark' ? '-dark' : '';
        for (const [label, viewport] of Object.entries(viewports)) {
            const p = await browser.newPage({ viewport, colorScheme });
            await p.goto(url, { waitUntil: 'networkidle' });
            await loadAllImages(p);
            await p.screenshot({ path: join(outDir, `${name}-${label}${suffix}-full.png`), fullPage: true });

            const sizes = new Map();
            await measure(p, sizes);

            // Viewport shots per timeline section, so sticky elements show as they do while scrolling.
            if (label === 'desktop') {
                const ids = await p.$$eval('.timeline-event[id]', els => els.map(el => el.id));
                for (const id of ids) {
                    await p.evaluate(i => document.getElementById(i).scrollIntoView(), id);
                    await p.waitForTimeout(400);
                    await p.screenshot({ path: join(outDir, `${name}-${label}${suffix}-${id}.png`) });
                    await measure(p, sizes);
                }
            }

            if (colorScheme === 'light') {
                const lines = [...sizes].map(([key, size]) => `  ${key}: ${size}`);
                console.log(`${label}:\n${lines.join('\n')}`);
            }
            await p.close();
        }
    }
} finally {
    await browser.close();
}
console.log(`Screenshots written to ${outDir}`);

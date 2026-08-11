// IKO static-site generator. Renders data + templates → dist/ with SEO routes.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { layout } from './components.js';
import { site } from './data/site.js';
import { projects } from './data/projects.js';
import { homePage } from './pages/home.js';
import { projektyPage } from './pages/projekty.js';
import { projektDetailPage } from './pages/projekt.js';
import { onasPage } from './pages/onas.js';
import { sluzbyPage } from './pages/sluzby.js';
import { karieraPage } from './pages/kariera.js';
import { kontaktPage } from './pages/kontakt.js';
import { procIkoPage } from './pages/proc-iko.js';
import { pruvodceNakupemPage } from './pages/pruvodce-nakupem.js';
import { tymPage } from './pages/tym.js';
import { aktualityPage } from './pages/aktuality.js';
import { jednotkaPage } from './pages/jednotka.js';
import { porovnatPage } from './pages/porovnat.js';
import { notFoundPage } from './pages/notfound.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const publicDir = path.join(root, 'public');

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  for (const entry of await fs.readdir(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) await copyDir(s, d);
    else await fs.copyFile(s, d);
  }
}

// route path → output file
function outFile(routePath) {
  if (routePath === '/') return 'index.html';
  if (routePath.endsWith('.html')) return routePath.replace(/^\//, '');
  return path.join(routePath.replace(/^\//, ''), 'index.html');
}

// Depth of a route below site root — drives the relative asset prefix.
function depthOf(routePath) {
  if (routePath === '/') return 0;
  let p = routePath.replace(/^\//, '').replace(/\/$/, '');
  if (p.endsWith('.html')) p = p.split('/').slice(0, -1).join('/');
  return p ? p.split('/').length : 0;
}

// Rewrite absolute internal URLs (="/…") to page-relative ones, so the site
// works at any mount point: GitHub project page (/repo/), a custom domain root,
// a subfolder, or localhost — with no base-path configuration. External URLs
// (http, //, tel:, mailto:, #) and full canonical/OG URLs are left untouched.
function relativize(html, routePath) {
  const depth = depthOf(routePath);
  const prefix = depth === 0 ? './' : '../'.repeat(depth);
  return html.replace(/(href|src|action|data-full)="\/(?!\/)/g, `$1="${prefix}`);
}

async function writePage(page) {
  const html = relativize(layout(page), page.path);
  const file = path.join(dist, outFile(page.path));
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, html, 'utf8');
  return page.path;
}

async function cleanDir(dir) {
  await fs.mkdir(dir, { recursive: true });
  for (const entry of await fs.readdir(dir)) {
    await fs.rm(path.join(dir, entry), { recursive: true, force: true }).catch(() => {});
  }
}

async function run() {
  await cleanDir(dist); // empty contents without removing the (possibly locked) dir itself
  await copyDir(publicDir, dist);

  const pages = [
    homePage(),
    projektyPage(),
    ...projects.map((p) => projektDetailPage(p)),
    onasPage(),
    sluzbyPage(),
    karieraPage(),
    kontaktPage(),
    procIkoPage(),
    pruvodceNakupemPage(),
    tymPage(),
    aktualityPage(),
    jednotkaPage(),
    porovnatPage(),
    notFoundPage(),
  ];

  const routes = [];
  for (const p of pages) routes.push(await writePage(p));

  // sitemap.xml
  const urls = routes.filter((r) => !r.endsWith('.html'));
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${site.url}${u}</loc></url>`).join('\n')}
</urlset>`;
  await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap, 'utf8');

  await fs.writeFile(
    path.join(dist, 'robots.txt'),
    `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`,
    'utf8'
  );

  console.log(`Built ${pages.length} pages → dist/`);
  routes.forEach((r) => console.log('  ' + r));
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

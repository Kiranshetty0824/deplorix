#!/usr/bin/env node
/**
 * Automated SEO audit.
 *
 * Statically crawls the app's routes + public SEO files and reports:
 *  - sitemap.xml validity, coverage of app routes, and stale entries
 *  - robots.txt sanity (no blanket Disallow, sitemap directive)
 *  - canonical tags present for every route
 *  - internal links that point to non-existent routes
 *  - any remaining /verify references
 *
 * Usage: node scripts/seo-audit.mjs   (writes seo-audit-report.md)
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");
const files = execSync("git ls-files 'src/**' 'index.html' 'public/**'", { encoding: "utf8" })
  .split("\n")
  .filter(Boolean);

const problems = [];
const notes = [];
const fail = (m) => problems.push(m);
const ok = (m) => notes.push(m);

/* ---------- routes ---------- */
const app = read("src/App.tsx");
const routes = [...app.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]);
const staticRoutes = routes.filter((r) => r !== "*" && !r.includes(":"));
const dynamicRoutes = routes.filter((r) => r.includes(":"));
const divisionIds = [...read("src/data/divisions.ts").matchAll(/^\s{4}id: "([^"]+)"/gm)].map((m) => m[1]);
const expandedRoutes = new Set([
  ...staticRoutes,
  ...divisionIds.map((id) => `/work/${id}`),
]);

/* ---------- /verify references ---------- */
const verifyHits = [];
for (const f of files) {
  const content = read(f);
  content.split("\n").forEach((line, i) => {
    if (/["'`(\s]\/verify\b/.test(line)) verifyHits.push(`${f}:${i + 1} ${line.trim().slice(0, 120)}`);
  });
}
if (verifyHits.length) fail(`Found ${verifyHits.length} /verify reference(s):\n  - ${verifyHits.join("\n  - ")}`);
else ok("No /verify references in source, sitemap, robots.txt or internal links.");

/* ---------- sitemap ---------- */
const sitemap = read("public/sitemap.xml");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!sitemap) fail("public/sitemap.xml is missing.");
else {
  const paths = locs.map((l) => new URL(l).pathname.replace(/\/$/, "") || "/");
  const missing = [...expandedRoutes].filter((r) => r !== "/404" && !paths.includes(r));
  const stale = paths.filter((p) => p !== "/" && !expandedRoutes.has(p));
  if (missing.length) fail(`Sitemap missing route(s): ${missing.join(", ")}`);
  if (stale.length) fail(`Sitemap contains route(s) not in the app: ${stale.join(", ")}`);
  if (/<lastmod>/.test(sitemap)) notes.push("Sitemap contains <lastmod> entries — verify they are page-specific.");
  if (!missing.length && !stale.length) ok(`Sitemap lists ${locs.length} URL(s), all matching real routes.`);
}

/* ---------- robots ---------- */
const robots = read("public/robots.txt");
if (!robots) fail("public/robots.txt is missing.");
else {
  if (/^\s*Disallow:\s*\/\s*$/m.test(robots)) fail("robots.txt blocks all crawlers (Disallow: /).");
  else ok("robots.txt allows crawling.");
  if (!/^Sitemap:/m.test(robots)) notes.push("robots.txt has no Sitemap directive.");
  else ok("robots.txt advertises the sitemap.");
}

/* ---------- canonical ---------- */
const html = read("index.html");
if (!/rel="canonical"/.test(html)) fail("index.html has no canonical tag.");
else ok("index.html declares a canonical URL.");
const seoUsers = files.filter((f) => f.startsWith("src/pages/") && /from "@\/components\/Seo"/.test(read(f)));
seoUsers.forEach((f) => {
  if (!/canonical=/.test(read(f))) fail(`${f} renders <Seo> without a canonical prop.`);
});
ok(`${seoUsers.length} route component(s) set a per-page canonical via <Seo>.`);

/* ---------- internal links ---------- */
const knownPrefixes = ["/#", "/?", "#"];
const linkHits = [];
for (const f of files.filter((f) => f.endsWith(".tsx"))) {
  const content = read(f);
  for (const m of content.matchAll(/(?:to|href)=(?:"([^"]+)"|\{`([^`]+)`\})/g)) {
    const raw = m[1] ?? m[2];
    if (!raw.startsWith("/")) continue;
    if (knownPrefixes.some((p) => raw.startsWith(p))) continue;
    const path = raw.split(/[?#]/)[0].replace(/\/$/, "") || "/";
    if (path.includes("${")) continue;
    if (/\.(png|jpg|jpeg|webp|svg|ico|xml|txt|webmanifest)$/.test(path)) continue;
    const matchesDynamic = dynamicRoutes.some((r) => {
      const re = new RegExp("^" + r.replace(/:[^/]+/g, "[^/]+") + "$");
      return re.test(path);
    });
    if (!expandedRoutes.has(path) && !matchesDynamic) linkHits.push(`${f} → ${raw}`);
  }
}
if (linkHits.length) fail(`Broken internal link(s):\n  - ${linkHits.join("\n  - ")}`);
else ok("All internal links resolve to declared routes.");

/* ---------- report ---------- */
const report = [
  "# SEO audit report",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  `Routes crawled (${expandedRoutes.size}): ${[...expandedRoutes].join(", ")}`,
  "",
  "## Passed",
  ...notes.map((n) => `- ${n}`),
  "",
  "## Issues",
  problems.length ? problems.map((p) => `- ${p}`).join("\n") : "- None. Audit clean.",
  "",
].join("\n");

writeFileSync("seo-audit-report.md", report);
console.log(report);
if (problems.length) {
  console.error(`\nSEO audit failed with ${problems.length} issue(s).`);
  process.exit(1);
}
console.log("\nSEO audit passed.");

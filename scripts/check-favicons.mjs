#!/usr/bin/env node
/**
 * Build-time validator: ensures every favicon referenced in
 * index.html and site.webmanifest exists in /public and matches
 * its declared dimensions.
 */
import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = resolve(root, "public");

/** Read PNG width/height from IHDR chunk. ICO is size-skipped. */
function readPngSize(filePath) {
  const buf = readFileSync(filePath);
  // PNG signature 8 bytes, then IHDR length(4)+type(4), then width(4) height(4)
  if (buf.slice(1, 4).toString() !== "PNG") return null;
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { width, height };
}

const expected = [
  { file: "favicon.ico", size: null },
  { file: "favicon.svg", size: null },
  { file: "favicon-16x16.png", size: 16 },
  { file: "favicon-32x32.png", size: 32 },
  { file: "apple-touch-icon.png", size: 180 },
  { file: "android-chrome-192x192.png", size: 192 },
  { file: "android-chrome-512x512.png", size: 512 },
  { file: "site.webmanifest", size: null },
];

const indexHtml = readFileSync(resolve(root, "index.html"), "utf8");
const manifest = JSON.parse(
  readFileSync(resolve(publicDir, "site.webmanifest"), "utf8")
);

const errors = [];
const ok = [];

for (const { file, size } of expected) {
  const full = resolve(publicDir, file);
  if (!existsSync(full)) {
    errors.push(`Missing: public/${file}`);
    continue;
  }
  if (statSync(full).size === 0) {
    errors.push(`Empty file: public/${file}`);
    continue;
  }
  if (size && file.endsWith(".png")) {
    const dims = readPngSize(full);
    if (!dims || dims.width !== size || dims.height !== size) {
      errors.push(
        `Bad size: public/${file} expected ${size}x${size}, got ${dims?.width}x${dims?.height}`
      );
      continue;
    }
  }
  // Must be referenced from index.html (skip android icons — referenced via manifest)
  if (
    !file.startsWith("android-chrome") &&
    !indexHtml.includes(`/${file}`)
  ) {
    errors.push(`Not referenced in index.html: /${file}`);
    continue;
  }
  ok.push(`/${file}`);
}

// Validate manifest icons
for (const icon of manifest.icons ?? []) {
  const file = icon.src.replace(/^\//, "");
  const full = resolve(publicDir, file);
  if (!existsSync(full)) {
    errors.push(`Manifest references missing icon: ${icon.src}`);
    continue;
  }
  const [w, h] = (icon.sizes ?? "0x0").split("x").map(Number);
  const dims = readPngSize(full);
  if (!dims || dims.width !== w || dims.height !== h) {
    errors.push(
      `Manifest size mismatch: ${icon.src} expected ${w}x${h}, got ${dims?.width}x${dims?.height}`
    );
  }
}

if (errors.length) {
  console.error("\n❌ Favicon check failed:\n" + errors.map((e) => "  - " + e).join("\n") + "\n");
  process.exit(1);
}

console.log("✅ Favicon check passed:");
ok.forEach((f) => console.log("  ✓ " + f));
manifest.icons?.forEach((i) => console.log("  ✓ manifest " + i.src + " (" + i.sizes + ")"));

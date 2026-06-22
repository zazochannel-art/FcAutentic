import fs from "node:fs";
import path from "node:path";

const output = path.resolve("dist");
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

for (const file of [
  "index.html",
  "app.js",
  "player-profile-premium.js",
  "admin-enhancements.js",
  "portal-guard.js",
  "styles.css",
  "fc-autentic-logo-small.png",
  "hero-football.jpg",
  "academy-1.jpg",
  "academy-2.jpg",
  "academy-3.jpg",
  "academy-4.jpg",
  "manifest.webmanifest",
  "icon.svg",
  "sw.js"
]) {
  fs.copyFileSync(file, path.join(output, file));
}

console.log("FC AUTENTIC static build ready.");

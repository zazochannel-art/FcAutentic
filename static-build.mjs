import fs from "node:fs";
import path from "node:path";

const output = path.resolve("dist");
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

for (const file of [
  "index.html",
  "app.js",
  "styles.css",
  "fc-autentic-logo-hq.png",
  "manifest.webmanifest",
  "icon.svg",
  "sw.js"
]) {
  fs.copyFileSync(file, path.join(output, file));
}

console.log("FC AUTENTIC static build ready.");

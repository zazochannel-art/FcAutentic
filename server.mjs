import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);
const host = "127.0.0.1";

const types = {
  ".html": "text/html;charset=utf-8",
  ".css": "text/css;charset=utf-8",
  ".js": "text/javascript;charset=utf-8",
  ".png": "image/png"
};

http
  .createServer((req, res) => {
    const requestedPath = decodeURIComponent(req.url.split("?")[0]);
    const cleanPath = requestedPath === "/" ? "/index.html" : requestedPath;
    const file = path.normalize(path.join(root, cleanPath));

    if (!file.startsWith(root)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }

      res.writeHead(200, { "Content-Type": types[path.extname(file)] || "text/plain" });
      res.end(data);
    });
  })
  .listen(port, host, () => {
    console.log(`FC Autentic app running at http://${host}:${port}`);
  });

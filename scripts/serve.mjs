import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const output = resolve(fileURLToPath(new URL("../dist/", import.meta.url)));
const port = Number(process.env.PORT || 3000);
const host = "127.0.0.1";
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

await readFile(resolve(output, "index.html"));

const server = createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" }).end("Method not allowed");
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, `http://${host}:${port}`).pathname);
  } catch {
    response.writeHead(400).end("Invalid URL");
    return;
  }

  if (pathname.includes("\\") || pathname.includes("\0") || pathname.startsWith("//")) {
    response.writeHead(400).end("Invalid path");
    return;
  }

  const cleanPath = pathname.replace(/\/+$/, "").replace(/\.html$/, "");
  if (pathname !== "/" && (pathname.endsWith("/") || pathname.endsWith(".html"))) {
    const location = cleanPath === "/index" ? "/" : cleanPath || "/";
    response.writeHead(308, { Location: location }).end();
    return;
  }

  const relativePath = pathname === "/" ? "index.html"
    : `${pathname.slice(1)}${extname(pathname) ? "" : ".html"}`;
  const filePath = resolve(output, relativePath);
  if (!filePath.startsWith(`${output}${sep}`)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  try {
    const body = await readFile(filePath);
    response.writeHead(pathname === "/404" ? 404 : 200, {
      "Content-Type": contentTypes[extname(filePath)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch (error) {
    if (error.code !== "ENOENT" && error.code !== "ENOTDIR") {
      console.error("Failed to serve request:", error);
      response.writeHead(500).end("Unable to serve this request");
      return;
    }
    try {
      const body = await readFile(resolve(output, "404.html"));
      response.writeHead(404, { "Content-Type": contentTypes[".html"] });
      response.end(request.method === "HEAD" ? undefined : body);
    } catch (notFoundError) {
      console.error("Failed to load the 404 page:", notFoundError);
      response.writeHead(500).end("Unable to serve the error page");
    }
  }
});

server.on("error", (error) => {
  console.error("Preview server failed:", error);
  process.exitCode = 1;
});
server.listen(port, host, () => console.log(`Preview: http://${host}:${port}`));

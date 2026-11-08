import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { handleRequest } from '../dist-server/handler.js';

process.env.TZ = 'Asia/Jerusalem';
const root = resolve('dist');
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    if (url.pathname.startsWith('/api/')) {
      const chunks = [];
      let size = 0;
      for await (const chunk of req) {
        size += chunk.length;
        if (size > 100_000) { res.writeHead(413).end(); return; }
        chunks.push(chunk);
      }
      const headers = new Headers();
      for (const [key, value] of Object.entries(req.headers)) if (value) headers.set(key, Array.isArray(value) ? value.join(', ') : value);
      // Reverse proxies should preserve Host and Origin for same-origin checks.
      if (headers.get('x-forwarded-proto') === 'https') url.protocol = 'https:';
      const response = await handleRequest(new Request(url, { method: req.method, headers, ...(req.method !== 'GET' && req.method !== 'HEAD' ? { body: Buffer.concat(chunks) } : {}) }));
      res.writeHead(response.status, Object.fromEntries(response.headers));
      res.end(await response.text());
      return;
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405).end(); return; }
    const path = resolve(root, `.${decodeURIComponent(url.pathname)}`);
    if (path !== root && !path.startsWith(`${root}/`)) { res.writeHead(403).end(); return; }
    let target = path;
    try { if (!(await stat(target)).isFile()) target = resolve(root, 'index.html'); }
    catch { if (extname(path)) { res.writeHead(404).end(); return; } target = resolve(root, 'index.html'); }
    const body = await readFile(target);
    res.writeHead(200, { 'Content-Type': mime[extname(target)] ?? 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch { res.writeHead(500).end('Internal server error'); }
});
server.requestTimeout = 15000;
server.listen(Number(process.env.PORT || 4173), process.env.HOST || '0.0.0.0', () => console.log('Sushi Wok server ready'));

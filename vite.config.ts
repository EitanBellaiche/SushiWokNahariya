import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), {
    name: 'order-api',
    configureServer(server) {
      process.env.TZ = 'Asia/Jerusalem';
      server.middlewares.use('/api', async (req, res) => {
        const chunks: Buffer[] = [];
        let size = 0;
        try {
          for await (const chunk of req) {
            size += chunk.length;
            if (size > 100_000) { res.writeHead(413).end(); return; }
            chunks.push(chunk);
          }
          const { handleRequest } = await server.ssrLoadModule('/server/handler.ts');
          const headers = new Headers();
          for (const [key, value] of Object.entries(req.headers)) if (value) headers.set(key, Array.isArray(value) ? value.join(', ') : value);
          const response = await handleRequest(new Request(`http://${req.headers.host}${req.originalUrl}`, {
            method: req.method, headers,
            ...(req.method !== 'GET' && req.method !== 'HEAD' ? { body: Buffer.concat(chunks) } : {}),
          }));
          res.writeHead(response.status, Object.fromEntries(response.headers));
          res.end(await response.text());
        } catch { res.writeHead(500).end(JSON.stringify({ error: 'לא ניתן לאמת את ההזמנה כרגע' })); }
      });
    },
  }],
  server: {
    port: 4173,
  },
});

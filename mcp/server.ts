#!/usr/bin/env node
/**
 * React Components Kit — MCP server (https://mcp.reactcomponents.dev)
 *
 *   POST /mcp            Streamable HTTP (current MCP transport, stateless)
 *   GET  /sse            legacy HTTP+SSE transport (older clients)
 *   POST /messages       legacy SSE message endpoint
 *   GET  /health         health check for Coolify / Docker
 *   GET  /               landing page with connection instructions
 *
 *   node server.mjs --stdio   → stdio transport for local clients
 */
import http, { type IncomingMessage, type ServerResponse } from 'node:http';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createMcpServer } from './tools';
import { stats, templates, PKG, SITE } from './data';
import { landingPage } from './landing';

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const RATE_MAX = Number(process.env.RATE_LIMIT_MAX) || 120; // requests per minute per IP
const MAX_BODY = 1024 * 1024;

if (process.argv.includes('--stdio')) {
  await createMcpServer().connect(new StdioServerTransport());
} else {
  startHttp();
}

function startHttp() {
  const sse = new Map<string, SSEServerTransport>();
  const hits = new Map<string, { n: number; reset: number }>();
  setInterval(() => {
    const now = Date.now();
    for (const [ip, h] of hits) if (h.reset < now) hits.delete(ip);
  }, 60_000).unref();

  const limited = (req: IncomingMessage) => {
    const ip = String(req.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? '').split(',')[0].trim();
    const now = Date.now();
    const h = hits.get(ip);
    if (!h || h.reset < now) {
      hits.set(ip, { n: 1, reset: now + 60_000 });
      return false;
    }
    return ++h.n > RATE_MAX;
  };

  const readBody = (req: IncomingMessage) =>
    new Promise<unknown>((resolve, reject) => {
      let size = 0;
      const chunks: Buffer[] = [];
      req.on('data', (c: Buffer) => {
        size += c.length;
        if (size > MAX_BODY) {
          reject(Object.assign(new Error('Payload too large'), { status: 413 }));
          req.destroy();
        } else chunks.push(c);
      });
      req.on('end', () => {
        const raw = Buffer.concat(chunks).toString('utf8');
        if (!raw) return resolve(undefined);
        try {
          resolve(JSON.parse(raw));
        } catch {
          reject(Object.assign(new Error('Invalid JSON'), { status: 400 }));
        }
      });
      req.on('error', reject);
    });

  const send = (res: ServerResponse, status: number, body: unknown, type = 'application/json; charset=utf-8') => {
    if (res.headersSent) return;
    res.writeHead(status, { 'Content-Type': type });
    res.end(typeof body === 'string' ? body : JSON.stringify(body));
  };
  const rpcError = (res: ServerResponse, status: number, message: string) =>
    send(res, status, { jsonrpc: '2.0', error: { code: -32000, message }, id: null });

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url ?? '/', 'http://localhost');
    const route = url.pathname.replace(/\/+$/, '') || '/';

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, Mcp-Session-Id, Mcp-Protocol-Version, Last-Event-ID');
    res.setHeader('Access-Control-Expose-Headers', 'Mcp-Session-Id');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    if (req.method === 'OPTIONS') return void res.writeHead(204).end();

    try {
      if (route === '/health') {
        const s = stats();
        return send(res, 200, { status: 'ok', service: 'react-components-kit-mcp', version: s.version, components: s.components, sections: s.sections, templates: s.templates, sseSessions: sse.size, uptimeSeconds: Math.floor(process.uptime()) });
      }
      if (route === '/' && req.method === 'GET') {
        return send(res, 200, landingPage(), 'text/html; charset=utf-8');
      }
      if (limited(req)) {
        res.setHeader('Retry-After', '60');
        return rpcError(res, 429, `Rate limit of ${RATE_MAX} requests per minute exceeded.`);
      }

      // Streamable HTTP — stateless: one server + transport per request.
      if (route === '/mcp') {
        if (req.method !== 'POST') {
          res.setHeader('Allow', 'POST, OPTIONS');
          return rpcError(res, 405, 'Method not allowed. This endpoint is stateless: send JSON-RPC with POST.');
        }
        const body = await readBody(req);
        const mcp = createMcpServer();
        const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
        res.on('close', () => {
          transport.close();
          mcp.close();
        });
        await mcp.connect(transport);
        return await transport.handleRequest(req, res, body);
      }

      // Legacy HTTP+SSE
      if (route === '/sse' && req.method === 'GET') {
        const transport = new SSEServerTransport('/messages', res);
        sse.set(transport.sessionId, transport);
        res.on('close', () => sse.delete(transport.sessionId));
        const ping = setInterval(() => res.write(': ping\n\n'), 25_000);
        res.on('close', () => clearInterval(ping));
        return await createMcpServer().connect(transport);
      }
      if (route === '/messages' && req.method === 'POST') {
        const transport = sse.get(url.searchParams.get('sessionId') ?? '');
        if (!transport) return rpcError(res, 404, 'Unknown or expired sessionId. Reconnect to /sse.');
        return await transport.handlePostMessage(req, res, await readBody(req));
      }

      send(res, 404, { error: 'Not found', endpoints: ['/mcp', '/sse', '/health'] });
    } catch (err) {
      const status = (err as { status?: number }).status ?? 500;
      if (status === 500) console.error('[mcp]', err);
      rpcError(res, status, (err as Error).message || 'Internal error');
    }
  });

  server.listen(PORT, HOST, () => {
    const s = stats();
    console.log(`React Components Kit MCP v${s.version} — ${s.components} components, ${s.sections} sections, ${templates.length} templates`);
    console.log(`  http://${HOST}:${PORT}/mcp  (Streamable HTTP)  ·  /sse (legacy)  ·  /health   [${PKG} → ${SITE}]`);
  });

  const shutdown = () => server.close(() => process.exit(0));
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

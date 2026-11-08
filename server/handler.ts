import { prepareOrder } from './orders';

// Short-lived idempotency only; WhatsApp remains the restaurant's receiving
// channel. No customer/order database is introduced by this endpoint.
const requests = new Map<string, { fingerprint: string; expires: number; order: ReturnType<typeof prepareOrder> }>();
const TTL = 15 * 60 * 1000;

export async function handleRequest(request: Request): Promise<Response> {
  if (new URL(request.url).pathname !== '/api/orders') return Response.json({ error: 'לא נמצא' }, { status: 404 });
  if (request.method !== 'POST') return Response.json({ error: 'פעולה לא נתמכת' }, { status: 405, headers: { Allow: 'POST' } });
  if (!request.headers.get('content-type')?.includes('application/json')) return Response.json({ error: 'פורמט לא תקין' }, { status: 415 });
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return Response.json({ error: 'מקור לא מורשה' }, { status: 403 });
  try {
    const raw = await request.text();
    if (raw.length > 100_000) return Response.json({ error: 'הבקשה גדולה מדי' }, { status: 413 });
    const input = JSON.parse(raw);
    if (!input || typeof input.requestId !== 'string' || !/^[\w-]{10,100}$/.test(input.requestId)) throw new Error('מזהה בקשה לא תקין');
    const now = Date.now();
    for (const [key, value] of requests) if (value.expires <= now) requests.delete(key);
    const fingerprint = JSON.stringify([input.items, input.customer, input.expectedSubtotal]);
    const previous = requests.get(input.requestId);
    if (previous) {
      if (previous.fingerprint !== fingerprint) throw new Error('מזהה הבקשה כבר בשימוש');
      return Response.json(previous.order, { headers: { 'Cache-Control': 'no-store' } });
    }
    const order = prepareOrder(input);
    // Bound process memory; this cache is deliberately not durable storage.
    if (requests.size >= 1000) requests.delete(requests.keys().next().value!);
    requests.set(input.requestId, { fingerprint, expires: now + TTL, order });
    return Response.json(order, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'לא ניתן לאמת את ההזמנה' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
  }
}

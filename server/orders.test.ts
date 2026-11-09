import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { configuredLine, defaultRoll } from '../src/dishes/configuration';
import { buildOrderWhatsAppLink } from '../src/cart/whatsapp';
import { prepareOrder } from './orders';
import { handleRequest } from './handler';

const openTime = new Date('2026-11-08T10:00:00Z');
function payload() {
  return {
    requestId: crypto.randomUUID(),
    items: [{ ...configuredLine('pad-thai', { choice: 'עוף', removedIngredients: ['בצל ירוק'] }, 2, 'בלי חריף, לחתוך ל-10 יחידות'), lineId: 'line-1' }],
    customer: { name: 'לקוח בדיקה', phone: '0501234567', fulfillment: 'delivery', address: 'כליל החורש 7', deliveryZone: 'nahariya', paymentMethod: 'credit' },
    expectedSubtotal: 112,
  };
}
function request(body: unknown, extra: Record<string, string> = {}) {
  return new Request('http://localhost/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json', ...extra }, body: JSON.stringify(body) });
}

describe('server price validation and the restaurant order', () => {
  beforeEach(() => { vi.useFakeTimers(); vi.setSystemTime(openTime); });
  afterEach(() => vi.useRealTimers());
  it('recalculates untrusted names, options, prices and delivery totals and keeps kitchen notes', () => {
    const input = payload();
    input.items[0].unitPrice = 1;
    input.items[0].name = 'שם מזויף';
    input.items[0].options = ['מחיר מזויף'];
    const order = prepareOrder(input, openTime, 'SW-test');
    expect(order.subtotal).toBe(112);
    expect(order.deliveryFee).toBe(20);
    expect(order.total).toBe(132);
    expect(order.items[0]).toMatchObject({ name: 'פאד תאי', unitPrice: 56, options: ['תוספת: עוף (+₪10)', 'ללא בצל ירוק'], notes: 'בלי חריף, לחתוך ל-10 יחידות' });
    const stored = JSON.parse(JSON.stringify(order));
    const message = new URL(buildOrderWhatsAppLink(stored)).searchParams.get('text');
    expect(message).toContain('ללא בצל ירוק');
    expect(message).toContain('בקשות מיוחדות למנה: בלי חריף, לחתוך ל-10 יחידות');
    expect(message).toContain('₪56 × 2 = ₪112');
    expect(message).toContain('סה״כ לתשלום: ₪132');
    expect(message).toContain('*אמצעי תשלום:* אשראי');
  });
  it('requires a known payment method', () => {
    const input = payload();
    expect(() => prepareOrder({ ...input, customer: { ...input.customer, paymentMethod: undefined } }, openTime)).toThrow('נא לבחור אמצעי תשלום');
    expect(() => prepareOrder({ ...input, customer: { ...input.customer, paymentMethod: 'toString' } }, openTime)).toThrow('נא לבחור אמצעי תשלום');
  });
  it('rejects a forged subtotal, unknown product, invalid extras and missing required choices', async () => {
    const inputs: unknown[] = [
      { ...payload(), expectedSubtotal: 1 },
      { ...payload(), items: [{ ...payload().items[0], productId: 'missing' }] },
      { ...payload(), items: [{ ...payload().items[0], customization: { choice: 'עוף', addons: ['fake'] } }] },
      { ...payload(), items: [{ ...payload().items[0], customization: {} }] },
      { ...payload(), items: [{ ...payload().items[0], quantity: -1 }] },
    ];
    for (const input of inputs) expect((await handleRequest(request(input))).status).toBe(400);
  });
  it('does not trust missing structured choices or unknown fields even when option text looks valid', () => {
    const input = payload();
    const bad = { ...input.items[0], customization: undefined };
    expect(() => prepareOrder({ ...input, items: [bad] }, openTime)).toThrow();
    expect(() => prepareOrder({ ...input, items: [{ ...bad, customization: { choice: 'עוף', unitPrice: 0 } }] }, openTime)).toThrow();
  });
  it('rejects ordering outside opening hours and does not clear/rewrite submitted inputs', async () => {
    vi.setSystemTime(new Date('2026-11-06T10:00:00Z'));
    const input = payload();
    const before = JSON.stringify(input);
    expect((await handleRequest(request(input))).status).toBe(400);
    expect(JSON.stringify(input)).toBe(before);
  });
  it('does not create a duplicate order on retries', async () => {
    const input = payload();
    const first = await (await handleRequest(request(input))).json();
    const second = await (await handleRequest(request(input))).json();
    expect(first.orderNumber).toMatch(/^SW-/);
    expect(second).toEqual(first);
    expect((await handleRequest(request({ ...input, expectedSubtotal: 1 }))).status).toBe(400);
  });
  it('validates all existing special flows together without losing selections', () => {
    const lines = [
      configuredLine('build-I/O', { roll: { ...defaultRoll('I/O'), vegetables: ['אבוקדו'], wrap: 'סלמון נא' } }, 1, 'רול ראשון'),
      configuredLine('sushibox', { rollIds: ['crispy-roll', 'spicy-salmon', 'dragon-roll', 'rainbow-fish', 'sun-roll'] }, 1),
      configuredLine('promo-wok-roll', { wokId: 'fried-rice', protein: 'עוף', roll: { ...defaultRoll('I/O', 'veggie'), vegetables: ['אבוקדו', 'מלפפון', 'בטטה'] } }, 1, 'מבצע'),
      configuredLine('kids-schnitzel', { drink: 'ענבים', side: 'צ׳יפס' }, 1),
    ].map((item, index) => ({ ...item, lineId: `l-${index}` }));
    const order = prepareOrder({ ...payload(), items: lines, expectedSubtotal: 416 }, openTime);
    expect(order.items.map((item) => item.unitPrice)).toEqual([49, 249, 79, 39]);
    expect(order.items[0].customization?.roll?.wrap).toBe('סלמון נא');
    expect(order.items[2].notes).toBe('מבצע');
  });
  it('keeps unknown delivery fees pending and requires an explicit delivery zone', () => {
    const input = payload();
    expect(prepareOrder({ ...input, customer: { ...input.customer, deliveryZone: 'other' } }, openTime).total).toBe(112);
    expect(() => prepareOrder({ ...input, customer: { ...input.customer, deliveryZone: undefined } }, openTime)).toThrow();
  });
  it('rejects malformed requests, wrong methods, cross-origin calls and oversized bodies', async () => {
    expect((await handleRequest(new Request('http://localhost/api/orders'))).status).toBe(405);
    expect((await handleRequest(request(payload(), { origin: 'https://other.example' }))).status).toBe(403);
    expect((await handleRequest(new Request('http://localhost/api/orders', { method: 'POST', body: '{}' }))).status).toBe(415);
    expect((await handleRequest(new Request('http://localhost/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' }))).status).toBe(400);
    expect((await handleRequest(request({ huge: 'x'.repeat(100_000) }))).status).toBe(413);
  });
});

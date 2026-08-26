import { describe, expect, it } from 'vitest';
import { buildOrderWhatsAppLink } from './whatsapp';
import type { CartLine, CustomerDetails, OrderSnapshot } from './types';

function decodeMessage(link: string): string {
  const url = new URL(link);
  return url.searchParams.get('text') ?? '';
}

function makeOrder(overrides: Partial<OrderSnapshot> = {}): OrderSnapshot {
  const customer: CustomerDetails = {
    name: 'איתן',
    phone: '0586890689',
    fulfillment: 'pickup',
    ...overrides.customer,
  };
  return {
    orderNumber: 'SW-1002',
    createdAt: new Date().toISOString(),
    status: 'PENDING_CUSTOMER_SEND',
    items: [],
    subtotal: 0,
    deliveryFee: 0,
    total: 0,
    ...overrides,
    customer,
  };
}

const cocaColaZero: CartLine = {
  lineId: 'l1',
  productId: 'coke-zero',
  name: 'קוקה קולה זירו',
  unitPrice: 10,
  quantity: 1,
  options: [],
};

const customRoll: CartLine = {
  lineId: 'l2',
  productId: 'build-I/O',
  name: 'I/O (הרכבה אישית)',
  unitPrice: 49,
  quantity: 1,
  options: ['בסיס: דג', 'דג: סלמון', 'ירקות: אבוקדו', 'מעטפה: סלמון צרוב (+₪10)'],
};

describe('buildOrderWhatsAppLink', () => {
  it('does not show a redundant "unit × 1 = total" calculation for quantity 1', () => {
    const order = makeOrder({ items: [cocaColaZero], subtotal: 10 });
    const message = decodeMessage(buildOrderWhatsAppLink(order));

    expect(message).toContain('*1 × קוקה קולה זירו*');
    expect(message).toContain('₪10');
    expect(message).not.toContain('₪10 × 1 = ₪10');
  });

  it('shows the quantity calculation when quantity is greater than 1', () => {
    const threeColas: CartLine = { ...cocaColaZero, quantity: 3 };
    const order = makeOrder({ items: [threeColas], subtotal: 30 });
    const message = decodeMessage(buildOrderWhatsAppLink(order));

    expect(message).toContain('*3 × קוקה קולה זירו*');
    expect(message).toContain('₪10 × 3 = *₪30*');
  });

  it('renders a customized item with its selected options and paid extras, priced once', () => {
    const order = makeOrder({ items: [customRoll], subtotal: 49 });
    const message = decodeMessage(buildOrderWhatsAppLink(order));

    expect(message).toContain('*1 × I/O (הרכבה אישית)*');
    expect(message).toContain('• בסיס: דג');
    expect(message).toContain('• דג: סלמון');
    expect(message).toContain('• ירקות: אבוקדו');
    expect(message).toContain('• מעטפה: סלמון צרוב (+₪10)');
    // the +₪10 extra must be reflected exactly once in the final item price, not double-counted
    expect(message.match(/\*מחיר: ₪49\*/g)?.length).toBe(1);
  });

  it('shows the pickup label and no address for pickup orders', () => {
    const order = makeOrder({
      items: [cocaColaZero],
      subtotal: 10,
      customer: { name: 'איתן', phone: '0586890689', fulfillment: 'pickup' },
    });
    const message = decodeMessage(buildOrderWhatsAppLink(order));

    expect(message).toContain('🛍️ *סוג הזמנה:* איסוף עצמי');
    expect(message).not.toContain('כתובת');
    expect(message).not.toContain('משלוח');
  });

  it('shows delivery address details for delivery orders', () => {
    const order = makeOrder({
      items: [cocaColaZero],
      subtotal: 10,
      customer: {
        name: 'איתן',
        phone: '0586890689',
        fulfillment: 'delivery',
        address: 'ויצמן 12',
        city: 'נהריה',
        floorApartment: 'קומה 2, דירה 6',
      },
    });
    const message = decodeMessage(buildOrderWhatsAppLink(order));

    expect(message).toContain('🛵 *סוג הזמנה:* משלוח');
    expect(message).toContain('📍 *כתובת:* ויצמן 12, נהריה');
    expect(message).toContain('🏠 *דירה/קומה:* קומה 2, דירה 6');
  });

  it('omits the notes section entirely when there are no order notes', () => {
    const order = makeOrder({ items: [cocaColaZero], subtotal: 10 });
    const message = decodeMessage(buildOrderWhatsAppLink(order));

    expect(message).not.toContain('הערות להזמנה');
  });

  it('includes the order notes when present', () => {
    const order = makeOrder({
      items: [cocaColaZero],
      subtotal: 10,
      customer: { name: 'איתן', phone: '0586890689', fulfillment: 'pickup', orderNotes: 'בלי חריף' },
    });
    const message = decodeMessage(buildOrderWhatsAppLink(order));

    expect(message).toContain('📝 *הערות להזמנה*');
    expect(message).toContain('בלי חריף');
  });

  it('shows the authoritative total exactly once in the main total line', () => {
    const order = makeOrder({ items: [cocaColaZero, customRoll], subtotal: 59, total: 59 });
    const message = decodeMessage(buildOrderWhatsAppLink(order));

    const totalLineMatches = message.match(/סה״כ לתשלום: ₪59/g);
    expect(totalLineMatches?.length).toBe(1);
  });

  it('adds the fixed ₪20 Nahariya delivery fee to the shown total and calls it out as its own line', () => {
    const order = makeOrder({
      items: [cocaColaZero],
      subtotal: 10,
      deliveryFee: 20,
      total: 30,
      customer: { name: 'איתן', phone: '0586890689', fulfillment: 'delivery', address: 'ויצמן 12', city: 'נהריה', deliveryZone: 'nahariya' },
    });
    const message = decodeMessage(buildOrderWhatsAppLink(order));

    expect(message).toContain('🛵 *דמי משלוח (נהריה): ₪20*');
    expect(message).toContain('💰 *סה״כ לתשלום: ₪30*');
    expect(message).not.toContain('יתואמו לפי מרחק');
  });

  it('never invents a delivery price for a non-Nahariya delivery, and says the fee is pending confirmation', () => {
    const order = makeOrder({
      items: [cocaColaZero],
      subtotal: 10,
      deliveryFee: 0,
      total: 10,
      customer: { name: 'איתן', phone: '0586890689', fulfillment: 'delivery', address: 'הרצל 5', city: 'עכו', deliveryZone: 'other' },
    });
    const message = decodeMessage(buildOrderWhatsAppLink(order));

    expect(message).toContain('🛵 *דמי משלוח:* יתואמו לפי מרחק/מיקום ויאושרו מול הלקוח');
    expect(message).toContain('💰 *סה״כ מוצרים (ללא דמי משלוח): ₪10*');
    expect(message).not.toContain('₪0');
    expect(message).not.toContain('סה״כ לתשלום');
  });

  it('shows no delivery fee line for pickup orders', () => {
    const order = makeOrder({ items: [cocaColaZero], subtotal: 10, deliveryFee: 0, total: 10 });
    const message = decodeMessage(buildOrderWhatsAppLink(order));

    expect(message).not.toContain('דמי משלוח');
    expect(message).toContain('💰 *סה״כ לתשלום: ₪10*');
  });

  it('uses the existing order number, both near the top and repeated at the bottom, without generating a new one', () => {
    const order = makeOrder({ items: [cocaColaZero], subtotal: 10, orderNumber: 'SW-2048' });
    const message = decodeMessage(buildOrderWhatsAppLink(order));

    expect(message).toContain('🧾 *הזמנה #SW-2048*');
    expect(message).toContain('📌 *מספר הזמנה: SW-2048*');
    expect(message.match(/SW-2048/g)?.length).toBe(2);
  });

  it('percent-encodes Hebrew, ₪, ×, •, *, # and line breaks safely inside the wa.me link', () => {
    const order = makeOrder({ items: [cocaColaZero, customRoll], subtotal: 59 });
    const link = buildOrderWhatsAppLink(order);

    expect(link.startsWith('https://wa.me/')).toBe(true);
    expect(link).not.toContain(' '); // must be percent-encoded, no raw spaces
    expect(link).not.toContain('\n'); // must be percent-encoded, no raw newlines

    const message = decodeMessage(link);
    expect(message).toContain('₪');
    expect(message).toContain('×');
    expect(message).toContain('•');
    expect(message).toContain('*');
    expect(message).toContain('#');
    expect(message).toContain('\n');
  });
});

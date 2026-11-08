import { configuredLine } from '../src/dishes/configuration';
import { getDeliveryFee } from '../src/cart/delivery';
import { getStoreStatus } from '../src/data/hours';
import type { CustomerDetails, OrderSnapshot } from '../src/cart/types';

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('בקשה לא תקינה');
  return value as Record<string, unknown>;
}
function text(value: unknown, max = 500): string {
  if (value === undefined) return '';
  if (typeof value !== 'string' || value.length > max) throw new Error('פרטים לא תקינים');
  return value.trim();
}

export function validateCustomer(input: unknown): CustomerDetails {
  const source = record(input);
  const name = text(source.name, 100);
  const phone = text(source.phone, 30).replace(/[\s-]/g, '');
  if (name.length < 2 || !/^(0\d{8,9}|\+972\d{8,9})$/.test(phone)) throw new Error('נא להזין שם ומספר טלפון תקינים');
  if (source.fulfillment !== 'pickup' && source.fulfillment !== 'delivery') throw new Error('אופן קבלה לא תקין');
  const delivery = source.fulfillment === 'delivery';
  if (delivery && (!text(source.address) || !['nahariya', 'other'].includes(String(source.deliveryZone)))) throw new Error('נא להזין כתובת ואזור משלוח');
  return {
    name, phone, fulfillment: source.fulfillment,
    ...(delivery ? { address: text(source.address), city: text(source.city, 100), deliveryZone: source.deliveryZone as 'nahariya' | 'other', floorApartment: text(source.floorApartment, 100), courierNotes: text(source.courierNotes) } : {}),
    orderNotes: text(source.orderNotes),
  };
}

/** Server and dev middleware explicitly run in the restaurant's timezone. */
export function prepareOrder(input: unknown, now = new Date(), orderNumber = `SW-${crypto.randomUUID()}`): OrderSnapshot {
  if (!getStoreStatus(now).open) throw new Error('המסעדה סגורה להזמנות');
  const source = record(input);
  if (!Array.isArray(source.items) || source.items.length < 1 || source.items.length > 100) throw new Error('סל לא תקין');
  const customer = validateCustomer(source.customer);
  const items = source.items.map((value) => {
    const item = record(value);
    if (typeof item.productId !== 'string' || typeof item.lineId !== 'string' || item.lineId.length > 100) throw new Error('פריט לא תקין');
    // Names, option labels, unit prices and totals supplied by the browser are ignored.
    return { ...configuredLine(item.productId, item.customization, item.quantity as number, item.notes as string | undefined), lineId: item.lineId };
  });
  if (new Set(items.map((item) => item.lineId)).size !== items.length) throw new Error('פריט כפול בסל');
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  if (typeof source.expectedSubtotal !== 'number' || source.expectedSubtotal !== subtotal) throw new Error('מחיר ההזמנה השתנה. חזרו לסל ועדכנו את המנות לפני השליחה');
  const deliveryFee = getDeliveryFee(customer.fulfillment, customer.deliveryZone);
  return { orderNumber, createdAt: now.toISOString(), status: 'PENDING_CUSTOMER_SEND', items, subtotal, deliveryFee, total: subtotal + deliveryFee, customer };
}

import { BUSINESS } from '../data/business';
import type { CartLine, CustomerDetails, OrderSnapshot } from './types';

const DIVIDER = '━━━━━━━━━━━━━━';

/**
 * Renders one cart line as a scannable block:
 *   *1 × קוקה קולה זירו*
 *   ₪10
 * or, for a customized item (has option bullets):
 *   *1 × I/O (הרכבה אישית)*
 *   • בסיס: דג
 *   • ...
 *   *מחיר: ₪49*
 * Quantity 1 never shows a redundant "₪10 × 1 = ₪10" calculation.
 */
function formatItemBlock(item: CartLine): string {
  const isCustomized = item.options.length > 0;
  const lineTotal = item.unitPrice * item.quantity;

  const lines: string[] = [`*${item.quantity} × ${item.name}*`];
  for (const option of item.options) {
    lines.push(`• ${option}`);
  }

  if (isCustomized) {
    lines.push(item.quantity > 1 ? `*מחיר: ₪${item.unitPrice} × ${item.quantity} = ₪${lineTotal}*` : `*מחיר: ₪${item.unitPrice}*`);
  } else {
    lines.push(item.quantity > 1 ? `₪${item.unitPrice} × ${item.quantity} = *₪${lineTotal}*` : `₪${item.unitPrice}`);
  }

  return lines.join('\n');
}

/** Customer + fulfillment block. Delivery-only fields are included only when they actually have data. */
function formatCustomerLines(customer: CustomerDetails): string[] {
  const lines = [`👤 *לקוח:* ${customer.name}`, `📞 *טלפון:* ${customer.phone}`];

  if (customer.fulfillment === 'pickup') {
    lines.push('🛍️ *סוג הזמנה:* איסוף עצמי');
    return lines;
  }

  lines.push('🛵 *סוג הזמנה:* משלוח');
  const addressLine = [customer.address, customer.city].filter((part) => part?.trim()).join(', ');
  if (addressLine) lines.push(`📍 *כתובת:* ${addressLine}`);
  if (customer.floorApartment?.trim()) lines.push(`🏠 *דירה/קומה:* ${customer.floorApartment.trim()}`);
  if (customer.courierNotes?.trim()) lines.push(`🗒️ *הערות לשליח:* ${customer.courierNotes.trim()}`);

  return lines;
}

/**
 * Builds the wa.me deep link carrying the full, human-readable order — the only
 * place order data is transmitted (there is no backend). Uses only the order's
 * own already-computed prices/total; never recalculates anything.
 */
export function buildOrderWhatsAppLink(order: OrderSnapshot): string {
  const parts: string[] = [];

  parts.push(`🍣 *${BUSINESS.nameHe} | הזמנה חדשה*`);
  parts.push(DIVIDER);
  parts.push(`🧾 *הזמנה #${order.orderNumber}*`);
  parts.push(...formatCustomerLines(order.customer));

  parts.push('🍱 *פרטי ההזמנה*');
  parts.push(DIVIDER);
  for (const item of order.items) {
    parts.push(formatItemBlock(item));
  }
  parts.push(DIVIDER);

  parts.push(`💰 *סה״כ לתשלום: ₪${order.subtotal}*`);
  parts.push(DIVIDER);

  if (order.customer.orderNotes?.trim()) {
    parts.push('📝 *הערות להזמנה*');
    parts.push(order.customer.orderNotes.trim());
  }

  parts.push(`📌 *מספר הזמנה: ${order.orderNumber}*`);

  return `https://wa.me/${BUSINESS.whatsappPhone}?text=${encodeURIComponent(parts.join('\n'))}`;
}

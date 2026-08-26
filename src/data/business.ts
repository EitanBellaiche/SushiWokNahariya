export const BUSINESS = {
  name: 'Sushi Wok Nahariya',
  nameHe: 'סושי ווק נהריה',
  phone: '+972528205470',
  phoneDisplay: '052-8205470',
  whatsappPhone: '972528205470',
  address: 'כליל החורש 7, נהריה',
  city: 'נהריה',
  kosher: 'כשר',
  kosherAuthority: 'בהשגחת הרבנות נהריה',
  serviceLine: 'משלוחים | איסוף עצמי',
  hoursWeekday: "א׳–ה׳: 11:00–23:00",
  hoursWeekend: 'שבת: חצי שעה לאחר צאת השבת ועד 23:30',
  siteUrl: 'https://www.sushiwoknahariya.com',
  /**
   * TODO(legal): no dedicated privacy/legal email exists in this project. The
   * legal pages therefore point customers to phone/WhatsApp instead of an
   * email address. If the business sets up one (e.g. privacy@...), add it
   * here and the pages will pick it up automatically.
   */
  email: undefined as string | undefined,
  /** Centralized "last updated" date shown on every legal page — edit once here. */
  lastLegalUpdate: '26.08.2026',
} as const;

export const PROMO = {
  title: 'מבצע!',
  text: 'מוקפץ לבחירה + רול בהרכבה עצמית',
  priceLabel: '₪ בלבד',
  price: '69',
  numericPrice: 69,
} as const;

export function buildWhatsAppLink(message?: string) {
  const text =
    message ?? `היי ${BUSINESS.nameHe}, אשמח להזמין בבקשה:`;
  return `https://wa.me/${BUSINESS.whatsappPhone}?text=${encodeURIComponent(text)}`;
}

export function buildCartWhatsAppLink(
  lines: string[],
  total: number,
  customerName?: string,
  customerPhone?: string,
  customerNotes?: string,
) {
  const message: string[] = [];
  message.push(`היי ${BUSINESS.nameHe}, אני רוצה להזמין:`);
  message.push('');
  message.push(...lines);
  message.push('');
  message.push(`סה״כ: ₪${total}`);

  if (customerName?.trim()) message.push(`שם: ${customerName.trim()}`);
  if (customerPhone?.trim()) message.push(`טלפון: ${customerPhone.trim()}`);
  if (customerNotes?.trim()) message.push(`הערות: ${customerNotes.trim()}`);

  message.push('');
  message.push('אשמח לאישור הזמנה 🙏');

  return `https://wa.me/${BUSINESS.whatsappPhone}?text=${encodeURIComponent(message.join('\n'))}`;
}

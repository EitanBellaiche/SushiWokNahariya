import type { FulfillmentType } from './types';

/**
 * Single source of truth for delivery pricing. The business only has a fixed
 * rate for deliveries inside Nahariya — everywhere else varies by distance
 * and is confirmed by the business directly, so we deliberately never invent
 * a number for it here.
 */
export type DeliveryZone = 'nahariya' | 'other';

export const NAHARIYA_DELIVERY_FEE = 20;

export const DELIVERY_ZONE_LABELS: Record<DeliveryZone, string> = {
  nahariya: 'נהריה (משלוח בתוך העיר)',
  other: 'עיר אחרת',
};

/** ₪ fee to add to the order total. 0 for pickup, and 0 for a zone whose price isn't fixed yet — see isDeliveryFeePending. */
export function getDeliveryFee(fulfillment: FulfillmentType, zone?: DeliveryZone): number {
  if (fulfillment !== 'delivery') return 0;
  return zone === 'nahariya' ? NAHARIYA_DELIVERY_FEE : 0;
}

/** True when the order is a delivery whose fee is not yet known and must be confirmed with the customer. */
export function isDeliveryFeePending(fulfillment: FulfillmentType, zone?: DeliveryZone): boolean {
  return fulfillment === 'delivery' && zone !== 'nahariya';
}

/** Single source of truth for the estimated delivery time copy — shown on the menu and in the cart, per the client's exact wording. */
export const DELIVERY_TIME_ESTIMATE = {
  headline: 'זמן משלוח משוער: 50–70 דקות',
  detail: 'הזמן עשוי להשתנות בהתאם לעומס ולמרחק, ולעיתים ההזמנה תגיע מוקדם יותר.',
} as const;

import type { DeliveryZone } from './delivery';

export type FulfillmentType = 'pickup' | 'delivery';

export type CartLine = {
  lineId: string;
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
  /** Human-readable option lines, e.g. "דג: סלמון", already reflected in unitPrice where relevant. */
  options: string[];
};

export type CustomerDetails = {
  name: string;
  phone: string;
  fulfillment: FulfillmentType;
  address?: string;
  city?: string;
  floorApartment?: string;
  courierNotes?: string;
  orderNotes?: string;
  /** Only meaningful when fulfillment === 'delivery'; determines the delivery fee — see cart/delivery.ts. */
  deliveryZone?: DeliveryZone;
};

// Kept broad on purpose so a future order-management dashboard can move orders
// through this lifecycle without changing the shape of existing data.
export type OrderStatus =
  | 'PENDING_CUSTOMER_SEND'
  | 'RECEIVED'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'READY'
  | 'COMPLETED'
  | 'CANCELLED';

export type OrderSnapshot = {
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  items: CartLine[];
  /** Items only — never includes the delivery fee. */
  subtotal: number;
  /** ₪ delivery fee already included in `total`. 0 for pickup and for a pending-price delivery zone. */
  deliveryFee: number;
  /** subtotal + deliveryFee. For a pending-price delivery zone this equals subtotal — the real fee isn't known yet. */
  total: number;
  customer: CustomerDetails;
};

export type CheckoutStep = 'cart' | 'checkout' | 'confirmation';

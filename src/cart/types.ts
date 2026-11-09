import type { DeliveryZone } from './delivery';
import type { PaymentMethod } from './payment';
import type { DishCustomization } from '../dishes/types';

export type FulfillmentType = 'pickup' | 'delivery';

export type CartLine = {
  lineId: string;
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
  /** Human-readable option lines, e.g. "דג: סלמון", already reflected in unitPrice where relevant. */
  options: string[];
  customization?: DishCustomization;
  /** Per-dish kitchen instructions, separate from order/courier notes. */
  notes?: string;
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
  /** Required by the server for new orders; optional here because snapshots saved in the browser before this field existed lack it. */
  paymentMethod?: PaymentMethod;
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

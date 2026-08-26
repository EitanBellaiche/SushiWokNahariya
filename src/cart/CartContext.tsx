import React from 'react';
import type { CartLine, CheckoutStep, CustomerDetails, OrderSnapshot } from './types';

const CART_KEY = 'sushiwok:cart:v1';
const ORDER_SEQ_KEY = 'sushiwok:orderSeq:v1';
const LAST_ORDER_KEY = 'sushiwok:lastOrder:v1';

function makeId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function readStorage(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // storage unavailable (private mode / quota) — feature degrades to in-memory only
  }
}

function isCartLine(value: unknown): value is CartLine {
  if (!value || typeof value !== 'object') return false;
  const l = value as Record<string, unknown>;
  return (
    typeof l.lineId === 'string' &&
    typeof l.productId === 'string' &&
    typeof l.name === 'string' &&
    typeof l.unitPrice === 'number' &&
    typeof l.quantity === 'number' &&
    Array.isArray(l.options)
  );
}

function loadCart(): CartLine[] {
  const raw = readStorage(CART_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isCartLine) : [];
  } catch {
    return [];
  }
}

function loadLastOrder(): OrderSnapshot | null {
  const raw = readStorage(LAST_ORDER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as OrderSnapshot;
  } catch {
    return null;
  }
}

/**
 * Generates a human-facing order number (e.g. SW-1047) from a counter kept in
 * localStorage. This is NOT a server-authoritative id — the project is a static
 * site with no backend/database, so nothing can issue a globally unique number.
 * It is stable and sequential per browser, which is enough since WhatsApp (a
 * human on the other end) is the actual order-receiving system.
 */
function nextOrderNumber(): string {
  const current = Number(readStorage(ORDER_SEQ_KEY) ?? '1000');
  const base = Number.isFinite(current) && current >= 1000 ? current : 1000;
  const next = base + 1;
  writeStorage(ORDER_SEQ_KEY, String(next));
  return `SW-${next}`;
}

function lineKey(productId: string, options: string[]): string {
  return `${productId}::${options.join('|')}`;
}

export type AddLineInput = {
  productId: string;
  name: string;
  unitPrice: number;
  quantity?: number;
  options?: string[];
};

type CartContextValue = {
  items: CartLine[];
  totalItems: number;
  totalPrice: number;
  addLine: (line: AddLineInput) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeLine: (lineId: string) => void;

  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  checkoutStep: CheckoutStep;
  goToCheckout: () => void;
  backToCart: () => void;

  lastOrder: OrderSnapshot | null;
  isSubmitting: boolean;
  /** Creates the order (once), clears the cart, and moves to the confirmation step. Safe against double-submits. */
  completeOrder: (customer: CustomerDetails) => OrderSnapshot;
  dismissConfirmation: () => void;
};

const CartContext = React.createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartLine[]>(() => loadCart());
  const [lastOrder, setLastOrder] = React.useState<OrderSnapshot | null>(() => loadLastOrder());
  const [isCartOpen, setCartOpen] = React.useState(false);
  const [checkoutStep, setCheckoutStep] = React.useState<CheckoutStep>('cart');
  const [isSubmitting, setSubmitting] = React.useState(false);
  const hasSubmittedRef = React.useRef(false);

  React.useEffect(() => {
    writeStorage(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addLine = React.useCallback((line: AddLineInput) => {
    const options = line.options ?? [];
    const qty = line.quantity ?? 1;
    setItems((prev) => {
      const key = lineKey(line.productId, options);
      const existingIndex = prev.findIndex((l) => lineKey(l.productId, l.options) === key);
      if (existingIndex >= 0) {
        const next = [...prev];
        next[existingIndex] = { ...next[existingIndex], quantity: next[existingIndex].quantity + qty };
        return next;
      }
      return [
        ...prev,
        { lineId: makeId(), productId: line.productId, name: line.name, unitPrice: line.unitPrice, quantity: qty, options },
      ];
    });
  }, []);

  const updateQuantity = React.useCallback((lineId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((l) => l.lineId !== lineId);
      return prev.map((l) => (l.lineId === lineId ? { ...l, quantity } : l));
    });
  }, []);

  const removeLine = React.useCallback((lineId: string) => {
    setItems((prev) => prev.filter((l) => l.lineId !== lineId));
  }, []);

  const totalItems = items.reduce((sum, l) => sum + l.quantity, 0);
  const totalPrice = items.reduce((sum, l) => sum + l.quantity * l.unitPrice, 0);

  const completeOrder = React.useCallback(
    (customer: CustomerDetails): OrderSnapshot => {
      // Guards against double-clicking the submit button: once an order has been
      // created for this cart, return the same snapshot instead of minting another.
      if (hasSubmittedRef.current && lastOrder) {
        return lastOrder;
      }
      hasSubmittedRef.current = true;
      setSubmitting(true);

      const order: OrderSnapshot = {
        orderNumber: nextOrderNumber(),
        createdAt: new Date().toISOString(),
        status: 'PENDING_CUSTOMER_SEND',
        items,
        subtotal: totalPrice,
        customer,
      };

      writeStorage(LAST_ORDER_KEY, JSON.stringify(order));
      setLastOrder(order);
      setItems([]);
      setCheckoutStep('confirmation');
      setSubmitting(false);
      return order;
    },
    [items, totalPrice, lastOrder],
  );

  const dismissConfirmation = React.useCallback(() => {
    hasSubmittedRef.current = false;
    setCheckoutStep('cart');
    setCartOpen(false);
  }, []);

  const value: CartContextValue = {
    items,
    totalItems,
    totalPrice,
    addLine,
    updateQuantity,
    removeLine,
    isCartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    checkoutStep,
    goToCheckout: () => setCheckoutStep('checkout'),
    backToCart: () => setCheckoutStep('cart'),
    lastOrder,
    isSubmitting,
    completeOrder,
    dismissConfirmation,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}

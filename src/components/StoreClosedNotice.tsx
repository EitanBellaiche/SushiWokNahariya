import { Alert } from '@mui/material';
import { useCart } from '../cart/CartContext';

/** Dropped in right above any "add to cart" / "submit order" action, so the closed message appears exactly where ordering is blocked. */
export function StoreClosedNotice() {
  const { storeOpen, reopensLabel } = useCart();
  if (storeOpen) return null;

  return (
    <Alert severity="warning" icon={false}>
      המקום סגור כרגע. אפשר להזמין שוב {reopensLabel}.
    </Alert>
  );
}

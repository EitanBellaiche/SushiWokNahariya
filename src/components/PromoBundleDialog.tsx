import { DishDetailsDialog } from './DishDetailsDialog';
export function PromoBundleDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <DishDetailsDialog open={open} onClose={onClose} productId="promo-wok-roll" />;
}

import { DishDetailsDialog } from './DishDetailsDialog';
import { sushiBox } from '../data/menu';
export function SushiBoxPickerDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <DishDetailsDialog open={open} onClose={onClose} productId={sushiBox.id} />;
}

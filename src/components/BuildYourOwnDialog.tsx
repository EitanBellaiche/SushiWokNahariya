import { DishDetailsDialog } from './DishDetailsDialog';
import { buildYourOwn } from '../data/menu';
import type { RollPrice } from '../data/menu';

export function rollSelectionHint(roll: RollPrice): string {
  if (roll.singleChoice) return 'מרכיב אחד: דג או ירק';
  return `דג: 1 דג + עד ${roll.vegCountFish} ירקות  ·  צמחוני: עד ${roll.vegCountVeggie} ירקות`;
}

export function BuildYourOwnDialog({ open, onClose, initialType }: { open: boolean; onClose: () => void; initialType?: string }) {
  return <DishDetailsDialog open={open} onClose={onClose} productId={`build-${initialType ?? buildYourOwn.rollPrices[0].type}`} />;
}

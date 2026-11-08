import React from 'react';
import type { CartLine } from '../cart/types';
import { DishDetailsDialog } from '../components/DishDetailsDialog';

type OpenDish = (productId: string, line?: CartLine) => void;
const Context = React.createContext<OpenDish | null>(null);

export function DishDetailsProvider({ children }: { children: React.ReactNode }) {
  const [request, setRequest] = React.useState<{ productId: string; line?: CartLine } | null>(null);
  const open = React.useCallback<OpenDish>((productId, line) => setRequest({ productId, line }), []);
  return <Context.Provider value={open}>{children}{request && <DishDetailsDialog open productId={request.productId} line={request.line} onClose={() => setRequest(null)} />}</Context.Provider>;
}

export function useDishDetails() {
  const open = React.useContext(Context);
  if (!open) throw new Error('DishDetailsProvider is required');
  return open;
}

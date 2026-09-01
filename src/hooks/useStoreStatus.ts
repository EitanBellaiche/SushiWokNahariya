import React from 'react';
import { getStoreStatus } from '../data/hours';
import type { StoreStatus } from '../data/hours';

/** Re-derives store open/closed status periodically so the UI updates live across an opening/closing boundary without a page refresh. */
export function useStoreStatus(): StoreStatus {
  const [status, setStatus] = React.useState<StoreStatus>(() => getStoreStatus());

  React.useEffect(() => {
    const tick = () => setStatus(getStoreStatus());
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return status;
}

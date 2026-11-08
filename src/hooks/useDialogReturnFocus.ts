import React from 'react';

/** MUI's default focus restoration may scroll a partly visible menu card into
 * view. Capture the origin before the dialog commits, and restore focus without
 * scrolling, together with the exact menu position. */
export function useDialogReturnFocus(open: boolean) {
  const origin = React.useMemo(() => {
    if (!open || typeof window === 'undefined') return null;
    return { element: document.activeElement, x: window.scrollX, y: window.scrollY };
  }, [open]);

  React.useEffect(() => {
    if (!origin) return;
    return () => {
      if (origin.element instanceof HTMLElement && origin.element.isConnected) {
        origin.element.focus({ preventScroll: true });
      }
      window.scrollTo({ left: origin.x, top: origin.y, behavior: 'instant' });
    };
  }, [origin]);
}

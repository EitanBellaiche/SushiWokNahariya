import React from 'react';
import { useLocation } from 'react-router-dom';

/** React Router doesn't reset scroll position on navigation by default — without this, opening a legal page from deep in the menu would land mid-page. */
export function useScrollToTopOnNavigate() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
}

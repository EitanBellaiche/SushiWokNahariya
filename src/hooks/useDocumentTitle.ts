import React from 'react';

/** Sets document.title and the meta description for the current route (CSR-only site, no SSR/prerendering). */
export function useDocumentTitle(title: string, description?: string) {
  React.useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    let previousDescription: string | null = null;
    let meta: HTMLMetaElement | null = null;
    if (description) {
      meta = document.querySelector('meta[name="description"]');
      if (meta) {
        previousDescription = meta.getAttribute('content');
        meta.setAttribute('content', description);
      }
    }

    return () => {
      document.title = previousTitle;
      if (meta && previousDescription !== null) meta.setAttribute('content', previousDescription);
    };
  }, [title, description]);
}

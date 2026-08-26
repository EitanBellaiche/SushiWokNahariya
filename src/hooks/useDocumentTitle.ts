import React from 'react';
import { useLocation } from 'react-router-dom';
import { BUSINESS } from '../data/business';

/**
 * Sets document.title, the meta description, the canonical link and og:url for the
 * current route (CSR-only site, no SSR/prerendering) — otherwise every route would
 * keep index.html's homepage canonical, telling Google every page is a duplicate of "/".
 */
export function useDocumentTitle(title: string, description?: string) {
  const location = useLocation();

  React.useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    let previousDescription: string | null = null;
    const descriptionMeta = description ? document.querySelector('meta[name="description"]') : null;
    if (descriptionMeta && description) {
      previousDescription = descriptionMeta.getAttribute('content');
      descriptionMeta.setAttribute('content', description);
    }

    const canonicalUrl = `${BUSINESS.siteUrl}${location.pathname}`;
    let previousCanonical: string | null = null;
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      previousCanonical = canonicalLink.getAttribute('href');
      canonicalLink.setAttribute('href', canonicalUrl);
    }

    let previousOgUrl: string | null = null;
    const ogUrlMeta = document.querySelector('meta[property="og:url"]');
    if (ogUrlMeta) {
      previousOgUrl = ogUrlMeta.getAttribute('content');
      ogUrlMeta.setAttribute('content', canonicalUrl);
    }

    return () => {
      document.title = previousTitle;
      if (descriptionMeta && previousDescription !== null) descriptionMeta.setAttribute('content', previousDescription);
      if (canonicalLink && previousCanonical !== null) canonicalLink.setAttribute('href', previousCanonical);
      if (ogUrlMeta && previousOgUrl !== null) ogUrlMeta.setAttribute('content', previousOgUrl);
    };
  }, [title, description, location.pathname]);
}

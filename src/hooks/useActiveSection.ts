import React from 'react';

export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = React.useState(ids[0] ?? '');

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
        setActiveId(topMost.target.id);
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

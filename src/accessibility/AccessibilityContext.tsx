import React from 'react';

const STORAGE_KEY = 'a11y-preferences';

/** Root font-size steps. Almost all site typography is in rem, so this scales the text without zooming the layout. */
export const TEXT_SCALE_PERCENT = [100, 115, 130, 150];

export type AccessibilityPrefs = {
  textLevel: number;
  highContrast: boolean;
  underlineLinks: boolean;
  readableFont: boolean;
  stopMotion: boolean;
};

export const DEFAULT_PREFS: AccessibilityPrefs = {
  textLevel: 0,
  highContrast: false,
  underlineLinks: false,
  readableFont: false,
  stopMotion: false,
};

function readStoredPrefs(): AccessibilityPrefs {
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}') as Partial<AccessibilityPrefs>;
    const textLevel = Number.isInteger(stored.textLevel) && stored.textLevel! >= 0 && stored.textLevel! < TEXT_SCALE_PERCENT.length ? stored.textLevel! : 0;
    return {
      textLevel,
      highContrast: stored.highContrast === true,
      underlineLinks: stored.underlineLinks === true,
      readableFont: stored.readableFont === true,
      stopMotion: stored.stopMotion === true,
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

type AccessibilityContextValue = {
  prefs: AccessibilityPrefs;
  update: (patch: Partial<AccessibilityPrefs>) => void;
  reset: () => void;
};

const AccessibilityContext = React.createContext<AccessibilityContextValue>({
  prefs: DEFAULT_PREFS,
  update: () => undefined,
  reset: () => undefined,
});

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [prefs, setPrefs] = React.useState(readStoredPrefs);

  // Layout effect so a returning visitor's settings are applied before first paint.
  React.useLayoutEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = prefs.textLevel === 0 ? '' : `${TEXT_SCALE_PERCENT[prefs.textLevel]}%`;
    root.classList.toggle('a11y-high-contrast', prefs.highContrast);
    root.classList.toggle('a11y-underline-links', prefs.underlineLinks);
    root.classList.toggle('a11y-readable-font', prefs.readableFont);
    root.classList.toggle('a11y-stop-motion', prefs.stopMotion);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Storage can be blocked (private mode); the settings still apply for this visit.
    }
  }, [prefs]);

  const value = React.useMemo(
    () => ({
      prefs,
      update: (patch: Partial<AccessibilityPrefs>) => setPrefs((current) => ({ ...current, ...patch })),
      reset: () => setPrefs(DEFAULT_PREFS),
    }),
    [prefs],
  );

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

export function useAccessibility() {
  return React.useContext(AccessibilityContext);
}

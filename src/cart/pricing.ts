/** Parses a price label like "+₪10" (used for build-your-own wraps/coatings) into 10. */
export function parseAddonPrice(price: string): number {
  const digits = price.replace(/[^\d.]/g, '');
  const value = Number(digits);
  return Number.isFinite(value) ? value : 0;
}

export function formatILS(amount: number): string {
  return `₪${amount}`;
}

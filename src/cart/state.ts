import type { CartLine } from './types';
import { configuredLine, legacyCustomization, MAX_QUANTITY } from '../dishes/configuration';

export type AddLineInput = Omit<CartLine, 'lineId' | 'quantity' | 'options'> & { quantity?: number; options?: string[] };

export function normalizeLine(input: AddLineInput): Omit<CartLine, 'lineId'> {
  return configuredLine(input.productId, input.customization ?? legacyCustomization({ productId: input.productId, options: input.options ?? [] }), input.quantity ?? 1, input.notes ?? '');
}

export function lineKey(line: Pick<CartLine, 'productId' | 'options' | 'notes'>): string {
  return JSON.stringify([line.productId, [...line.options].sort(), line.notes?.trim() ?? '']);
}

export function addCartLine(items: CartLine[], input: AddLineInput, lineId: string): CartLine[] {
  const normalized = normalizeLine(input);
  const existing = items.find((line) => lineKey(line) === lineKey(normalized));
  if (existing && existing.quantity + normalized.quantity <= MAX_QUANTITY) {
    return items.map((line) => line.lineId === existing.lineId ? { ...line, quantity: line.quantity + normalized.quantity } : line);
  }
  return [...items, { ...normalized, lineId }];
}

export function replaceCartLine(items: CartLine[], lineId: string, input: AddLineInput): CartLine[] {
  const normalized = normalizeLine(input);
  return items.map((line) => line.lineId === lineId ? { ...normalized, lineId } : line);
}

export function restoreCart(raw: string | null): CartLine[] {
  if (!raw) return [];
  try {
    const input: unknown = JSON.parse(raw);
    if (!Array.isArray(input)) return [];
    return input.flatMap((line) => {
      try {
        if (!line || typeof line.lineId !== 'string' || !Array.isArray(line.options) || !line.options.every((o: unknown) => typeof o === 'string')) return [];
        return [{ ...normalizeLine(line), lineId: line.lineId }];
      } catch { return []; }
    });
  } catch { return []; }
}

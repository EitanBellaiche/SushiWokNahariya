import { describe, expect, it } from 'vitest';
import { NAHARIYA_DELIVERY_FEE, getDeliveryFee, isDeliveryFeePending } from './delivery';

describe('getDeliveryFee', () => {
  it('charges nothing for pickup, regardless of zone', () => {
    expect(getDeliveryFee('pickup', 'nahariya')).toBe(0);
    expect(getDeliveryFee('pickup', 'other')).toBe(0);
    expect(getDeliveryFee('pickup', undefined)).toBe(0);
  });

  it('charges the fixed ₪20 fee for a Nahariya delivery', () => {
    expect(getDeliveryFee('delivery', 'nahariya')).toBe(NAHARIYA_DELIVERY_FEE);
  });

  it('never invents a fee for a delivery outside Nahariya, or when the zone is unset', () => {
    expect(getDeliveryFee('delivery', 'other')).toBe(0);
    expect(getDeliveryFee('delivery', undefined)).toBe(0);
  });
});

describe('isDeliveryFeePending', () => {
  it('is false for pickup', () => {
    expect(isDeliveryFeePending('pickup', 'other')).toBe(false);
  });

  it('is false for a Nahariya delivery — the fee is already known', () => {
    expect(isDeliveryFeePending('delivery', 'nahariya')).toBe(false);
  });

  it('is true for a delivery outside Nahariya, or with no zone chosen yet', () => {
    expect(isDeliveryFeePending('delivery', 'other')).toBe(true);
    expect(isDeliveryFeePending('delivery', undefined)).toBe(true);
  });
});

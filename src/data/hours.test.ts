import { describe, expect, it } from 'vitest';
import { getStoreStatus } from './hours';

// November: Israel is UTC+2. Results must not depend on the process timezone.
describe('getStoreStatus uses Israel time', () => {
  it.each([
    ['Monday 10:59', '2026-11-09T08:59:00Z', false],
    ['Monday 11:00', '2026-11-09T09:00:00Z', true],
    ['Monday 22:59', '2026-11-09T20:59:00Z', true],
    ['Monday 23:00', '2026-11-09T21:00:00Z', false],
    ['Friday 00:30, still Thursday in UTC', '2026-11-12T22:30:00Z', false],
    ['Friday noon', '2026-11-13T10:00:00Z', false],
    ['Saturday 00:30, still Friday in UTC', '2026-11-13T22:30:00Z', false],
    ['Saturday during Shabbat', '2026-11-14T12:00:00Z', false],
    ['Saturday night', '2026-11-14T17:00:00Z', true],
    ['Saturday 23:29', '2026-11-14T21:29:00Z', true],
    ['Saturday 23:31', '2026-11-14T21:31:00Z', false],
    ['Sunday 00:30, still Saturday in UTC', '2026-11-14T22:30:00Z', false],
  ])('%s', (_label, instant, open) => {
    expect(getStoreStatus(new Date(instant)).open).toBe(open);
  });

  it('honours daylight saving time', () => {
    expect(getStoreStatus(new Date('2026-07-06T08:00:00Z')).open).toBe(true); // Monday 11:00, UTC+3
    expect(getStoreStatus(new Date('2026-07-06T07:59:00Z')).open).toBe(false);
  });

  it('labels the next opening in Israel time', () => {
    expect(getStoreStatus(new Date('2026-11-09T07:00:00Z'))).toEqual({ open: false, reopensLabel: 'היום ב-11:00' });
    expect(getStoreStatus(new Date('2026-11-09T21:30:00Z'))).toEqual({ open: false, reopensLabel: 'מחר ב-11:00' });
  });
});

/**
 * Store opening-hours logic. Rules (per BUSINESS.hoursWeekday/hoursWeekend):
 *  - Sunday–Thursday: 11:00–23:00
 *  - Friday: closed all day
 *  - Saturday: opens ~30 min after Shabbat ends, until 23:30
 *
 * Shabbat's end time shifts throughout the year with sunset, so it isn't a
 * fixed hour — it's approximated here as sunset (computed astronomically for
 * Nahariya) plus ~40 min for tzeit hakochavim, plus the business's own 30 min
 * buffer. This is an approximation (typically accurate to within a few
 * minutes), not a halachic authority, which is an accepted trade-off for
 * gating an "open for orders" banner.
 *
 * All comparisons assume the visitor's device clock/timezone matches Israel
 * local time, which holds for this site's actual audience.
 */

const NAHARIYA_LAT = 33.0095;
const NAHARIYA_LON = 35.0925;

const OPEN_HOUR = 11;
const WEEKDAY_CLOSE_HOUR = 23;
const SATURDAY_CLOSE_HOUR = 23;
const SATURDAY_CLOSE_MINUTE = 30;

/** tzeit hakochavim (~40 min after sunset) + the business's own 30-minute buffer. */
const HAVDALAH_BUFFER_MINUTES = 70;

export type StoreStatus = { open: true } | { open: false; reopensLabel: string };

const HEBREW_DAY_NAMES = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

function sunsetUtc(date: Date, lat: number, lon: number): Date {
  const rad = Math.PI / 180;

  const utcMidnight = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const dayOfYear = Math.round((utcMidnight - Date.UTC(date.getFullYear(), 0, 1)) / 86400000) + 1;

  const gamma = ((2 * Math.PI) / 365) * (dayOfYear - 1);

  const eqTimeMin =
    229.18 *
    (0.000075 +
      0.001868 * Math.cos(gamma) -
      0.032077 * Math.sin(gamma) -
      0.014615 * Math.cos(2 * gamma) -
      0.040849 * Math.sin(2 * gamma));

  const declRad =
    0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.00148 * Math.sin(3 * gamma);

  const latRad = lat * rad;
  const zenithRad = 90.833 * rad; // 90° + atmospheric refraction + solar disk radius

  const cosHourAngle =
    (Math.cos(zenithRad) - Math.sin(latRad) * Math.sin(declRad)) / (Math.cos(latRad) * Math.cos(declRad));
  const hourAngleDeg = Math.acos(Math.min(1, Math.max(-1, cosHourAngle))) / rad;

  const sunsetMinutesUtc = 720 - 4 * (lon - hourAngleDeg) - eqTimeMin;

  return new Date(utcMidnight + sunsetMinutesUtc * 60000);
}

function atLocalTime(date: Date, hours: number, minutes = 0): Date {
  const d = new Date(date);
  d.setHours(hours, minutes, 0, 0);
  return d;
}

function getSaturdayOpeningTime(saturday: Date): Date {
  const sunset = sunsetUtc(saturday, NAHARIYA_LAT, NAHARIYA_LON);
  return new Date(sunset.getTime() + HAVDALAH_BUFFER_MINUTES * 60000);
}

function formatHM(d: Date): string {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function formatOpeningLabel(opens: Date, addDays: number): string {
  const time = formatHM(opens);
  if (addDays === 0) return `היום ב-${time}`;
  if (addDays === 1) return `מחר ב-${time}`;
  return `ביום ${HEBREW_DAY_NAMES[opens.getDay()]} ב-${time}`;
}

function nextOpeningLabel(now: Date): string {
  for (let addDays = 0; addDays <= 8; addDays += 1) {
    const day = new Date(now.getFullYear(), now.getMonth(), now.getDate() + addDays);
    const dow = day.getDay();

    let opens: Date | null = null;
    if (dow >= 0 && dow <= 4) opens = atLocalTime(day, OPEN_HOUR);
    else if (dow === 6) opens = getSaturdayOpeningTime(day);
    // Friday (dow === 5): never opens.

    if (opens && opens > now) return formatOpeningLabel(opens, addDays);
  }
  return '';
}

export function getStoreStatus(now: Date = new Date()): StoreStatus {
  const day = now.getDay(); // 0=Sunday ... 5=Friday, 6=Saturday

  if (day >= 0 && day <= 4) {
    const opens = atLocalTime(now, OPEN_HOUR);
    const closes = atLocalTime(now, WEEKDAY_CLOSE_HOUR);
    if (now >= opens && now < closes) return { open: true };
  } else if (day === 6) {
    const opens = getSaturdayOpeningTime(now);
    const closes = atLocalTime(now, SATURDAY_CLOSE_HOUR, SATURDAY_CLOSE_MINUTE);
    if (now >= opens && now < closes) return { open: true };
  }

  return { open: false, reopensLabel: nextOpeningLabel(now) };
}

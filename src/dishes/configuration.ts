import { buildYourOwn, drinks, specials, sushiBox, wok, WOK_PROTEIN_CHOICES } from '../data/menu';
import { PROMO } from '../data/business';
import { parseAddonPrice } from '../cart/pricing';
import type { CartLine } from '../cart/types';
import { getDish } from './catalog';
import type { DishCustomization, RollSelection } from './types';

export const MAX_QUANTITY = 99;
export const MAX_NOTES = 500;

function check(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function stringList(value: unknown): string[] {
  check(Array.isArray(value) && value.length <= 30 && value.every((v) => typeof v === 'string'), 'בחירה לא תקינה');
  check(new Set(value).size === value.length, 'בחירה כפולה אינה מותרת');
  return [...value];
}

/** Runtime validation is shared with the API; no client-supplied prices are read. */
export function normalizeCustomization(input: unknown): DishCustomization {
  check(input != null && typeof input === 'object' && !Array.isArray(input), 'התאמות לא תקינות');
  const source = input as Record<string, unknown>;
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(source)) {
    if (value === undefined) continue;
    if (['removedIngredients', 'addons', 'rollIds'].includes(key)) result[key] = stringList(value).sort();
    else if (['choice', 'drink', 'side', 'wokId', 'protein'].includes(key)) {
      check(typeof value === 'string' && value.length <= 150, 'בחירה לא תקינה');
      result[key] = value;
    } else if (key === 'roll') {
      check(value != null && typeof value === 'object' && !Array.isArray(value), 'הרכבת רול לא תקינה');
      const roll = value as Record<string, unknown>;
      check(Object.keys(roll).every((k) => ['type', 'base', 'fish', 'vegetables', 'wrap', 'coating'].includes(k)), 'הרכבת רול לא תקינה');
      check(typeof roll.type === 'string' && ['fish', 'veggie'].includes(String(roll.base)), 'הרכבת רול לא תקינה');
      for (const key of ['fish', 'wrap', 'coating']) check(roll[key] === undefined || typeof roll[key] === 'string', 'הרכבת רול לא תקינה');
      result.roll = { ...roll, vegetables: stringList(roll.vegetables).sort() };
    } else throw new Error('התאמה לא מוכרת');
  }
  return result as DishCustomization;
}

export function defaultRoll(type: string, base: 'fish' | 'veggie' = 'fish'): RollSelection {
  return { type, base, fish: base === 'fish' ? buildYourOwn.fish[0] : undefined, vegetables: [] };
}

function configureRoll(roll: RollSelection | undefined, promo: boolean, partial: boolean) {
  check(roll, 'יש לבחור הרכב לרול');
  const definition = buildYourOwn.rollPrices.find((r) => r.type === roll.type);
  check(definition && (!promo || ['I/O', 'פוטומאקי'].includes(roll.type)), 'סוג רול לא תקין');
  const fish = roll.base === 'fish';
  check(!roll.fish || (fish && buildYourOwn.fish.includes(roll.fish)), 'בחירת דג לא תקינה');
  check(partial || !fish || roll.fish, 'יש לבחור דג');
  check(roll.vegetables.every((v) => buildYourOwn.vegetables.includes(v)), 'בחירת ירקות לא תקינה');
  if (definition.singleChoice) {
    check(fish ? roll.vegetables.length === 0 : (partial || roll.vegetables.length === 1), 'במאקי יש לבחור מרכיב אחד');
    check(roll.vegetables.length <= 1, 'במאקי יש לבחור מרכיב אחד');
  } else {
    const limit = (fish ? definition.vegCountFish : definition.vegCountVeggie) ?? 0;
    check(roll.vegetables.length <= limit, 'נבחרו יותר מדי ירקות');
    check(partial || (promo ? roll.vegetables.length === limit : roll.vegetables.length > 0), promo ? `יש לבחור ${limit} ירקות` : 'יש לבחור לפחות ירק אחד');
  }
  const options: string[] = [];
  if (!definition.singleChoice) options.push(`בסיס${promo ? ' רול' : ''}: ${fish ? 'דג' : 'צמחוני'}`);
  if (fish && roll.fish) options.push(`דג: ${roll.fish}`);
  if (roll.vegetables.length) options.push(`${definition.singleChoice ? 'ירק' : 'ירקות'}: ${roll.vegetables.join(', ')}`);
  let price = fish ? definition.fish : definition.veggie;
  if (promo) price -= definition.veggie;
  for (const [key, choices, label] of [
    ['wrap', buildYourOwn.wraps, 'מעטפה'], ['coating', buildYourOwn.coatings, 'ציפוי'],
  ] as const) {
    if (!roll[key]) continue;
    const addon = choices.find((a) => a.name === roll[key]);
    check(addon, 'תוספת לרול אינה קיימת');
    const extra = parseAddonPrice(addon.price);
    price += extra;
    options.push(`${label}: ${addon.name} (+₪${extra})`);
  }
  return { price, options };
}

export function configureDish(productId: string, input: unknown, partial = false) {
  const dish = getDish(productId);
  const c = normalizeCustomization(input);
  const allowed = dish.kind === 'roll' ? ['roll'] : dish.kind === 'promo' ? ['roll', 'wokId', 'protein'] : dish.kind === 'box' ? ['rollIds'] : ['removedIngredients', 'addons', 'choice', 'drink', 'side'];
  check(Object.keys(c).every((key) => allowed.includes(key)), 'בחירה אינה מתאימה למנה');
  let unitPrice = dish.numericPrice ?? 0;
  const options: string[] = [];
  if (dish.kind === 'roll' || dish.kind === 'promo') {
    check(dish.kind !== 'roll' || c.roll?.type === dish.rollType, 'סוג הרול אינו תואם למנה');
    const roll = configureRoll(c.roll, dish.kind === 'promo', partial);
    unitPrice += roll.price;
    if (dish.kind === 'promo') {
      const selectedWok = wok.items.find((w) => w.id === c.wokId);
      const protein = WOK_PROTEIN_CHOICES.find((p) => p.name === c.protein);
      check(selectedWok && protein, 'יש לבחור מוקפץ וחלבון');
      unitPrice = PROMO.numericPrice + protein.price + roll.price;
      options.push(`מוקפץ: ${selectedWok.name}`, `תוספת חלבון: ${protein.name}${protein.price ? ` (+₪${protein.price})` : ''}`, `סוג רול: ${c.roll!.type}`);
    }
    options.push(...roll.options);
  } else if (dish.kind === 'box') {
    const ids = c.rollIds ?? [];
    check(ids.length <= sushiBox.requiredRollCount && ids.every((id) => specials.items.some((s) => s.id === id)), 'בחירת רולים לא תקינה');
    check(partial || ids.length === sushiBox.requiredRollCount, `יש לבחור בדיוק ${sushiBox.requiredRollCount} רולים`);
    options.push(...ids.map((id, index) => `רול ${index + 1}: ${getDish(id).name}`));
  } else {
    check(dish.numericPrice != null, 'לא הוגדר מחיר למנה');
    if (dish.addonChoices?.length) {
      const choice = dish.addonChoices.find((a) => a.name === c.choice);
      check((partial && !c.choice) || choice, `נא לבחור ${dish.addonChoiceLabel ?? 'תוספת'}`);
      if (choice) {
        unitPrice += choice.price;
        options.push(`${dish.addonChoiceLabel ?? 'תוספת'}: ${choice.name}${choice.price ? ` (+₪${choice.price})` : ''}`);
      }
    } else check(!c.choice, 'בחירה אינה מתאימה למנה');
    if (dish.includesDrinkChoice) {
      check((partial && !c.drink) || drinks.items.some((d) => d.name === c.drink && (!dish.drinkChoices?.length || dish.drinkChoices.includes(d.name))), 'נא לבחור שתייה');
      if (c.drink) options.push(`שתייה: ${c.drink}`);
    } else check(!c.drink, 'בחירת שתייה אינה מתאימה למנה');
    if (dish.sideChoices?.length) {
      check((partial && !c.side) || dish.sideChoices.includes(c.side ?? ''), 'נא לבחור תוספת');
      if (c.side) options.push(`תוספת: ${c.side}`);
    } else check(!c.side, 'בחירת תוספת אינה מתאימה למנה');
    for (const removed of c.removedIngredients ?? []) {
      check(dish.removableIngredients?.includes(removed), 'לא ניתן להסיר מרכיב זה מהמנה');
      options.push(`ללא ${removed}`);
    }
    for (const name of c.addons ?? []) {
      const addon = dish.optionalAddons?.find((a) => a.name === name);
      check(addon && Number.isFinite(addon.price) && addon.price >= 0, 'תוספת אינה קיימת למנה');
      unitPrice += addon.price;
      options.push(`תוספת: ${addon.name} (+₪${addon.price})`);
    }
  }
  return { name: dish.name, unitPrice, options, customization: c };
}

export function configuredLine(productId: string, customization: unknown, quantity: number, notes = ''): Omit<CartLine, 'lineId'> {
  check(Number.isInteger(quantity) && quantity >= 1 && quantity <= MAX_QUANTITY, 'כמות לא תקינה');
  check(typeof notes === 'string' && notes.length <= MAX_NOTES, `הערות מוגבלות ל-${MAX_NOTES} תווים`);
  return { productId, ...configureDish(productId, customization), quantity, notes: notes.trim() };
}

/** Upgrade the existing v1 cart without losing protein, drinks, rolls or bundles. */
export function legacyCustomization(line: Pick<CartLine, 'productId' | 'options'>): DishCustomization {
  const dish = getDish(line.productId);
  const value = (label: string) => line.options.find((s) => s.startsWith(`${label}: `))?.slice(label.length + 2).replace(/ \(\+₪[\d.]+\)$/, '');
  if (dish.kind === 'roll' || dish.kind === 'promo') {
    const baseLabel = value(dish.kind === 'promo' ? 'בסיס רול' : 'בסיס');
    return {
      roll: { type: dish.rollType ?? value('סוג רול') ?? '', base: baseLabel === 'צמחוני' || value('ירק') ? 'veggie' : 'fish',
        fish: value('דג'), vegetables: value('ירק') ? [value('ירק')!] : value('ירקות')?.split(', ') ?? [], wrap: value('מעטפה'), coating: value('ציפוי') },
      ...(dish.kind === 'promo' ? { wokId: wok.items.find((w) => w.name === value('מוקפץ'))?.id, protein: value('תוספת חלבון') } : {}),
    };
  }
  if (dish.kind === 'box') return { rollIds: line.options.map((option) => specials.items.find((s) => s.name === option.replace(/^רול \d+: /, ''))?.id ?? '') };
  return { ...(dish.addonChoices?.length ? { choice: value(dish.addonChoiceLabel ?? 'תוספת') } : {}),
    ...(dish.includesDrinkChoice ? { drink: value('שתייה') } : {}), ...(dish.sideChoices?.length ? { side: value('תוספת') } : {}) };
}

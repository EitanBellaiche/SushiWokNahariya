import { describe, expect, it } from 'vitest';
import { buildYourOwn, WOK_PROTEIN_CHOICES } from '../data/menu';
import { dishes, getDish } from './catalog';
import { configureDish, configuredLine, defaultRoll, legacyCustomization } from './configuration';
import { addCartLine, replaceCartLine, restoreCart } from '../cart/state';

const customized = () => configuredLine('pad-thai', { choice: 'עוף', removedIngredients: ['בצל ירוק'] }, 2, 'בלי חריף, לחתוך ל-10 יחידות');

describe('dish configuration and cart persistence', () => {
  it.each(WOK_PROTEIN_CHOICES)('keeps the existing wok price for $name', (protein) => {
    expect(configureDish('pad-thai', { choice: protein.name }).unitPrice).toBe(46 + protein.price);
  });
  it('keeps free preparation and bundled drink/side choices', () => {
    expect(configureDish('salmon-poke', { choice: 'סלמון אפוי' }).unitPrice).toBe(56);
    const result = configureDish('kids-schnitzel', { drink: 'ענבים', side: 'צ׳יפס' });
    expect(result.unitPrice).toBe(39);
    expect(result.options).toEqual(['שתייה: ענבים', 'תוספת: צ׳יפס']);
    expect(() => configureDish('kids-schnitzel', { drink: 'קוקה קולה', side: 'צ׳יפס' })).toThrow();
    expect(() => configureDish('salmon-poke', {})).toThrow();
  });
  it('uses only explicitly listed ingredients and does not invent optional extras', () => {
    for (const dish of dishes) {
      for (const ingredient of dish.ingredients ?? []) expect(dish.description).toContain(ingredient);
      expect(dish.optionalAddons?.length ?? 0).toBe(0);
      for (const ingredient of dish.removableIngredients ?? []) expect(dish.ingredients).toContain(ingredient);
    }
    expect(() => configureDish('pad-thai', { choice: 'עוף', addons: ['תוספת לא קיימת'] })).toThrow();
    expect(() => configureDish('water', { removedIngredients: ['מלפפון'] })).toThrow();
  });
  it('supports future per-dish extras using only that dish’s configured prices', () => {
    const dish = getDish('pad-thai');
    dish.optionalAddons = [{ name: 'תוספת בדיקה בלבד', price: 10 }];
    try {
      const result = configureDish(dish.id, { choice: 'עוף', addons: ['תוספת בדיקה בלבד'] });
      expect(result.unitPrice).toBe(66);
      expect(result.options).toContain('תוספת: תוספת בדיקה בלבד (+₪10)');
      expect(() => configureDish(dish.id, { choice: 'עוף', addons: ['תוספת בדיקה בלבד', 'תוספת בדיקה בלבד'] })).toThrow();
    } finally { delete dish.optionalAddons; }
  });
  it('persists notes, choices and quantities through serialization, reload and editing', () => {
    const items = addCartLine([], customized(), 'line-1');
    const restored = restoreCart(JSON.stringify(items));
    expect(restored).toEqual(items);
    expect(restored[0].unitPrice).toBe(56);
    const edited = replaceCartLine(restored, 'line-1', configuredLine('pad-thai', { choice: 'בקר', removedIngredients: ['גזר'] }, 3, 'ללא חריף'));
    expect(edited[0]).toMatchObject({ lineId: 'line-1', unitPrice: 61, quantity: 3, notes: 'ללא חריף', options: ['תוספת: בקר (+₪15)', 'ללא גזר'] });
    expect(items[0].notes).toBe('בלי חריף, לחתוך ל-10 יחידות');
  });
  it('keeps different customizations and different kitchen notes on separate lines', () => {
    const first = addCartLine([], customized(), 'a');
    const second = addCartLine(first, { ...customized(), notes: 'הערה אחרת' }, 'b');
    const third = addCartLine(second, configuredLine('pad-thai', { choice: 'בקר' }, 1), 'c');
    expect(third).toHaveLength(3);
    expect(addCartLine(third, customized(), 'd')).toHaveLength(3);
    expect(addCartLine(third, customized(), 'd')[0].quantity).toBe(4);
  });
  it('does not merge customizations with ambiguous separators in notes/options', () => {
    const first = addCartLine([], configuredLine('water', {}, 1, 'a|b'), 'a');
    expect(addCartLine(first, configuredLine('water', {}, 1, 'a::b'), 'b')).toHaveLength(2);
  });
  it('normalizes unordered removals and restores catalog prices instead of stored prices', () => {
    const a = configuredLine('spicy-tuna', { removedIngredients: ['מלפפון', 'שומשום'] }, 1);
    const b = configuredLine('spicy-tuna', { removedIngredients: ['שומשום', 'מלפפון'] }, 1);
    expect(addCartLine(addCartLine([], a, 'a'), b, 'b')).toHaveLength(1);
    expect(restoreCart(JSON.stringify([{ ...customized(), unitPrice: 1, lineId: 'a' }]))[0].unitPrice).toBe(56);
  });
  it('migrates existing v1 roll, protein, drink and box choices without dropping them', () => {
    const legacy = [
      { productId: 'build-I/O', options: ['בסיס: דג', 'דג: סלמון', 'ירקות: אבוקדו', 'מעטפה: סלמון צרוב (+₪10)'] },
      { productId: 'pad-thai', options: ['תוספת: בקר (+₪15)'] },
      { productId: 'kids-schnitzel', options: ['תוספת: צ׳יפס', 'שתייה: ענבים'] },
      { productId: 'sushibox', options: dishes.filter((d) => ['crispy-roll', 'spicy-salmon', 'dragon-roll', 'rainbow-fish', 'sun-roll'].includes(d.id)).map((d, i) => `רול ${i + 1}: ${d.name}`) },
    ];
    expect(legacy.map((l) => configureDish(l.productId, legacyCustomization(l)).unitPrice)).toEqual([49, 61, 39, 249]);
  });
  it.each(buildYourOwn.rollPrices)('keeps the fish and veggie pricing and limits of $type', (roll) => {
    const fish = { ...defaultRoll(roll.type), vegetables: roll.singleChoice ? [] : ['אבוקדו'] };
    const veggie = { ...defaultRoll(roll.type, 'veggie'), vegetables: ['אבוקדו'] };
    expect(configureDish(`build-${roll.type}`, { roll: fish }).unitPrice).toBe(roll.fish);
    expect(configureDish(`build-${roll.type}`, { roll: veggie }).unitPrice).toBe(roll.veggie);
    expect(() => configureDish(`build-${roll.type}`, { roll: { ...veggie, vegetables: buildYourOwn.vegetables } })).toThrow();
  });
  it('keeps the existing promo price and upgrade rules', () => {
    const c = { wokId: 'pad-thai', protein: 'צמחוני / ללא תוספת', roll: { ...defaultRoll('I/O', 'veggie'), vegetables: ['אבוקדו', 'מלפפון', 'בטטה'] } };
    expect(configureDish('promo-wok-roll', c).unitPrice).toBe(69);
    expect(configureDish('promo-wok-roll', { ...c, protein: 'בקר', roll: { ...defaultRoll('I/O'), vegetables: ['אבוקדו', 'מלפפון'], wrap: 'טונה', coating: 'טיגון פנקו' } }).unitPrice).toBe(105);
    expect(() => configureDish('promo-wok-roll', { ...c, roll: { ...c.roll, vegetables: ['אבוקדו'] } })).toThrow();
    expect(() => configureDish('promo-wok-roll', { ...c, roll: { ...c.roll, type: 'מאקי' } })).toThrow();
  });
  it.each([0, -1, 1.5, 100, NaN, Infinity])('rejects invalid quantity %s', (quantity) => {
    expect(() => configuredLine('water', {}, quantity)).toThrow();
  });
  it('rejects malformed selections, duplicate ingredients and overly long notes', () => {
    for (const c of [null, [], { price: 1 }, { removedIngredients: [1] }, { removedIngredients: ['גזר', 'גזר'] }, { roll: { type: 'I/O' } }]) {
      expect(() => configuredLine('pad-thai', c, 1)).toThrow();
    }
    expect(() => configuredLine('water', {}, 1, 'a'.repeat(501))).toThrow();
    expect(restoreCart('{')).toEqual([]);
  });
});

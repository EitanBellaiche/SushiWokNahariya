import { buildYourOwn, combos, IMAGES, partyTrays, simpleCategories, sushiBox } from '../data/menu';
import type { MenuItem } from '../data/menu';
import { PROMO } from '../data/business';

export type Dish = MenuItem & { kind?: 'roll' | 'box' | 'promo'; rollType?: string };

// Only ingredients explicitly named in the existing dish descriptions. Unknown
// compositions stay unspecified; they are never inferred from a photograph.
const ingredients: Record<string, string[]> = {
  'crispy-sweet-potato': ['בטטה', 'טמפורה', 'ספייסי מיונז', 'טריאקי'],
  'salmon-poke': ['טרטר סלמון', 'אבוקדו', 'בטטה', 'מלפפון', 'בצל ירוק', 'שומשום'],
  'tuna-poke': ['טרטר טונה אדומה', 'אבוקדו', 'בטטה', 'מלפפון', 'בצל ירוק', 'שומשום'],
  'pad-thai': ['אטריות אורז', 'ביצה', 'כרוב', 'גזר', 'בצל ירוק', 'לימון'],
  'smoky-noodles': ['אטריות חיטה', 'פטריות', 'כרוב', 'גזר', 'בצל ירוק'],
  'fried-rice': ['אורז אסייתי', 'פטריות', 'ביצה', 'כרוב', 'גזר', 'בצל ירוק'],
  'crispy-roll': ['סלמון', 'אבוקדו', 'בטטה', 'טמפורה', 'פנקו'],
  'spicy-salmon': ['בטטה', 'אבוקדו', 'מלפפון', 'טרטר סלמון', 'עירית'],
  'dragon-roll': ['סלמון נא', 'אבוקדו', 'בטטה', 'ספייסי מיונז'],
  'rainbow-fish': ['אבוקדו', 'מלפפון', 'גזר', 'סלמון', 'טונה אדומה', 'דג לבן'],
  'sun-roll': ['סלמון בטמפורה', 'אבוקדו', 'סלמון', 'קריספי בטטה', 'שבבי טמפורה', 'בצל ירוק'],
  'spicy-tuna': ['בטטה', 'מלפפון', 'קנפיו', 'טונראשי', 'טרטר ספייסי טונה אדומה', 'בצל ירוק', 'שומשום'],
  'veggie-roll': ['בטטה', 'אבוקדו', 'מלפפון', 'קנפיו', 'שבבי טמפורה', 'קריספי בטטה', 'בצל ירוק', 'שומשום'],
  'futomaki-tempura': ['סלמון', 'אבוקדו', 'קנפיו', 'מלפפון', 'בצל ירוק', 'טמפורה'],
  'rolls-royce': ['סלמון', 'טונה אדומה', 'דג לבן', 'אבוקדו', 'עירית', 'שומשום קלוי'],
};

export const dishes: Dish[] = [
  ...simpleCategories.flatMap((category) => category.items.map((item) => ({
    ...item,
    description: [item.description, category.subtitle].filter(Boolean).join('. ') || undefined,
    ingredients: item.ingredients ?? ingredients[item.id],
    // Coatings, fish and a dish's base aren't offered as removable by default.
    removableIngredients: item.removableIngredients ?? (ingredients[item.id] ?? []).filter((name) =>
      ['אבוקדו', 'בטטה', 'מלפפון', 'בצל ירוק', 'שומשום', 'שומשום קלוי', 'עירית', 'גזר', 'כרוב', 'פטריות', 'לימון', 'קנפיו', 'ביצה'].includes(name)),
  }))),
  ...combos.items.map((item) => ({ ...item, description: item.bullets.join('\n') })),
  ...partyTrays.items.map((item) => ({ ...item, description: `${item.description}. ${partyTrays.intro}` })),
  { ...sushiBox, name: sushiBox.title, kind: 'box' },
  ...buildYourOwn.rollPrices.map((roll): Dish => ({
    id: `build-${roll.type}`, name: `${roll.type} (הרכבה אישית)`, kind: 'roll', rollType: roll.type,
    price: `דג ₪${roll.fish} · צמחוני ₪${roll.veggie}`, image: roll.image ?? IMAGES.buildYourOwnHero,
    description: [roll.description, roll.singleChoice ? 'בחרו מרכיב אחד: דג או ירק' : `דג: 1 דג ועד ${roll.vegCountFish} ירקות. צמחוני: עד ${roll.vegCountVeggie} ירקות.`].filter(Boolean).join('. '),
  })),
  { id: 'promo-wok-roll', name: PROMO.text, price: `₪${PROMO.numericPrice}`, numericPrice: PROMO.numericPrice,
    description: 'מוקפץ לבחירה ורול I/O או פוטומאקי בהרכבה עצמית. חלבון, שדרוג לדג, מעטפות וציפויים בתוספת תשלום לפי התפריט.',
    image: IMAGES.promo, kind: 'promo' },
];

export function getDish(id: string): Dish {
  const dish = dishes.find((item) => item.id === id);
  if (!dish) throw new Error('המנה אינה קיימת בתפריט');
  return dish;
}

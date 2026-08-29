// All menu content is transcribed verbatim from the restaurant's supplied PDFs
// (Sushi1.pdf, Sushi2.pdf). Prices change over time — this is the single place
// to update them.

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: string;
  /** numeric price used for the cart; omitted for items with variable/dual pricing */
  numericPrice?: number;
  image?: string;
  /** Set when the price already bundles a soft drink — the cart must ask which one. */
  includesDrinkChoice?: boolean;
  /** Restricts the bundled drink choice to these drink names (must match `drinks.items` names); omit to offer the full drinks list. */
  drinkChoices?: string[];
  /** Set when the price bundles a free side choice (e.g. rice vs. fries) — the cart must ask which one. */
  sideChoices?: string[];
  /** Paid add-ons that must be selected before the item is added to the cart. */
  addonChoices?: MenuAddon[];
  /** Overrides the generic "תוספת" wording in the addon-choice dialog (e.g. "אופן הכנה" for a raw/baked choice with no price difference). */
  addonChoiceLabel?: string;
};

export type MenuAddon = {
  name: string;
  price: number;
};

export type MenuCategory = {
  id: string;
  navLabel: string;
  title: string;
  icon: string;
  subtitle?: string;
  note?: string;
  items: MenuItem[];
};

const img = (name: string) => new URL(`../../photos-optimized/${name.replace(/\.(jpeg|png)$/, '.webp')}`, import.meta.url).href;
// Brand mark cropped from the supplied PDFs (public/logo.png), served from the site root.
const logoUrl = '/logo.png';

export const IMAGES = {
  hero: img('mokpatz123.jpeg'),
  promo: img('promo-banner-full.jpeg'),
  sushi1: img('sushi1.jpeg'),
  sushi2: img('sushi2.jpeg'),
  sushiCombo: img('sushiCombo.jpeg'),
  sushiPlatter: img('sushiPlatter.jpeg'),
  sushiAndPoke: img('sushiANDpoke.jpeg'),
  sushiTakeAway: img('sushi take away meal.jpeg'),
  magashSushi: img('magashsushi.jpeg'),
  magashSushi2: img('magashsushi2.jpeg'),
  partyPlatter: img('sushi party platter.jpeg'),
  pokeBowl: img('poke bowl.jpeg'),
  poki123: img('poki123.jpeg'),
  pokiTuna: img('pokituna.jpeg'),
  chickenNoodle: img('chicken noodle bowl.jpeg'),
  chickenNoodle2: img('chicken noodle bowls.jpeg'),
  chickenWings: img('chikenWings.jpeg'),
  logo: logoUrl,

  // Newly supplied dish photos (replace the per-item placeholders above where noted).
  crispyRoll: img('crispy-roll.png'),
  spicySalmon: img('spicy-salmon.png'),
  dragonRoll: img('dragon-roll.png'),
  rainbowFish: img('rainbow-fish.png'),
  sunRoll: img('sun-roll.png'),
  rollsRoyce: img('rolls-royce.png'),
  spicyTuna: img('spicy-tuna.png'),
  veggieRoll: img('veggie-roll.png'),
  futomakiTempura: img('futomaki-tempura.png'),
  nigiriSalmon: img('nigiri.png'),

  // Category-header photos, used only by CategoryShortcuts.
  specialsHero: img('specials.png'),
  pokeHero: img('poke.png'),
  wokHero: img('wok.png'),
  startersHero: img('starters.png'),
  partyTraysHero: img('party-trays.png'),
  kidsHero: img('kids.png'),
  drinksHero: img('drinks.png'),
  buildYourOwnHero: img('build-your-own.png'),
  combosHero: img('combos.png'),

  // Second batch of supplied dish photos.
  sushiBoxPhoto: img('sushi-box.png'),
  vegEggroll: img('veg-eggroll.png'),
  salmonPokeBowl: img('salmon-poke.png'),
  wings: img('wings.png'),
  trayVip: img('tray-vip.png'),
  trayMix: img('tray-mix.png'),
  trayVeggie: img('tray-veggie.png'),
  kidsNoodles: img('kids-noodles.png'),
  nigiriTuna: img('nigiri-tuna.png'),
  nigiriSalmonPiece: img('nigiri-salmon.png'),
  nigiriSalmonTorched: img('nigiri-salmon-torched.png'),
  smokyNoodles: img('smoky-noodles.png'),
  padThai: img('pad-thai.png'),
  tunaPokeBowl: img('tuna-poke.png'),
  friedRice: img('fried-rice.png'),
  bigFries: img('big-fries.png'),
  friedCombo: img('fried-combo.png'),
  salmonCombo: img('salmon-combo.png'),
  kimchi: img('kimchi.png'),
  crispySweetPotato: img('crispy-sweet-potato.png'),
  kidsSchnitzel: img('kids-schnitzel.png'),
  veggieCombo: img('veggie-combo.png'),
};

export const starters: MenuCategory = {
  id: 'starters',
  navLabel: 'מנות פתיחה',
  title: 'מנות פתיחה',
  icon: '🥢',
  items: [
    { id: 'kimchi', name: 'קימצ׳י', description: 'חמוצים יפניים בתיבול ביתי', price: '₪18', numericPrice: 18, image: IMAGES.kimchi },
    { id: 'veg-eggroll', name: 'אגרול ירקות', description: '3 יח׳ קריספיות, מוגש עם רוטב חמוץ־מתוק', price: '₪32', numericPrice: 32, image: IMAGES.vegEggroll },
    { id: 'wings', name: 'כנפיים', description: '8 יח׳ ברוטב צ׳ילי פיקנטי', price: '₪29', numericPrice: 29, image: IMAGES.wings },
    { id: 'crispy-sweet-potato', name: 'קריספי בטטה', description: 'בטטה בציפוי טמפורה פריכה, מוגשת עם ספייסי מיונז וטריאקי', price: '₪29', numericPrice: 29, image: IMAGES.crispySweetPotato },
    { id: 'big-fries', name: 'צ׳יפס גדול', price: '₪26', numericPrice: 26, image: IMAGES.bigFries },
  ],
};

export const poke: MenuCategory = {
  id: 'poke',
  navLabel: 'פוקי',
  title: 'פוקי (Poké Bowl)',
  icon: '🥗',
  subtitle: 'על מצע אורז סושי, מוגש עם ספייסי מיונז וסויה.',
  items: [
    {
      id: 'salmon-poke',
      name: 'פוקי סלמון (נא / אפוי)',
      description: 'טרטר סלמון, אבוקדו, בטטה, מלפפון, בצל ירוק ושומשום',
      price: '₪56',
      numericPrice: 56,
      image: IMAGES.salmonPokeBowl,
      addonChoices: [
        { name: 'סלמון נא', price: 0 },
        { name: 'סלמון אפוי', price: 0 },
      ],
      addonChoiceLabel: 'אופן הכנה',
    },
    {
      id: 'tuna-poke',
      name: 'פוקי טונה אדומה',
      description: 'טרטר טונה אדומה, אבוקדו, בטטה, מלפפון, בצל ירוק ושומשום',
      price: '₪59',
      numericPrice: 59,
      image: IMAGES.tunaPokeBowl,
    },
  ],
};

// Every wok dish must be orderable without a paid protein add-on — "צמחוני /
// ללא תוספת" is a real, ₪0 choice in the same required selector, not a
// fallback. Keep it first in each list so it reads as the default, and never
// give it a price: the existing עוף/בקר/סלמון supplements are unchanged.
const NO_PROTEIN_CHOICE: MenuAddon = { name: 'צמחוני / ללא תוספת', price: 0 };
export const WOK_PROTEIN_CHOICES: MenuAddon[] = [
  NO_PROTEIN_CHOICE,
  { name: 'עוף', price: 10 },
  { name: 'בקר', price: 15 },
  { name: 'סלמון', price: 15 },
];

export const wok: MenuCategory = {
  id: 'wok',
  navLabel: 'מוקפצים',
  title: 'מן הווק (Stir Fry)',
  icon: '🍜',
  subtitle: 'תוספת חלבון לבחירה: צמחוני | עוף +₪10 | בקר +₪15 | סלמון +₪15',
  items: [
    {
      id: 'pad-thai',
      name: 'פאד תאי',
      description: 'אטריות אורז, ביצה, כרוב, גזר, בצל ירוק ולימון',
      price: '₪46',
      numericPrice: 46,
      image: IMAGES.padThai,
      addonChoices: WOK_PROTEIN_CHOICES,
    },
    {
      id: 'smoky-noodles',
      name: 'סמוקי נודלס',
      description: 'אטריות חיטה, פטריות, כרוב, גזר ובצל ירוק',
      price: '₪49',
      numericPrice: 49,
      image: IMAGES.smokyNoodles,
      addonChoices: WOK_PROTEIN_CHOICES,
    },
    {
      id: 'fried-rice',
      name: 'פרייד רייס',
      description: 'אורז אסייתי מוקפץ, פטריות, ביצה, כרוב, גזר ובצל ירוק',
      price: '₪44',
      numericPrice: 44,
      image: IMAGES.friedRice,
      addonChoices: WOK_PROTEIN_CHOICES,
    },
  ],
};

export const specials: MenuCategory = {
  id: 'specials',
  navLabel: 'ספיישלים',
  title: 'ספיישלים',
  icon: '🍣',
  items: [
    { id: 'crispy-roll', name: 'קריספי רול (מטוגן) (8 יח׳)', description: 'סלמון, אבוקדו ובטטה בציפוי טמפורה ופנקו', price: '₪42', numericPrice: 42, image: IMAGES.crispyRoll },
    { id: 'spicy-salmon', name: 'ספייסי סלמון (8 יח׳)', description: 'בטטה, אבוקדו ומלפפון במעטפת טרטר סלמון ועירית', price: '₪52', numericPrice: 52, image: IMAGES.spicySalmon },
    { id: 'dragon-roll', name: 'דרגון רול (8 יח׳)', description: 'סלמון נא, אבוקדו ובטטה במעטפת אבוקדו וספייסי מיונז', price: '₪42', numericPrice: 42, image: IMAGES.dragonRoll },
    { id: 'rainbow-fish', name: 'ריינבו דגים (8 יח׳)', description: 'אבוקדו, מלפפון וגזר במעטפת סלמון, טונה אדומה ודג לבן', price: '₪48', numericPrice: 48, image: IMAGES.rainbowFish },
    { id: 'sun-roll', name: 'סאן רול (8 יח׳)', description: 'סלמון בטמפורה ואבוקדו במעטפת סלמון, אבוקדו, קריספי בטטה, שבבי טמפורה ובצל ירוק', price: '₪55', numericPrice: 55, image: IMAGES.sunRoll },
    { id: 'spicy-tuna', name: 'ספייסי טונה (8 יח׳)', description: 'בטטה, מלפפון וקנפיו במעטפת טונראשי, טרטר ספייסי טונה אדומה, בצל ירוק ושומשום', price: '₪55', numericPrice: 55, image: IMAGES.spicyTuna },
    { id: 'veggie-roll', name: 'ווגי רול (8 יח׳)', description: 'בטטה, אבוקדו, מלפפון וקנפיו במעטפת אבוקדו ובטטה, שבבי טמפורה, קריספי בטטה, בצל ירוק ושומשום', price: '₪49', numericPrice: 49, image: IMAGES.veggieRoll },
    { id: 'futomaki-tempura', name: 'פוטומאקי טמפורה (8 יח׳)', description: 'סלמון, אבוקדו, קנפיו, מלפפון ובצל ירוק, בציפוי טמפורה פריכה', price: '₪49', numericPrice: 49, image: IMAGES.futomakiTempura },
    { id: 'rolls-royce', name: 'רולס רויס (8 יח׳)', description: 'סלמון, טונה אדומה, דג לבן ואבוקדו במעטפת עירית ושומשום קלוי', price: '₪59', numericPrice: 59, image: IMAGES.rollsRoyce },
  ],
};

export const sushiBox = {
  id: 'sushibox',
  navLabel: 'Sushi Box',
  title: 'Sushi Box',
  icon: '⭐',
  subtitleEn: 'Special Box',
  unitsLabel: '40 יחידות',
  description: 'בחרו 5 רולים מתוך קטגוריית הספיישלים של Sushi Wok',
  /** How many Specials rolls make up one Sushi Box — enforced by SushiBoxPickerDialog. */
  requiredRollCount: 5,
  price: '₪249',
  numericPrice: 249,
  image: IMAGES.sushiBoxPhoto,
};

export type ComboItem = {
  id: string;
  name: string;
  price: string;
  numericPrice: number;
  bullets: string[];
  image?: string;
};

export const combos: { id: string; navLabel: string; title: string; icon: string; items: ComboItem[] } = {
  id: 'combos',
  navLabel: 'קומבינציות',
  title: 'קומבינציות השף',
  icon: '🍱',
  items: [
    {
      id: 'salmon-combo',
      name: 'קומבינציית סלמון (24 יח׳)',
      price: '₪90',
      numericPrice: 90,
      bullets: [
        '8 יח׳ I/O סלמון צלוי, אבוקדו ובטטה',
        '8 יח׳ פוטומאקי סלמון נא, בטטה, מלפפון וגזר',
        '8 יח׳ מאקי סלמון',
      ],
      image: IMAGES.salmonCombo,
    },
    {
      id: 'fried-combo',
      name: 'קומבינציה מטוגנת (12 יח׳)',
      price: '₪80',
      numericPrice: 80,
      bullets: [
        '8 יח׳ I/O סלמון, אבוקדו ובטטה בטמפורה ופנקו',
        '4 יח׳ סנדוויץ׳ סושי סלמון, אבוקדו בטמפורה ופנקו',
      ],
      image: IMAGES.friedCombo,
    },
    {
      id: 'veggie-combo',
      name: 'קומבינציה צמחונית (24 יח׳)',
      price: '₪70',
      numericPrice: 70,
      bullets: [
        '8 יח׳ I/O בטטה, מלפפון, אבוקדו במעטפת בצל ירוק',
        '8 יח׳ פוטומאקי מלפפון, אבוקדו, גזר ועירית',
        '8 יח׳ מאקי אבוקדו',
      ],
      image: IMAGES.veggieCombo,
    },
  ],
};

export type RollPrice = {
  type: string;
  fish: number;
  veggie: number;
  /** Vegetables required alongside the single fish choice (fish-base rolls). Omitted for single-choice rolls (maki). */
  vegCountFish?: number;
  /** Vegetables required for the all-vegetarian version (no fish). Omitted for single-choice rolls (maki). */
  vegCountVeggie?: number;
  /** Maki only: the customer picks exactly one ingredient total — one fish OR one vegetable, not a base plus extras. */
  singleChoice?: boolean;
};

export const buildYourOwn = {
  id: 'build',
  navLabel: 'הרכבה עצמית',
  title: 'הרכבה עצמית',
  icon: '🎯',
  titleEn: 'Build Your Own',
  intro: 'בחרו סוג רול',
  rollPrices: [
    { type: 'I/O', fish: 39, veggie: 35, vegCountFish: 2, vegCountVeggie: 3 },
    { type: 'פוטומאקי', fish: 45, veggie: 39, vegCountFish: 3, vegCountVeggie: 4 },
    { type: 'סנדוויץ׳ סושי', fish: 40, veggie: 35, vegCountFish: 3, vegCountVeggie: 3 },
    { type: 'מאקי', fish: 25, veggie: 20, singleChoice: true },
  ] as RollPrice[],
  vegetables: ['אבוקדו', 'בטטה', 'מלפפון', 'גזר', 'בצל ירוק', 'עירית', 'קנפיו'],
  fish: ['סלמון', 'סלמון צלוי', 'טונה אדומה', 'דג לבן'],
  wraps: [
    { name: 'סלמון נא', price: '+₪10' },
    { name: 'סלמון צרוב', price: '+₪10' },
    { name: 'טונה', price: '+₪12' },
    { name: 'אבוקדו', price: '+₪5' },
  ],
  coatings: [
    { name: 'קריספי בטטה', price: '+₪5' },
    { name: 'שבבי טמפורה', price: '+₪5' },
    { name: 'טיגון פנקו', price: '+₪5' },
  ],
};

export const nigiri: MenuCategory = {
  id: 'nigiri',
  navLabel: 'ניגירי',
  title: 'ניגירי',
  icon: '🍣',
  items: [
    { id: 'nigiri-salmon', name: 'ניגירי סלמון (2 יח׳)', price: '₪24', numericPrice: 24, image: IMAGES.nigiriSalmonPiece },
    { id: 'nigiri-salmon-torched', name: 'ניגירי סלמון צרוב (2 יח׳)', price: '₪26', numericPrice: 26, image: IMAGES.nigiriSalmonTorched },
    { id: 'nigiri-tuna', name: 'ניגירי טונה אדומה (2 יח׳)', price: '₪28', numericPrice: 28, image: IMAGES.nigiriTuna },
  ],
};

export const partyTrays: { id: string; navLabel: string; title: string; icon: string; intro: string; items: MenuItem[] } = {
  id: 'trays',
  navLabel: 'מגשי מסיבה',
  title: 'מגשי מסיבה ואירוח',
  icon: '🎉',
  intro: 'מגשי סושי מפנקים לאירוח ולאירועים. כל מגש כולל 12 רולים | 96 יחידות.',
  items: [
    { id: 'tray-veggie', name: 'מגש צמחוני', description: '12 רולים צמחוניים', price: '₪350', numericPrice: 350, image: IMAGES.trayVeggie },
    { id: 'tray-mix', name: 'מגש מיקס', description: '12 רולים מיקס דגים / צמחוני עם תוספות מיוחדות', price: '₪450', numericPrice: 450, image: IMAGES.trayMix },
    { id: 'tray-vip', name: 'מגש דגים VIP', description: '12 רולים דגים ספיישלים', price: '₪500', numericPrice: 500, image: IMAGES.trayVip },
  ],
};

export const kids: MenuCategory = {
  id: 'kids',
  navLabel: 'מנות ילדים',
  title: 'מנות ילדים',
  icon: '👶',
  items: [
    {
      id: 'kids-noodles',
      name: 'נודלס עוף ברוטב טריאקי מתקתק',
      description: 'כולל שתייה קלה',
      price: '₪39',
      numericPrice: 39,
      image: IMAGES.kidsNoodles,
      includesDrinkChoice: true,
      drinkChoices: ['ענבים', 'תפוזים'],
    },
    {
      id: 'kids-schnitzel',
      name: 'שניצלונים',
      description: 'שניצלונים פריכים. תוספת לבחירה: אורז מאודה, צ׳יפס + שתייה קלה',
      price: '₪39',
      numericPrice: 39,
      image: IMAGES.kidsSchnitzel,
      includesDrinkChoice: true,
      drinkChoices: ['ענבים', 'תפוזים'],
      sideChoices: ['אורז מאודה', 'צ׳יפס'],
    },
  ],
};

export const drinks: MenuCategory = {
  id: 'drinks',
  navLabel: 'שתייה',
  title: 'שתייה',
  icon: '🥤',
  items: [
    { id: 'water', name: 'מים', price: '₪8', numericPrice: 8 },
    { id: 'soda', name: 'סודה', price: '₪8', numericPrice: 8 },
    { id: 'coke', name: 'קוקה קולה', price: '₪10', numericPrice: 10 },
    { id: 'coke-zero', name: 'קוקה קולה זירו', price: '₪10', numericPrice: 10 },
    { id: 'sprite', name: 'ספרייט', price: '₪10', numericPrice: 10 },
    { id: 'fanta', name: 'פאנטה', price: '₪10', numericPrice: 10 },
    { id: 'grape', name: 'ענבים', price: '₪10', numericPrice: 10 },
    { id: 'orange', name: 'תפוזים', price: '₪10', numericPrice: 10 },
  ],
};

export const simpleCategories: MenuCategory[] = [starters, poke, wok, specials, nigiri, kids, drinks];

// Single source of truth for category order — every nav surface (main menu,
// desktop/mobile category nav, category shortcuts, the drawer, and section
// anchors) is built by mapping over this list, so they can't drift apart.
// Order taken directly from the business's own printed menu (Sushi1.pdf /
// Sushi2.pdf): page 1 reads starters → poke → wok top to bottom; page 2 reads
// specials → Sushi Box → build-your-own (right-to-left, top row), then
// combinations, nigiri, party trays, kids, drinks. Sushi Box is kept as its
// own category (not nested under קומבינציות) per the client's request, in the
// same position it holds in the printed layout — right after specials.
export const navCategories = [
  { id: starters.id, label: starters.navLabel },
  { id: poke.id, label: poke.navLabel },
  { id: wok.id, label: wok.navLabel },
  { id: specials.id, label: specials.navLabel },
  { id: sushiBox.id, label: sushiBox.navLabel },
  { id: buildYourOwn.id, label: buildYourOwn.navLabel },
  { id: combos.id, label: combos.navLabel },
  { id: nigiri.id, label: nigiri.navLabel },
  { id: partyTrays.id, label: partyTrays.navLabel },
  { id: kids.id, label: kids.navLabel },
  { id: drinks.id, label: drinks.navLabel },
];

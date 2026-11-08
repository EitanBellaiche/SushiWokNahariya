export type RollSelection = {
  type: string;
  base: 'fish' | 'veggie';
  fish?: string;
  vegetables: string[];
  wrap?: string;
  coating?: string;
};

/** Only catalog identifiers/names are submitted; prices are always derived from the catalog. */
export type DishCustomization = {
  removedIngredients?: string[];
  addons?: string[];
  choice?: string;
  drink?: string;
  side?: string;
  roll?: RollSelection;
  rollIds?: string[];
  wokId?: string;
  protein?: string;
};

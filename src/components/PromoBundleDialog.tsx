import React from 'react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  alpha,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { buildYourOwn, wok, WOK_PROTEIN_CHOICES } from '../data/menu';
import type { RollPrice } from '../data/menu';
import { PROMO } from '../data/business';
import { parseAddonPrice } from '../cart/pricing';
import { useCart } from '../cart/CartContext';
import { COLORS } from '../theme';
import { rollSelectionHint } from './BuildYourOwnDialog';

const NONE = '__none__';

/** A maki ingredient is either one fish or one vegetable — never both. */
type MakiIngredient = { kind: 'fish' | 'veg'; name: string };

function makiValue(ingredient: MakiIngredient | null): string {
  return ingredient ? `${ingredient.kind}::${ingredient.name}` : '';
}

function parseMakiValue(value: string): MakiIngredient {
  const [kind, name] = value.split('::');
  return { kind: kind as 'fish' | 'veg', name };
}

type PromoBundleDialogProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * The ₪69 promo bundle (wok dish + build-your-own roll). The wok side follows
 * the same required, real "צמחוני / ללא תוספת" default as the standalone wok
 * menu (WOK_PROTEIN_CHOICES) — protein is a paid add-on, not a fallback. The
 * roll side reuses the standalone build-your-own roll rules; the promo price
 * covers the veggie-base roll, and any upgrade (fish base, wrap, coating)
 * costs the same difference/add-on price as it would standalone.
 */
export function PromoBundleDialog({ open, onClose }: PromoBundleDialogProps) {
  const { addLine } = useCart();
  const rolls = buildYourOwn.rollPrices;

  const [wokItemId, setWokItemId] = React.useState<string>(wok.items[0].id);
  const [proteinName, setProteinName] = React.useState<string>(WOK_PROTEIN_CHOICES[0].name);

  const [rollType, setRollType] = React.useState<string>(rolls[0].type);
  const [base, setBase] = React.useState<'fish' | 'veggie'>('veggie');
  const [fishChoice, setFishChoice] = React.useState<string>(buildYourOwn.fish[0]);
  const [vegetables, setVegetables] = React.useState<string[]>([]);
  const [makiIngredient, setMakiIngredient] = React.useState<MakiIngredient | null>(null);
  const [wrap, setWrap] = React.useState<string>(NONE);
  const [coating, setCoating] = React.useState<string>(NONE);
  const [quantity, setQuantity] = React.useState(1);
  const [error, setError] = React.useState(false);

  const resetRollSelection = () => {
    setBase('veggie');
    setFishChoice(buildYourOwn.fish[0]);
    setVegetables([]);
    setMakiIngredient(null);
    setError(false);
  };

  React.useEffect(() => {
    if (open) {
      setWokItemId(wok.items[0].id);
      setProteinName(WOK_PROTEIN_CHOICES[0].name);
      setRollType(rolls[0].type);
      resetRollSelection();
      setWrap(NONE);
      setCoating(NONE);
      setQuantity(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Each roll type has its own ingredient limits, so switching type mid-dialog
  // must clear whatever was already picked rather than carrying over a count
  // that may now exceed (or fall short of) the new type's requirement.
  React.useEffect(() => {
    resetRollSelection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rollType]);

  const selectedWokItem = wok.items.find((item) => item.id === wokItemId) ?? wok.items[0];
  const selectedProtein = WOK_PROTEIN_CHOICES.find((p) => p.name === proteinName) ?? WOK_PROTEIN_CHOICES[0];

  const selectedRoll = rolls.find((r) => r.type === rollType) as RollPrice;
  const isMaki = Boolean(selectedRoll.singleChoice);
  const requiredVeg = base === 'fish' ? selectedRoll.vegCountFish ?? 0 : selectedRoll.vegCountVeggie ?? 0;

  const wrapObj = buildYourOwn.wraps.find((w) => w.name === wrap);
  const coatingObj = buildYourOwn.coatings.find((c) => c.name === coating);
  const wrapPrice = wrapObj ? parseAddonPrice(wrapObj.price) : 0;
  const coatingPrice = coatingObj ? parseAddonPrice(coatingObj.price) : 0;

  // The promo base price already covers the veggie-base roll — a fish base
  // costs the same extra as it would standalone (fish price minus veggie price).
  const rollUpgradePrice = isMaki
    ? makiIngredient?.kind === 'fish'
      ? selectedRoll.fish - selectedRoll.veggie
      : 0
    : base === 'fish'
      ? selectedRoll.fish - selectedRoll.veggie
      : 0;

  const unitPrice = PROMO.numericPrice + selectedProtein.price + rollUpgradePrice + wrapPrice + coatingPrice;

  const isRollValid = isMaki ? makiIngredient !== null : base === 'fish' ? Boolean(fishChoice) && vegetables.length === requiredVeg : vegetables.length === requiredVeg;

  const toggleVegetable = (veg: string) => {
    setVegetables((prev) => {
      if (prev.includes(veg)) return prev.filter((v) => v !== veg);
      if (prev.length >= requiredVeg) return prev;
      return [...prev, veg];
    });
    setError(false);
  };

  const handleAdd = () => {
    if (!isRollValid) {
      setError(true);
      return;
    }

    const options: string[] = [`מוקפץ: ${selectedWokItem.name}`];
    options.push(selectedProtein.price > 0 ? `תוספת חלבון: ${selectedProtein.name} (+₪${selectedProtein.price})` : `תוספת חלבון: ${selectedProtein.name}`);

    options.push(`סוג רול: ${rollType}`);
    if (isMaki && makiIngredient) {
      options.push(makiIngredient.kind === 'fish' ? `דג: ${makiIngredient.name}` : `ירק: ${makiIngredient.name}`);
    } else {
      options.push(`בסיס רול: ${base === 'fish' ? 'דג' : 'צמחוני'}`);
      if (base === 'fish') options.push(`דג: ${fishChoice}`);
      options.push(`ירקות: ${vegetables.join(', ')}`);
    }
    if (wrapObj) options.push(`מעטפה: ${wrapObj.name} (+₪${wrapPrice})`);
    if (coatingObj) options.push(`ציפוי: ${coatingObj.name} (+₪${coatingPrice})`);

    addLine({
      productId: 'promo-wok-roll',
      name: PROMO.text,
      unitPrice,
      quantity,
      options,
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{ sx: { bgcolor: COLORS.bg, color: COLORS.white, borderRadius: 3, m: 1.5 } }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
        <Typography sx={{ fontWeight: 800, fontSize: '1.05rem' }}>{PROMO.text}</Typography>
        <IconButton onClick={onClose} aria-label="סגירה" sx={{ color: COLORS.white }}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        <Stack spacing={2.25}>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 0.25 }}>בחרו מוקפץ</Typography>
            <RadioGroup value={wokItemId} onChange={(e) => setWokItemId(e.target.value)}>
              {wok.items.map((item) => (
                <FormControlLabel key={item.id} value={item.id} control={<Radio size="small" />} label={item.name} />
              ))}
            </RadioGroup>
          </Box>

          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 0.25 }}>תוספת חלבון למוקפץ</Typography>
            <RadioGroup value={proteinName} onChange={(e) => setProteinName(e.target.value)}>
              {WOK_PROTEIN_CHOICES.map((p) => (
                <FormControlLabel key={p.name} value={p.name} control={<Radio size="small" />} label={p.price > 0 ? `${p.name} +₪${p.price}` : p.name} />
              ))}
            </RadioGroup>
          </Box>

          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 0.75 }}>סוג רול (הרכבה עצמית)</Typography>
            <ToggleButtonGroup
              value={rollType}
              exclusive
              onChange={(_e, value) => value && setRollType(value)}
              sx={{ flexWrap: 'wrap', gap: 1 }}
            >
              {rolls.map((roll) => (
                <ToggleButton
                  key={roll.type}
                  value={roll.type}
                  sx={{
                    borderRadius: '999px !important',
                    border: '1px solid !important',
                    borderColor: `${alpha(COLORS.red, 0.4)} !important`,
                    color: COLORS.white,
                    fontSize: '0.8rem',
                    px: 1.5,
                    '&.Mui-selected': { bgcolor: COLORS.red, color: COLORS.white },
                  }}
                >
                  {roll.type}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <Typography sx={{ mt: 0.75, fontSize: '0.78rem', color: COLORS.textMuted }}>{rollSelectionHint(selectedRoll)}</Typography>
          </Box>

          {isMaki ? (
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 0.25 }}>
                בחרו מרכיב אחד — דג או ירק ({makiIngredient ? 'נבחר: ' + makiIngredient.name : 'טרם נבחר'})
              </Typography>
              <RadioGroup
                value={makiValue(makiIngredient)}
                onChange={(e) => {
                  setMakiIngredient(parseMakiValue(e.target.value));
                  setError(false);
                }}
              >
                {buildYourOwn.fish.map((f) => (
                  <FormControlLabel
                    key={`fish-${f}`}
                    value={makiValue({ kind: 'fish', name: f })}
                    control={<Radio size="small" />}
                    label={`דג: ${f}${selectedRoll.fish - selectedRoll.veggie > 0 ? ` (+₪${selectedRoll.fish - selectedRoll.veggie})` : ''}`}
                  />
                ))}
                {buildYourOwn.vegetables.map((v) => (
                  <FormControlLabel key={`veg-${v}`} value={makiValue({ kind: 'veg', name: v })} control={<Radio size="small" />} label={`ירק: ${v}`} />
                ))}
              </RadioGroup>
              {error && !isRollValid && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  יש לבחור מרכיב אחד: דג או ירק
                </Alert>
              )}
            </Box>
          ) : (
            <>
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 0.25 }}>בסיס רול</Typography>
                <RadioGroup row value={base} onChange={(e) => setBase(e.target.value as 'fish' | 'veggie')}>
                  <FormControlLabel value="veggie" control={<Radio size="small" />} label="צמחוני · כלול במבצע" />
                  <FormControlLabel
                    value="fish"
                    control={<Radio size="small" />}
                    label={`דג${selectedRoll.fish - selectedRoll.veggie > 0 ? ` +₪${selectedRoll.fish - selectedRoll.veggie}` : ''}`}
                  />
                </RadioGroup>
              </Box>

              {base === 'fish' && (
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 0.25 }}>בחרו דג</Typography>
                  <RadioGroup value={fishChoice} onChange={(e) => setFishChoice(e.target.value)}>
                    {buildYourOwn.fish.map((f) => (
                      <FormControlLabel key={f} value={f} control={<Radio size="small" />} label={f} />
                    ))}
                  </RadioGroup>
                </Box>
              )}

              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 0.25 }}>
                  ירקות — בחרו {requiredVeg} (נבחרו {vegetables.length} מתוך {requiredVeg})
                </Typography>
                <FormGroup>
                  {buildYourOwn.vegetables.map((veg) => {
                    const checked = vegetables.includes(veg);
                    const disabled = !checked && vegetables.length >= requiredVeg;
                    return (
                      <FormControlLabel
                        key={veg}
                        control={<Checkbox size="small" checked={checked} disabled={disabled} onChange={() => toggleVegetable(veg)} />}
                        label={veg}
                      />
                    );
                  })}
                </FormGroup>
                {error && !isRollValid && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    יש לבחור בדיוק {requiredVeg} ירקות{base === 'fish' ? ' ודג אחד' : ''}
                  </Alert>
                )}
              </Box>
            </>
          )}

          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 0.25 }}>מעטפה מיוחדת לרול (אופציונלי)</Typography>
            <RadioGroup value={wrap} onChange={(e) => setWrap(e.target.value)}>
              <FormControlLabel value={NONE} control={<Radio size="small" />} label="ללא" />
              {buildYourOwn.wraps.map((w) => (
                <FormControlLabel key={w.name} value={w.name} control={<Radio size="small" />} label={`${w.name} (${w.price})`} />
              ))}
            </RadioGroup>
          </Box>

          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 0.25 }}>ציפוי לרול (אופציונלי)</Typography>
            <RadioGroup value={coating} onChange={(e) => setCoating(e.target.value)}>
              <FormControlLabel value={NONE} control={<Radio size="small" />} label="ללא" />
              {buildYourOwn.coatings.map((c) => (
                <FormControlLabel key={c.name} value={c.name} control={<Radio size="small" />} label={`${c.name} (${c.price})`} />
              ))}
            </RadioGroup>
          </Box>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography sx={{ fontWeight: 700, fontSize: '0.85rem' }}>כמות</Typography>
            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ border: '1px solid', borderColor: COLORS.surfaceBorder, borderRadius: 999 }}>
              <IconButton onClick={() => setQuantity((q) => Math.max(1, q - 1))} sx={{ color: COLORS.white, width: 40, height: 40 }}>
                <RemoveRoundedIcon fontSize="small" />
              </IconButton>
              <Typography sx={{ minWidth: 24, textAlign: 'center', fontWeight: 700 }}>{quantity}</Typography>
              <IconButton onClick={() => setQuantity((q) => Math.min(20, q + 1))} sx={{ color: COLORS.white, width: 40, height: 40 }}>
                <AddRoundedIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={!isRollValid}
            onClick={handleAdd}
            sx={{ minHeight: 52, fontSize: '1rem' }}
          >
            הוסף להזמנה · ₪{unitPrice * quantity}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

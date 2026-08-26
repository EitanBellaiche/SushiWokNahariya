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
import { buildYourOwn } from '../data/menu';
import type { RollPrice } from '../data/menu';
import { parseAddonPrice } from '../cart/pricing';
import { useCart } from '../cart/CartContext';
import { COLORS } from '../theme';

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

/** Short Hebrew hint shown on each roll-type card so the customer knows the limit before opening the dialog. */
export function rollSelectionHint(roll: RollPrice): string {
  if (roll.singleChoice) return 'מרכיב אחד: דג או ירק';
  return `דג: 1 דג + ${roll.vegCountFish} ירקות  ·  צמחוני: ${roll.vegCountVeggie} ירקות`;
}

type BuildYourOwnDialogProps = {
  open: boolean;
  onClose: () => void;
  initialType?: string;
};

export function BuildYourOwnDialog({ open, onClose, initialType }: BuildYourOwnDialogProps) {
  const { addLine } = useCart();
  const rolls = buildYourOwn.rollPrices;

  const [rollType, setRollType] = React.useState<string>(initialType ?? rolls[0].type);
  const [base, setBase] = React.useState<'fish' | 'veggie'>('fish');
  const [fishChoice, setFishChoice] = React.useState<string>(buildYourOwn.fish[0]);
  const [vegetables, setVegetables] = React.useState<string[]>([]);
  const [makiIngredient, setMakiIngredient] = React.useState<MakiIngredient | null>(null);
  const [wrap, setWrap] = React.useState<string>(NONE);
  const [coating, setCoating] = React.useState<string>(NONE);
  const [quantity, setQuantity] = React.useState(1);
  const [error, setError] = React.useState(false);

  const resetSelection = () => {
    setBase('fish');
    setFishChoice(buildYourOwn.fish[0]);
    setVegetables([]);
    setMakiIngredient(null);
    setError(false);
  };

  React.useEffect(() => {
    if (open) {
      setRollType(initialType ?? rolls[0].type);
      resetSelection();
      setWrap(NONE);
      setCoating(NONE);
      setQuantity(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialType]);

  // Each roll type has its own ingredient limits, so switching type mid-dialog
  // must clear whatever was already picked rather than carrying over a count
  // that may now exceed (or fall short of) the new type's requirement.
  React.useEffect(() => {
    resetSelection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rollType]);

  const selectedRoll = rolls.find((r) => r.type === rollType) as RollPrice;
  const isMaki = Boolean(selectedRoll.singleChoice);
  const requiredVeg = base === 'fish' ? selectedRoll.vegCountFish ?? 0 : selectedRoll.vegCountVeggie ?? 0;

  const wrapObj = buildYourOwn.wraps.find((w) => w.name === wrap);
  const coatingObj = buildYourOwn.coatings.find((c) => c.name === coating);
  const wrapPrice = wrapObj ? parseAddonPrice(wrapObj.price) : 0;
  const coatingPrice = coatingObj ? parseAddonPrice(coatingObj.price) : 0;

  const basePrice = isMaki
    ? makiIngredient
      ? makiIngredient.kind === 'fish'
        ? selectedRoll.fish
        : selectedRoll.veggie
      : 0
    : base === 'fish'
      ? selectedRoll.fish
      : selectedRoll.veggie;
  const unitPrice = basePrice + wrapPrice + coatingPrice;

  const isValid = isMaki ? makiIngredient !== null : base === 'fish' ? Boolean(fishChoice) && vegetables.length === requiredVeg : vegetables.length === requiredVeg;

  const toggleVegetable = (veg: string) => {
    setVegetables((prev) => {
      if (prev.includes(veg)) return prev.filter((v) => v !== veg);
      if (prev.length >= requiredVeg) return prev;
      return [...prev, veg];
    });
    setError(false);
  };

  const handleAdd = () => {
    if (!isValid) {
      setError(true);
      return;
    }

    const options: string[] = [];
    if (isMaki && makiIngredient) {
      options.push(makiIngredient.kind === 'fish' ? `דג: ${makiIngredient.name}` : `ירק: ${makiIngredient.name}`);
    } else {
      options.push(`בסיס: ${base === 'fish' ? 'דג' : 'צמחוני'}`);
      if (base === 'fish') options.push(`דג: ${fishChoice}`);
      options.push(`ירקות: ${vegetables.join(', ')}`);
    }
    if (wrapObj) options.push(`מעטפה: ${wrapObj.name} (+₪${wrapPrice})`);
    if (coatingObj) options.push(`ציפוי: ${coatingObj.name} (+₪${coatingPrice})`);

    addLine({
      productId: `build-${rollType}`,
      name: `${rollType} (הרכבה אישית)`,
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
        <Typography sx={{ fontWeight: 800, fontSize: '1.05rem' }}>הרכיבו את הרול שלכם</Typography>
        <IconButton onClick={onClose} aria-label="סגירה" sx={{ color: COLORS.white }}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        <Stack spacing={2.25}>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 0.75 }}>סוג רול</Typography>
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
                  <FormControlLabel key={`fish-${f}`} value={makiValue({ kind: 'fish', name: f })} control={<Radio size="small" />} label={`דג: ${f}`} />
                ))}
                {buildYourOwn.vegetables.map((v) => (
                  <FormControlLabel key={`veg-${v}`} value={makiValue({ kind: 'veg', name: v })} control={<Radio size="small" />} label={`ירק: ${v}`} />
                ))}
              </RadioGroup>
              {error && !isValid && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  יש לבחור מרכיב אחד: דג או ירק
                </Alert>
              )}
            </Box>
          ) : (
            <>
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 0.25 }}>בסיס</Typography>
                <RadioGroup row value={base} onChange={(e) => setBase(e.target.value as 'fish' | 'veggie')}>
                  <FormControlLabel value="fish" control={<Radio size="small" />} label={`דג · ₪${selectedRoll.fish}`} />
                  <FormControlLabel value="veggie" control={<Radio size="small" />} label={`צמחוני · ₪${selectedRoll.veggie}`} />
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
                {error && !isValid && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    יש לבחור בדיוק {requiredVeg} ירקות{base === 'fish' ? ' ודג אחד' : ''}
                  </Alert>
                )}
              </Box>
            </>
          )}

          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 0.25 }}>מעטפה מיוחדת (אופציונלי)</Typography>
            <RadioGroup value={wrap} onChange={(e) => setWrap(e.target.value)}>
              <FormControlLabel value={NONE} control={<Radio size="small" />} label="ללא" />
              {buildYourOwn.wraps.map((w) => (
                <FormControlLabel key={w.name} value={w.name} control={<Radio size="small" />} label={`${w.name} (${w.price})`} />
              ))}
            </RadioGroup>
          </Box>

          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 0.25 }}>ציפוי (אופציונלי)</Typography>
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
            disabled={!isValid}
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

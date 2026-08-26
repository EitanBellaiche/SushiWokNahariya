import React from 'react';
import {
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
  const [wrap, setWrap] = React.useState<string>(NONE);
  const [coating, setCoating] = React.useState<string>(NONE);
  const [quantity, setQuantity] = React.useState(1);

  React.useEffect(() => {
    if (open) {
      setRollType(initialType ?? rolls[0].type);
      setBase('fish');
      setFishChoice(buildYourOwn.fish[0]);
      setVegetables([]);
      setWrap(NONE);
      setCoating(NONE);
      setQuantity(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialType]);

  const selectedRoll = rolls.find((r) => r.type === rollType) as RollPrice;
  const wrapObj = buildYourOwn.wraps.find((w) => w.name === wrap);
  const coatingObj = buildYourOwn.coatings.find((c) => c.name === coating);

  const basePrice = base === 'fish' ? selectedRoll.fish : selectedRoll.veggie;
  const wrapPrice = wrapObj ? parseAddonPrice(wrapObj.price) : 0;
  const coatingPrice = coatingObj ? parseAddonPrice(coatingObj.price) : 0;
  const unitPrice = basePrice + wrapPrice + coatingPrice;

  const toggleVegetable = (veg: string) => {
    setVegetables((prev) => (prev.includes(veg) ? prev.filter((v) => v !== veg) : [...prev, veg]));
  };

  const handleAdd = () => {
    const options: string[] = [`בסיס: ${base === 'fish' ? 'דג' : 'צמחוני'}`];
    if (base === 'fish') options.push(`דג: ${fishChoice}`);
    if (vegetables.length > 0) options.push(`ירקות: ${vegetables.join(', ')}`);
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
          </Box>

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
            <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 0.25 }}>ירקות (לבחירה חופשית)</Typography>
            <FormGroup>
              {buildYourOwn.vegetables.map((veg) => (
                <FormControlLabel
                  key={veg}
                  control={<Checkbox size="small" checked={vegetables.includes(veg)} onChange={() => toggleVegetable(veg)} />}
                  label={veg}
                />
              ))}
            </FormGroup>
          </Box>

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

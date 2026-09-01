import React from 'react';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { drinks } from '../data/menu';
import { useCart } from '../cart/CartContext';
import { StoreClosedNotice } from './StoreClosedNotice';
import { COLORS } from '../theme';

type BundledChoiceDialogProps = {
  open: boolean;
  onClose: () => void;
  productId: string;
  name: string;
  unitPrice: number;
  sideChoices?: string[];
  /** Restricts the drink radio list to these names; omit to offer the full drinks menu. */
  drinkChoices?: string[];
};

/** For menu items whose price already bundles a soft drink (and sometimes a side) — asks which one before adding to the cart. */
export function BundledChoiceDialog({ open, onClose, productId, name, unitPrice, sideChoices, drinkChoices }: BundledChoiceDialogProps) {
  const { addLine, storeOpen } = useCart();
  const availableDrinks = drinkChoices && drinkChoices.length > 0 ? drinks.items.filter((d) => drinkChoices.includes(d.name)) : drinks.items;
  const [side, setSide] = React.useState(sideChoices?.[0] ?? '');
  const [drink, setDrink] = React.useState(availableDrinks[0]?.name ?? '');
  const [quantity, setQuantity] = React.useState(1);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setSide(sideChoices?.[0] ?? '');
      setDrink(availableDrinks[0]?.name ?? '');
      setQuantity(1);
      setError(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleAdd = () => {
    if (!storeOpen) return;
    if (!drink) {
      setError(true);
      return;
    }
    const options: string[] = [];
    if (sideChoices && sideChoices.length > 0) options.push(`תוספת: ${side}`);
    options.push(`שתייה: ${drink}`);

    addLine({ productId, name, unitPrice, quantity, options });
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
        <Typography sx={{ fontWeight: 800, fontSize: '1.05rem' }}>{name}</Typography>
        <IconButton onClick={onClose} aria-label="סגירה" sx={{ color: COLORS.white }}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        <Stack spacing={2.25}>
          {sideChoices && sideChoices.length > 0 && (
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 0.25 }}>תוספת לבחירה</Typography>
              <RadioGroup value={side} onChange={(e) => setSide(e.target.value)}>
                {sideChoices.map((choice) => (
                  <FormControlLabel key={choice} value={choice} control={<Radio size="small" />} label={choice} />
                ))}
              </RadioGroup>
            </Box>
          )}

          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 0.25 }}>בחרו שתייה קלה</Typography>
            <RadioGroup
              value={drink}
              onChange={(e) => {
                setDrink(e.target.value);
                setError(false);
              }}
            >
              {availableDrinks.map((d) => (
                <FormControlLabel key={d.id} value={d.name} control={<Radio size="small" />} label={d.name} />
              ))}
            </RadioGroup>
            {error && (
              <Alert severity="error" sx={{ mt: 1 }}>
                נא לבחור שתייה
              </Alert>
            )}
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

          <StoreClosedNotice />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={!storeOpen}
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

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
  Stack,
  Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { specials, sushiBox } from '../data/menu';
import { useCart } from '../cart/CartContext';
import { COLORS } from '../theme';

type SushiBoxPickerDialogProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * Sushi Box = exactly 5 rolls picked from the real Specials (ספיישלים)
 * products — never a duplicated/fake copy of that data. The 5 chosen names
 * are recorded as cart options so they show up in the cart and WhatsApp
 * order text like any other customization.
 */
export function SushiBoxPickerDialog({ open, onClose }: SushiBoxPickerDialogProps) {
  const { addLine } = useCart();
  const requiredCount = sushiBox.requiredRollCount;
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [quantity, setQuantity] = React.useState(1);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setSelectedIds([]);
      setQuantity(1);
      setError(false);
    }
  }, [open]);

  const isValid = selectedIds.length === requiredCount;

  const toggleRoll = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= requiredCount) return prev;
      return [...prev, id];
    });
    setError(false);
  };

  const handleAdd = () => {
    if (!isValid) {
      setError(true);
      return;
    }

    const names = selectedIds.map((id) => specials.items.find((item) => item.id === id)?.name ?? id);
    addLine({
      productId: sushiBox.id,
      name: sushiBox.title,
      unitPrice: sushiBox.numericPrice,
      quantity,
      options: names.map((name, index) => `רול ${index + 1}: ${name}`),
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
        <Typography sx={{ fontWeight: 800, fontSize: '1.05rem' }}>בחרו {requiredCount} רולים ל-Sushi Box</Typography>
        <IconButton onClick={onClose} aria-label="סגירה" sx={{ color: COLORS.white }}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        <Stack spacing={2.25}>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 0.75 }}>
              נבחרו {selectedIds.length} מתוך {requiredCount}
            </Typography>
            <FormGroup>
              {specials.items.map((item) => {
                const checked = selectedIds.includes(item.id);
                const disabled = !checked && selectedIds.length >= requiredCount;
                return (
                  <FormControlLabel
                    key={item.id}
                    control={<Checkbox size="small" checked={checked} disabled={disabled} onChange={() => toggleRoll(item.id)} />}
                    label={item.name}
                  />
                );
              })}
            </FormGroup>
            {error && !isValid && (
              <Alert severity="error" sx={{ mt: 1 }}>
                יש לבחור בדיוק {requiredCount} רולים
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

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={!isValid}
            onClick={handleAdd}
            sx={{ minHeight: 52, fontSize: '1rem' }}
          >
            הוסף להזמנה · ₪{sushiBox.numericPrice * quantity}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

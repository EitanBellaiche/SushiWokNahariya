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
import type { MenuAddon } from '../data/menu';
import { useCart } from '../cart/CartContext';
import { COLORS } from '../theme';

type PaidAddonChoiceDialogProps = {
  open: boolean;
  onClose: () => void;
  productId: string;
  name: string;
  unitPrice: number;
  addons: MenuAddon[];
  /** Overrides the default "תוספת" wording (e.g. "אופן הכנה" for a raw/baked choice). */
  label?: string;
};

/** Collects a required addon choice (e.g. a paid protein, or a free prep-style option) before adding an item to the cart. */
export function PaidAddonChoiceDialog({ open, onClose, productId, name, unitPrice, addons, label = 'תוספת' }: PaidAddonChoiceDialogProps) {
  const { addLine } = useCart();
  const [selectedAddonName, setSelectedAddonName] = React.useState('');
  const [quantity, setQuantity] = React.useState(1);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setSelectedAddonName('');
      setQuantity(1);
      setError(false);
    }
  }, [open]);

  const selectedAddon = addons.find((addon) => addon.name === selectedAddonName);
  const totalUnitPrice = unitPrice + (selectedAddon?.price ?? 0);

  const handleAdd = () => {
    if (!selectedAddon) {
      setError(true);
      return;
    }

    addLine({
      productId,
      name,
      unitPrice: totalUnitPrice,
      quantity,
      options: [selectedAddon.price > 0 ? `${label}: ${selectedAddon.name} (+₪${selectedAddon.price})` : `${label}: ${selectedAddon.name}`],
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
        <Typography sx={{ fontWeight: 800, fontSize: '1.05rem' }}>{name}</Typography>
        <IconButton onClick={onClose} aria-label="סגירה" sx={{ color: COLORS.white }}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        <Stack spacing={2.25}>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 0.25 }}>בחרו {label}</Typography>
            <RadioGroup
              value={selectedAddonName}
              onChange={(event) => {
                setSelectedAddonName(event.target.value);
                setError(false);
              }}
            >
              {addons.map((addon) => (
                <FormControlLabel
                  key={addon.name}
                  value={addon.name}
                  control={<Radio size="small" />}
                  label={addon.price > 0 ? `${addon.name} +₪${addon.price}` : addon.name}
                />
              ))}
            </RadioGroup>
            {error && <Alert severity="error" sx={{ mt: 1 }}>נא לבחור {label}</Alert>}
          </Box>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography sx={{ fontWeight: 700, fontSize: '0.85rem' }}>כמות</Typography>
            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ border: '1px solid', borderColor: COLORS.surfaceBorder, borderRadius: 999 }}>
              <IconButton onClick={() => setQuantity((current) => Math.max(1, current - 1))} sx={{ color: COLORS.white, width: 40, height: 40 }}>
                <RemoveRoundedIcon fontSize="small" />
              </IconButton>
              <Typography sx={{ minWidth: 24, textAlign: 'center', fontWeight: 700 }}>{quantity}</Typography>
              <IconButton onClick={() => setQuantity((current) => Math.min(20, current + 1))} sx={{ color: COLORS.white, width: 40, height: 40 }}>
                <AddRoundedIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>

          <Button variant="contained" color="primary" fullWidth size="large" onClick={handleAdd} sx={{ minHeight: 52, fontSize: '1rem' }}>
            הוסף להזמנה · ₪{totalUnitPrice * quantity}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

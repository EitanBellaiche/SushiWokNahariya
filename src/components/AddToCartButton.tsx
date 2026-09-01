import React from 'react';
import { Button, IconButton, Stack, Typography, alpha } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useCart } from '../cart/CartContext';
import { COLORS } from '../theme';

type AddToCartButtonProps = {
  productId: string;
  name: string;
  unitPrice?: number;
  fullWidth?: boolean;
  /** Icon-only pill, for tight single-line rows (e.g. drinks). Becomes a live +/- stepper once the item is in the cart. */
  compact?: boolean;
};

/** "הוסף להזמנה" button for menu items with a fixed price and no configurable options. */
export function AddToCartButton({ productId, name, unitPrice, fullWidth, compact }: AddToCartButtonProps) {
  const { addLine, items, updateQuantity, storeOpen } = useCart();
  const [justAdded, setJustAdded] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  React.useEffect(() => () => clearTimeout(timeoutRef.current), []);

  if (unitPrice == null) return null;

  const handleClick = () => {
    if (!storeOpen) return;
    addLine({ productId, name, unitPrice });
    setJustAdded(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setJustAdded(false), 1400);
  };

  if (compact) {
    // Items with no configurable options (like drinks) always land on the
    // same cart line, so this line's quantity is exactly "how many of this
    // are in the cart" — show it directly instead of a plus button that
    // silently keeps incrementing with no visible count.
    const line = items.find((l) => l.productId === productId && l.options.length === 0);

    if (line) {
      return (
        <Stack
          direction="row"
          alignItems="center"
          spacing={0}
          sx={{ border: '1px solid', borderColor: alpha(COLORS.red, 0.5), borderRadius: 999, flexShrink: 0 }}
        >
          <IconButton
            onClick={() => updateQuantity(line.lineId, line.quantity - 1)}
            aria-label={`הפחת כמות של ${name}`}
            size="small"
            sx={{ width: 30, height: 30, color: COLORS.red }}
          >
            <RemoveRoundedIcon fontSize="small" />
          </IconButton>
          <Typography sx={{ minWidth: 16, textAlign: 'center', fontWeight: 700, fontSize: '0.82rem', color: COLORS.white }}>
            {line.quantity}
          </Typography>
          <IconButton
            onClick={() => updateQuantity(line.lineId, line.quantity + 1)}
            aria-label={`הוסף עוד ${name} להזמנה`}
            data-testid={`add-to-cart-${productId}`}
            size="small"
            sx={{ width: 30, height: 30, color: COLORS.red }}
          >
            <AddRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      );
    }

    return (
      <IconButton
        onClick={handleClick}
        disabled={!storeOpen}
        aria-label={`הוסף ${name} להזמנה`}
        data-testid={`add-to-cart-${productId}`}
        size="small"
        sx={{
          width: 32,
          height: 32,
          color: COLORS.red,
          bgcolor: alpha(COLORS.red, 0.1),
          border: '1px solid',
          borderColor: alpha(COLORS.red, 0.5),
          flexShrink: 0,
          '&:hover': { bgcolor: alpha(COLORS.red, 0.18) },
        }}
      >
        <AddRoundedIcon fontSize="small" />
      </IconButton>
    );
  }

  return (
    <Button
      onClick={handleClick}
      disabled={!storeOpen}
      size="small"
      fullWidth={fullWidth}
      aria-label={`הוסף ${name} להזמנה`}
      data-testid={`add-to-cart-${productId}`}
      startIcon={justAdded ? <CheckRoundedIcon fontSize="small" /> : <AddRoundedIcon fontSize="small" />}
      sx={{
        alignSelf: 'flex-start',
        minHeight: 38,
        px: 1.75,
        borderRadius: 999,
        fontSize: '0.8rem',
        fontWeight: 700,
        color: justAdded ? COLORS.white : COLORS.red,
        bgcolor: justAdded ? COLORS.red : alpha(COLORS.red, 0.1),
        border: '1px solid',
        borderColor: alpha(COLORS.red, 0.5),
        transition: 'background-color 0.15s ease',
        '& .MuiButton-startIcon': { ml: 0.5, mr: 0 },
        '&:hover': { bgcolor: justAdded ? COLORS.red : alpha(COLORS.red, 0.18) },
      }}
    >
      {justAdded ? 'נוסף להזמנה' : storeOpen ? 'הוסף להזמנה' : 'המקום סגור'}
    </Button>
  );
}

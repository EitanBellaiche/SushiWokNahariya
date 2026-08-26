import React from 'react';
import { Button, IconButton, alpha } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useCart } from '../cart/CartContext';
import { COLORS } from '../theme';

type AddToCartButtonProps = {
  productId: string;
  name: string;
  unitPrice?: number;
  fullWidth?: boolean;
  /** Icon-only pill, for tight single-line rows (e.g. drinks). */
  compact?: boolean;
};

/** "הוסף להזמנה" button for menu items with a fixed price and no configurable options. */
export function AddToCartButton({ productId, name, unitPrice, fullWidth, compact }: AddToCartButtonProps) {
  const { addLine } = useCart();
  const [justAdded, setJustAdded] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  React.useEffect(() => () => clearTimeout(timeoutRef.current), []);

  if (unitPrice == null) return null;

  const handleClick = () => {
    addLine({ productId, name, unitPrice });
    setJustAdded(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setJustAdded(false), 1400);
  };

  if (compact) {
    return (
      <IconButton
        onClick={handleClick}
        aria-label={`הוסף ${name} להזמנה`}
        data-testid={`add-to-cart-${productId}`}
        size="small"
        sx={{
          width: 32,
          height: 32,
          color: justAdded ? COLORS.white : COLORS.red,
          bgcolor: justAdded ? COLORS.red : alpha(COLORS.red, 0.1),
          border: '1px solid',
          borderColor: alpha(COLORS.red, 0.5),
          flexShrink: 0,
          '&:hover': { bgcolor: justAdded ? COLORS.red : alpha(COLORS.red, 0.18) },
        }}
      >
        {justAdded ? <CheckRoundedIcon fontSize="small" /> : <AddRoundedIcon fontSize="small" />}
      </IconButton>
    );
  }

  return (
    <Button
      onClick={handleClick}
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
      {justAdded ? 'נוסף להזמנה' : 'הוסף להזמנה'}
    </Button>
  );
}

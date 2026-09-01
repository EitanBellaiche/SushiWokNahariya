import { Box, Button, alpha } from '@mui/material';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { BUSINESS, buildWhatsAppLink } from '../data/business';
import { useCart } from '../cart/CartContext';
import { COLORS } from '../theme';

export function MobileOrderBar() {
  const { totalItems, totalPrice, openCart, storeOpen } = useCart();
  const hasItems = totalItems > 0;

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20,
        display: { xs: 'block', md: 'none' },
        p: 1.1,
        pb: 'calc(env(safe-area-inset-bottom, 0px) + 10px)',
        background: `linear-gradient(0deg, ${COLORS.bg} 60%, transparent 100%)`,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 1,
        }}
      >
        <Button
          variant="outlined"
          href={`tel:${BUSINESS.phone}`}
          startIcon={<PhoneEnabledIcon />}
          sx={{
            minHeight: 52,
            borderRadius: 999,
            fontSize: '0.95rem',
            color: COLORS.white,
            bgcolor: COLORS.bgElevated,
            borderColor: alpha(COLORS.red, 0.5),
            boxShadow: `0 14px 30px ${alpha('#000', 0.35)}`,
            '& .MuiButton-startIcon': { ml: 0.7, mr: 0 },
            '&:hover': { borderColor: COLORS.red, bgcolor: COLORS.bgElevated },
          }}
        >
          התקשר
        </Button>

        {hasItems ? (
          <Button
            variant="contained"
            color="primary"
            onClick={openCart}
            startIcon={<ShoppingCartRoundedIcon />}
            sx={{
              minHeight: 52,
              borderRadius: 999,
              fontSize: '0.88rem',
              boxShadow: `0 14px 30px ${alpha(COLORS.red, 0.4)}`,
              '& .MuiButton-startIcon': { ml: 0.7, mr: 0 },
            }}
          >
            ההזמנה שלי · {totalItems} פריטים · ₪{totalPrice}
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            disabled={!storeOpen}
            startIcon={<WhatsAppIcon />}
            sx={{
              minHeight: 52,
              borderRadius: 999,
              fontSize: '0.95rem',
              boxShadow: `0 14px 30px ${alpha(COLORS.red, 0.4)}`,
              '& .MuiButton-startIcon': { ml: 0.7, mr: 0 },
            }}
          >
            {storeOpen ? 'הזמן עכשיו' : 'המקום סגור כרגע'}
          </Button>
        )}
      </Box>
    </Box>
  );
}

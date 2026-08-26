import { Box, Typography, alpha } from '@mui/material';
import { DELIVERY_TIME_ESTIMATE } from '../cart/delivery';
import { COLORS } from '../theme';

/** Shared "estimated delivery time" note — shown on the menu and in the cart, so the customer knows what to expect before ordering. */
export function DeliveryTimeNote() {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: alpha(COLORS.red, 0.4),
        bgcolor: alpha(COLORS.red, 0.08),
        borderRadius: 2,
        px: 1.5,
        py: 1,
      }}
    >
      <Typography sx={{ fontWeight: 800, fontSize: '0.88rem', color: COLORS.white }}>{DELIVERY_TIME_ESTIMATE.headline}</Typography>
      <Typography sx={{ fontSize: '0.76rem', color: COLORS.textSecondary, mt: 0.25, lineHeight: 1.5 }}>
        {DELIVERY_TIME_ESTIMATE.detail}
      </Typography>
    </Box>
  );
}

import { Alert, Box, Container, Typography } from '@mui/material';
import { useCart } from '../cart/CartContext';
import { BUSINESS } from '../data/business';

/** Site-wide banner shown near the top of the page whenever the store is outside ordering hours. */
export function StoreStatusBanner() {
  const { storeOpen, reopensLabel } = useCart();
  if (storeOpen) return null;

  return (
    <Box sx={{ px: { xs: 2.5, md: 3 }, pt: 1.5 }}>
      <Container maxWidth="lg" disableGutters>
        <Alert severity="warning" sx={{ fontWeight: 700 }}>
          המקום סגור כרגע ולא ניתן לשלוח הזמנה. אפשר להזמין שוב {reopensLabel}.
          <Typography sx={{ fontWeight: 400, fontSize: '0.8rem', mt: 0.5 }}>
            שעות פעילות: {BUSINESS.hoursWeekday} · {BUSINESS.hoursWeekend}
          </Typography>
        </Alert>
      </Container>
    </Box>
  );
}

import { Box, Container, Stack, Typography, alpha } from '@mui/material';
import { sushiBox } from '../data/menu';
import { BUSINESS } from '../data/business';
import { COLORS } from '../theme';
import { Reveal } from '../hooks/useReveal';
import { MenuImage } from './MenuImage';
import { AddToCartButton } from './AddToCartButton';

export function SushiBoxSection() {
  return (
    <Box component="section" id={sushiBox.id} aria-labelledby="sushibox-heading" sx={{ py: { xs: 2, md: 2.5 } }}>
      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2.5, md: 3 } }}>
        <Reveal>
          <Box
            sx={{
              borderRadius: 3,
              border: '1px solid',
              borderColor: COLORS.red,
              boxShadow: `0 0 0 1px ${alpha(COLORS.red, 0.2)}, 0 18px 40px ${alpha(COLORS.red, 0.18)}`,
              bgcolor: COLORS.surface,
              p: { xs: 2.5, md: 3 },
              textAlign: 'center',
              maxWidth: 420,
              mx: 'auto',
            }}
          >
            <Stack spacing={1} alignItems="center">
              <MenuImage src={sushiBox.image} alt={`${sushiBox.title} – ${BUSINESS.nameHe}`} size={96} rounded={2} />
              <Box component="span" aria-hidden="true" sx={{ fontSize: '1.4rem' }}>
                {sushiBox.icon}
              </Box>
              <Typography id="sushibox-heading" component="h2" sx={{ fontSize: '1.3rem', fontWeight: 800, color: COLORS.white, lineHeight: 1.15 }}>
                {sushiBox.title}
              </Typography>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: COLORS.textSecondary }}>{sushiBox.subtitleEn}</Typography>
              <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: COLORS.red, pt: 0.5 }}>{sushiBox.unitsLabel}</Typography>
              <Typography sx={{ color: COLORS.textSecondary, fontSize: '0.85rem', lineHeight: 1.5 }}>{sushiBox.description}</Typography>

              <Typography
                sx={{
                  mt: 1,
                  fontWeight: 900,
                  fontSize: '1.9rem',
                  color: COLORS.white,
                  bgcolor: COLORS.red,
                  px: 2,
                  py: 0.3,
                  borderRadius: 1.5,
                }}
              >
                {sushiBox.price}
              </Typography>

              <Box sx={{ pt: 0.75 }}>
                <AddToCartButton productId={sushiBox.id} name={sushiBox.title} unitPrice={sushiBox.numericPrice} />
              </Box>
              <Typography sx={{ fontSize: '0.72rem', color: COLORS.textMuted }}>
                נא לציין את 5 הרולים הרצויים בהערות להזמנה
              </Typography>
            </Stack>
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
}

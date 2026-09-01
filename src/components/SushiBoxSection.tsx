import React from 'react';
import { Box, Button, Container, Stack, Typography, alpha } from '@mui/material';
import { sushiBox } from '../data/menu';
import { BUSINESS } from '../data/business';
import { COLORS } from '../theme';
import { Reveal } from '../hooks/useReveal';
import { MenuImage } from './MenuImage';
import { SectionHeading } from './MenuSection';
import { SushiBoxPickerDialog } from './SushiBoxPickerDialog';

export function SushiBoxSection() {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <Box component="section" id={sushiBox.id} aria-labelledby="sushibox-heading" sx={{ scrollMarginTop: { xs: '134px', md: '168px' }, py: { xs: 3.5, md: 4.5 } }}>
      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2.5, md: 3 } }}>
        <Reveal>
          <SectionHeading id="sushibox-heading" title={sushiBox.title} />
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setDialogOpen(true)}
                  sx={{ minHeight: 44, px: 2.5, fontSize: '0.9rem', fontWeight: 700 }}
                >
                  בחרו {sushiBox.requiredRollCount} רולים והוסיפו להזמנה
                </Button>
              </Box>
              <Typography sx={{ fontSize: '0.72rem', color: COLORS.textMuted }}>
                בחרו {sushiBox.requiredRollCount} רולים מתוך רולי הספיישלים
              </Typography>
            </Stack>
          </Box>
        </Reveal>
      </Container>

      <SushiBoxPickerDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Box>
  );
}

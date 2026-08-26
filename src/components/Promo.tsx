import React from 'react';
import { Box, Button, Container, alpha } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { PROMO } from '../data/business';
import { COLORS } from '../theme';
import { Reveal } from '../hooks/useReveal';
import { PromoBundleDialog } from './PromoBundleDialog';

// Native size of the supplied promo video — the box is locked to this
// aspect ratio so the footage is never cropped.
const VIDEO_ASPECT = '1280 / 720';

export function Promo() {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <Box component="section" aria-labelledby="promo-heading" sx={{ px: { xs: 2, md: 3 }, py: { xs: 3, md: 4 } }}>
      <Container maxWidth="lg" disableGutters>
        <Reveal>
          <Box
            sx={{
              overflow: 'hidden',
              borderRadius: 0,
              maxWidth: { xs: '100%', md: 760 },
              mx: { xs: 0, md: 'auto' },
              bgcolor: COLORS.bg,
            }}
          >
            <Box sx={{ position: 'relative', aspectRatio: VIDEO_ASPECT }}>
              <Box
                component="video"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="/promo-video-poster.jpg"
                aria-hidden="true"
                sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              >
                <source src="/promo-video.webm" type="video/webm" />
                <source src="/promo-video.mp4" type="video/mp4" />
              </Box>

              {/* Soft vignette so the footage dissolves into the page background
                  instead of showing a hard rectangular edge. */}
              <Box
                aria-hidden="true"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  boxShadow: `inset 0 0 18px 0px ${alpha(COLORS.bg, 0.55)}`,
                }}
              />

              {/* Real, accessible copy of the offer for screen readers and search engines —
                  the visible design is the supplied video; this never renders on screen. */}
              <Box
                sx={{
                  position: 'absolute',
                  width: 1,
                  height: 1,
                  overflow: 'hidden',
                  clip: 'rect(0 0 0 0)',
                  whiteSpace: 'nowrap',
                }}
              >
                <h2 id="promo-heading">{PROMO.title}</h2>
                <p>{PROMO.text}</p>
                <p>
                  {PROMO.price} {PROMO.priceLabel}
                </p>
              </Box>
            </Box>

            {/* Real, visible ordering button — the video itself doesn't have a clickable CTA */}
            <Box sx={{ p: { xs: 1.75, md: 2.25 } }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                startIcon={<AddRoundedIcon />}
                onClick={() => setDialogOpen(true)}
                sx={{
                  py: 1.3,
                  fontSize: '1rem',
                  boxShadow: `0 14px 30px ${alpha(COLORS.red, 0.35)}`,
                  '& .MuiButton-startIcon': { ml: 1, mr: 0 },
                }}
              >
                להזמנת המבצע
              </Button>
            </Box>
          </Box>
        </Reveal>
      </Container>

      <PromoBundleDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Box>
  );
}

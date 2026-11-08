import { Box, ButtonBase, Container, Stack, Typography, alpha } from '@mui/material';
import { useDishDetails } from '../dishes/DishDetailsContext';
import { partyTrays } from '../data/menu';
import type { MenuItem } from '../data/menu';
import { BUSINESS } from '../data/business';
import { COLORS } from '../theme';
import { Reveal } from '../hooks/useReveal';
import { SectionHeading } from './MenuSection';
import { ImageDisclaimer, MenuImage } from './MenuImage';
import { AddToCartButton } from './AddToCartButton';

function TrayCard({ tray, index }: { tray: MenuItem; index: number }) {
  const openDish = useDishDetails();
  return (
    <Reveal delay={index * 80}>
      <Box
        onClick={() => openDish(tray.id)}
        sx={{ cursor: 'pointer',
          borderRadius: 4,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: COLORS.surfaceBorder,
          bgcolor: COLORS.surface,
        }}
      >
        <MenuImage src={tray.image} alt={`${tray.name} – ${BUSINESS.nameHe}`} aspectRatio="16 / 10" rounded={0} eager={index === 0} />
        <Stack spacing={0.5} sx={{ p: 2.25 }}>
          <ImageDisclaimer />
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" gap={1}>
            <Typography component="h3" sx={{ fontSize: '1.1rem', fontWeight: 800, color: COLORS.white }}>
              <ButtonBase onClick={(e) => { e.stopPropagation(); openDish(tray.id); }} aria-haspopup="dialog" sx={{ font: 'inherit', color: 'inherit', textAlign: 'start' }}>{tray.name}</ButtonBase>
            </Typography>
            <Typography
              sx={{
                fontWeight: 900,
                fontSize: '1.15rem',
                color: COLORS.white,
                bgcolor: COLORS.red,
                px: 1.25,
                borderRadius: 1,
                whiteSpace: 'nowrap',
              }}
            >
              {tray.price}
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: '0.88rem', color: COLORS.textSecondary }}>{tray.description}</Typography>
          <Box sx={{ pt: 0.5 }}>
            <AddToCartButton productId={tray.id} name={tray.name} unitPrice={tray.numericPrice} fullWidth />
          </Box>
        </Stack>
      </Box>
    </Reveal>
  );
}

export function PartyTraysSection() {
  return (
    <Box
      component="section"
      id={partyTrays.id}
      aria-labelledby="trays-heading"
      sx={{ scrollMarginTop: { xs: '134px', md: '168px' }, py: { xs: 3.5, md: 4.5 } }}
    >
      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2.5, md: 3 } }}>
        <Reveal>
          <SectionHeading id="trays-heading" title={partyTrays.title} subtitle={partyTrays.intro} />
        </Reveal>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: { xs: 2.5, md: 2.5 },
          }}
        >
          {partyTrays.items.map((tray, index) => (
            <TrayCard key={tray.id} tray={tray} index={index} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

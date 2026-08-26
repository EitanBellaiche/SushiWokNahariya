import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import { combos } from '../data/menu';
import type { ComboItem } from '../data/menu';
import { BUSINESS } from '../data/business';
import { COLORS } from '../theme';
import { Reveal } from '../hooks/useReveal';
import { SectionHeading } from './MenuSection';
import { MenuImage } from './MenuImage';
import { AddToCartButton } from './AddToCartButton';

function ComboRow({ combo }: { combo: ComboItem }) {
  return (
    <Stack direction="row" gap={1.5} sx={{ py: 1.4 }}>
      <MenuImage src={combo.image} alt={`${combo.name} – ${BUSINESS.nameHe}`} size={64} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack direction="row" alignItems="baseline" flexWrap="wrap" gap={1}>
          <Typography component="h3" sx={{ fontSize: '0.98rem', fontWeight: 700, color: COLORS.white }}>
            {combo.name}
          </Typography>
          <Typography sx={{ fontWeight: 800, fontSize: '0.98rem', color: COLORS.red, whiteSpace: 'nowrap', flexShrink: 0 }}>
            {combo.price}
          </Typography>
        </Stack>

        <Stack spacing={0.35} sx={{ mt: 0.6 }}>
          {combo.bullets.map((bullet) => (
            <Stack direction="row" spacing={0.9} useFlexGap alignItems="flex-start" key={bullet}>
              <FiberManualRecordRoundedIcon sx={{ fontSize: 6, color: COLORS.red, mt: '7px', flexShrink: 0 }} />
              <Typography sx={{ fontSize: '0.82rem', color: COLORS.textSecondary, lineHeight: 1.5 }}>{bullet}</Typography>
            </Stack>
          ))}
        </Stack>

        <Box sx={{ mt: 0.9 }}>
          <AddToCartButton productId={combo.id} name={combo.name} unitPrice={combo.numericPrice} />
        </Box>
      </Box>
    </Stack>
  );
}

export function CombosSection() {
  return (
    <Box component="section" id={combos.id} aria-labelledby="combos-heading" sx={{ scrollMarginTop: { xs: '134px', md: '168px' }, py: { xs: 3.5, md: 4.5 } }}>
      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2.5, md: 3 } }}>
        <Reveal>
          <SectionHeading id="combos-heading" icon={combos.icon} title={combos.title} />
        </Reveal>
      </Container>

      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2.5, md: 3 }, mt: { xs: 2.5, md: 3 } }}>
        <Reveal>
          <Box
            sx={{
              border: '1px solid',
              borderColor: COLORS.surfaceBorder,
              borderRadius: 3,
              bgcolor: COLORS.surface,
              px: { xs: 1.75, md: 2 },
            }}
          >
            {combos.items.map((combo, index) => (
              <Box key={combo.id}>
                <ComboRow combo={combo} />
                {index < combos.items.length - 1 && <Divider sx={{ borderColor: COLORS.surfaceBorder }} />}
              </Box>
            ))}
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
}

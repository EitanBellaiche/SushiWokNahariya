import { Box, Container, Divider } from '@mui/material';
import { combos } from '../data/menu';
import type { ComboItem } from '../data/menu';
import { COLORS } from '../theme';
import { Reveal } from '../hooks/useReveal';
import { MenuRow, SectionHeading } from './MenuSection';

function ComboRow({ combo }: { combo: ComboItem }) {
  return <MenuRow item={{ ...combo, description: combo.bullets.join('\n') }} />;
}

export function CombosSection() {
  return (
    <Box component="section" id={combos.id} aria-labelledby="combos-heading" sx={{ scrollMarginTop: { xs: '134px', md: '168px' }, py: { xs: 3.5, md: 4.5 } }}>
      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2.5, md: 3 } }}>
        <Reveal>
          <SectionHeading id="combos-heading" title={combos.title} />
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

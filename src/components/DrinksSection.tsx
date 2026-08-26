import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import { drinks } from '../data/menu';
import { COLORS } from '../theme';
import { Reveal } from '../hooks/useReveal';
import { SectionHeading } from './MenuSection';
import { AddToCartButton } from './AddToCartButton';

export function DrinksSection() {
  return (
    <Box component="section" id={drinks.id} aria-labelledby="drinks-heading" sx={{ scrollMarginTop: { xs: '134px', md: '168px' }, py: { xs: 3.5, md: 4.5 } }}>
      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2.5, md: 3 } }}>
        <Reveal>
          <SectionHeading id="drinks-heading" icon={drinks.icon} title={drinks.title} />

          <Box>
            {drinks.items.map((item, index) => (
              <Box key={item.id}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1.25} sx={{ py: 1.1 }}>
                  <Stack direction="row" alignItems="center" gap={0.75}>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: COLORS.white }}>{item.name}</Typography>
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: COLORS.red, flexShrink: 0 }} />
                  </Stack>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography sx={{ fontWeight: 800, fontSize: '0.9rem', color: COLORS.red, whiteSpace: 'nowrap' }}>{item.price}</Typography>
                    <AddToCartButton productId={item.id} name={item.name} unitPrice={item.numericPrice} compact />
                  </Stack>
                </Stack>
                {index < drinks.items.length - 1 && <Divider sx={{ borderColor: COLORS.surfaceBorder }} />}
              </Box>
            ))}
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
}

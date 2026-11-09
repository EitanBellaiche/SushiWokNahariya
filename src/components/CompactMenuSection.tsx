import { Box, ButtonBase, Container, Divider, Stack, Typography } from '@mui/material';
import { useDishDetails } from '../dishes/DishDetailsContext';
import type { MenuCategory } from '../data/menu';
import { COLORS } from '../theme';
import { Reveal } from '../hooks/useReveal';
import { SectionHeading } from './MenuSection';
import { AddToCartButton } from './AddToCartButton';
import { ImageDisclaimer, MenuImage } from './MenuImage';

/** One-line rows with quick add-to-cart, for simple items with nothing to customize (drinks, sauces). */
export function CompactMenuSection({ category }: { category: MenuCategory }) {
  const openDish = useDishDetails();
  return (
    <Box component="section" id={category.id} aria-labelledby={`${category.id}-heading`} sx={{ scrollMarginTop: { xs: '134px', md: '168px' }, py: { xs: 3.5, md: 4.5 } }}>
      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2.5, md: 3 } }}>
        <Reveal>
          <SectionHeading id={`${category.id}-heading`} title={category.title} />

          <Box>
            {category.items.map((item, index) => (
              <Box key={item.id}>
                <Stack onClick={() => openDish(item.id)} direction="row" alignItems="center" justifyContent="space-between" gap={1.25} sx={{ py: 1.1, cursor: 'pointer' }}>
                  <ButtonBase onClick={(event) => { event.stopPropagation(); openDish(item.id); }} aria-haspopup="dialog" aria-label={`פרטים והתאמה: ${item.name}`} sx={{ display: 'flex', gap: 1.25, alignItems: 'center', flex: 1, minWidth: 0, justifyContent: 'flex-start', minHeight: 56, textAlign: 'start' }}>
                    <MenuImage src={item.image} alt={item.name} size={56} rounded={1} fit="contain" />
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: COLORS.white }}>{item.name}</Typography>
                  </ButtonBase>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography sx={{ fontWeight: 800, fontSize: '0.9rem', color: COLORS.red, whiteSpace: 'nowrap' }}>{item.price}</Typography>
                    <Box onClick={(event) => event.stopPropagation()}><AddToCartButton productId={item.id} name={item.name} unitPrice={item.numericPrice} compact /></Box>
                  </Stack>
                </Stack>
                {index < category.items.length - 1 && <Divider sx={{ borderColor: COLORS.surfaceBorder }} />}
              </Box>
            ))}
          </Box>
          <ImageDisclaimer plural sx={{ pt: 1.25, textAlign: 'center' }} />
        </Reveal>
      </Container>
    </Box>
  );
}

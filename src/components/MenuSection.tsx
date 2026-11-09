import React from 'react';
import { Box, ButtonBase, Container, Divider, Stack, Typography, alpha } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import type { MenuCategory, MenuItem } from '../data/menu';
import { BUSINESS } from '../data/business';
import { COLORS } from '../theme';
import { Reveal } from '../hooks/useReveal';
import { ImageDisclaimer, MenuImage } from './MenuImage';
import { useDishDetails } from '../dishes/DishDetailsContext';

type MenuSectionProps = {
  category: MenuCategory;
};

export function SectionHeading({
  id,
  title,
  subtitle,
  note,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  note?: string;
}) {
  return (
    <Stack spacing={0.5} sx={{ mb: { xs: 2, md: 2.5 } }}>
      <Stack direction="row" alignItems="center" spacing={1.25} useFlexGap>
        <Typography
          id={id}
          component="h2"
          sx={{
            display: 'inline-block',
            fontSize: { xs: '1.4rem', md: '1.6rem' },
            fontWeight: 800,
            color: COLORS.white,
            pb: 0.4,
            borderBottom: `2px solid ${COLORS.red}`,
          }}
        >
          {title}
        </Typography>
      </Stack>
      {subtitle && (
        <Typography sx={{ color: COLORS.textSecondary, fontSize: { xs: '0.85rem', md: '0.9rem' } }}>{subtitle}</Typography>
      )}
      {note && <Typography sx={{ color: COLORS.textMuted, fontSize: '0.8rem' }}>{note}</Typography>}
    </Stack>
  );
}

export function MenuRow({ item }: { item: MenuItem }) {
  const openDish = useDishDetails();
  // The aria-label replaces the row's content for screen readers, so price and description are re-attached here.
  const infoId = React.useId();
  const describedBy = item.description ? `${infoId}-price ${infoId}-description` : `${infoId}-price`;
  return (
    <ButtonBase component="div" role="button" tabIndex={0} onClick={() => openDish(item.id)} aria-label={`פרטים והתאמה: ${item.name}`} aria-describedby={describedBy} aria-haspopup="dialog"
      sx={{ width: '100%', textAlign: 'start', display: 'flex', alignItems: 'center', gap: 1.5, py: 1.5, borderRadius: 2,
        '&:hover': { bgcolor: alpha(COLORS.red, 0.04) }, '&.Mui-focusVisible': { outline: `2px solid ${COLORS.white}`, outlineOffset: 2 } }}>
      <MenuImage src={item.image} alt={`${item.name} – ${BUSINESS.nameHe}`} size={72} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack direction="row" alignItems="baseline" flexWrap="wrap" gap={1}>
          <Typography component="h3" sx={{ fontSize: '0.96rem', fontWeight: 700, color: COLORS.white }}>{item.name}</Typography>
          <Typography id={`${infoId}-price`} sx={{ fontWeight: 800, fontSize: '0.96rem', color: COLORS.red, whiteSpace: 'nowrap' }}>{item.price}</Typography>
        </Stack>
        {item.description && <Typography id={`${infoId}-description`} sx={{ mt: 0.3, fontSize: '0.8rem', color: COLORS.textSecondary, lineHeight: 1.5, whiteSpace: 'pre-line' }}>{item.description}</Typography>}
        <Stack direction="row" alignItems="center" gap={0.5} sx={{ mt: 1, color: COLORS.red }}>
          <AddRoundedIcon fontSize="small" /><Typography sx={{ fontSize: '0.8rem', fontWeight: 700 }}>פרטים והתאמה</Typography>
        </Stack>
      </Box>
    </ButtonBase>
  );
}

export function MenuRowList({ category }: { category: MenuCategory }) {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: COLORS.surfaceBorder,
        borderRadius: 3,
        bgcolor: COLORS.surface,
        px: { xs: 1.75, md: 2 },
      }}
    >
      {category.items.some((item) => item.image) && <ImageDisclaimer plural sx={{ pt: 1.25, textAlign: 'center' }} />}
      {category.items.map((item, index) => (
        <Box key={item.id}>
          <MenuRow item={item} />
          {index < category.items.length - 1 && <Divider sx={{ borderColor: COLORS.surfaceBorder }} />}
        </Box>
      ))}
    </Box>
  );
}

export function MenuSection({ category }: MenuSectionProps) {
  return (
    <Box
      component="section"
      id={category.id}
      aria-labelledby={`${category.id}-heading`}
      sx={{ scrollMarginTop: { xs: '134px', md: '168px' }, py: { xs: 3.5, md: 4.5 } }}
    >
      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2.5, md: 3 } }}>
        <Reveal>
          <SectionHeading id={`${category.id}-heading`} title={category.title} subtitle={category.subtitle} note={category.note} />
          <MenuRowList category={category} />
        </Reveal>
      </Container>
    </Box>
  );
}

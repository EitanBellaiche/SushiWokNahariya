import React from 'react';
import { Box, Button, Container, Divider, Stack, Typography, alpha } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import type { MenuCategory, MenuItem } from '../data/menu';
import { COLORS } from '../theme';
import { Reveal } from '../hooks/useReveal';
import { MenuImage } from './MenuImage';
import { AddToCartButton } from './AddToCartButton';
import { BundledChoiceDialog } from './BundledChoiceDialog';
import { PaidAddonChoiceDialog } from './PaidAddonChoiceDialog';

type MenuSectionProps = {
  category: MenuCategory;
};

export function SectionHeading({
  id,
  icon,
  title,
  subtitle,
  note,
}: {
  id?: string;
  icon?: string;
  title: string;
  subtitle?: string;
  note?: string;
}) {
  return (
    <Stack spacing={0.5} sx={{ mb: { xs: 2, md: 2.5 } }}>
      <Stack direction="row" alignItems="center" spacing={1.25} useFlexGap>
        {icon && (
          <Box
            component="span"
            aria-hidden="true"
            sx={{
              width: 36,
              height: 36,
              flexShrink: 0,
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              fontSize: '1.1rem',
              lineHeight: 1,
              border: '1px solid',
              borderColor: alpha(COLORS.red, 0.5),
              bgcolor: alpha(COLORS.red, 0.08),
            }}
          >
            {icon}
          </Box>
        )}
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
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const needsChoice = item.includesDrinkChoice && item.numericPrice != null;
  const needsPaidAddonChoice = Boolean(item.addonChoices?.length && item.numericPrice != null);

  return (
    <Stack direction="row" alignItems="center" gap={1.5} sx={{ py: 1.1 }}>
      <MenuImage src={item.image} alt={item.name} size={64} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack direction="row" alignItems="baseline" flexWrap="wrap" gap={1}>
          <Typography component="h3" sx={{ fontSize: '0.96rem', fontWeight: 700, color: COLORS.white }}>
            {item.name}
          </Typography>
          <Typography sx={{ fontWeight: 800, fontSize: '0.96rem', color: COLORS.red, whiteSpace: 'nowrap', flexShrink: 0 }}>
            {item.price}
          </Typography>
        </Stack>
        {item.description && (
          <Typography sx={{ mt: 0.15, fontSize: '0.8rem', color: COLORS.textSecondary, lineHeight: 1.45 }}>
            {item.description}
          </Typography>
        )}
        <Box sx={{ mt: 0.9 }}>
          {needsChoice ? (
            <>
              <Button
                onClick={() => setDialogOpen(true)}
                size="small"
                data-testid={`bundled-choice-${item.id}`}
                startIcon={<AddRoundedIcon fontSize="small" />}
                sx={{
                  alignSelf: 'flex-start',
                  minHeight: 38,
                  px: 1.75,
                  borderRadius: 999,
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: COLORS.red,
                  bgcolor: alpha(COLORS.red, 0.1),
                  border: '1px solid',
                  borderColor: alpha(COLORS.red, 0.5),
                  '& .MuiButton-startIcon': { ml: 0.5, mr: 0 },
                  '&:hover': { bgcolor: alpha(COLORS.red, 0.18) },
                }}
              >
                בחירת שתייה והוספה
              </Button>
              <BundledChoiceDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                productId={item.id}
                name={item.name}
                unitPrice={item.numericPrice as number}
                sideChoices={item.sideChoices}
              />
            </>
          ) : needsPaidAddonChoice ? (
            <>
              <Button
                onClick={() => setDialogOpen(true)}
                size="small"
                data-testid={`paid-addon-choice-${item.id}`}
                startIcon={<AddRoundedIcon fontSize="small" />}
                sx={{
                  alignSelf: 'flex-start',
                  minHeight: 38,
                  px: 1.75,
                  borderRadius: 999,
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: COLORS.red,
                  bgcolor: alpha(COLORS.red, 0.1),
                  border: '1px solid',
                  borderColor: alpha(COLORS.red, 0.5),
                  '& .MuiButton-startIcon': { ml: 0.5, mr: 0 },
                  '&:hover': { bgcolor: alpha(COLORS.red, 0.18) },
                }}
              >
                בחירת תוספת והוספה
              </Button>
              <PaidAddonChoiceDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                productId={item.id}
                name={item.name}
                unitPrice={item.numericPrice as number}
                addons={item.addonChoices ?? []}
              />
            </>
          ) : (
            <AddToCartButton productId={item.id} name={item.name} unitPrice={item.numericPrice} />
          )}
        </Box>
      </Box>
    </Stack>
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
      sx={{ scrollMarginTop: { xs: '122px', md: '154px' }, py: { xs: 3.5, md: 4.5 } }}
    >
      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2.5, md: 3 } }}>
        <Reveal>
          <SectionHeading id={`${category.id}-heading`} icon={category.icon} title={category.title} subtitle={category.subtitle} note={category.note} />
          <MenuRowList category={category} />
        </Reveal>
      </Container>
    </Box>
  );
}

import React from 'react';
import { Box, Button, ButtonBase, Container, Stack, Typography, alpha } from '@mui/material';
import { buildYourOwn } from '../data/menu';
import { COLORS } from '../theme';
import { Reveal } from '../hooks/useReveal';
import { SectionHeading } from './MenuSection';
import { BuildYourOwnDialog } from './BuildYourOwnDialog';

type RollVariant = 'ring' | 'spiral' | 'cone' | 'block';

const ROLL_ICON_BY_TYPE: Record<string, RollVariant> = {
  'I/O': 'ring',
  פוטומאקי: 'spiral',
  'סנדוויץ׳ סושי': 'block',
  מאקי: 'cone',
};

function RollIcon({ variant }: { variant: RollVariant }) {
  const stroke = COLORS.red;
  if (variant === 'ring') {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.6" />
        <circle cx="12" cy="12" r="3.4" stroke={stroke} strokeWidth="1.6" />
      </svg>
    );
  }
  if (variant === 'spiral') {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.6" />
        <circle cx="9.5" cy="10" r="1.1" fill={stroke} />
        <circle cx="14.5" cy="9.5" r="1.1" fill={stroke} />
        <circle cx="13" cy="14.5" r="1.1" fill={stroke} />
        <circle cx="9" cy="14" r="1.1" fill={stroke} />
      </svg>
    );
  }
  if (variant === 'cone') {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 3.5 L19 20 A9 4 0 0 1 5 20 Z" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M8.3 12.5 Q12 15 15.7 12.5" stroke={stroke} strokeWidth="1.2" />
      </svg>
    );
  }
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="6.5" width="17" height="11" rx="4" stroke={stroke} strokeWidth="1.6" />
      <line x1="3.5" y1="12" x2="20.5" y2="12" stroke={stroke} strokeWidth="1.2" />
    </svg>
  );
}

function RollIconBadge({ type }: { type: string }) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        width: 44,
        height: 44,
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        border: '1px solid',
        borderColor: alpha(COLORS.red, 0.5),
        bgcolor: alpha(COLORS.red, 0.08),
        mx: 'auto',
        mb: 0.75,
      }}
    >
      <RollIcon variant={ROLL_ICON_BY_TYPE[type] ?? 'ring'} />
    </Box>
  );
}

function DotDivider({ label }: { label: string }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.25} useFlexGap>
      <Box sx={{ width: 28, height: '1px', bgcolor: alpha(COLORS.red, 0.5) }} />
      <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: COLORS.red, flexShrink: 0 }} />
      <Typography sx={{ fontWeight: 700, color: COLORS.white, fontSize: '0.9rem', whiteSpace: 'nowrap' }}>{label}</Typography>
      <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: COLORS.red, flexShrink: 0 }} />
      <Box sx={{ width: 28, height: '1px', bgcolor: alpha(COLORS.red, 0.5) }} />
    </Stack>
  );
}

function ChoiceLine({ label, emoji, choices }: { label: string; emoji: string; choices: string[] }) {
  return (
    <Stack spacing={0.4}>
      <Stack direction="row" alignItems="center" spacing={0.6}>
        <Typography sx={{ fontWeight: 700, color: COLORS.red, fontSize: '0.82rem' }}>{label}</Typography>
        <Box component="span" aria-hidden="true" sx={{ fontSize: '0.9rem', lineHeight: 1 }}>{emoji}</Box>
      </Stack>
      <Typography sx={{ color: COLORS.textSecondary, fontSize: '0.85rem', lineHeight: 1.6 }}>{choices.join('  •  ')}</Typography>
    </Stack>
  );
}

function AddonLine({ label, addons }: { label: string; addons: { name: string; price: string }[] }) {
  return (
    <Stack spacing={0.4}>
      <Typography sx={{ fontWeight: 700, color: COLORS.red, fontSize: '0.82rem' }}>{label}</Typography>
      <Typography sx={{ color: COLORS.textSecondary, fontSize: '0.85rem', lineHeight: 1.6 }}>
        {addons.map((a, i) => (
          <Box key={a.name} component="span">
            {a.name}
            <Box component="span" sx={{ color: COLORS.red, fontWeight: 700, mx: 1 }}>{a.price}</Box>
            {i < addons.length - 1 ? '  |  ' : ''}
          </Box>
        ))}
      </Typography>
    </Stack>
  );
}

export function BuildYourOwnSection() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [initialType, setInitialType] = React.useState<string | undefined>(undefined);

  const openDialogFor = (type?: string) => {
    setInitialType(type);
    setDialogOpen(true);
  };

  return (
    <Box
      component="section"
      id={buildYourOwn.id}
      aria-labelledby="build-heading"
      sx={{ scrollMarginTop: { xs: '122px', md: '154px' }, py: { xs: 3.5, md: 4.5 } }}
    >
      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2.5, md: 3 } }}>
        <Reveal>
          <SectionHeading id="build-heading" icon={buildYourOwn.icon} title={buildYourOwn.title} />

          <Stack alignItems="center" spacing={1} sx={{ mb: { xs: 2, md: 2.5 }, mt: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1.25} useFlexGap>
              <Box sx={{ width: 24, height: '1px', bgcolor: alpha(COLORS.red, 0.6) }} />
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', color: COLORS.textMuted }}>
                {buildYourOwn.titleEn.toUpperCase()}
              </Typography>
              <Box sx={{ width: 24, height: '1px', bgcolor: alpha(COLORS.red, 0.6) }} />
            </Stack>
            <Typography sx={{ color: COLORS.textSecondary, fontSize: { xs: '0.85rem', md: '0.9rem' } }}>{buildYourOwn.intro}</Typography>
          </Stack>

          <Box
            sx={{
              border: '1px solid',
              borderColor: COLORS.surfaceBorder,
              borderRadius: 3,
              bgcolor: COLORS.surface,
              overflow: 'hidden',
            }}
          >
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' } }}>
              {buildYourOwn.rollPrices.map((roll) => (
                <ButtonBase
                  key={roll.type}
                  onClick={() => openDialogFor(roll.type)}
                  aria-label={`בחרו רול ${roll.type} והוסיפו להזמנה`}
                  sx={{
                    display: 'block',
                    width: '100%',
                    p: 1.5,
                    textAlign: 'center',
                    borderBottom: '1px solid',
                    borderInlineStart: '1px solid',
                    borderColor: COLORS.surfaceBorder,
                    '&:hover': { bgcolor: alpha(COLORS.red, 0.06) },
                  }}
                >
                  <Box sx={{ width: '100%' }}>
                    <RollIconBadge type={roll.type} />
                    <Typography sx={{ fontWeight: 800, fontSize: '0.88rem', color: COLORS.white, mb: 0.5 }}>{roll.type}</Typography>
                    <Stack direction="row" spacing={1.25} useFlexGap justifyContent="center" sx={{ fontSize: '0.75rem' }}>
                      <Typography sx={{ color: COLORS.textMuted, fontSize: 'inherit' }}>
                        דג <Box component="span" sx={{ color: COLORS.red, fontWeight: 700 }}>₪{roll.fish}</Box>
                      </Typography>
                      <Typography sx={{ color: COLORS.textMuted, fontSize: 'inherit' }}>
                        צמחוני <Box component="span" sx={{ color: COLORS.red, fontWeight: 700 }}>₪{roll.veggie}</Box>
                      </Typography>
                    </Stack>
                  </Box>
                </ButtonBase>
              ))}
            </Box>

            <Stack spacing={1.25} sx={{ p: { xs: 1.75, md: 2.25 } }} divider={<Box sx={{ height: '1px', bgcolor: COLORS.surfaceBorder }} />}>
              <ChoiceLine label="ירקות לבחירה" emoji="🌱" choices={buildYourOwn.vegetables} />
              <ChoiceLine label="דגים לבחירה" emoji="🐟" choices={buildYourOwn.fish} />
            </Stack>

            <Stack
              spacing={1.5}
              sx={{
                p: { xs: 1.75, md: 2.25 },
                borderTop: '1px solid',
                borderColor: COLORS.surfaceBorder,
                bgcolor: alpha(COLORS.red, 0.05),
              }}
            >
              <DotDivider label="תוספות מיוחדות לרול" />
              <AddonLine label="מעטפות" addons={buildYourOwn.wraps} />
              <AddonLine label="ציפויים" addons={buildYourOwn.coatings} />
            </Stack>
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={() => openDialogFor(undefined)}
            sx={{ mt: 2, minHeight: 52, fontSize: '0.95rem' }}
          >
            בחרו רול והוסיפו להזמנה
          </Button>
        </Reveal>
      </Container>

      <BuildYourOwnDialog open={dialogOpen} onClose={() => setDialogOpen(false)} initialType={initialType} />
    </Box>
  );
}

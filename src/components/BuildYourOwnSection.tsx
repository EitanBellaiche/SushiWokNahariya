import React from 'react';
import { Box, ButtonBase, Chip, Container, Divider, Stack, Typography, alpha } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { buildYourOwn } from '../data/menu';
import type { RollPrice } from '../data/menu';
import { COLORS } from '../theme';
import { Reveal } from '../hooks/useReveal';
import { SectionHeading } from './MenuSection';
import { BuildYourOwnDialog } from './BuildYourOwnDialog';
import { ImageDisclaimer, MenuImage } from './MenuImage';

const BUILD_STEPS = ['בוחרים סוג רול', 'בוחרים את המילוי', 'משדרגים אם רוצים'];

function RollPriceRow({ label, price, hint }: { label: string; price: number; hint: string }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" gap={0.75}>
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ color: COLORS.white, fontSize: '0.8rem', fontWeight: 700 }}>{label}</Typography>
        <Typography sx={{ color: COLORS.textSecondary, fontSize: '0.72rem', lineHeight: 1.5 }}>{hint}</Typography>
      </Box>
      <Typography sx={{ color: COLORS.red, fontWeight: 800, fontSize: '1.05rem', flexShrink: 0 }}>₪{price}</Typography>
    </Stack>
  );
}

function RollCard({ roll, index, onSelect }: { roll: RollPrice; index: number; onSelect: () => void }) {
  const detailsId = `build-roll-${index}-details`;
  const pricesId = `build-roll-${index}-prices`;
  return (
    <ButtonBase
      component="div"
      role="button"
      tabIndex={0}
      onClick={onSelect}
      aria-label={`בחרו רול ${roll.type} והוסיפו להזמנה`}
      aria-describedby={`${detailsId} ${pricesId}`}
      aria-haspopup="dialog"
      sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start',
        width: '100%', textAlign: 'start', borderRadius: '18px', overflow: 'hidden',
        border: '1px solid', borderColor: COLORS.surfaceBorder, bgcolor: COLORS.surface,
        transition: 'border-color 180ms ease, background-color 180ms ease',
        '&:hover': { borderColor: alpha(COLORS.redText, 0.7), bgcolor: COLORS.bgElevated },
        '&.Mui-focusVisible': { outline: `2px solid ${COLORS.white}`, outlineOffset: 3 },
      }}
    >
      <MenuImage src={roll.image} alt={`דוגמה לצורת רול ${roll.type}`} aspectRatio="4 / 3" rounded={0} />
      <Stack spacing={1.25} sx={{ p: { xs: 1.5, md: 2 }, flex: 1 }}>
        <Box>
          <Typography component="h3" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, fontWeight: 800, color: COLORS.white }}><bdi>{roll.type}</bdi></Typography>
          <Typography id={detailsId} sx={{ mt: 0.4, minHeight: '3em', fontSize: '0.78rem', lineHeight: 1.5, color: COLORS.textSecondary }}>{roll.description}</Typography>
        </Box>
        <Stack id={pricesId} spacing={1.1} divider={<Divider sx={{ borderColor: COLORS.surfaceBorder }} />}>
          <RollPriceRow label="עם דג" price={roll.fish} hint={roll.singleChoice ? 'דג אחד לבחירה' : `דג אחד + עד ${roll.vegCountFish} ירקות`} />
          <RollPriceRow label="צמחוני" price={roll.veggie} hint={roll.singleChoice ? 'ירק אחד לבחירה' : `עד ${roll.vegCountVeggie} ירקות לבחירה`} />
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" gap={0.5}
          sx={{ mt: 'auto !important', pt: 1.5, color: COLORS.redText }}>
          <Typography sx={{ fontSize: '0.82rem', fontWeight: 800 }}>להרכבת הרול</Typography>
          <ArrowBackRoundedIcon sx={{ fontSize: 19 }} />
        </Stack>
      </Stack>
    </ButtonBase>
  );
}

function ChoiceLine({ label, choices }: { label: string; choices: string[] }) {
  return (
    <Stack spacing={1}>
      <Typography component="h4" sx={{ fontWeight: 700, color: COLORS.white, fontSize: '0.85rem' }}>{label}</Typography>
      <Stack direction="row" flexWrap="wrap" gap={0.75}>
        {choices.map((choice) => <Chip key={choice} label={choice} size="small" variant="outlined" sx={{ fontSize: '0.78rem', borderColor: COLORS.surfaceBorder }} />)}
      </Stack>
    </Stack>
  );
}

function AddonLine({ label, addons }: { label: string; addons: { name: string; price: string }[] }) {
  return (
    <Stack spacing={1}>
      <Typography component="h4" sx={{ fontWeight: 700, color: COLORS.white, fontSize: '0.85rem' }}>{label}</Typography>
      <Stack direction="row" flexWrap="wrap" gap={0.75}>
        {addons.map((addon) => <Box key={addon.name} sx={{ px: 1.25, py: 0.6, border: `1px solid ${COLORS.surfaceBorder}`, borderRadius: 999, fontSize: '0.8rem', color: COLORS.textSecondary }}>
          {addon.name} <Box component="span" sx={{ color: COLORS.red, fontWeight: 700, marginInlineStart: 0.5 }}><bdi dir="ltr">{addon.price}</bdi></Box>
        </Box>)}
      </Stack>
    </Stack>
  );
}

export function BuildYourOwnSection() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [initialType, setInitialType] = React.useState<string | undefined>(undefined);
  const openDialogFor = (type: string) => { setInitialType(type); setDialogOpen(true); };

  return (
    <Box component="section" id={buildYourOwn.id} aria-labelledby="build-heading"
      sx={{ scrollMarginTop: { xs: '134px', md: '168px' }, py: { xs: 3.5, md: 4.5 } }}>
      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2.5, md: 3 } }}>
        <Reveal>
          <SectionHeading id="build-heading" title={buildYourOwn.title} subtitle="בחרו את צורת הרול. את המילוי והתוספות בוחרים בהמשך." />
          <Stack component="ol" direction="row" spacing={1} useFlexGap sx={{ listStyle: 'none', p: 0, mt: 0, mb: 2.5 }}>
            {BUILD_STEPS.map((label, index) => <Stack component="li" key={label} direction="row" alignItems="center" gap={0.75}
              sx={{ flex: 1, minWidth: 0, py: 1, px: { xs: 0.75, sm: 1.5 }, bgcolor: alpha(COLORS.white, 0.025), border: `1px solid ${COLORS.surfaceBorder}`, borderRadius: '12px' }}>
              <Box component="span" aria-hidden="true" sx={{ width: 25, height: 25, flexShrink: 0, display: 'grid', placeItems: 'center', borderRadius: '50%', bgcolor: alpha(COLORS.red, 0.16), color: COLORS.redText, fontSize: '0.8rem', fontWeight: 800 }}>{index + 1}</Box>
              <Typography sx={{ fontSize: { xs: '0.74rem', sm: '0.82rem' }, color: COLORS.textSecondary, lineHeight: 1.45 }}>{label}</Typography>
            </Stack>)}
          </Stack>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' }, gap: { xs: 1.25, sm: 2 } }}>
            {buildYourOwn.rollPrices.map((roll, index) => <RollCard key={roll.type} roll={roll} index={index} onSelect={() => openDialogFor(roll.type)} />)}
          </Box>
          <ImageDisclaimer plural sx={{ mt: 1, textAlign: 'center' }} />

          <Box sx={{ mt: 2.5, p: { xs: 2, md: 2.5 }, border: `1px solid ${COLORS.surfaceBorder}`, borderRadius: '18px', bgcolor: COLORS.surface }}>
            <Typography component="h3" sx={{ fontSize: '1rem', fontWeight: 800, color: COLORS.white, mb: 0.5 }}>מה נכנס לרול שלכם?</Typography>
            <Typography sx={{ color: COLORS.textSecondary, fontSize: '0.8rem', mb: 2 }}>בוחרים את המרכיבים לפי הכמות שמופיעה בסוג הרול.</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <ChoiceLine label="ירקות לבחירה" choices={buildYourOwn.vegetables} />
              <ChoiceLine label="דגים לבחירה" choices={buildYourOwn.fish} />
            </Box>
            <Divider sx={{ my: 2.25, borderColor: COLORS.surfaceBorder }} />
            <Stack direction="row" alignItems="baseline" flexWrap="wrap" gap={1} sx={{ mb: 1.5 }}>
              <Typography component="h3" sx={{ fontSize: '1rem', fontWeight: 800, color: COLORS.white }}>רוצים לשדרג?</Typography>
              <Typography sx={{ fontSize: '0.78rem', color: COLORS.textSecondary }}>מעטפות וציפויים בתוספת תשלום · לבחירה</Typography>
            </Stack>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <AddonLine label="מעטפות" addons={buildYourOwn.wraps} />
              <AddonLine label="ציפויים" addons={buildYourOwn.coatings} />
            </Box>
          </Box>
        </Reveal>
      </Container>
      <BuildYourOwnDialog open={dialogOpen} onClose={() => setDialogOpen(false)} initialType={initialType} />
    </Box>
  );
}

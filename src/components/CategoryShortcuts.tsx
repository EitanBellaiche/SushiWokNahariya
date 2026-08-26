import { Box, Container, Typography, alpha } from '@mui/material';
import {
  IMAGES,
  navCategories,
  specials,
  wok,
  poke,
  starters,
  nigiri,
  partyTrays,
  drinks,
  combos,
  sushiBox,
  buildYourOwn,
  kids,
} from '../data/menu';
import { COLORS } from '../theme';

type Shortcut = { id: string; label: string; image?: string; icon: string };

// Per-category image/icon only — the ORDER is always taken from navCategories
// (the single source of truth for category order across the whole site), so
// this can never drift out of sync with the main nav / drawer / anchors.
const shortcutMeta: Record<string, { image?: string; icon: string }> = {
  [starters.id]: { image: IMAGES.startersHero, icon: starters.icon },
  [specials.id]: { image: IMAGES.specialsHero, icon: specials.icon },
  [buildYourOwn.id]: { image: IMAGES.buildYourOwnHero, icon: buildYourOwn.icon },
  [wok.id]: { image: IMAGES.wokHero, icon: wok.icon },
  [poke.id]: { image: IMAGES.pokeHero, icon: poke.icon },
  [combos.id]: { image: IMAGES.combosHero, icon: combos.icon },
  [nigiri.id]: { image: IMAGES.nigiriSalmon, icon: nigiri.icon },
  [partyTrays.id]: { image: IMAGES.partyTraysHero, icon: partyTrays.icon },
  [kids.id]: { image: IMAGES.kidsHero, icon: kids.icon },
  [drinks.id]: { image: IMAGES.drinksHero, icon: drinks.icon },
};

// Sushi Box is a real nav category (pills, drawer, its own section) but the
// client asked for it not to get a circular photo in this specific row.
const shortcuts: Shortcut[] = navCategories
  .filter((cat) => cat.id !== sushiBox.id)
  .map((cat) => ({
    id: cat.id,
    label: cat.label,
    image: shortcutMeta[cat.id]?.image,
    icon: shortcutMeta[cat.id]?.icon ?? '🍣',
  }));

export function CategoryShortcuts() {
  return (
    <Box component="nav" aria-label="קיצורי דרך לקטגוריות" sx={{ py: { xs: 1.5, md: 2 } }}>
      <Container maxWidth="lg" disableGutters>
        <Box
          sx={{
            display: 'flex',
            gap: 1.75,
            overflowX: 'auto',
            px: { xs: 2, md: 3 },
            pb: 0.5,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {shortcuts.map((item) => (
            <Box
              key={item.id}
              component="a"
              href={`#${item.id}`}
              sx={{
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.6,
                width: 68,
                textDecoration: 'none',
                '&:focus-visible': { outline: `2px solid ${COLORS.red}`, outlineOffset: '2px', borderRadius: '50%' },
              }}
            >
              {item.image ? (
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: COLORS.surfaceBorder,
                    flexShrink: 0,
                  }}
                >
                  <Box component="img" src={item.image} alt="" loading="lazy" sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </Box>
              ) : (
                <Box
                  aria-hidden="true"
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '1.4rem',
                    bgcolor: alpha(COLORS.red, 0.1),
                    border: '1px solid',
                    borderColor: alpha(COLORS.red, 0.3),
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </Box>
              )}
              <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: COLORS.white, textAlign: 'center', lineHeight: 1.2 }}>
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

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

type Shortcut = { id: string; label: string; image?: string };

// Per-category image only — the ORDER is always taken from navCategories
// (the single source of truth for category order across the whole site), so
// this can never drift out of sync with the main nav / drawer / anchors.
const shortcutMeta: Record<string, { image?: string }> = {
  [starters.id]: { image: IMAGES.startersHero },
  [specials.id]: { image: IMAGES.specialsHero },
  [buildYourOwn.id]: { image: IMAGES.buildYourOwnHero },
  [wok.id]: { image: IMAGES.wokHero },
  [poke.id]: { image: IMAGES.pokeHero },
  [combos.id]: { image: IMAGES.combosHero },
  [nigiri.id]: { image: IMAGES.nigiriSalmon },
  [partyTrays.id]: { image: IMAGES.partyTraysHero },
  [kids.id]: { image: IMAGES.kidsHero },
  [drinks.id]: { image: IMAGES.drinksHero },
};

// Sushi Box is a real nav category (pills, drawer, its own section) but the
// client asked for it not to get a circular photo in this specific row.
const shortcuts: Shortcut[] = navCategories
  .filter((cat) => cat.id !== sushiBox.id)
  .map((cat) => ({
    id: cat.id,
    label: cat.label,
    image: shortcutMeta[cat.id]?.image,
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
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: COLORS.red,
                    bgcolor: alpha(COLORS.red, 0.1),
                    border: '1px solid',
                    borderColor: alpha(COLORS.red, 0.3),
                    flexShrink: 0,
                  }}
                >
                  {item.label.charAt(0)}
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

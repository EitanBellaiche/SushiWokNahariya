import { Box, Container, Typography, alpha } from '@mui/material';
import { IMAGES, specials, wok, poke, starters, nigiri, partyTrays, drinks, combos, buildYourOwn, kids } from '../data/menu';
import { COLORS } from '../theme';

type Shortcut = { id: string; label: string; image?: string; icon: string };

const shortcuts: Shortcut[] = [
  { id: specials.id, label: specials.navLabel, image: IMAGES.specialsHero, icon: specials.icon },
  { id: buildYourOwn.id, label: buildYourOwn.navLabel, image: IMAGES.buildYourOwnHero, icon: buildYourOwn.icon },
  { id: wok.id, label: wok.navLabel, image: IMAGES.wokHero, icon: wok.icon },
  { id: poke.id, label: poke.navLabel, image: IMAGES.pokeHero, icon: poke.icon },
  { id: starters.id, label: starters.navLabel, image: IMAGES.startersHero, icon: starters.icon },
  { id: combos.id, label: combos.navLabel, image: IMAGES.combosHero, icon: combos.icon },
  { id: nigiri.id, label: nigiri.navLabel, image: IMAGES.nigiriSalmon, icon: nigiri.icon },
  { id: partyTrays.id, label: partyTrays.navLabel, image: IMAGES.partyTraysHero, icon: partyTrays.icon },
  { id: kids.id, label: kids.navLabel, image: IMAGES.kidsHero, icon: kids.icon },
  { id: drinks.id, label: drinks.navLabel, image: IMAGES.drinksHero, icon: drinks.icon },
];

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

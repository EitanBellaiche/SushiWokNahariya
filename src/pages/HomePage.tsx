import { Box, Container, Typography } from '@mui/material';
import { Promo } from '../components/Promo';
import { DeliveryTimeNote } from '../components/DeliveryTimeNote';
import { MenuNav } from '../components/MenuNav';
import { CategoryShortcuts } from '../components/CategoryShortcuts';
import { MenuSection } from '../components/MenuSection';
import { CombosSection } from '../components/CombosSection';
import { SushiBoxSection } from '../components/SushiBoxSection';
import { BuildYourOwnSection } from '../components/BuildYourOwnSection';
import { PartyTraysSection } from '../components/PartyTraysSection';
import { DrinksSection } from '../components/DrinksSection';
import { WhyOrderSection } from '../components/WhyOrderSection';
import { useActiveSection } from '../hooks/useActiveSection';
import { specials, wok, poke, starters, kids, nigiri, combos, sushiBox, buildYourOwn, partyTrays, drinks, navCategories } from '../data/menu';
import { COLORS } from '../theme';

const sectionIds = navCategories.map((cat) => cat.id);

// One render function per category id — navCategories (the single source of
// truth for category order) decides which of these run, and in what order,
// so the rendered page can never drift from the nav/shortcuts/drawer order.
const sectionRenderers: Record<string, () => JSX.Element> = {
  [starters.id]: () => <MenuSection key={starters.id} category={starters} />,
  [specials.id]: () => <MenuSection key={specials.id} category={specials} />,
  [buildYourOwn.id]: () => <BuildYourOwnSection key={buildYourOwn.id} />,
  [wok.id]: () => <MenuSection key={wok.id} category={wok} />,
  [poke.id]: () => <MenuSection key={poke.id} category={poke} />,
  [sushiBox.id]: () => <SushiBoxSection key={sushiBox.id} />,
  [combos.id]: () => <CombosSection key={combos.id} />,
  [nigiri.id]: () => <MenuSection key={nigiri.id} category={nigiri} />,
  [partyTrays.id]: () => <PartyTraysSection key={partyTrays.id} />,
  [kids.id]: () => <MenuSection key={kids.id} category={kids} />,
  [drinks.id]: () => <DrinksSection key={drinks.id} />,
};

export function HomePage() {
  const activeId = useActiveSection(sectionIds);

  return (
    <Box id="top" component="main">
      <Box component="section" sx={{ px: { xs: 2.5, md: 3 }, pt: { xs: 2.5, md: 3.5 } }}>
        <Container maxWidth="lg" disableGutters>
          <Typography
            component="h1"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 800,
              color: COLORS.white,
              lineHeight: 1.25,
            }}
          >
            סושי ווק נהריה | סושי, אוכל אסייתי ומשלוחים בנהריה
          </Typography>
          <Box sx={{ mt: 1.5, maxWidth: 480, mx: 'auto' }}>
            <DeliveryTimeNote />
          </Box>
        </Container>
      </Box>

      <Promo />

      <Box id="menu-top" sx={{ scrollMarginTop: { xs: '80px', md: '96px' } }}>
        <MenuNav activeId={activeId} />
        <CategoryShortcuts />

        {navCategories.map((cat) => sectionRenderers[cat.id]?.())}
        <WhyOrderSection />
      </Box>
    </Box>
  );
}

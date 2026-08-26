import { Box } from '@mui/material';
import { Promo } from '../components/Promo';
import { MenuNav } from '../components/MenuNav';
import { CategoryShortcuts } from '../components/CategoryShortcuts';
import { MenuSection } from '../components/MenuSection';
import { CombosSection } from '../components/CombosSection';
import { BuildYourOwnSection } from '../components/BuildYourOwnSection';
import { PartyTraysSection } from '../components/PartyTraysSection';
import { DrinksSection } from '../components/DrinksSection';
import { useActiveSection } from '../hooks/useActiveSection';
import { specials, wok, poke, starters, kids, nigiri, navCategories } from '../data/menu';

const sectionIds = navCategories.map((cat) => cat.id);

export function HomePage() {
  const activeId = useActiveSection(sectionIds);

  return (
    <Box id="top" component="main">
      <Promo />

      <Box id="menu-top" sx={{ scrollMarginTop: { xs: '68px', md: '82px' } }}>
        <MenuNav activeId={activeId} />
        <CategoryShortcuts />

        <MenuSection category={specials} />
        <BuildYourOwnSection />
        <MenuSection category={wok} />
        <MenuSection category={poke} />
        <MenuSection category={starters} />
        <CombosSection />
        <MenuSection category={nigiri} />
        <PartyTraysSection />
        <MenuSection category={kids} />
        <DrinksSection />
      </Box>
    </Box>
  );
}

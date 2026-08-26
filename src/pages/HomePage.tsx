import { Box, Container, Typography } from '@mui/material';
import { Promo } from '../components/Promo';
import { MenuNav } from '../components/MenuNav';
import { CategoryShortcuts } from '../components/CategoryShortcuts';
import { MenuSection } from '../components/MenuSection';
import { CombosSection } from '../components/CombosSection';
import { BuildYourOwnSection } from '../components/BuildYourOwnSection';
import { PartyTraysSection } from '../components/PartyTraysSection';
import { DrinksSection } from '../components/DrinksSection';
import { WhyOrderSection } from '../components/WhyOrderSection';
import { useActiveSection } from '../hooks/useActiveSection';
import { specials, wok, poke, starters, kids, nigiri, navCategories } from '../data/menu';
import { COLORS } from '../theme';

const sectionIds = navCategories.map((cat) => cat.id);

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
            סושי ווק נהריה – סושי, אוכל אסייתי ומשלוחים בנהריה
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              color: COLORS.textSecondary,
              fontSize: { xs: '0.88rem', md: '1rem' },
              mt: 1,
              maxWidth: 640,
              mx: 'auto',
            }}
          >
            סושי טרי, מוקפצים ונודלס, קומבינציות ומגשי מסיבה — משלוחים וטייק אווי בנהריה והסביבה.
          </Typography>
        </Container>
      </Box>

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
        <WhyOrderSection />
      </Box>
    </Box>
  );
}

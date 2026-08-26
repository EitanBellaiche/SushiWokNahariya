import React from 'react';
import { AppBar, Badge, Box, Button, Drawer, IconButton, Stack, Toolbar, Typography, alpha } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { IMAGES, navCategories } from '../data/menu';
import { BUSINESS, buildWhatsAppLink } from '../data/business';
import { useCart } from '../cart/CartContext';
import { COLORS } from '../theme';

// Prefixed with "/" (not a bare "#id") so these still resolve correctly to the
// home page's menu sections when clicked from a legal page — a bare hash link
// would silently do nothing there, since those sections only exist on "/".
const drawerLinks = [
  { href: '/#menu-top', label: 'תפריט' },
  ...navCategories.map((cat) => ({ href: `/#${cat.id}`, label: cat.label })),
  { href: '/#contact', label: 'יצירת קשר' },
];

export function Header() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { totalItems, openCart } = useCart();

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        component="header"
        sx={{
          bgcolor: alpha(COLORS.bg, 0.92),
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid',
          borderColor: COLORS.surfaceBorder,
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 68, md: 82 }, px: { xs: 1.5, md: 3 }, gap: 1, flexDirection: 'row-reverse' }}>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            aria-label="פתיחת תפריט ניווט"
            sx={{ color: COLORS.white, width: 44, height: 44 }}
          >
            <MenuRoundedIcon />
          </IconButton>

          <Box sx={{ flex: 1 }} />

          <Box
            component={RouterLink}
            to="/"
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
            aria-label="Sushi Wok Nahariya — לדף הבית"
          >
            <Box
              component="img"
              src={IMAGES.logo}
              alt="Sushi Wok Nahariya"
              sx={{ height: { xs: 56, md: 72 }, width: 'auto', objectFit: 'contain' }}
            />
          </Box>

          <Box sx={{ flex: 1 }} />

          <Stack direction="row" spacing={0.5} useFlexGap sx={{ display: { xs: 'none', md: 'flex' } }} component="nav" aria-label="ניווט ראשי">
            {navCategories.slice(0, 6).map((cat) => (
              <Button
                key={cat.id}
                href={`/#${cat.id}`}
                sx={{ color: COLORS.white, px: 1.2, fontSize: '0.85rem', fontWeight: 600, '&:hover': { color: COLORS.red, bgcolor: 'transparent' } }}
              >
                {cat.label}
              </Button>
            ))}
          </Stack>

          <IconButton
            onClick={openCart}
            aria-label="פתיחת ההזמנה שלי"
            sx={{ color: COLORS.white, border: '1px solid', borderColor: COLORS.surfaceBorder, width: 44, height: 44 }}
          >
            <Badge badgeContent={totalItems} color="primary" sx={{ '& .MuiBadge-badge': { fontWeight: 700 } }}>
              <ShoppingCartRoundedIcon fontSize="small" />
            </Badge>
          </IconButton>

          <IconButton
            component="a"
            href={`tel:${BUSINESS.phone}`}
            aria-label={`התקשרות אל ${BUSINESS.phoneDisplay}`}
            sx={{ color: COLORS.white, border: '1px solid', borderColor: COLORS.surfaceBorder, width: 44, height: 44 }}
          >
            <PhoneEnabledIcon fontSize="small" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 280, bgcolor: COLORS.bgElevated, color: COLORS.white } }}
      >
        <Stack sx={{ p: 2.5, height: '100%' }} spacing={2.5}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontWeight: 800 }}>תפריט</Typography>
            <IconButton onClick={() => setDrawerOpen(false)} aria-label="סגירת תפריט" sx={{ color: COLORS.white }}>
              <CloseRoundedIcon />
            </IconButton>
          </Stack>

          <Stack component="nav" aria-label="ניווט נייד" spacing={0.25} sx={{ overflowY: 'auto', flex: 1 }}>
            {drawerLinks.map((link) => (
              <Button
                key={link.href}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                sx={{ color: COLORS.white, justifyContent: 'flex-start', fontSize: '0.98rem', py: 0.9 }}
              >
                {link.label}
              </Button>
            ))}
          </Stack>

          <Stack spacing={1}>
            <Button
              variant="contained"
              color="primary"
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<WhatsAppIcon />}
              fullWidth
              sx={{ py: 1.2, '& .MuiButton-startIcon': { ml: 0.8, mr: 0 } }}
            >
              הזמן עכשיו
            </Button>
            <Button
              variant="outlined"
              href={`tel:${BUSINESS.phone}`}
              startIcon={<PhoneEnabledIcon />}
              fullWidth
              sx={{ py: 1.1, color: COLORS.white, borderColor: alpha(COLORS.white, 0.24), '& .MuiButton-startIcon': { ml: 0.8, mr: 0 } }}
            >
              {BUSINESS.phoneDisplay}
            </Button>
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
}

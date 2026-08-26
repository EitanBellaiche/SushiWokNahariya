import { Box, Container, Divider, Stack, Typography, alpha } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { BUSINESS } from '../data/business';
import { navCategories } from '../data/menu';
import { COLORS } from '../theme';

const infoItems = [
  { icon: PhoneEnabledIcon, label: BUSINESS.phoneDisplay, href: `tel:${BUSINESS.phone}` },
  { icon: AccessTimeFilledIcon, label: `${BUSINESS.hoursWeekday} · ${BUSINESS.hoursWeekend}` },
];

// Real routes, navigated via react-router's Link (client-side transition).
const legalRouteLinks = [
  { to: '/privacy', label: 'מדיניות פרטיות' },
  { to: '/terms', label: 'תנאי שימוש והזמנות' },
  { to: '/cancellations', label: 'מדיניות ביטולים' },
  { to: '/accessibility', label: 'הצהרת נגישות' },
];

export function Footer() {
  return (
    <Box component="footer" id="contact" sx={{ scrollMarginTop: { xs: '100px', md: '124px' }, borderTop: '1px solid', borderColor: COLORS.surfaceBorder, py: { xs: 3.5, md: 4.5 }, mt: 1 }}>
      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2.5, md: 3 } }}>
        <Stack spacing={3}>
          <Stack spacing={0.5} alignItems="center" textAlign="center">
            <Typography sx={{ fontWeight: 800, color: COLORS.white, fontSize: '1.05rem' }}>{BUSINESS.name}</Typography>
            <Typography sx={{ color: COLORS.textSecondary, fontSize: '0.85rem' }}>{BUSINESS.kosher}</Typography>
          </Stack>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: 2,
              border: '1px solid',
              borderColor: COLORS.surfaceBorder,
              borderRadius: 3,
              bgcolor: COLORS.surface,
              p: { xs: 2.25, md: 2.75 },
            }}
          >
            {infoItems.map((item) => {
              const Icon = item.icon;
              const content = (
                <Stack alignItems="center" spacing={0.75} textAlign="center">
                  <Icon sx={{ color: COLORS.red }} />
                  <Typography sx={{ color: COLORS.white, fontWeight: 600, fontSize: '0.88rem' }}>{item.label}</Typography>
                </Stack>
              );
              return item.href ? (
                <Box
                  key={item.label}
                  component="a"
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  sx={{ textDecoration: 'none', '&:hover': { opacity: 0.85 } }}
                >
                  {content}
                </Box>
              ) : (
                <Box key={item.label}>{content}</Box>
              );
            })}
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} useFlexGap>
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              alignItems="center"
              justifyContent="center"
              sx={{ flex: 1, py: 1.1, borderRadius: 2.5, border: '1px solid', borderColor: COLORS.surfaceBorder, bgcolor: alpha(COLORS.white, 0.03) }}
            >
              <LocalShippingOutlinedIcon sx={{ color: COLORS.red, fontSize: '1.1rem' }} />
              <Typography sx={{ fontSize: '0.85rem', color: COLORS.white, fontWeight: 600 }}>משלוחים</Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              alignItems="center"
              justifyContent="center"
              sx={{ flex: 1, py: 1.1, borderRadius: 2.5, border: '1px solid', borderColor: COLORS.surfaceBorder, bgcolor: alpha(COLORS.white, 0.03) }}
            >
              <StorefrontOutlinedIcon sx={{ color: COLORS.red, fontSize: '1.1rem' }} />
              <Typography sx={{ fontSize: '0.85rem', color: COLORS.white, fontWeight: 600 }}>איסוף עצמי</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" flexWrap="wrap" useFlexGap justifyContent="center" spacing={1.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navCategories.map((cat) => (
              <Box
                key={cat.id}
                component="a"
                href={`/#${cat.id}`}
                sx={{ color: COLORS.textMuted, fontSize: '0.78rem', textDecoration: 'none', '&:hover': { color: COLORS.textSecondary } }}
              >
                {cat.label}
              </Box>
            ))}
          </Stack>

          <Divider sx={{ borderColor: COLORS.surfaceBorder }} />

          <Stack
            component="nav"
            aria-label="מידע משפטי"
            direction="row"
            flexWrap="wrap"
            useFlexGap
            justifyContent="center"
            spacing={1.5}
          >
            {legalRouteLinks.map((link) => (
              <Box
                key={link.to}
                component={RouterLink}
                to={link.to}
                sx={{ color: COLORS.textMuted, fontSize: '0.76rem', textDecoration: 'none', '&:hover': { color: COLORS.red } }}
              >
                {link.label}
              </Box>
            ))}
            <Box
              component="a"
              href="/#contact"
              sx={{ color: COLORS.textMuted, fontSize: '0.76rem', textDecoration: 'none', '&:hover': { color: COLORS.red } }}
            >
              צור קשר
            </Box>
          </Stack>

          <Typography sx={{ color: COLORS.textMuted, fontSize: '0.78rem', textAlign: 'center' }}>
            © {new Date().getFullYear()} {BUSINESS.name}. כל הזכויות שמורות.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

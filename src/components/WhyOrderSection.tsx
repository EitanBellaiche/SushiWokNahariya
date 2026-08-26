import { Box, Container, Stack, Typography, alpha } from '@mui/material';
import { BUSINESS } from '../data/business';
import { COLORS } from '../theme';
import { Reveal } from '../hooks/useReveal';

const reasons = [
  'סושי טרי, מוקפצים ונודלס שמוכנים לפי הזמנה — לא מראש.',
  `${BUSINESS.kosher} — מתאים לכל המשפחה.`,
  'משלוחים וטייק אווי בנהריה והסביבה, בלי דמי תיווך של אפליקציות.',
  'הזמנה ישירה ומהירה בטלפון או בוואטסאפ — ישר לבית העסק.',
];

/**
 * Same factual "why order from us" copy as before, kept for on-page/local SEO
 * text — just presented as a quiet strip instead of a boxed features grid,
 * per the client's request to tone the visual down.
 */
export function WhyOrderSection() {
  return (
    <Box component="section" aria-labelledby="why-order-heading" sx={{ py: { xs: 2, md: 2.5 } }}>
      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2.5, md: 3 } }}>
        <Reveal>
          <Box
            sx={{
              borderTop: '1px solid',
              borderColor: alpha(COLORS.surfaceBorder, 0.7),
              pt: { xs: 2, md: 2.5 },
            }}
          >
            <Typography
              id="why-order-heading"
              component="h2"
              sx={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.04em', color: COLORS.textMuted, mb: 1 }}
            >
              למה להזמין מסושי ווק נהריה
            </Typography>
            <Stack spacing={0.4} sx={{ fontSize: '0.78rem', color: COLORS.textMuted, lineHeight: 1.6 }}>
              {reasons.map((text) => (
                <Typography key={text} sx={{ fontSize: 'inherit', color: 'inherit', lineHeight: 'inherit' }}>
                  {text}
                </Typography>
              ))}
            </Stack>
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
}

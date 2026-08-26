import { Box, Container, Stack, Typography } from '@mui/material';
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import { BUSINESS } from '../data/business';
import { COLORS } from '../theme';
import { Reveal } from '../hooks/useReveal';
import { SectionHeading } from './MenuSection';

const reasons = [
  {
    icon: LocalDiningOutlinedIcon,
    text: 'סושי טרי, מוקפצים ונודלס שמוכנים לפי הזמנה — לא מראש.',
  },
  {
    icon: VerifiedOutlinedIcon,
    text: `${BUSINESS.kosher} — מתאים לכל המשפחה.`,
  },
  {
    icon: DeliveryDiningOutlinedIcon,
    text: 'משלוחים וטייק אווי בנהריה והסביבה, בלי דמי תיווך של אפליקציות.',
  },
  {
    icon: WhatsAppIcon,
    text: 'הזמנה ישירה ומהירה בטלפון או בוואטסאפ — ישר לבית העסק.',
  },
];

/** Short, factual "why order from us" section — real reasons, no invented claims. */
export function WhyOrderSection() {
  return (
    <Box component="section" aria-labelledby="why-order-heading" sx={{ py: { xs: 3, md: 4 } }}>
      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2.5, md: 3 } }}>
        <Reveal>
          <SectionHeading id="why-order-heading" title="למה להזמין מסושי ווק נהריה" />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: 1.5,
            }}
          >
            {reasons.map(({ icon: Icon, text }) => (
              <Stack
                key={text}
                direction="row"
                spacing={1.25}
                alignItems="center"
                sx={{
                  border: '1px solid',
                  borderColor: COLORS.surfaceBorder,
                  borderRadius: 3,
                  bgcolor: COLORS.surface,
                  px: 1.75,
                  py: 1.4,
                }}
              >
                <Icon sx={{ color: COLORS.red, flexShrink: 0 }} />
                <Typography sx={{ color: COLORS.textSecondary, fontSize: '0.9rem', lineHeight: 1.5 }}>{text}</Typography>
              </Stack>
            ))}
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
}

import React from 'react';
import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  CssBaseline,
  Divider,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

const BUSINESS = {
  name: 'Sushi Wok נהריה',
  phone: '+972528205470',
  whatsapp: 'https://wa.me/972528205470?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%91%D7%A6%D7%A2%20%D7%94%D7%96%D7%9E%D7%A0%D7%94%20%D7%9E%D7%A1%D7%95%D7%A9%D7%99%20%D7%95%D7%95%D7%A7%20%D7%A0%D7%94%D7%A8%D7%99%D7%94',
  address: 'כליל החורש 7, נהריה',
  hours: 'א׳-ה׳ 12:00-23:00 | מוצ״ש 12:00-19:00',
  heroTitle: 'סושי, פוקי ומנות ווק להזמנה מהירה בנהריה',
  heroSubtitle:
    'משלוחים ואיסוף עצמי, מנות טריות ושירות מהיר .',
  promoTitle: 'מבצע הבית',
  promoText: 'מוקפץ לבחירה + רול סושי בהרכבה ב־69 ₪',
};

const logoImage = new URL('../photos/logo.png', import.meta.url).href;
const heroPrimaryImage = new URL('../photos/sushi party platter.jpeg', import.meta.url).href;
const heroSecondaryImage = new URL('../photos/susiRoll.jpeg', import.meta.url).href;

const galleryImages = [
  {
    title: 'מגשי סושי',
    description: 'מגוון מגשים להזמנה זוגית, משפחתית ואירוח.',
    image: new URL('../photos/sushi party platter.jpeg', import.meta.url).href,
  },
  {
    title: 'פוקי טרי',
    description: 'קערות טריות עם חומרי גלם איכותיים.',
    image: new URL('../photos/sushiANDpoke.jpeg', import.meta.url).href,
  },
  {
    title: 'ווק ומנות חמות',
    description: 'נודלס, אורז ומנות מוקפצות בהכנה במקום.',
    image: new URL('../photos/chicken noodle bowl.jpeg', import.meta.url).href,
  },
  {
    title: 'רולים וספיישלים',
    description: 'רולים מיוחדים עם נראות חזקה וטעם בולט.',
    image: new URL('../photos/friedSushi.jpeg', import.meta.url).href,
  },
];

type MenuItem = {
  title: string;
  description: string;
  price: string;
};

type MenuSection = {
  title: string;
  subtitle: string;
  badge: string;
  items: MenuItem[];
  note?: string;
};

const menuSections: MenuSection[] = [
  {
    title: 'הרכבה עצמית',
    subtitle: 'בחירה בין דג לצמחוני, לפי הסגנון שמתאים לכם.',
    badge: 'Customize',
    items: [
      { title: 'אורז', description: 'דג 39 ₪ | צמחוני 35 ₪', price: '₪39 / ₪35' },
      { title: 'פוטומאקי', description: 'דג 45 ₪ | צמחוני 39 ₪', price: '₪45 / ₪39' },
      { title: 'סנדוויץ׳ סושי', description: 'דג 40 ₪ | צמחוני 35 ₪', price: '₪40 / ₪35' },
      { title: 'מאקי', description: 'דג 25 ₪ | צמחוני 20 ₪', price: '₪25 / ₪20' },
    ],
    note: 'תוספות לבחירה: אבוקדו, בטטה, מלפפון, גזר, בצל ירוק, עירית ועוד. סוגי דגים: סלמון, סלמון צלוי, טונה אדומה ודג לבן.',
  },
  {
    title: 'סושי ספיישל',
    subtitle: 'רולים בולטים מתוך התפריט, עם שילובים חזקים ומדויקים.',
    badge: 'Signature',
    items: [
      { title: 'קריספי רול', description: 'סלמון, אבוקדו ובטטה בציפוי טמפורה ופקאן.', price: '₪42' },
      { title: 'ספייסי סלמון', description: 'בטטה, אבוקדו ומלפפון במעטפת טרטר סלמון ועירית.', price: '₪49' },
      { title: 'דגמון רול', description: 'סלמון נא, אבוקדו ובטטה במעטפת אבוקדו וספייסי מיונז.', price: '₪42' },
      { title: 'ריינבו דגים', description: 'אבוקדו, מלפפון וגזר במעטפת סלמון, טונה ודג לבן.', price: '₪48' },
      { title: 'סן רול', description: 'סלמון בטמפורה ואבוקדו במעטפת סלמון, אבוקדו ובצל ירוק.', price: '₪49' },
    ],
  },
  {
    title: 'קומבינציות',
    subtitle: 'מבחר קומבינציות מוכנות להזמנה נוחה ומהירה.',
    badge: 'Combos',
    items: [
      {
        title: 'קומבינציית סלמון (24 יח׳)',
        description: 'סלמון צלוי, פוטומאקי סלמון ומאקי סלמון.',
        price: '₪90',
      },
      {
        title: 'קומבינציה מטוגנת (12 יח׳)',
        description: 'רול מטוגן וסנדוויץ׳ סושי בטמפורה ופקאן.',
        price: '₪80',
      },
      {
        title: 'קומבינציה צמחונית (24 יח׳)',
        description: 'רולים צמחוניים עם אבוקדו, בטטה, מלפפון וגזר.',
        price: '₪70',
      },
    ],
  },
  {
    title: 'מנות פתיחה',
    subtitle: 'מנות קטנות שפותחות את הארוחה בצורה מדויקת.',
    badge: 'Starters',
    items: [
      { title: 'קמפי', description: 'חמוצים יפנים בתיבול ביתי.', price: '₪18' },
      { title: 'אגרול ירקות', description: '3 יחידות קריספיות.', price: '₪29' },
      { title: '8 יחידות כנפיים', description: 'ברוטב צ׳ילי פיקנטי.', price: '₪25' },
      { title: 'אורז מאודה', description: 'תוספת שמתאימה לצד כל מנה.', price: '₪15' },
    ],
  },
  {
    title: 'פוקי',
    subtitle: 'על בסיס אורז סושי, עם רטבים ותוספות נבחרות.',
    badge: 'Fresh',
    items: [
      { title: 'פוקי סלמון', description: 'סלמון נא או אפוי עם אבוקדו, בטטה, מלפפון, בצל ירוק ושומשום.', price: '₪49' },
      { title: 'פוקי טונה אדומה', description: 'טונה עם אבוקדו, בטטה, מלפפון, גזר, בצל ירוק ושומשום.', price: '₪49' },
    ],
  },
  {
    title: 'מן הווק',
    subtitle: 'מנות חמות בבחירה בין עוף, בקר או צמחוני.',
    badge: 'Wok',
    items: [
      { title: 'פאד תאי', description: 'אטריות אורז, נבטים, גזר, כרוב, בצל ירוק ולימון.', price: '₪46' },
      { title: 'סמוקי נודלס', description: 'אטריות, פטריות, כרוב, גזר, בצל ירוק ובוטנים.', price: '₪49' },
      { title: 'פרייד רייס', description: 'אורז מוקפץ עם פטריות, ביצה, בצל ירוק, כרוב וגזר.', price: '₪44' },
    ],
  },
  {
    title: 'ילדים ושתייה',
    subtitle: 'אפשרויות נוחות למשפחות ולהשלמת ההזמנה.',
    badge: 'Family',
    items: [
      { title: 'ארוחת ילדים', description: 'נודלס עוף ברוטב טריאקי או שניצלונים עם צ׳יפס או אורז מאודה, כולל שתייה קלה.', price: '₪39' },
      { title: 'מים / סודה', description: 'שתייה קלה בסיסית.', price: '₪8' },
      { title: 'קולה / זירו / ספרייט / פאנטה / ענבים / תפוזים', description: 'מבחר שתייה קלה לבחירה.', price: '₪10' },
    ],
  },
];

const highlights = [
  { icon: <RoomServiceIcon />, label: 'משלוחים ואיסוף עצמי' },
  { icon: <PlaceOutlinedIcon />, label: BUSINESS.address },
  { icon: <AccessTimeFilledIcon />, label: BUSINESS.hours },
];

const theme = createTheme({
  direction: 'rtl',
  palette: {
    mode: 'light',
    primary: { main: '#8f2d1f' },
    secondary: { main: '#c48a3a' },
    success: { main: '#245c4a' },
    background: {
      default: '#f4ede3',
      paper: '#fffaf4',
    },
    text: {
      primary: '#241915',
      secondary: '#6f6058',
    },
  },
  shape: {
    borderRadius: 20,
  },
  typography: {
    fontFamily: ['Heebo', 'Assistant', 'sans-serif'].join(','),
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 800 },
    h4: { fontWeight: 800 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { fontWeight: 700 },
  },
});

type SectionCardProps = MenuSection;

function ActionButtons() {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        startIcon={<PhoneEnabledIcon />}
        href={`tel:${BUSINESS.phone}`}
        sx={{
          px: 3,
          py: 1.5,
          color: '#241915',
          width: { xs: '100%', sm: 'auto' },
          borderRadius: 999,
          boxShadow: '0 14px 30px rgba(196,138,58,0.25)',
          '& .MuiButton-startIcon': { ml: 1.25, mr: 0 },
        }}
      >
        להזמנה טלפונית
      </Button>
      <Button
        variant="outlined"
        size="large"
        startIcon={<WhatsAppIcon />}
        href={BUSINESS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          px: 3,
          py: 1.5,
          width: { xs: '100%', sm: 'auto' },
          borderRadius: 999,
          borderColor: alpha('#fff8f1', 0.3),
          color: 'inherit',
          '& .MuiButton-startIcon': { ml: 1.25, mr: 0 },
          '&:hover': {
            borderColor: 'currentColor',
            backgroundColor: alpha('#fff8f1', 0.06),
          },
        }}
      >
        הזמנה בוואטסאפ
      </Button>
    </Stack>
  );
}

function SectionCard({ title, subtitle, badge, items, note }: SectionCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        border: '1px solid',
        borderColor: 'rgba(36, 25, 21, 0.08)',
        boxShadow: '0 28px 60px rgba(36, 25, 21, 0.08)',
        background: 'linear-gradient(180deg, rgba(255,250,244,0.98) 0%, rgba(250,242,233,0.98) 100%)',
        transition: 'transform 220ms ease, box-shadow 220ms ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 32px 70px rgba(36, 25, 21, 0.12)',
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 3.5 } }}>
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={1.5}>
            <Stack spacing={1}>
              <Chip
                label={badge}
                size="small"
                sx={{
                  alignSelf: 'flex-start',
                  bgcolor: alpha('#8f2d1f', 0.08),
                  color: 'primary.main',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                }}
              />
              <Typography variant="h5" component="h2" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
                {title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.95rem', md: '1rem' } }}>
                {subtitle}
              </Typography>
            </Stack>
            <Box
              sx={{
                display: { xs: 'none', sm: 'grid' },
                placeItems: 'center',
                width: 52,
                height: 52,
                borderRadius: '16px',
                bgcolor: alpha('#c48a3a', 0.12),
                color: 'secondary.main',
              }}
            >
              <LocalDiningIcon />
            </Box>
          </Stack>

          <Stack spacing={1.5}>
            {items.map((item, index) => (
              <Box key={`${title}-${item.title}`}>
                <Stack direction="row" justifyContent="space-between" gap={1.5} alignItems="flex-start">
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ mb: 0.5, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.88rem', md: '0.95rem' } }}>
                      {item.description}
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ whiteSpace: 'nowrap', fontWeight: 800, letterSpacing: '-0.02em', fontSize: { xs: '1rem', md: '1.25rem' } }}
                  >
                    {item.price}
                  </Typography>
                </Stack>
                {index < items.length - 1 && <Divider sx={{ mt: 1.5, borderColor: 'rgba(36, 25, 21, 0.08)' }} />}
              </Box>
            ))}
          </Stack>

          {note && (
            <Box
              sx={{
                px: 2,
                py: 1.5,
                borderRadius: 3,
                bgcolor: alpha('#245c4a', 0.06),
                border: '1px solid',
                borderColor: alpha('#245c4a', 0.14),
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {note}
              </Typography>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden',
          py: { xs: 2, md: 8 },
          pb: { xs: 13, md: 8 },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 1.5, sm: 2, md: 3 } }}>
          <Stack spacing={{ xs: 3, md: 5 }}>
            <Card
              elevation={0}
              sx={{
                p: { xs: 1.5, sm: 2.5, md: 5 },
                borderRadius: { xs: 4, md: 6 },
                color: '#fff8f1',
                background:
                  'radial-gradient(circle at top right, rgba(196,138,58,0.26) 0%, rgba(196,138,58,0) 28%), linear-gradient(135deg, #1f1511 0%, #3d241c 55%, #8f2d1f 100%)',
                boxShadow: '0 30px 80px rgba(36, 25, 21, 0.35)',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1.15fr 0.85fr' },
                  gap: { xs: 2, md: 4 },
                  alignItems: 'center',
                }}
              >
                <Stack spacing={{ xs: 2.5, md: 4 }} sx={{ order: { xs: 2, md: 1 } }}>
                  <Stack spacing={2} sx={{ maxWidth: 700 }}>
                    <Stack direction="row" spacing={3} alignItems="center">
                      <Avatar
                        src={logoImage}
                        alt={BUSINESS.name}
                        sx={{
                          width: { xs: 64, md: 72 },
                          height: { xs: 64, md: 72 },
                          p: 0.75,
                          bgcolor: '#f7ecd7',
                          border: '2px solid',
                          borderColor: alpha('#fffaf4', 0.5),
                          boxShadow: '0 10px 24px rgba(0,0,0,0.18)',
                        }}
                      />
                      <Chip
                        label="SUSHI WOK NAHARIYA"
                        sx={{
                          alignSelf: 'flex-start',
                          bgcolor: alpha('#ffffff', 0.1),
                          color: '#fff8f1',
                          fontWeight: 700,
                          letterSpacing: { xs: '0.08em', md: '0.12em' },
                          height: { xs: 34, md: 38 },
                          '& .MuiChip-label': {
                            px: { xs: 1.5, md: 2 },
                            fontSize: { xs: '0.72rem', md: '0.82rem' },
                          },
                        }}
                      />
                    </Stack>

                    <Typography
                      variant="h2"
                      component="h1"
                      sx={{
                        fontSize: { xs: '2.15rem', sm: '2.7rem', md: '4.2rem' },
                        lineHeight: { xs: 1.05, md: 0.98 },
                        textWrap: 'balance',
                      }}
                    >
                      {BUSINESS.heroTitle}
                    </Typography>

                    <Typography
                      variant="h5"
                      sx={{
                        color: alpha('#fff8f1', 0.84),
                        maxWidth: 620,
                        lineHeight: 1.6,
                        fontSize: { xs: '1rem', md: '1.35rem' },
                      }}
                    >
                      {BUSINESS.heroSubtitle}
                    </Typography>
                  </Stack>

                  <ActionButtons />

                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' },
                      gap: 1.25,
                    }}
                  >
                    {highlights.map((item) => (
                      <Chip
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        sx={{
                          justifyContent: 'flex-start',
                          px: 1,
                          height: { xs: 46, md: 42 },
                          width: '100%',
                          bgcolor: alpha('#fffaf4', 0.08),
                          color: '#fff8f1',
                          border: '1px solid',
                          borderColor: alpha('#fffaf4', 0.12),
                          backdropFilter: 'blur(10px)',
                          '& .MuiChip-label': {
                            display: 'block',
                            whiteSpace: 'normal',
                            textAlign: 'right',
                            lineHeight: 1.25,
                            py: 0.75,
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Stack>

                <Box
                  sx={{
                    position: 'relative',
                    minHeight: { xs: 300, sm: 360, md: 520 },
                    order: { xs: 1, md: 2 },
                    px: { xs: 0.5, md: 0 },
                  }}
                >
                  <Box
                    component="img"
                    src={heroPrimaryImage}
                    alt="מגש סושי"
                    sx={{
                      width: '100%',
                      height: { xs: 250, sm: 300, md: 430 },
                      objectFit: 'cover',
                      borderRadius: { xs: '28px', md: '38px' },
                      clipPath: {
                        xs: 'polygon(0 8%, 100% 0, 100% 90%, 7% 100%, 0 88%)',
                        md: 'polygon(0 6%, 100% 0, 100% 92%, 8% 100%, 0 88%)',
                      },
                      boxShadow: '0 26px 70px rgba(0,0,0,0.28)',
                    }}
                  />
                  <Box
                    component="img"
                    src={heroSecondaryImage}
                    alt="רול סושי"
                    sx={{
                      position: 'absolute',
                      left: { xs: 6, md: -18 },
                      bottom: { xs: 6, md: 14 },
                      width: { xs: '42%', sm: '38%', md: '44%' },
                      height: { xs: 132, sm: 160, md: 210 },
                      objectFit: 'cover',
                      borderRadius: { xs: '24px', md: '32px' },
                      clipPath: 'polygon(12% 0, 100% 0, 88% 100%, 0 100%)',
                      border: '4px solid',
                      borderColor: alpha('#fffaf4', 0.9),
                      boxShadow: '0 22px 50px rgba(0,0,0,0.28)',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      right: { xs: 8, md: -8 },
                      bottom: { xs: 16, md: 24 },
                      width: { xs: '58%', sm: '50%', md: '48%' },
                      p: { xs: 1.4, md: 2.5 },
                      borderRadius: { xs: '24px', md: '32px' },
                      backgroundColor: alpha('#fffaf4', 0.1),
                      border: '1px solid',
                      borderColor: alpha('#fffaf4', 0.16),
                      backdropFilter: 'blur(14px)',
                      boxShadow: '0 18px 40px rgba(0,0,0,0.2)',
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography variant="overline" sx={{ color: alpha('#fff8f1', 0.72), letterSpacing: '0.12em', fontSize: { xs: '0.56rem', md: '0.75rem' } }}>
                        {BUSINESS.promoTitle}
                      </Typography>
                      <Typography variant="h5" sx={{ fontSize: { xs: '0.98rem', md: '1.3rem' }, lineHeight: 1.25 }}>
                        {BUSINESS.promoText}
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </Card>

            <Box>
              <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} gap={2} sx={{ mb: 3 }}>
                <Box>
                  <Typography variant="overline" color="primary" sx={{ letterSpacing: '0.14em', fontWeight: 800 }}>
                    Gallery
                  </Typography>
                  <Typography variant="h3" sx={{ mt: 0.5 }}>
                    מה מחכה לכם בתפריט
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520 }}>
                  מנות נבחרות מהתפריט שלנו, כדי שתוכלו לבחור מהר ולהזמין בלי להתלבט.
                </Typography>
              </Stack>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' },
                  gap: 2.5,
                }}
              >
                {galleryImages.map((item) => (
                  <Card
                    key={item.title}
                    elevation={0}
                    sx={{
                      overflow: 'hidden',
                      border: '1px solid',
                      borderColor: 'rgba(36, 25, 21, 0.08)',
                      backgroundColor: 'rgba(255, 250, 244, 0.92)',
                      boxShadow: '0 24px 50px rgba(36, 25, 21, 0.08)',
                    }}
                  >
                    <Box component="img" src={item.image} alt={item.title} sx={{ width: '100%', height: { xs: 220, sm: 240 }, objectFit: 'cover' }} />
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 0.5 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>

            <Box>
              <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} gap={2} sx={{ mb: 3 }}>
                <Box>
                  <Typography variant="overline" color="primary" sx={{ letterSpacing: '0.14em', fontWeight: 800 }}>
                    Menu Overview
                  </Typography>
                  <Typography variant="h3" sx={{ mt: 0.5 }}>
                    תפריט ראשי
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520 }}>
                  חלוקה ברורה לקטגוריות כדי לאפשר בחירה מהירה והזמנה נוחה.
                </Typography>
              </Stack>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, minmax(0, 1fr))' },
                  gap: 3,
                }}
              >
                {menuSections.map((section) => (
                  <SectionCard key={section.title} {...section} />
                ))}
              </Box>
            </Box>

            <Card
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 5,
                border: '1px solid',
                borderColor: 'rgba(36, 25, 21, 0.08)',
                background: 'linear-gradient(135deg, rgba(36,92,74,0.08) 0%, rgba(196,138,58,0.14) 100%)',
                boxShadow: '0 24px 50px rgba(36, 25, 21, 0.08)',
              }}
            >
              <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} gap={3}>
                <Box sx={{ maxWidth: 620 }}>
                  <Typography variant="overline" color="primary" sx={{ letterSpacing: '0.14em', fontWeight: 800 }}>
                    Order Now
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1, mb: 1 }}>
                    להזמנות, משלוחים ואיסוף עצמי
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    אפשר להזמין עכשיו בטלפון או בוואטסאפ. {BUSINESS.name}, {BUSINESS.address}.
                  </Typography>
                </Box>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} width={{ xs: '100%', md: 'auto' }}>
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    startIcon={<PhoneEnabledIcon />}
                    href={`tel:${BUSINESS.phone}`}
                    sx={{ px: 3, py: 1.4, '& .MuiButton-startIcon': { ml: 1.25, mr: 0 } }}
                  >
                    התקשרו להזמנה
                  </Button>
                  <Button
                    variant="outlined"
                    color="success"
                    size="large"
                    startIcon={<WhatsAppIcon />}
                    href={BUSINESS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ px: 3, py: 1.4, '& .MuiButton-startIcon': { ml: 1.25, mr: 0 } }}
                  >
                    שלחו הודעה בוואטסאפ
                  </Button>
                </Stack>
              </Stack>
            </Card>
          </Stack>
        </Container>

        <Box
          sx={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 20,
            display: { xs: 'block', md: 'none' },
            p: 1.25,
            pb: 'calc(env(safe-area-inset-bottom, 0px) + 10px)',
            background: 'linear-gradient(180deg, rgba(244,237,227,0) 0%, rgba(244,237,227,0.96) 30%, rgba(244,237,227,1) 100%)',
            backdropFilter: 'blur(14px)',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 1,
              p: 0.75,
              borderRadius: 999,
              bgcolor: alpha('#241915', 0.92),
              boxShadow: '0 22px 45px rgba(36, 25, 21, 0.28)',
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              startIcon={<PhoneEnabledIcon />}
              href={`tel:${BUSINESS.phone}`}
              sx={{
                minHeight: 52,
                borderRadius: 999,
                color: '#241915',
                fontSize: '0.95rem',
                '& .MuiButton-startIcon': { ml: 1, mr: 0 },
              }}
            >
              הזמנה בטלפון
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<WhatsAppIcon />}
              href={BUSINESS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                minHeight: 52,
                borderRadius: 999,
                fontSize: '0.95rem',
                '& .MuiButton-startIcon': { ml: 1, mr: 0 },
              }}
            >
              וואטסאפ
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;

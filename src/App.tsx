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
  Dialog,
  IconButton,
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
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

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
const magashSushiImage = new URL('../photos/magashsushi.jpeg', import.meta.url).href;
const magashSushiImage2 = new URL('../photos/magashsushi2.jpeg', import.meta.url).href;
const pokeBowlImage = new URL('../photos/poki123.jpeg', import.meta.url).href;
const pokeTunaImage = new URL('../photos/pokituna.jpeg', import.meta.url).href;
const mokpatzImage = new URL('../photos/mokpatz123.jpeg', import.meta.url).href;
const mokpatzImage2 = new URL('../photos/mokpatz45.jpeg', import.meta.url).href;

type GalleryItem = {
  title: string;
  description: string;
  image: string;
  images?: string[];
  imagePositions?: string[];
  modalImageFits?: ('cover' | 'contain')[];
  imageFit?: 'cover' | 'contain';
  imagePosition?: string;
  imagePadding?: number;
};

const galleryImages: GalleryItem[] = [
  {
    title: 'מגשי מסיבה',
    description: 'מגוון מגשי סושי לאירוח, משפחה וחגיגה.',
    image: magashSushiImage2,
    images: [
      magashSushiImage2,
      new URL('../photos/sushi party platter.jpeg', import.meta.url).href,
      magashSushiImage,
    ],
    imagePositions: ['center bottom', 'center 38%', 'center bottom'],
    modalImageFits: ['contain', 'cover', 'contain'],
  },
  {
    title: 'Poke Bowl',
    description: 'סלטי פוקי בול העשויים מחומרי גלם איכותיים.',
    image: pokeBowlImage,
    images: [pokeBowlImage, pokeTunaImage],
    imagePositions: ['center', 'center'],
    modalImageFits: ['contain', 'contain'],
    imageFit: 'cover',
    imagePosition: 'center center',
    imagePadding: 0,
  },
  {
    title: 'ווק ומנות חמות',
    description: 'נודלס, אורז ומנות מוקפצות בהכנה במקום.',
    image: mokpatzImage,
    images: [
      mokpatzImage,
      new URL('../photos/chicken noodle bowl.jpeg', import.meta.url).href,
      mokpatzImage2,
    ],
    imagePositions: ['center', 'center', 'center'],
    modalImageFits: ['contain', 'contain', 'contain'],
  },
  {
    title: 'ספיישלים',
    description: 'ספיישל רולים מיוחדים.',
    image: new URL('../photos/spacial10.jpeg', import.meta.url).href,
    images: [
      new URL('../photos/spacial10.jpeg', import.meta.url).href,
      new URL('../photos/spacialroll.jpeg', import.meta.url).href,
      new URL('../photos/spacial1.jpeg', import.meta.url).href,
      new URL('../photos/spacial2.jpeg', import.meta.url).href,
    ],
    imagePositions: ['center', 'center', 'center', 'center'],
    modalImageFits: ['contain', 'contain', 'contain', 'contain'],
  },
];

type MenuItem = {
  title: React.ReactNode;
  description: React.ReactNode;
  price: string;
};

type MenuSection = {
  title: React.ReactNode;
  subtitle: string;
  badge: string;
  items: MenuItem[];
  note?: React.ReactNode;
};

const menuSections: MenuSection[] = [
  {
    title: 'מנות פתיחה',
    subtitle: 'מנות קטנות שפותחות את הארוחה בצורה מדויקת.',
    badge: 'Starters',
    items: [
      {
        title: (
          <>
            קימצ׳י{' '}
            <Box component="span" sx={{ fontSize: '0.72em', color: 'text.secondary', fontWeight: 500 }}>
              (חמוצים יפניים בתיבול ביתי)
            </Box>
          </>
        ),
        description: '',
        price: '₪18',
      },
      {
        title: (
          <>
            אגרול ירקות{' '}
            <Box component="span" sx={{ fontSize: '0.72em', color: 'text.secondary', fontWeight: 500 }}>
              (3 יחידות קריספיות)
            </Box>
          </>
        ),
        description: '',
        price: '₪29',
      },
      {
        title: (
          <>
            8 יחידות כנפיים{' '}
            <Box component="span" sx={{ fontSize: '0.72em', color: 'text.secondary', fontWeight: 500 }}>
              (ברוטב צ׳ילי פיקנטי)
            </Box>
          </>
        ),
        description: '',
        price: '₪25',
      },
      { title: 'אורז מאודה', description: '', price: '₪15' },
      { title: 'צ׳יפס גדול', description: '', price: '₪20' },
    ],
  },
  {
    title: 'הרכבה עצמית',
    subtitle: 'בחירה בין דג לצמחוני, לפי הסגנון שמתאים לכם.',
    badge: 'Customize',
    items: [
      {
        title: (
          <>
            i/o{' '}
            <Box component="span" sx={{ fontSize: '0.72em', color: 'text.secondary', fontWeight: 500 }}>
              (אורז בחוץ)
            </Box>
          </>
        ),
        description: 'דג 39 ₪ | צמחוני 35 ₪',
        price: '₪39 / ₪35',
      },
      {
        title: (
          <>
            פוטומאקי{' '}
            <Box component="span" sx={{ fontSize: '0.72em', color: 'text.secondary', fontWeight: 500 }}>
              (אצה בחוץ)
            </Box>
          </>
        ),
        description: 'דג 45 ₪ | צמחוני 39 ₪',
        price: '₪45 / ₪39',
      },
      { title: 'סנדוויץ׳ סושי', description: 'דג 40 ₪ | צמחוני 35 ₪', price: '₪40 / ₪35' },
      { title: 'מאקי', description: 'דג 25 ₪ | צמחוני 20 ₪', price: '₪25 / ₪20' },
    ],
    note: (
      <>
        תוספות ודגים לבחירה:
        <br />
        ירקות: אבוקדו, בטטה, מלפפון, גזר, בצל ירוק, עירית, קנפיו.
        <br />
        דגים: סלמון, סלמון צלוי, טונה אדומה ודג לבן.
      </>
    ),
  },
  {
    title: 'Signature Sushi',
    subtitle: 'רולים מיוחדים עם שילובים מדויקים, חומרי גלם טובים ונוכחות חזקה בצלחת.',
    badge: 'Signature',
    items: [
      {
        title: (
          <>
            🔥 קריספי רול{' '}
            <Box component="span" sx={{ fontSize: '0.72em', color: 'text.secondary', fontWeight: 500 }}>
              (רול מטוגן)
            </Box>
          </>
        ),
        description: 'סלמון, אבוקדו ובטטה במעטפת טמפורה ופאנקו.',
        price: '₪42',
      },
      { title: '🌶️ ספייסי סלמון', description: 'בטטה, אבוקדו ומלפפון במעטפת טרטר סלמון ועירית עם טוויסט פיקנטי.', price: '₪49' },
      { title: '🥑 דרגון רול', description: 'סלמון נא, אבוקדו ובטטה במעטפת אבוקדו וספייסי מיונז למרקם עשיר.', price: '₪42' },
      { title: '🌈 ריינבו דגים', description: 'אבוקדו, מלפפון וגזר במעטפת סלמון, טונה ודג לבן.', price: '₪48' },
      { title: '✨ סאן רול', description: 'סלמון בטמפורה ואבוקדו במעטפת סלמון, אבוקדו ובצל ירוק עם נוכחות מרשימה.', price: '₪49' },
    ],
  },
  {
    title: 'קומבינציות השף',
    subtitle: '',
    badge: 'Combos',
    items: [
      {
        title: 'קומבינציית סלמון (24 יח׳)',
        description: (
          <>
            8 יח׳ i/o סלמון צלוי, אבוקדו, בטטה.
            <br />
            8 יח׳ פוטומאקי סלמון נא, בטטה, מלפפון, גזר ובצל ירוק.
            <br />
            8 יח׳ מאקי סלמון.
          </>
        ),
        price: '₪90',
      },
      {
        title: 'קומבינציה מטוגנת (12 יח׳)',
        description: (
          <>
            8 יח׳ i/o סלמון, אבוקדו, בטטה בטמפורה ופאנקו.
            <br />
            4 יח׳ סנדוויץ׳ סושי סלמון אבוקדו בטמפורה ופאנקו.
          </>
        ),
        price: '₪80',
      },
      {
        title: 'קומבינציה צמחונית (24 יח׳)',
        description: (
          <>
            8 יח׳ i/o בטטה, מלפפון, אבוקדו במעטפת בצל ירוק.
            <br />
            8 יח׳ פוטומאקי מלפפון, אבוקדו, גזר, עירית.
            <br />
            8 יח׳ מאקי אבוקדו.
          </>
        ),
        price: '₪70',
      },
    ],
  },
  {
    title: 'סלטי פוקי (POKE)',
    subtitle: 'על מצע אורז סושי, מוגש עם ספייסי מיונז וסויה.',
    badge: 'Fresh',
    items: [
      {
        title: (
          <>
            פוקי סלמון{' '}
            <Box component="span" sx={{ fontSize: '0.72em', color: 'text.secondary', fontWeight: 500 }}>
              (נא/אפוי)
            </Box>
          </>
        ),
        description: '(טרטר סלמון, אבוקדו, בטטה, מלפפון, בצל ירוק ושומשום)',
        price: '₪49',
      },
      { title: 'פוקי טונה אדומה', description: '(טרטר טונה, אבוקדו, בטטה, מלפפון, גזר, בצל ירוק ושומשום)', price: '₪49' },
    ],
  },
  {
    title: (
      <>
        מן הווק{' '}
        <Box component="span" sx={{ fontSize: '0.72em', color: 'text.secondary', fontWeight: 500 }}>
          (Stir-Fry)
        </Box>
      </>
    ),
    subtitle: 'בחירה בין: עוף / בקר / צמחוני',
    badge: 'Wok',
    items: [
      { title: 'פאד תאי', description: '(אטריות אורז, נטיפי ביצה, כרוב, גזר, נבטים, בצל ירוק ולימון)', price: '₪46' },
      { title: 'סמוקי נודלס', description: '(אטריות חיטה, פטריות, כרוב, גזר, בצל ירוק ובוטנים)', price: '₪49' },
      { title: 'פרייד רייס', description: '(אורז אסייתי מוקפץ, פטריות, ביצה, בצל ירוק, כרוב וגזר)', price: '₪44' },
    ],
  },
  {
    title: 'ארוחות ילדים',
    subtitle: 'כולל שתייה קלה.',
    badge: 'Family',
    items: [
      { title: 'ארוחת ילדים', description: 'נודלס עוף ברוטב טריאקי מתקתק. שניצלונים פריכים עם צ׳יפס או אורז מאודה.', price: '₪39' },
    ],
  },
  {
    title: 'שתייה קלה',
    subtitle: '',
    badge: 'Drinks',
    items: [
      { title: 'מים / סודה', description: '', price: '₪8' },
      { title: 'קולה / זירו / ספרייט / פאנטה / ענבים / תפוזים', description: '', price: '₪10' },
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
              <Box key={`${title}-${index}`}>
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
  const [selectedGallery, setSelectedGallery] = React.useState<GalleryItem | null>(null);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = React.useState(0);

  const selectedGalleryImages = selectedGallery?.images ?? [];
  const hasGalleryImages = selectedGalleryImages.length > 0;
  const selectedGalleryImagePosition = selectedGallery?.imagePositions?.[selectedGalleryIndex] ?? 'center';
  const selectedGalleryImageFit = selectedGallery?.modalImageFits?.[selectedGalleryIndex] ?? 'contain';

  const openGallery = (item: GalleryItem) => {
    if (!item.images?.length) {
      return;
    }

    setSelectedGallery(item);
    setSelectedGalleryIndex(0);
  };

  const closeGallery = () => {
    setSelectedGallery(null);
    setSelectedGalleryIndex(0);
  };

  const showPreviousImage = () => {
    if (!hasGalleryImages) {
      return;
    }

    setSelectedGalleryIndex((currentIndex) => (currentIndex === 0 ? selectedGalleryImages.length - 1 : currentIndex - 1));
  };

  const showNextImage = () => {
    if (!hasGalleryImages) {
      return;
    }

    setSelectedGalleryIndex((currentIndex) => (currentIndex === selectedGalleryImages.length - 1 ? 0 : currentIndex + 1));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden',
          py: { xs: 2, md: 8 },
          pb: { xs: 34, md: 8 },
        }}
      >
        <Box
          sx={{
            position: 'fixed',
            right: { xs: 12, md: 24 },
            left: { xs: 12, md: 'auto' },
            bottom: { xs: 84, md: 24 },
            zIndex: 25,
            maxWidth: { xs: 'none', md: 360 },
            pointerEvents: 'none',
          }}
        >
          <Card
            elevation={0}
            sx={{
              pointerEvents: 'auto',
              overflow: 'hidden',
              borderRadius: { xs: 3, md: 4 },
              border: '1px solid',
              borderColor: alpha('#f7d27a', 0.48),
              background:
                'linear-gradient(135deg, rgba(255,236,178,0.98) 0%, rgba(232,186,78,0.98) 52%, rgba(184,126,24,0.98) 100%)',
              boxShadow: '0 20px 45px rgba(133, 83, 8, 0.28)',
              animation: 'promoFloat 2.8s ease-in-out infinite',
              '@keyframes promoFloat': {
                '0%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-6px)' },
                '100%': { transform: 'translateY(0px)' },
              },
            }}
          >
            <Box
              sx={{
                px: { xs: 2, md: 2.5 },
                py: { xs: 1.5, md: 1.75 },
                color: '#2f1b04',
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 100%)',
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1.5}>
                <Box>
                  <Typography variant="overline" sx={{ display: 'block', fontWeight: 900, letterSpacing: '0.14em', color: alpha('#2f1b04', 0.86) }}>
                    {BUSINESS.promoTitle}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1.15, fontSize: { xs: '1rem', md: '1.12rem' } }}>
                    {BUSINESS.promoText}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  href={BUSINESS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    flexShrink: 0,
                    minWidth: 0,
                    px: 1.5,
                    py: 0.9,
                    borderRadius: 999,
                    bgcolor: '#2f1b04',
                    color: '#fff8f1',
                    boxShadow: 'none',
                    '&:hover': { bgcolor: '#1d1104', boxShadow: 'none' },
                  }}
                >
                  להזמין
                </Button>
              </Stack>
            </Box>
          </Card>
        </Box>

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
                  מגשי מסיבה נבחרים להשראה, כדי שתוכלו לבחור מהר ולהזמין את החגיגה הבאה שלכם בלי להתלבט.
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
                    onClick={() => openGallery(item)}
                    sx={{
                      overflow: 'hidden',
                      border: '1px solid',
                      borderColor: 'rgba(36, 25, 21, 0.08)',
                      backgroundColor: 'rgba(255, 250, 244, 0.92)',
                      boxShadow: '0 24px 50px rgba(36, 25, 21, 0.08)',
                      cursor: item.images?.length ? 'pointer' : 'default',
                      transition: 'transform 220ms ease, box-shadow 220ms ease',
                      '&:hover': {
                        transform: item.images?.length ? 'translateY(-4px)' : 'none',
                        boxShadow: item.images?.length ? '0 30px 60px rgba(36, 25, 21, 0.12)' : '0 24px 50px rgba(36, 25, 21, 0.08)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'grid',
                        placeItems: 'center',
                        width: '100%',
                        height: { xs: 220, sm: 240 },
                        p: item.imagePadding ?? 0,
                        overflow: 'hidden',
                        backgroundColor: item.imageFit === 'contain' ? alpha('#f4ede3', 0.72) : 'transparent',
                      }}
                    >
                      <Box
                        component="img"
                        src={item.image}
                        alt={item.title}
                        sx={{
                          display: 'block',
                          width: item.imageFit === 'contain' ? 'auto' : '100%',
                          height: item.imageFit === 'contain' ? 'auto' : '100%',
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: item.imageFit ?? 'cover',
                          objectPosition: item.imagePosition ?? 'center',
                        }}
                      />
                    </Box>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 0.5 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                      {item.images?.length ? (
                        <Typography
                          variant="caption"
                          color="primary"
                          sx={{ display: 'block', mt: 1, fontWeight: 700, whiteSpace: 'nowrap', fontSize: '0.72rem' }}
                        >
                          לחצו לצפייה בעוד תמונות
                        </Typography>
                      ) : null}
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
                {menuSections.map((section, index) => (
                  <SectionCard key={`section-${index}`} {...section} />
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

        <Dialog
          open={Boolean(selectedGallery)}
          onClose={closeGallery}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              overflow: 'hidden',
              borderRadius: { xs: 3, md: 5 },
              bgcolor: '#1b120f',
              color: '#fff8f1',
            },
          }}
        >
          {selectedGallery && hasGalleryImages ? (
            <Box sx={{ position: 'relative' }}>
              <IconButton
                onClick={closeGallery}
                sx={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  zIndex: 3,
                  bgcolor: alpha('#241915', 0.72),
                  color: '#fff8f1',
                  boxShadow: '0 10px 24px rgba(0,0,0,0.24)',
                  '&:hover': { bgcolor: alpha('#241915', 0.88) },
                }}
              >
                <CloseRoundedIcon />
              </IconButton>

              <Box
                sx={{
                  px: { xs: 1, sm: 2, md: 3 },
                  pt: { xs: 6, sm: 7 },
                  pb: { xs: 1.5, md: 2 },
                  background: 'linear-gradient(180deg, #201310 0%, #1b120f 100%)',
                }}
              >
                <Box
                  sx={{
                    display: 'grid',
                    placeItems: 'center',
                    minHeight: { xs: '52vh', md: '68vh' },
                    maxHeight: { xs: '52vh', md: '68vh' },
                    borderRadius: { xs: 3, md: 4 },
                    overflow: 'hidden',
                    bgcolor: alpha('#fff8f1', 0.04),
                    boxShadow: 'inset 0 0 0 1px rgba(255,248,241,0.06)',
                  }}
                >
                  <Box
                    component="img"
                    src={selectedGalleryImages[selectedGalleryIndex]}
                    alt={`${selectedGallery.title} ${selectedGalleryIndex + 1}`}
                    sx={{
                      display: 'block',
                      width: '100%',
                      height: '100%',
                      objectFit: selectedGalleryImageFit,
                      objectPosition: selectedGalleryImagePosition,
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ p: { xs: 2, md: 3 }, pt: { xs: 1.5, md: 2 }, borderTop: '1px solid', borderColor: alpha('#fff8f1', 0.08) }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={2}>
                  <Box>
                    <Typography variant="h5" sx={{ mb: 0.5 }}>
                      {selectedGallery.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: alpha('#fff8f1', 0.72) }}>
                      {selectedGallery.description}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Button
                      variant="contained"
                      onClick={showPreviousImage}
                      startIcon={<ChevronRightRoundedIcon />}
                      disabled={selectedGalleryImages.length < 2}
                      sx={{
                        borderRadius: 999,
                        px: 2,
                        minWidth: 0,
                        bgcolor: alpha('#fff8f1', 0.1),
                        color: '#fff8f1',
                        boxShadow: 'none',
                        '& .MuiButton-startIcon': { ml: 0.75, mr: 0 },
                        '&:hover': { bgcolor: alpha('#fff8f1', 0.16), boxShadow: 'none' },
                      }}
                    >
                      קודם
                    </Button>
                    <Typography variant="body2" sx={{ color: alpha('#fff8f1', 0.72), whiteSpace: 'nowrap', minWidth: 48, textAlign: 'center' }}>
                      {selectedGalleryIndex + 1} / {selectedGalleryImages.length}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={showNextImage}
                      endIcon={<ChevronLeftRoundedIcon />}
                      disabled={selectedGalleryImages.length < 2}
                      sx={{
                        borderRadius: 999,
                        px: 2,
                        minWidth: 0,
                        bgcolor: alpha('#c48a3a', 0.88),
                        color: '#241915',
                        boxShadow: 'none',
                        '& .MuiButton-endIcon': { mr: 0.75, ml: 0 },
                        '&:hover': { bgcolor: '#d59c4b', boxShadow: 'none' },
                      }}
                    >
                      הבא
                    </Button>
                  </Stack>
                </Stack>

                {selectedGalleryImages.length > 1 ? (
                  <Stack direction="row" spacing={1} sx={{ mt: 2, overflowX: 'auto', pb: 0.5 }}>
                    {selectedGalleryImages.map((image, imageIndex) => (
                      <Box
                        key={`${selectedGallery.title}-${imageIndex}`}
                        component="button"
                        type="button"
                        onClick={() => setSelectedGalleryIndex(imageIndex)}
                        sx={{
                          flex: '0 0 auto',
                          width: { xs: 72, md: 84 },
                          height: { xs: 72, md: 84 },
                          p: 0,
                          borderRadius: 2.5,
                          overflow: 'hidden',
                          border: '2px solid',
                          borderColor: imageIndex === selectedGalleryIndex ? 'secondary.main' : alpha('#fff8f1', 0.14),
                          backgroundColor: alpha('#fff8f1', 0.04),
                          cursor: 'pointer',
                          boxShadow: imageIndex === selectedGalleryIndex ? '0 0 0 3px rgba(196,138,58,0.18)' : 'none',
                        }}
                      >
                        <Box
                          component="img"
                          src={image}
                          alt={`${selectedGallery.title} ממוזערת ${imageIndex + 1}`}
                          sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </Box>
                    ))}
                  </Stack>
                ) : null}
              </Box>
            </Box>
          ) : null}
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

export default App;

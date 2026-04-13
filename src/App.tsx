import React from 'react';
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  CssBaseline,
  Dialog,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const BUSINESS = {
  name: 'Sushi Wok Nahariya',
  phone: '+972528205470',
  whatsapp:
    'https://wa.me/972528205470?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%91%D7%A6%D7%A2%20%D7%94%D7%96%D7%9E%D7%A0%D7%94%20%D7%9E%D7%A1%D7%95%D7%A9%D7%99%20%D7%95%D7%95%D7%A7%20%D7%A0%D7%94%D7%A8%D7%99%D7%94',
  address: 'כליל החורש 7, נהריה',
  hours: 'א׳-ה׳ 12:00-23:00 | מוצ״ש 12:00-19:00',
};

const logoImage = new URL('../photos/logo.png', import.meta.url).href;
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

type MenuItemType = {
  title: React.ReactNode;
  description: React.ReactNode;
  price: string;
};

type MenuSection = {
  title: React.ReactNode;
  subtitle: string;
  badge: string;
  items: MenuItemType[];
  note?: React.ReactNode;
};

const menuSections: MenuSection[] = [
  {
    title: '🥢 מנות פתיחה',
    subtitle: '',
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
    title: '🥗 סלטי פוקי (POKE)',
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
      {
        title: 'פוקי טונה אדומה',
        description: '(טרטר טונה, אבוקדו, בטטה, מלפפון, גזר, בצל ירוק ושומשום)',
        price: '₪49',
      },
    ],
  },
  {
    title: (
      <>
        🍜 מן הווק{' '}
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
    title: '✨ Signature Sushi',
    subtitle: '',
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
        description: 'סלמון, אבוקדו ובטטה במעטפת טמפורה ופנקו.',
        price: '₪42',
      },
      { title: '🌶️ ספייסי סלמון', description: 'בטטה, אבוקדו ומלפפון במעטפת טרטר סלמון ועירית.', price: '₪49' },
      { title: '🥑 דרגון רול', description: 'סלמון נא, אבוקדו ובטטה במעטפת אבוקדו וספייסי מיונז.', price: '₪42' },
      { title: '🌈 ריינבו דגים', description: 'אבוקדו, מלפפון וגזר במעטפת סלמון, טונה ודג לבן.', price: '₪48' },
      { title: '✨ סאן רול', description: 'סלמון בטמפורה ואבוקדו במעטפת סלמון, אבוקדו ובצל ירוק.', price: '₪49' },
    ],
  },
  {
    title: '🍱 קומבינציות השף',
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
    title: '🍣 הרכבה עצמית',
    subtitle: '',
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
    title: '🧒 ארוחות ילדים',
    subtitle: 'כולל שתייה קלה.',
    badge: 'Family',
    items: [
      {
        title: 'ארוחת ילדים',
        description: 'נודלס עוף ברוטב טריאקי מתקתק. שניצלונים פריכים עם צ׳יפס או אורז מאודה.',
        price: '₪39',
      },
    ],
  },
  {
    title: '🥤 שתייה קלה',
    subtitle: '',
    badge: 'Drinks',
    items: [
      { title: 'מים / סודה', description: '', price: '₪8' },
      { title: 'קולה / זירו / ספרייט / פאנטה / ענבים / תפוזים', description: '', price: '₪10' },
    ],
  },
];

const menuNavLabels = [
  'מנות פתיחה',
  'סלטי פוקי',
  'מן הווק',
  'Signature Sushi',
  'קומבינציות',
  'הרכבה עצמית',
  'ארוחות ילדים',
  'שתייה קלה',
];

const highlights = [
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
type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
};

function Reveal({ children, delay = 0, y = 28 }: RevealProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      setVisible(true);
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px)' : `translateY(${y}px)`,
        transition:
          'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Box>
  );
}

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
          borderColor: alpha('#8f2d1f', 0.2),
          color: 'text.primary',
          '& .MuiButton-startIcon': { ml: 1.25, mr: 0 },
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: alpha('#8f2d1f', 0.04),
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
              <Typography variant="h5" component="h2" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
                {title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.95rem', md: '1rem' } }}>
                {subtitle}
              </Typography>
            </Stack>

            <Stack alignItems="flex-end" spacing={1}>
              <Chip
                label={badge}
                size="small"
                sx={{
                  fontWeight: 800,
                  bgcolor: alpha('#c48a3a', 0.14),
                  color: 'secondary.dark',
                }}
              />
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
          </Stack>

          <Stack spacing={1.5}>
            {items.map((item, index) => (
              <Box key={`${badge}-${index}`}>
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
                    sx={{
                      whiteSpace: 'nowrap',
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      fontSize: { xs: '1rem', md: '1.25rem' },
                    }}
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
  const [navAnchorEl, setNavAnchorEl] = React.useState<null | HTMLElement>(null);

  const selectedGalleryImages = selectedGallery?.images ?? [];
  const hasGalleryImages = selectedGalleryImages.length > 0;
  const selectedGalleryImagePosition = selectedGallery?.imagePositions?.[selectedGalleryIndex] ?? 'center';
  const selectedGalleryImageFit = selectedGallery?.modalImageFits?.[selectedGalleryIndex] ?? 'contain';

  const openGallery = (item: GalleryItem) => {
    if (!item.images?.length) return;
    setSelectedGallery(item);
    setSelectedGalleryIndex(0);
  };

  const closeGallery = () => {
    setSelectedGallery(null);
    setSelectedGalleryIndex(0);
  };

  const showPreviousImage = () => {
    if (!hasGalleryImages) return;
    setSelectedGalleryIndex((currentIndex) =>
      currentIndex === 0 ? selectedGalleryImages.length - 1 : currentIndex - 1,
    );
  };

  const showNextImage = () => {
    if (!hasGalleryImages) return;
    setSelectedGalleryIndex((currentIndex) =>
      currentIndex === selectedGalleryImages.length - 1 ? 0 : currentIndex + 1,
    );
  };

  const openNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setNavAnchorEl(event.currentTarget);
  };

  const closeNavMenu = () => {
    setNavAnchorEl(null);
  };

  const navItems = [
    { label: 'ראש התפריט', href: '#menu-top' },
    ...menuSections.map((_, index) => ({
      label: menuNavLabels[index] ?? `קטגוריה ${index + 1}`,
      href: `#menu-section-${index}`,
    })),
    { label: 'תמונות', href: '#gallery' },
    { label: 'יצירת קשר', href: '#contact' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden',
          py: { xs: 2, md: 4 },
          pb: { xs: 34, md: 8 },
          background:
            'radial-gradient(circle at top left, rgba(255,240,206,0.88) 0%, rgba(255,240,206,0) 28%), radial-gradient(circle at 85% 18%, rgba(196,138,58,0.16) 0%, rgba(196,138,58,0) 22%), linear-gradient(180deg, #f7f0e3 0%, #f1e6d5 46%, #eee1cf 100%)',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0) 40%), repeating-linear-gradient(135deg, rgba(94,60,34,0.028) 0px, rgba(94,60,34,0.028) 1px, transparent 1px, transparent 18px)',
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 1.5, sm: 2, md: 3 } }}>
          <Stack spacing={{ xs: 3, md: 5 }}>
            <Reveal delay={20} y={16}>
              <Box
                sx={{
                  position: 'sticky',
                  top: { xs: 10, md: 18 },
                  zIndex: 20,
                }}
              >
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 999,
                    border: '1px solid',
                    borderColor: alpha('#241915', 0.08),
                    backgroundColor: alpha('#fffaf4', 0.82),
                    boxShadow: '0 18px 40px rgba(36, 25, 21, 0.08)',
                    backdropFilter: 'blur(14px)',
                    px: { xs: 1, md: 1.25 },
                    py: 0.75,
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
                    <Stack direction="row" alignItems="center" spacing={1.25} sx={{ minWidth: 0 }}>
                      <Box
                        component="img"
                        src={logoImage}
                        alt="Sushi Wok Nahariya Logo"
                        sx={{
                          width: { xs: 42, md: 50 },
                          height: { xs: 42, md: 50 },
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '1px solid',
                          borderColor: alpha('#241915', 0.08),
                          bgcolor: '#fff',
                          flexShrink: 0,
                        }}
                      />
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 900,
                            lineHeight: 1.1,
                            fontSize: { xs: '0.95rem', md: '1.05rem' },
                          }}
                        >
                          Sushi Wok Nahariya
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: '0.12em' }}>
                          MENU
                        </Typography>
                      </Box>
                    </Stack>

                    <Button
                      onClick={openNavMenu}
                      startIcon={<MenuRoundedIcon />}
                      sx={{
                        borderRadius: 999,
                        px: { xs: 1.4, md: 1.75 },
                        py: 0.9,
                        color: 'text.primary',
                        bgcolor: alpha('#8f2d1f', 0.05),
                        whiteSpace: 'nowrap',
                        '& .MuiButton-startIcon': { ml: 0.5, mr: 0 },
                        '&:hover': {
                          bgcolor: alpha('#8f2d1f', 0.1),
                        },
                      }}
                    >
                      תפריט
                    </Button>

                    <Menu
                      anchorEl={navAnchorEl}
                      open={Boolean(navAnchorEl)}
                      onClose={closeNavMenu}
                      PaperProps={{
                        sx: {
                          mt: 1,
                          minWidth: 240,
                          maxHeight: 420,
                          borderRadius: 3,
                          border: '1px solid',
                          borderColor: alpha('#241915', 0.08),
                          boxShadow: '0 18px 40px rgba(36, 25, 21, 0.12)',
                        },
                      }}
                    >
                      {navItems.map((item) => (
                        <MenuItem
                          key={item.href}
                          component="a"
                          href={item.href}
                          onClick={closeNavMenu}
                          sx={{ justifyContent: 'flex-end', textAlign: 'right' }}
                        >
                          {item.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Stack>
                </Card>
              </Box>
            </Reveal>

            <Reveal delay={50} y={18}>
              <Box id="menu-top" sx={{ scrollMarginTop: { xs: '90px', md: '110px' } }}>
                <Stack alignItems="center" sx={{ mb: 4, textAlign: 'center' }}>
                  <Box sx={{ maxWidth: 520 }}>
                    <Typography
                      variant="overline"
                      sx={{
                        display: 'block',
                        color: alpha('#8f2d1f', 0.72),
                        letterSpacing: '0.18em',
                        fontWeight: 800,
                      }}
                    >
                      Sushi Wok Nahariya
                    </Typography>
                    <Typography
                      variant="h2"
                      sx={{
                        mt: 0.75,
                        fontSize: { xs: '2.35rem', md: '3.8rem' },
                        lineHeight: 1,
                        letterSpacing: '-0.03em',
                      }}
                    >
                      Full Menu
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 1,
                        fontSize: { xs: '0.95rem', md: '1rem' },
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Fresh Sushi • Wok • Poke • Combos
                    </Typography>
                  </Box>
                </Stack>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, minmax(0, 1fr))' },
                    gap: 3,
                  }}
                >
                  {menuSections.map((section, index) => (
                    <Reveal key={`section-${index}`} delay={index * 70} y={26}>
                      <Box id={`menu-section-${index}`} sx={{ scrollMarginTop: { xs: '90px', md: '110px' } }}>
                        <SectionCard {...section} />
                      </Box>
                    </Reveal>
                  ))}
                </Box>
              </Box>
            </Reveal>

            <Reveal delay={90}>
              <Card
                elevation={0}
                sx={{
                  p: { xs: 2.2, sm: 3, md: 4 },
                  borderRadius: { xs: 4, md: 5 },
                  border: '1px solid',
                  borderColor: 'rgba(36, 25, 21, 0.08)',
                  background: 'linear-gradient(135deg, rgba(255,250,244,0.98) 0%, rgba(250,242,233,0.98) 100%)',
                  boxShadow: '0 24px 60px rgba(36, 25, 21, 0.08)',
                }}
              >
                <Stack spacing={2.5} alignItems="center" textAlign="center">
                  <Box
                    component="img"
                    src={logoImage}
                    alt="Sushi Wok Nahariya"
                    sx={{
                      width: { xs: 88, md: 110 },
                      height: { xs: 88, md: 110 },
                      borderRadius: '50%',
                      objectFit: 'cover',
                      boxShadow: '0 18px 40px rgba(36, 25, 21, 0.12)',
                      border: '3px solid',
                      borderColor: alpha('#fffaf4', 0.92),
                      bgcolor: '#fff',
                    }}
                  />

                  <Box>
                    <Typography
                      variant="overline"
                      sx={{
                        display: 'block',
                        color: alpha('#8f2d1f', 0.72),
                        letterSpacing: '0.22em',
                        fontWeight: 800,
                      }}
                    >
                      SUSHI WOK
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        mt: 0.5,
                        lineHeight: 1,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      Sushi Wok Nahariya
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        mt: 1.25,
                        fontSize: { xs: '0.98rem', md: '1.08rem' },
                      }}
                    >
                      משלוחים, איסוף עצמי וסושי טרי בנהריה
                    </Typography>
                  </Box>

                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={1.25}
                    sx={{ width: '100%', justifyContent: 'center' }}
                  >
                    {highlights.map((item) => (
                      <Chip
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        sx={{
                          maxWidth: '100%',
                          height: { xs: 46, md: 42 },
                          bgcolor: alpha('#8f2d1f', 0.04),
                          border: '1px solid',
                          borderColor: alpha('#241915', 0.08),
                          '& .MuiChip-label': {
                            display: 'block',
                            whiteSpace: 'normal',
                            textAlign: 'right',
                            py: 0.75,
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </Stack>
              </Card>
            </Reveal>

            <Reveal delay={120}>
              <Box id="gallery" sx={{ scrollMarginTop: { xs: '90px', md: '110px' } }}>
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  justifyContent="space-between"
                  alignItems={{ xs: 'flex-start', md: 'center' }}
                  gap={2}
                  sx={{ mb: 3 }}
                >
                  <Box>
                    <Typography variant="h3" sx={{ mt: 0.5 }}>
                      תמונות מהתפריט
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520 }}>
                    מבחר תמונות של מגשים, פוקי, ווק וספיישלים כדי להמחיש את המנות שבאתר.
                  </Typography>
                </Stack>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' },
                    gap: 2.5,
                  }}
                >
                  {galleryImages.map((item, index) => (
                    <Reveal key={item.title} delay={index * 90} y={24}>
                      <Card
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
                            boxShadow: item.images?.length
                              ? '0 30px 60px rgba(36, 25, 21, 0.12)'
                              : '0 24px 50px rgba(36, 25, 21, 0.08)',
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
                              sx={{
                                display: 'block',
                                mt: 1,
                                fontWeight: 700,
                                whiteSpace: 'nowrap',
                                fontSize: '0.72rem',
                                color: 'text.secondary',
                              }}
                            >
                              לחצו לצפייה בעוד תמונות
                            </Typography>
                          ) : null}
                        </CardContent>
                      </Card>
                    </Reveal>
                  ))}
                </Box>
              </Box>
            </Reveal>

            <Card
              id="contact"
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 5,
                border: '1px solid',
                borderColor: 'rgba(36, 25, 21, 0.08)',
                background: 'linear-gradient(135deg, rgba(36,92,74,0.08) 0%, rgba(196,138,58,0.14) 100%)',
                boxShadow: '0 24px 50px rgba(36, 25, 21, 0.08)',
                scrollMarginTop: { xs: '90px', md: '110px' },
              }}
            >
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', md: 'center' }}
                gap={3}
              >
                <Box sx={{ maxWidth: 620 }}>
                  <Typography variant="h4" sx={{ mt: 1, mb: 1 }}>
                    להזמנות, משלוחים ואיסוף עצמי
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    אפשר להזמין עכשיו בטלפון או בוואטסאפ. {BUSINESS.name}, {BUSINESS.address}.
                  </Typography>
                </Box>
                <ActionButtons />
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

              <Box
                sx={{
                  p: { xs: 2, md: 3 },
                  pt: { xs: 1.5, md: 2 },
                  borderTop: '1px solid',
                  borderColor: alpha('#fff8f1', 0.08),
                }}
              >
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  gap={2}
                >
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
                    <Typography
                      variant="body2"
                      sx={{
                        color: alpha('#fff8f1', 0.72),
                        whiteSpace: 'nowrap',
                        minWidth: 48,
                        textAlign: 'center',
                      }}
                    >
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
                          borderColor:
                            imageIndex === selectedGalleryIndex ? 'secondary.main' : alpha('#fff8f1', 0.14),
                          backgroundColor: alpha('#fff8f1', 0.04),
                          cursor: 'pointer',
                          boxShadow:
                            imageIndex === selectedGalleryIndex ? '0 0 0 3px rgba(196,138,58,0.18)' : 'none',
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
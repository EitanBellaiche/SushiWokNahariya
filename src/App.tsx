import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { theme, COLORS } from './theme';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileOrderBar } from './components/MobileOrderBar';
import { CartDrawer } from './components/CartDrawer';
import { CartProvider } from './cart/CartContext';
import { HomePage } from './pages/HomePage';
import { PrivacyPage } from './pages/legal/PrivacyPage';
import { TermsPage } from './pages/legal/TermsPage';
import { CancellationsPage } from './pages/legal/CancellationsPage';
import { AccessibilityPage } from './pages/legal/AccessibilityPage';
import { useScrollToTopOnNavigate } from './hooks/useScrollToTopOnNavigate';

function AppShell() {
  useScrollToTopOnNavigate();

  return (
    <Box sx={{ bgcolor: COLORS.bg, minHeight: '100vh', pb: { xs: 9, md: 0 } }}>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/cancellations" element={<CancellationsPage />} />
        <Route path="/accessibility" element={<AccessibilityPage />} />
      </Routes>

      <Footer />
      <MobileOrderBar />
      <CartDrawer />
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;

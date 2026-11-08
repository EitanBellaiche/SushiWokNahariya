import React from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { theme, COLORS } from './theme';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileOrderBar } from './components/MobileOrderBar';
import { CartDrawer } from './components/CartDrawer';
import { AccessibilityMenu } from './components/AccessibilityMenu';
import { AccessibilityProvider } from './accessibility/AccessibilityContext';
import { DishDetailsProvider } from './dishes/DishDetailsContext';
import { CartProvider } from './cart/CartContext';
import { HomePage } from './pages/HomePage';
import { PrivacyPage } from './pages/legal/PrivacyPage';
import { TermsPage } from './pages/legal/TermsPage';
import { CancellationsPage } from './pages/legal/CancellationsPage';
import { AccessibilityPage } from './pages/legal/AccessibilityPage';
import { useScrollToTopOnNavigate } from './hooks/useScrollToTopOnNavigate';

function skipToMainContent(event: React.MouseEvent) {
  // Handled here rather than by the #hash, which would add a router history entry.
  event.preventDefault();
  document.getElementById('main-content')?.focus();
}

function AppShell() {
  useScrollToTopOnNavigate();

  return (
    <Box sx={{ bgcolor: COLORS.bg, minHeight: '100vh', pb: { xs: 9, md: 0 } }}>
      <Box
        component="a"
        href="#main-content"
        onClick={skipToMainContent}
        sx={{
          position: 'fixed',
          top: 8,
          left: '50%',
          zIndex: 2000,
          px: 2,
          py: 1,
          borderRadius: 2,
          bgcolor: COLORS.white,
          color: COLORS.bg,
          fontWeight: 700,
          transform: 'translate(-50%, -200%)',
          '&:focus': { transform: 'translate(-50%, 0)' },
        }}
      >
        דילוג לתוכן הראשי
      </Box>

      <Header />

      <Box id="main-content" tabIndex={-1} sx={{ '&:focus, &:focus-visible': { outline: 'none' } }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/cancellations" element={<CancellationsPage />} />
        <Route path="/accessibility" element={<AccessibilityPage />} />
      </Routes>
      </Box>

      <Footer />
      <MobileOrderBar />
      <CartDrawer />
      <AccessibilityMenu />
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AccessibilityProvider>
        <CartProvider>
          <DishDetailsProvider>
            <BrowserRouter>
              <AppShell />
            </BrowserRouter>
          </DishDetailsProvider>
        </CartProvider>
      </AccessibilityProvider>
    </ThemeProvider>
  );
}

export default App;

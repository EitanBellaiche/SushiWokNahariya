import React from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { BUSINESS } from '../../data/business';
import { COLORS } from '../../theme';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

type LegalLayoutProps = {
  title: string;
  description: string;
  showLastUpdated?: boolean;
  children: React.ReactNode;
};

/** Shared shell for all legal pages: consistent header spacing, readable width, RTL, and the site's black/red look. */
export function LegalLayout({ title, description, showLastUpdated = true, children }: LegalLayoutProps) {
  useDocumentTitle(`${title} | ${BUSINESS.name}`, description);

  return (
    <Box component="main" sx={{ bgcolor: COLORS.bg, minHeight: '60vh', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="sm" disableGutters sx={{ px: { xs: 2.5, md: 3 } }}>
        <Stack spacing={2.5}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              alignSelf: 'flex-start',
              color: COLORS.textSecondary,
              fontSize: '0.85rem',
              textDecoration: 'none',
              '&:hover': { color: COLORS.white },
            }}
          >
            <ArrowForwardRoundedIcon fontSize="small" />
            חזרה לדף הבית
          </Box>

          <Typography component="h1" sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 800, color: COLORS.white }}>
            {title}
          </Typography>

          {showLastUpdated && (
            <Typography sx={{ color: COLORS.textMuted, fontSize: '0.82rem' }}>
              עודכן לאחרונה: {BUSINESS.lastLegalUpdate}
            </Typography>
          )}

          <Stack
            spacing={2.25}
            sx={{
              color: COLORS.textSecondary,
              fontSize: { xs: '0.95rem', md: '1rem' },
              lineHeight: 1.85,
              '& h2': { color: COLORS.white, fontSize: { xs: '1.1rem', md: '1.2rem' }, fontWeight: 700, marginTop: '0.5rem' },
              '& strong': { color: COLORS.white },
              '& a': { color: COLORS.red, fontWeight: 600 },
              '& ul': { margin: 0, paddingInlineStart: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
            }}
          >
            {children}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

import { Box, alpha } from '@mui/material';
import { navCategories } from '../data/menu';
import { COLORS } from '../theme';

type MenuNavProps = {
  activeId: string;
};

export function MenuNav({ activeId }: MenuNavProps) {
  return (
    <Box
      component="nav"
      aria-label="ניווט בין קטגוריות התפריט"
      sx={{
        position: 'sticky',
        top: { xs: 80, md: 96 },
        zIndex: 15,
        bgcolor: alpha(COLORS.bg, 0.92),
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid',
        borderColor: COLORS.surfaceBorder,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          overflowX: 'auto',
          px: { xs: 1.5, md: 3 },
          py: 1.25,
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {navCategories.map((cat) => {
          const active = cat.id === activeId;
          return (
            <Box
              key={cat.id}
              component="a"
              href={`#${cat.id}`}
              aria-current={active ? 'true' : undefined}
              sx={{
                flexShrink: 0,
                whiteSpace: 'nowrap',
                px: 2,
                py: 0.85,
                borderRadius: 999,
                fontSize: '0.88rem',
                fontWeight: 700,
                textDecoration: 'none',
                border: '1px solid',
                borderColor: active ? COLORS.red : COLORS.surfaceBorder,
                color: active ? COLORS.white : COLORS.textSecondary,
                bgcolor: active ? COLORS.red : 'transparent',
                transition: 'all 180ms ease',
                '&:hover': { borderColor: COLORS.red, color: COLORS.white },
              }}
            >
              {cat.label}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

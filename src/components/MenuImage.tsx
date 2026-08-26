import { Box, Typography, alpha } from '@mui/material';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import { COLORS } from '../theme';

type MenuImageProps = {
  src?: string;
  alt: string;
  size?: number | string;
  aspectRatio?: string;
  rounded?: number;
  eager?: boolean;
};

/**
 * Reusable menu-item image slot. Renders the real photo when `src` is supplied;
 * otherwise (or if the photo fails to load) renders a neutral placeholder that
 * reserves the exact same space, so swapping in a real photo later never
 * requires touching the surrounding card layout.
 */
export function MenuImage({ src, alt, size = 72, aspectRatio, rounded = 2.5, eager = false }: MenuImageProps) {
  const boxSx = aspectRatio
    ? { width: '100%', aspectRatio }
    : { width: size, height: size, flexShrink: 0 };

  if (!src) {
    return (
      <Box
        aria-hidden="true"
        sx={{
          ...boxSx,
          borderRadius: rounded,
          overflow: 'hidden',
          border: '1px dashed',
          borderColor: COLORS.surfaceBorder,
          bgcolor: alpha(COLORS.white, 0.03),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.25,
          px: 0.5,
        }}
      >
        <RestaurantRoundedIcon sx={{ fontSize: '1.1rem', color: COLORS.textMuted, opacity: 0.6 }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        ...boxSx,
        borderRadius: rounded,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: COLORS.surfaceBorder,
        bgcolor: COLORS.bgElevated,
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
        sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </Box>
  );
}

/** Small "photo coming soon" caption for contexts with room to spare (large cards). */
export function ImagePendingCaption() {
  return (
    <Typography sx={{ fontSize: '0.68rem', color: COLORS.textMuted, textAlign: 'center' }}>
      תמונה תתווסף בהמשך
    </Typography>
  );
}

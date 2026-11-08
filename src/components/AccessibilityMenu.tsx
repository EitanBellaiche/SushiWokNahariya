import React from 'react';
import { Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, FormGroup, IconButton, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { COLORS } from '../theme';
import { TEXT_SCALE_PERCENT, useAccessibility, type AccessibilityPrefs } from '../accessibility/AccessibilityContext';

type ToggleKey = Exclude<keyof AccessibilityPrefs, 'textLevel'>;

const TOGGLES: { key: ToggleKey; label: string }[] = [
  { key: 'highContrast', label: 'ניגודיות גבוהה' },
  { key: 'underlineLinks', label: 'הדגשת קישורים' },
  { key: 'readableFont', label: 'גופן קריא' },
  { key: 'stopMotion', label: 'עצירת אנימציות' },
];

export function AccessibilityMenu() {
  const [open, setOpen] = React.useState(false);
  const { prefs, update, reset } = useAccessibility();
  const close = () => setOpen(false);

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        aria-label="פתיחת תפריט נגישות"
        aria-haspopup="dialog"
        sx={{
          position: 'fixed',
          left: 16,
          // On mobile, sits clear above the fixed order bar.
          bottom: { xs: 'calc(env(safe-area-inset-bottom, 0px) + 84px)', md: 24 },
          zIndex: 1050,
          width: 48,
          height: 48,
          color: COLORS.bg,
          bgcolor: COLORS.white,
          boxShadow: '0 6px 18px rgba(0, 0, 0, 0.5)',
          '&:hover': { bgcolor: '#ffffff' },
          '&:focus-visible': { outlineOffset: '3px' },
        }}
      >
        <AccessibilityNewRoundedIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={close}
        fullWidth
        maxWidth="xs"
        aria-labelledby="a11y-menu-title"
        PaperProps={{ sx: { bgcolor: COLORS.bgElevated, color: COLORS.white, backgroundImage: 'none' } }}
      >
        <DialogTitle component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
          <Typography id="a11y-menu-title" component="h2" sx={{ fontWeight: 800, fontSize: '1.15rem' }}>
            תפריט נגישות
          </Typography>
          <IconButton autoFocus onClick={close} aria-label="סגירת תפריט נגישות" sx={{ color: COLORS.white, width: 44, height: 44 }}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
              <Typography id="a11y-text-size" sx={{ fontWeight: 600 }}>גודל טקסט</Typography>
              <Stack direction="row" alignItems="center" role="group" aria-labelledby="a11y-text-size">
                <IconButton
                  aria-label="הקטנת טקסט"
                  disabled={prefs.textLevel === 0}
                  onClick={() => update({ textLevel: prefs.textLevel - 1 })}
                  sx={{ width: 44, height: 44, color: COLORS.white }}
                >
                  <RemoveRoundedIcon />
                </IconButton>
                <Typography component="output" aria-live="polite" sx={{ minWidth: 52, textAlign: 'center' }}>
                  {TEXT_SCALE_PERCENT[prefs.textLevel]}%
                </Typography>
                <IconButton
                  aria-label="הגדלת טקסט"
                  disabled={prefs.textLevel === TEXT_SCALE_PERCENT.length - 1}
                  onClick={() => update({ textLevel: prefs.textLevel + 1 })}
                  sx={{ width: 44, height: 44, color: COLORS.white }}
                >
                  <AddRoundedIcon />
                </IconButton>
              </Stack>
            </Stack>

            <FormGroup>
              {TOGGLES.map((toggle) => (
                <FormControlLabel
                  key={toggle.key}
                  label={toggle.label}
                  sx={{ mx: 0, justifyContent: 'space-between', flexDirection: 'row-reverse' }}
                  control={<Checkbox checked={prefs[toggle.key]} onChange={(_, checked) => update({ [toggle.key]: checked })} sx={{ color: COLORS.white, '&.Mui-checked': { color: COLORS.white } }} />}
                />
              ))}
            </FormGroup>

            <Button variant="outlined" onClick={reset} sx={{ color: COLORS.white, borderColor: COLORS.textSecondary }}>
              איפוס הגדרות
            </Button>

            <Box component={RouterLink} to="/accessibility" onClick={close} sx={{ color: COLORS.white, textAlign: 'center', fontSize: '0.9rem' }}>
              להצהרת הנגישות
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}

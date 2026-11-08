import React from 'react';
import { Alert, Box, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, IconButton, MenuItem, Stack, TextField, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { useCart } from '../cart/CartContext';
import type { CartLine } from '../cart/types';
import { buildYourOwn, drinks, specials, sushiBox, wok, WOK_PROTEIN_CHOICES } from '../data/menu';
import { getDish } from '../dishes/catalog';
import { configureDish, configuredLine, defaultRoll, legacyCustomization, MAX_NOTES, MAX_QUANTITY } from '../dishes/configuration';
import type { DishCustomization } from '../dishes/types';
import { useDialogReturnFocus } from '../hooks/useDialogReturnFocus';
import { COLORS } from '../theme';
import { ImageDisclaimer, MenuImage } from './MenuImage';
import { StoreClosedNotice } from './StoreClosedNotice';
import { RollChoices } from './RollChoices';

export function DishDetailsDialog({ open, onClose, productId, line }: {
  open: boolean; onClose: () => void; productId: string; line?: CartLine;
}) {
  useDialogReturnFocus(open);
  const { addLine, replaceLine, storeOpen } = useCart();
  const [activeId, setActiveId] = React.useState(productId);
  const [selection, setSelection] = React.useState<DishCustomization>({});
  const [notes, setNotes] = React.useState('');
  const [quantity, setQuantity] = React.useState(1);
  const [error, setError] = React.useState('');
  const titleId = React.useId();
  const descriptionId = React.useId();
  React.useEffect(() => {
    if (!open) return;
    const dish = getDish(productId);
    setActiveId(productId);
    setSelection(line ? line.customization ?? legacyCustomization(line) : dish.kind === 'roll' ? { roll: defaultRoll(dish.rollType!) }
      : dish.kind === 'promo' ? { roll: defaultRoll(buildYourOwn.rollPrices[0].type, 'veggie'), wokId: wok.items[0].id, protein: WOK_PROTEIN_CHOICES[0].name }
        : { ...(dish.includesDrinkChoice ? { drink: (dish.drinkChoices?.[0] ?? drinks.items[0].name) } : {}), ...(dish.sideChoices?.length ? { side: dish.sideChoices[0] } : {}) });
    setNotes(line?.notes ?? '');
    setQuantity(line?.quantity ?? 1);
    setError('');
  }, [open, productId, line]);

  const dish = getDish(activeId);
  const patch = (value: Partial<DishCustomization>) => { setSelection((prev) => ({ ...prev, ...value })); setError(''); };
  const toggle = (key: 'removedIngredients' | 'addons' | 'rollIds', value: string, checked: boolean) => patch({
    [key]: checked ? [...(selection[key] ?? []), value] : (selection[key] ?? []).filter((s) => s !== value),
  });
  let price = dish.numericPrice ?? 0;
  try { price = configureDish(activeId, selection, true).unitPrice; } catch { /* Initial render before reset. */ }
  const handleSave = () => {
    if (!storeOpen) return;
    try {
      const input = configuredLine(activeId, selection, quantity, notes);
      if (line) replaceLine(line.lineId, input); else addLine(input);
      onClose();
    } catch (err) { setError(err instanceof Error ? err.message : 'לא ניתן לשמור את המנה'); }
  };

  const select = (label: string, key: 'choice' | 'drink' | 'side' | 'wokId' | 'protein', choices: { name: string; value?: string; price?: number }[]) => (
    <TextField select label={label} fullWidth value={selection[key] ?? ''} onChange={(e) => patch({ [key]: e.target.value })}>
      {choices.map((c) => <MenuItem key={c.value ?? c.name} value={c.value ?? c.name}>{c.name}{c.price != null ? c.price > 0 ? ` (+₪${c.price})` : ' (ללא תוספת תשלום)' : ''}</MenuItem>)}
    </TextField>
  );
  return (
    <Dialog disableRestoreFocus open={open} onClose={onClose} fullWidth maxWidth="md" scroll="paper" aria-labelledby={titleId} aria-describedby={descriptionId}
      PaperProps={{ dir: 'rtl', sx: { bgcolor: COLORS.bg, color: COLORS.white, border: `1px solid ${COLORS.surfaceBorder}`, borderRadius: { xs: '20px 20px 0 0', sm: 4 }, m: { xs: 0, sm: 3 }, width: { xs: '100%', sm: 'calc(100% - 48px)' }, maxHeight: { xs: '94dvh', sm: '90dvh' } } }}
      sx={{ '& .MuiDialog-container': { alignItems: { xs: 'flex-end', sm: 'center' } } }}>
      <DialogTitle component="div" id={`${titleId}-header`} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, borderBottom: `1px solid ${COLORS.surfaceBorder}` }}>
        <Typography id={titleId} component="h2" sx={{ fontWeight: 800, fontSize: { xs: '1.1rem', sm: '1.35rem' } }}>{dish.name}</Typography>
        <IconButton autoFocus aria-label="סגירת פרטי מנה" onClick={onClose} sx={{ color: COLORS.white, flexShrink: 0, width: 44, height: 44 }}><CloseRoundedIcon /></IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: { xs: 2.5, sm: 3 }, overscrollBehavior: 'contain' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) minmax(0, 1fr)' }, gap: 3, pt: 1 }}>
          <Stack spacing={2} sx={{ alignSelf: 'start' }}>
            {dish.image && <Box>
              <MenuImage src={dish.image} alt={dish.name} aspectRatio="4 / 3" rounded={3} fit={drinks.items.some((drink) => drink.id === dish.id) ? 'contain' : 'cover'} eager />
              <ImageDisclaimer sx={{ mt: 0.5 }} />
            </Box>}
            <Typography sx={{ fontWeight: 800, fontSize: '1.45rem', color: COLORS.redText }}>{dish.price}</Typography>
            <Typography id={descriptionId} sx={{ whiteSpace: 'pre-line', color: COLORS.textSecondary, lineHeight: 1.8 }}>{dish.description ?? 'פרטי המנה בהתאם לתפריט המסעדה.'}</Typography>
            {!!dish.ingredients?.length && <Box>
              <Typography component="h3" sx={{ fontWeight: 700, mb: 1 }}>מרכיבי המנה</Typography>
              <Stack direction="row" flexWrap="wrap" gap={0.75}>{dish.ingredients.map((ingredient) => <Chip key={ingredient} label={ingredient} variant="outlined" size="small" />)}</Stack>
            </Box>}
          </Stack>
          <Stack spacing={2.5}>
            {dish.kind === 'promo' && <>
              {select('בחירת מוקפץ', 'wokId', wok.items.map((w) => ({ name: w.name, value: w.id })))}
              {select('תוספת חלבון', 'protein', WOK_PROTEIN_CHOICES)}
            </>}
            {(dish.kind === 'roll' || dish.kind === 'promo') && selection.roll && <RollChoices value={selection.roll} promo={dish.kind === 'promo'}
              onChange={(roll) => patch({ roll })} onTypeChange={dish.kind === 'roll' ? (type) => setActiveId(`build-${type}`) : undefined} />}
            {dish.kind === 'box' && <Box component="fieldset" sx={{ border: 0, m: 0, p: 0 }}>
              <Typography component="legend" sx={{ fontWeight: 700 }}>בחרו {sushiBox.requiredRollCount} רולים · נבחרו {selection.rollIds?.length ?? 0}</Typography>
              <FormGroup>{specials.items.map((s) => <FormControlLabel key={s.id} label={s.name} control={<Checkbox
                checked={selection.rollIds?.includes(s.id) ?? false} disabled={!selection.rollIds?.includes(s.id) && (selection.rollIds?.length ?? 0) >= sushiBox.requiredRollCount}
                onChange={(_, checked) => toggle('rollIds', s.id, checked)} />} />)}</FormGroup>
            </Box>}
            {!!dish.addonChoices?.length && select(`בחירת ${dish.addonChoiceLabel ?? 'תוספת'} (חובה)`, 'choice', dish.addonChoices)}
            {!!dish.sideChoices?.length && select('תוספת לבחירה', 'side', dish.sideChoices.map((name) => ({ name })))}
            {dish.includesDrinkChoice && select('שתייה כלולה במנה', 'drink', drinks.items.filter((d) => !dish.drinkChoices?.length || dish.drinkChoices.includes(d.name)).map((d) => ({ name: d.name })))}
            {!!dish.removableIngredients?.length && <Box component="fieldset" sx={{ border: 0, p: 0, m: 0 }}>
              <Typography component="legend" sx={{ fontWeight: 700 }}>הסרת מרכיבים</Typography>
              <FormGroup>{dish.removableIngredients.map((ingredient) => <FormControlLabel key={ingredient} label={`ללא ${ingredient}`} control={<Checkbox
                checked={selection.removedIngredients?.includes(ingredient) ?? false} onChange={(_, checked) => toggle('removedIngredients', ingredient, checked)} />} />)}</FormGroup>
            </Box>}
            {!!dish.optionalAddons?.length && <Box component="fieldset" sx={{ border: 0, p: 0, m: 0 }}>
              <Typography component="legend" sx={{ fontWeight: 700 }}>תוספות למנה</Typography>
              <FormGroup>{dish.optionalAddons.map((addon) => <FormControlLabel key={addon.name} label={`${addon.name} (+₪${addon.price})`} control={<Checkbox
                checked={selection.addons?.includes(addon.name) ?? false} onChange={(_, checked) => toggle('addons', addon.name, checked)} />} />)}</FormGroup>
            </Box>}
            <TextField label="בקשות מיוחדות למנה" placeholder="למשל: בלי חריף, לחתוך ל-10 יחידות" fullWidth multiline minRows={3}
              value={notes} onChange={(e) => setNotes(e.target.value)} inputProps={{ maxLength: MAX_NOTES }} helperText={`${notes.length}/${MAX_NOTES}`} />
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography sx={{ fontWeight: 700 }}>כמות</Typography>
              <Stack direction="row" alignItems="center" gap={1}>
                <IconButton aria-label="הפחת כמות" disabled={quantity <= 1} onClick={() => setQuantity((q) => q - 1)} sx={{ width: 44, height: 44 }}><RemoveRoundedIcon /></IconButton>
                <Typography component="output" aria-live="polite">{quantity}</Typography>
                <IconButton aria-label="הוסף כמות" disabled={quantity >= MAX_QUANTITY} onClick={() => setQuantity((q) => q + 1)} sx={{ width: 44, height: 44 }}><AddRoundedIcon /></IconButton>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: 'block', p: 2, pb: 'max(16px, env(safe-area-inset-bottom))', bgcolor: COLORS.bgElevated, borderTop: `1px solid ${COLORS.surfaceBorder}` }}>
        <Stack spacing={1}>
          <StoreClosedNotice />
          {error && <Alert severity="error">{error}</Alert>}
          <Button fullWidth variant="contained" size="large" disabled={!storeOpen} onClick={handleSave} sx={{ minHeight: 52 }}>
            {line ? 'שמירת השינויים' : 'הוסף לסל'} · <Box component="span" aria-live="polite" sx={{ mx: 0.5 }}>₪{price * quantity}</Box>
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

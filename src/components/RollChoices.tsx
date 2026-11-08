import { Box, Checkbox, FormControlLabel, FormGroup, MenuItem, TextField, Typography } from '@mui/material';
import { buildYourOwn } from '../data/menu';
import { defaultRoll } from '../dishes/configuration';
import type { RollSelection } from '../dishes/types';

export function RollChoices({ value, onChange, promo, onTypeChange }: {
  value: RollSelection; onChange: (value: RollSelection) => void; promo?: boolean; onTypeChange?: (type: string) => void;
}) {
  const rolls = buildYourOwn.rollPrices.filter((r) => !promo || ['I/O', 'פוטומאקי'].includes(r.type));
  const roll = rolls.find((r) => r.type === value.type)!;
  const limit = roll.singleChoice ? 1 : (value.base === 'fish' ? roll.vegCountFish : roll.vegCountVeggie) ?? 0;
  return (
    <>
      <TextField select fullWidth label="סוג רול" value={value.type} onChange={(e) => {
        onChange(defaultRoll(e.target.value, promo ? 'veggie' : 'fish'));
        onTypeChange?.(e.target.value);
      }}>
        {rolls.map((r) => <MenuItem key={r.type} value={r.type}>{r.type} · דג ₪{r.fish} / צמחוני ₪{r.veggie}</MenuItem>)}
      </TextField>
      <TextField select fullWidth label="בסיס הרול" value={value.base} onChange={(e) => onChange(defaultRoll(value.type, e.target.value as 'fish' | 'veggie'))}>
        <MenuItem value="fish">דג{promo ? ` (+₪${roll.fish - roll.veggie})` : ''}</MenuItem>
        <MenuItem value="veggie">צמחוני</MenuItem>
      </TextField>
      {value.base === 'fish' && <TextField select fullWidth label="בחירת דג" value={value.fish ?? ''} onChange={(e) => onChange({ ...value, fish: e.target.value })}>
        {buildYourOwn.fish.map((f) => <MenuItem key={f} value={f}>{f}</MenuItem>)}
      </TextField>}
      {(!roll.singleChoice || value.base === 'veggie') && <Box component="fieldset" sx={{ border: 0, p: 0, m: 0 }}>
        <Typography component="legend" sx={{ fontWeight: 700 }}>
          {roll.singleChoice ? 'בחרו ירק אחד' : promo ? `בחרו ${limit} ירקות` : `בחרו עד ${limit} ירקות (לפחות אחד)`}
        </Typography>
        <FormGroup sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
          {buildYourOwn.vegetables.map((v) => <FormControlLabel key={v} label={v} control={<Checkbox
            checked={value.vegetables.includes(v)} disabled={!value.vegetables.includes(v) && value.vegetables.length >= limit}
            onChange={(_, checked) => onChange({ ...value, vegetables: checked ? [...value.vegetables, v] : value.vegetables.filter((s) => s !== v) })}
          />} />)}
        </FormGroup>
      </Box>}
      {(['wrap', 'coating'] as const).map((key) => <TextField key={key} select fullWidth label={key === 'wrap' ? 'מעטפה בתוספת תשלום' : 'ציפוי בתוספת תשלום'}
        value={value[key] ?? ''} onChange={(e) => onChange({ ...value, [key]: e.target.value || undefined })}>
        <MenuItem value="">ללא תוספת</MenuItem>
        {(key === 'wrap' ? buildYourOwn.wraps : buildYourOwn.coatings).map((a) => <MenuItem key={a.name} value={a.name}>{a.name} {a.price}</MenuItem>)}
      </TextField>)}
    </>
  );
}

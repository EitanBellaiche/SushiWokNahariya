import React from 'react';
import {
  Alert,
  Box,
  Button,
  Divider,
  Drawer,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  alpha,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useCart } from '../cart/CartContext';
import { buildOrderWhatsAppLink } from '../cart/whatsapp';
import { NAHARIYA_DELIVERY_FEE, getDeliveryFee, isDeliveryFeePending } from '../cart/delivery';
import type { DeliveryZone } from '../cart/delivery';
import type { CustomerDetails, FulfillmentType } from '../cart/types';
import { DeliveryTimeNote } from './DeliveryTimeNote';
import { StoreClosedNotice } from './StoreClosedNotice';
import { COLORS } from '../theme';

function normalizePhone(raw: string): string {
  return raw.replace(/[\s-]/g, '');
}

function isValidPhone(raw: string): boolean {
  const value = normalizePhone(raw);
  return /^(0\d{8,9}|\+972\d{8,9})$/.test(value);
}

function CartLineRow({
  line,
}: {
  line: { lineId: string; name: string; unitPrice: number; quantity: number; options: string[] };
}) {
  const { updateQuantity, removeLine } = useCart();
  return (
    <Stack spacing={0.75} sx={{ py: 1.5 }}>
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={1}>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '0.92rem', color: COLORS.white }}>
            {line.quantity}× {line.name}
          </Typography>
          <Typography sx={{ fontSize: '0.78rem', color: COLORS.textMuted }}>₪{line.unitPrice} ליחידה</Typography>
        </Box>
        <Typography sx={{ fontWeight: 800, fontSize: '0.95rem', color: COLORS.red, whiteSpace: 'nowrap' }}>
          ₪{line.unitPrice * line.quantity}
        </Typography>
      </Stack>

      {line.options.length > 0 && (
        <Stack spacing={0.2} sx={{ pr: 0.5 }}>
          {line.options.map((opt) => (
            <Typography key={opt} sx={{ fontSize: '0.76rem', color: COLORS.textSecondary }}>
              {opt}
            </Typography>
          ))}
        </Stack>
      )}

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ border: '1px solid', borderColor: COLORS.surfaceBorder, borderRadius: 999 }}>
          <IconButton
            aria-label="הפחת כמות"
            onClick={() => updateQuantity(line.lineId, line.quantity - 1)}
            sx={{ color: COLORS.white, width: 40, height: 40 }}
          >
            <RemoveRoundedIcon fontSize="small" />
          </IconButton>
          <Typography sx={{ minWidth: 20, textAlign: 'center', fontWeight: 700 }}>{line.quantity}</Typography>
          <IconButton
            aria-label="הוסף כמות"
            onClick={() => updateQuantity(line.lineId, line.quantity + 1)}
            sx={{ color: COLORS.white, width: 40, height: 40 }}
          >
            <AddRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
        <Button
          onClick={() => removeLine(line.lineId)}
          startIcon={<DeleteOutlineRoundedIcon fontSize="small" />}
          size="small"
          sx={{ color: COLORS.textMuted, fontSize: '0.78rem', '& .MuiButton-startIcon': { ml: 0.4, mr: 0 } }}
        >
          הסר
        </Button>
      </Stack>
    </Stack>
  );
}

function CartStep() {
  const { items, totalPrice, goToCheckout, storeOpen } = useCart();

  if (items.length === 0) {
    return (
      <Stack alignItems="center" spacing={1.5} sx={{ py: 6, px: 2 }}>
        <ShoppingCartOutlinedIcon sx={{ fontSize: '2.4rem', color: COLORS.textMuted }} />
        <Typography sx={{ color: COLORS.textSecondary, textAlign: 'center' }}>העגלה שלכם ריקה</Typography>
        <Typography sx={{ color: COLORS.textMuted, fontSize: '0.8rem', textAlign: 'center' }}>
          הוסיפו מנות מהתפריט כדי להתחיל הזמנה
        </Typography>
      </Stack>
    );
  }

  return (
    <>
      <Box sx={{ px: 2.25, overflowY: 'auto', flex: 1 }}>
        {items.map((line, index) => (
          <Box key={line.lineId}>
            <CartLineRow line={line} />
            {index < items.length - 1 && <Divider sx={{ borderColor: COLORS.surfaceBorder }} />}
          </Box>
        ))}
      </Box>

      <Stack
        spacing={1.25}
        sx={{ p: 2.25, borderTop: '1px solid', borderColor: COLORS.surfaceBorder, bgcolor: COLORS.bgElevated }}
      >
        <DeliveryTimeNote />
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontWeight: 700, color: COLORS.white }}>סה״כ</Typography>
          <Typography sx={{ fontWeight: 900, fontSize: '1.3rem', color: COLORS.red }}>₪{totalPrice}</Typography>
        </Stack>
        <StoreClosedNotice />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={!storeOpen}
          onClick={goToCheckout}
          sx={{ minHeight: 52, fontSize: '1rem' }}
        >
          מעבר לפרטי הזמנה
        </Button>
      </Stack>
    </>
  );
}

function CheckoutStep() {
  const { totalPrice, backToCart, completeOrder, isSubmitting, storeOpen } = useCart();
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [fulfillment, setFulfillment] = React.useState<FulfillmentType>('pickup');
  const [address, setAddress] = React.useState('');
  const [city, setCity] = React.useState('');
  const [deliveryZone, setDeliveryZone] = React.useState<DeliveryZone>('nahariya');
  const [floorApartment, setFloorApartment] = React.useState('');
  const [courierNotes, setCourierNotes] = React.useState('');
  const [orderNotes, setOrderNotes] = React.useState('');
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const deliveryFee = getDeliveryFee(fulfillment, deliveryZone);
  const deliveryPending = isDeliveryFeePending(fulfillment, deliveryZone);
  const displayTotal = totalPrice + deliveryFee;

  const handleSubmit = () => {
    if (!storeOpen) return;
    const nextErrors: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) nextErrors.name = 'נא להזין שם מלא';
    if (!isValidPhone(phone)) nextErrors.phone = 'נא להזין מספר טלפון תקין';
    if (fulfillment === 'delivery' && !address.trim()) nextErrors.address = 'נא להזין כתובת למשלוח';
    if (fulfillment === 'delivery' && !deliveryZone) nextErrors.deliveryZone = 'נא לבחור אזור משלוח';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const customer: CustomerDetails = {
      name: name.trim(),
      phone: normalizePhone(phone),
      fulfillment,
      address: fulfillment === 'delivery' ? address.trim() : undefined,
      city: fulfillment === 'delivery' ? city.trim() || undefined : undefined,
      deliveryZone: fulfillment === 'delivery' ? deliveryZone : undefined,
      floorApartment: fulfillment === 'delivery' ? floorApartment.trim() || undefined : undefined,
      courierNotes: fulfillment === 'delivery' ? courierNotes.trim() || undefined : undefined,
      orderNotes: orderNotes.trim() || undefined,
    };

    const order = completeOrder(customer);
    const link = buildOrderWhatsAppLink(order);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Stack spacing={2} sx={{ px: 2.25, py: 2, overflowY: 'auto', flex: 1 }}>
        <TextField
          label="שם מלא"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
          size="small"
        />
        <TextField
          label="מספר טלפון"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={!!errors.phone}
          helperText={errors.phone}
          fullWidth
          size="small"
          type="tel"
          inputMode="tel"
        />

        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 0.5 }}>אופן קבלת ההזמנה</Typography>
          <RadioGroup
            row
            value={fulfillment}
            onChange={(e) => setFulfillment(e.target.value as FulfillmentType)}
          >
            <FormControlLabel value="pickup" control={<Radio />} label="איסוף עצמי" />
            <FormControlLabel value="delivery" control={<Radio />} label="משלוח" />
          </RadioGroup>
        </Box>

        {fulfillment === 'delivery' && (
          <Stack spacing={2}>
            <TextField
              label="כתובת"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={!!errors.address}
              helperText={errors.address}
              fullWidth
              size="small"
            />
            <TextField label="עיר" value={city} onChange={(e) => setCity(e.target.value)} fullWidth size="small" />

            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 0.5 }}>אזור משלוח</Typography>
              <RadioGroup value={deliveryZone} onChange={(e) => setDeliveryZone(e.target.value as DeliveryZone)}>
                <FormControlLabel value="nahariya" control={<Radio />} label={`נהריה (משלוח בתוך העיר) — ₪${NAHARIYA_DELIVERY_FEE}`} />
                <FormControlLabel value="other" control={<Radio />} label="עיר אחרת — המחיר ייקבע לפי מרחק" />
              </RadioGroup>
              {deliveryZone === 'other' && (
                <Alert severity="info" icon={false} sx={{ mt: 1, bgcolor: alpha(COLORS.white, 0.05), color: COLORS.textSecondary }}>
                  דמי המשלוח לעיר זו ייקבעו לפי מרחק/מיקום ויתואמו איתכם על ידי בית העסק. הסכום הסופי עשוי להשתנות בהתאם.
                </Alert>
              )}
            </Box>

            <TextField
              label="קומה / דירה (אופציונלי)"
              value={floorApartment}
              onChange={(e) => setFloorApartment(e.target.value)}
              fullWidth
              size="small"
            />
            <TextField
              label="הערות לשליח (אופציונלי)"
              value={courierNotes}
              onChange={(e) => setCourierNotes(e.target.value)}
              fullWidth
              size="small"
              multiline
              minRows={2}
            />
          </Stack>
        )}

        <TextField
          label="הערות להזמנה (אופציונלי)"
          value={orderNotes}
          onChange={(e) => setOrderNotes(e.target.value)}
          fullWidth
          size="small"
          multiline
          minRows={2}
        />

        <Alert severity="info" icon={false} sx={{ bgcolor: alpha(COLORS.white, 0.05), color: COLORS.textSecondary }}>
          <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: COLORS.white }}>אין צורך בתשלום באתר</Typography>
          <Typography sx={{ fontSize: '0.8rem', mt: 0.3 }}>
            לאחר שליחת ההזמנה, בית העסק יצור איתכם קשר לצורך אישור ההזמנה והסדרת התשלום.
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', mt: 0.3, fontWeight: 700, color: COLORS.white }}>
            ההזמנה תיחשב מאושרת רק לאחר קבלת אישור מבית העסק.
          </Typography>
        </Alert>
      </Stack>

      <Stack spacing={1} sx={{ p: 2.25, borderTop: '1px solid', borderColor: COLORS.surfaceBorder, bgcolor: COLORS.bgElevated }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontSize: '0.85rem', color: COLORS.textSecondary }}>מוצרים</Typography>
          <Typography sx={{ fontSize: '0.85rem', color: COLORS.textSecondary }}>₪{totalPrice}</Typography>
        </Stack>

        {fulfillment === 'delivery' && (
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontSize: '0.85rem', color: COLORS.textSecondary }}>משלוח</Typography>
            <Typography sx={{ fontSize: '0.85rem', color: COLORS.textSecondary }}>
              {deliveryPending ? 'יתואם לפי מרחק' : `₪${deliveryFee}`}
            </Typography>
          </Stack>
        )}

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontWeight: 700, color: COLORS.white }}>{deliveryPending ? 'סה״כ מוצרים' : 'סה״כ'}</Typography>
          <Typography sx={{ fontWeight: 900, fontSize: '1.2rem', color: COLORS.red }}>₪{displayTotal}</Typography>
        </Stack>
        {deliveryPending && (
          <Typography sx={{ fontSize: '0.74rem', color: COLORS.textMuted, textAlign: 'center' }}>
            לא כולל דמי משלוח — יתואמו איתכם בהתאם למרחק
          </Typography>
        )}

        <Typography sx={{ fontSize: '0.74rem', color: COLORS.textMuted, textAlign: 'center', lineHeight: 1.6 }}>
          בהמשך ושליחת ההזמנה אני מאשר/ת שקראתי את{' '}
          <Box
            component={RouterLink}
            to="/terms"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: COLORS.red, fontWeight: 700 }}
          >
            תנאי השימוש
          </Box>{' '}
          ואת{' '}
          <Box
            component={RouterLink}
            to="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: COLORS.red, fontWeight: 700 }}
          >
            מדיניות הפרטיות
          </Box>
          .
        </Typography>

        <DeliveryTimeNote />

        <StoreClosedNotice />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          startIcon={<WhatsAppIcon />}
          onClick={handleSubmit}
          disabled={isSubmitting || !storeOpen}
          sx={{ minHeight: 52, fontSize: '1rem', '& .MuiButton-startIcon': { ml: 0.8, mr: 0 } }}
        >
          שליחת ההזמנה ב-WhatsApp
        </Button>
        <Button onClick={backToCart} sx={{ color: COLORS.textMuted }}>
          חזרה לעגלה
        </Button>
      </Stack>
    </>
  );
}

function ConfirmationStep() {
  const { lastOrder, dismissConfirmation } = useCart();
  if (!lastOrder) return null;

  const reopenWhatsApp = () => {
    window.open(buildOrderWhatsAppLink(lastOrder), '_blank', 'noopener,noreferrer');
  };

  return (
    <Stack spacing={2} sx={{ px: 2.25, py: 3, overflowY: 'auto', flex: 1 }} alignItems="center" textAlign="center">
      <CheckCircleRoundedIcon sx={{ fontSize: '2.8rem', color: COLORS.red }} />
      <Typography sx={{ fontWeight: 800, fontSize: '1.15rem', color: COLORS.white }}>הזמנה #{lastOrder.orderNumber}</Typography>
      <Typography sx={{ color: COLORS.textSecondary }}>ההזמנה הוכנה לשליחה ב-WhatsApp</Typography>

      <Alert severity="warning" icon={false} sx={{ width: '100%', bgcolor: alpha(COLORS.red, 0.1), color: COLORS.white }}>
        ודאו שלחצתם על &quot;שליחה&quot; ב-WhatsApp כדי להעביר את ההזמנה לבית העסק.
      </Alert>

      <Typography sx={{ fontSize: '0.85rem', color: COLORS.textSecondary }}>
        לאחר קבלת ההזמנה, בית העסק יצור איתכם קשר לצורך אישור והסדרת התשלום.
        <br />
        <Box component="span" sx={{ fontWeight: 700, color: COLORS.white }}>
          ההזמנה תיחשב מאושרת רק לאחר קבלת אישור מבית העסק.
        </Box>
      </Typography>

      <Stack spacing={1} sx={{ width: '100%', pt: 1 }}>
        <Button variant="contained" color="primary" fullWidth size="large" startIcon={<WhatsAppIcon />} onClick={reopenWhatsApp} sx={{ minHeight: 52 }}>
          פתח שוב את WhatsApp
        </Button>
        <Button onClick={dismissConfirmation} sx={{ color: COLORS.textMuted }}>
          סגירה
        </Button>
      </Stack>
    </Stack>
  );
}

export function CartDrawer() {
  const { isCartOpen, closeCart, checkoutStep, totalItems } = useCart();

  const titles: Record<typeof checkoutStep, string> = {
    cart: 'ההזמנה שלי',
    checkout: 'פרטי הזמנה',
    confirmation: 'ההזמנה נשלחה',
  };

  return (
    <Drawer
      anchor="bottom"
      open={isCartOpen}
      onClose={closeCart}
      PaperProps={{
        sx: {
          bgcolor: COLORS.bg,
          color: COLORS.white,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          maxHeight: '88vh',
          display: 'flex',
        },
      }}
    >
      <Stack sx={{ height: '100%', maxHeight: '88vh' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2.25, py: 1.75, borderBottom: '1px solid', borderColor: COLORS.surfaceBorder }}>
          <Typography sx={{ fontWeight: 800, fontSize: '1.05rem' }}>
            {titles[checkoutStep]}
            {checkoutStep === 'cart' && totalItems > 0 && (
              <Box component="span" sx={{ color: COLORS.textMuted, fontWeight: 600, fontSize: '0.85rem' }}> · {totalItems} פריטים</Box>
            )}
          </Typography>
          <IconButton onClick={closeCart} aria-label="סגירת עגלה" sx={{ color: COLORS.white }}>
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        {checkoutStep === 'cart' && <CartStep />}
        {checkoutStep === 'checkout' && <CheckoutStep />}
        {checkoutStep === 'confirmation' && <ConfirmationStep />}
      </Stack>
    </Drawer>
  );
}

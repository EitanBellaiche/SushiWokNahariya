// @vitest-environment jsdom
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';
import { MemoryRouter } from 'react-router-dom';
import { theme } from '../theme';
import { CartProvider, useCart } from '../cart/CartContext';
import { DishDetailsProvider } from '../dishes/DishDetailsContext';
import { MenuRow } from './MenuSection';
import { CartDrawer } from './CartDrawer';
import { getDish } from '../dishes/catalog';
import { prepareOrder } from '../../server/orders';
import { PromoBundleDialog } from './PromoBundleDialog';
import { SushiBoxPickerDialog } from './SushiBoxPickerDialog';
import { BuildYourOwnDialog } from './BuildYourOwnDialog';

const status = vi.hoisted(() => ({ open: true }));
vi.mock('../hooks/useStoreStatus', () => ({ useStoreStatus: () => status.open ? { open: true } : { open: false, reopensLabel: 'מחר ב-11:00' } }));

function CartState() {
  const cart = useCart();
  return <><button onClick={cart.openCart}>פתיחת הסל לבדיקה</button><output data-testid="cart-state">{JSON.stringify(cart.items)}</output></>;
}
function harness(child?: React.ReactNode) {
  return render(<ThemeProvider theme={theme}><MemoryRouter><CartProvider><DishDetailsProvider>
    <MenuRow item={getDish('pad-thai')} />
    <MenuRow item={getDish('spicy-salmon')} />
    <CartState /><CartDrawer />{child}
  </DishDetailsProvider></CartProvider></MemoryRouter></ThemeProvider>);
}
async function choose(user: ReturnType<typeof userEvent.setup>, label: string, option: RegExp) {
  await user.click(screen.getByRole('combobox', { name: label }));
  await user.click(await screen.findByRole('option', { name: option }));
}
const items = () => JSON.parse(screen.getByTestId('cart-state').textContent!);

beforeEach(() => {
  status.open = true;
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  localStorage.clear();
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('dish dialog and checkout UI', () => {
  it('opens from the image, name and card; supports keyboard open/Escape and restores focus', async () => {
    harness();
    const user = userEvent.setup();
    await user.click(screen.getByRole('img', { name: /פאד תאי/ }));
    const opened = await screen.findByRole('dialog', { name: 'פאד תאי' });
    const labelId = opened.getAttribute('aria-labelledby');
    expect([...document.querySelectorAll('[id]')].filter((element) => element.id === labelId)).toHaveLength(1);
    expect(screen.getByText('מרכיבי המנה')).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'סגירת פרטי מנה' }));
    await waitFor(() => expect(screen.queryByRole('dialog', { name: 'פאד תאי' })).toBeNull());
    await user.click(screen.getByRole('heading', { name: 'פאד תאי' }));
    await screen.findByRole('dialog', { name: 'פאד תאי' });
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog', { name: 'פאד תאי' })).toBeNull());
    const card = screen.getByRole('button', { name: 'פרטים והתאמה: פאד תאי' });
    card.focus();
    await user.keyboard('{Enter}');
    await screen.findByRole('dialog', { name: 'פאד תאי' });
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog', { name: 'פאד תאי' })).toBeNull());
    expect(document.activeElement).toBe(card);
    expect(window.scrollTo).toHaveBeenLastCalledWith({ left: 0, top: 0, behavior: 'instant' });
  });
  it('updates the price live, saves notes/removals, and restores them when editing the cart line', async () => {
    harness();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'פרטים והתאמה: פאד תאי' }));
    await screen.findByRole('dialog', { name: 'פאד תאי' });
    await choose(user, 'בחירת תוספת (חובה)', /^עוף/);
    await user.click(screen.getByRole('checkbox', { name: 'ללא בצל ירוק' }));
    await user.type(screen.getByRole('textbox', { name: 'בקשות מיוחדות למנה' }), 'בלי חריף');
    await user.click(screen.getByRole('button', { name: 'הוסף כמות' }));
    await user.click(screen.getByRole('button', { name: /הוסף לסל.*₪112/ }));
    await waitFor(() => expect(items()).toHaveLength(1));
    const lineId = items()[0].lineId;
    await user.click(screen.getByRole('button', { name: 'פתיחת הסל לבדיקה' }));
    await user.click(await screen.findByRole('button', { name: 'עריכת פאד תאי' }));
    const dialog = await screen.findByRole('dialog', { name: 'פאד תאי' });
    expect((within(dialog).getByRole('textbox', { name: 'בקשות מיוחדות למנה' }) as HTMLTextAreaElement).value).toBe('בלי חריף');
    expect((within(dialog).getByRole('checkbox', { name: 'ללא בצל ירוק' }) as HTMLInputElement).checked).toBe(true);
    expect(within(dialog).getByRole('combobox', { name: 'בחירת תוספת (חובה)' }).textContent).toContain('עוף');
    await choose(user, 'בחירת תוספת (חובה)', /^בקר/);
    await user.click(screen.getByRole('button', { name: /שמירת השינויים.*₪122/ }));
    await waitFor(() => expect(items()[0].unitPrice).toBe(61));
    expect(items()[0]).toMatchObject({ lineId, quantity: 2, notes: 'בלי חריף', customization: { choice: 'בקר', removedIngredients: ['בצל ירוק'] } });
    expect(JSON.parse(localStorage.getItem('sushiwok:cart:v1')!)).toEqual(items());
  });
  it('validates required choices before adding and keeps unsaved edits out of the cart', async () => {
    harness();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'פרטים והתאמה: פאד תאי' }));
    await user.click(await screen.findByRole('button', { name: /הוסף לסל.*₪46/ }));
    expect(await screen.findByRole('alert')).toHaveProperty('textContent', 'נא לבחור תוספת');
    expect(items()).toHaveLength(0);
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    expect(items()).toHaveLength(0);
  });
  it('allows viewing details while closed and blocks adding', async () => {
    status.open = false;
    harness();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'פרטים והתאמה: ספייסי סלמון (8 יח׳)' }));
    await screen.findByRole('dialog', { name: 'ספייסי סלמון (8 יח׳)' });
    const add = screen.getByRole('button', { name: /הוסף לסל/ });
    expect((add as HTMLButtonElement).disabled).toBe(true);
    expect(items()).toHaveLength(0);
  });
  it('keeps distinct dish notes through the cart, server, confirmation and WhatsApp', async () => {
    const fetchMock = vi.fn(async (_url, init) => Response.json(prepareOrder(JSON.parse(init.body), new Date('2026-11-08T10:00:00Z'), 'SW-ui')));
    vi.stubGlobal('fetch', fetchMock);
    const target = { opener: {}, location: { href: '' }, close: vi.fn() };
    vi.spyOn(window, 'open').mockReturnValue(target as unknown as Window);
    harness();
    const user = userEvent.setup();
    for (const note of ['בלי מלפפון', 'לחתוך ל-10 יחידות']) {
      await user.click(screen.getByRole('button', { name: 'פרטים והתאמה: ספייסי סלמון (8 יח׳)' }));
      await user.type(await screen.findByRole('textbox', { name: 'בקשות מיוחדות למנה' }), note);
      await user.click(screen.getByRole('button', { name: /הוסף לסל.*₪52/ }));
      await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    }
    expect(items()).toHaveLength(2);
    await user.click(screen.getByRole('button', { name: 'פתיחת הסל לבדיקה' }));
    await user.click(await screen.findByRole('button', { name: 'מעבר לפרטי הזמנה' }));
    await user.type(screen.getByRole('textbox', { name: 'שם מלא' }), 'לקוח בדיקה');
    await user.type(screen.getByRole('textbox', { name: 'מספר טלפון' }), '0501234567');
    await user.click(screen.getByRole('button', { name: 'שליחת ההזמנה ב-WhatsApp' }));
    await screen.findByText('הזמנה #SW-ui');
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(items()).toHaveLength(0);
    const order = JSON.parse(localStorage.getItem('sushiwok:lastOrder:v1')!);
    expect(order.total).toBe(104);
    expect(order.items.map((line: { notes: string }) => line.notes)).toEqual(['בלי מלפפון', 'לחתוך ל-10 יחידות']);
    const message = new URL(target.location.href).searchParams.get('text');
    expect(message).toContain('בקשות מיוחדות למנה: בלי מלפפון');
    expect(message).toContain('בקשות מיוחדות למנה: לחתוך ל-10 יחידות');
    expect(screen.getByText('בקשות מיוחדות למנה: לחתוך ל-10 יחידות')).toBeTruthy();
  });
  it('keeps the cart and notes when server validation is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('offline')));
    const target = { opener: {}, location: { href: '' }, close: vi.fn() };
    vi.spyOn(window, 'open').mockReturnValue(target as unknown as Window);
    harness();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'פרטים והתאמה: ספייסי סלמון (8 יח׳)' }));
    await user.type(await screen.findByRole('textbox', { name: 'בקשות מיוחדות למנה' }), 'בלי חריף');
    await user.click(screen.getByRole('button', { name: /הוסף לסל.*₪52/ }));
    await user.click(screen.getByRole('button', { name: 'פתיחת הסל לבדיקה' }));
    await user.click(await screen.findByRole('button', { name: 'מעבר לפרטי הזמנה' }));
    await user.type(screen.getByRole('textbox', { name: 'שם מלא' }), 'לקוח בדיקה');
    await user.type(screen.getByRole('textbox', { name: 'מספר טלפון' }), '0501234567');
    await user.click(screen.getByRole('button', { name: 'שליחת ההזמנה ב-WhatsApp' }));
    await screen.findByText('לא ניתן לאמת את ההזמנה כרגע. הסל נשמר, נסו שוב.');
    expect(items()[0].notes).toBe('בלי חריף');
    expect(target.close).toHaveBeenCalledOnce();
    expect(localStorage.getItem('sushiwok:lastOrder:v1')).toBeNull();
  });
  it.each(['roll', 'box', 'promo'])('preserves the %s configurator and supports notes', async (kind) => {
    harness(kind === 'roll' ? <BuildYourOwnDialog open onClose={() => {}} initialType="מאקי" /> : kind === 'box' ? <SushiBoxPickerDialog open onClose={() => {}} /> : <PromoBundleDialog open onClose={() => {}} />);
    const user = userEvent.setup();
    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByRole('textbox', { name: 'בקשות מיוחדות למנה' })).toBeTruthy();
    if (kind === 'roll') {
      expect(within(dialog).getByRole('combobox', { name: 'סוג רול' }).textContent).toContain('מאקי');
      expect(within(dialog).queryByRole('checkbox', { name: 'אבוקדו' })).toBeNull();
      await choose(user, 'בסיס הרול', /^צמחוני/);
      await user.click(screen.getByRole('checkbox', { name: 'אבוקדו' }));
      expect((screen.getByRole('checkbox', { name: 'מלפפון' }) as HTMLInputElement).disabled).toBe(true);
      expect(screen.getByRole('button', { name: /הוסף לסל.*₪20/ })).toBeTruthy();
    } else if (kind === 'box') {
      for (const checkbox of within(dialog).getAllByRole('checkbox').slice(0, 5)) await user.click(checkbox);
      expect((within(dialog).getAllByRole('checkbox')[5] as HTMLInputElement).disabled).toBe(true);
      expect(screen.getByRole('button', { name: /הוסף לסל.*₪249/ })).toBeTruthy();
    } else {
      expect(within(dialog).getByRole('combobox', { name: 'תוספת חלבון' }).textContent).toContain('צמחוני');
      expect(within(dialog).getByRole('combobox', { name: 'סוג רול' }).textContent).toContain('I/O');
      expect(screen.getByRole('button', { name: /הוסף לסל.*₪69/ })).toBeTruthy();
    }
  });
});

import { Typography, Box } from '@mui/material';
import { LegalLayout } from './LegalLayout';
import { BUSINESS } from '../../data/business';

export function TermsPage() {
  return (
    <LegalLayout
      title="תנאי שימוש והזמנות"
      description={`תנאי השימוש וההזמנות של ${BUSINESS.name} — איך תהליך ההזמנה דרך WhatsApp עובד ומתי הזמנה נחשבת מאושרת.`}
    >
      <Typography>
        תנאים אלה חלים על השימוש באתר {BUSINESS.name} ועל תהליך יצירת הזמנה דרכו. שימוש באתר ובתהליך ההזמנה מהווה
        הסכמה לתנאים אלה.
      </Typography>

      <Typography component="h2">התפריט והמחירים</Typography>
      <Typography>
        התפריט, המחירים והזמינות המוצגים באתר מעודכנים ככל האפשר, אך עשויים להשתנות ללא הודעה מוקדמת, לרבות עקב
        זמינות מלאי או שינויי תפריט. תמונות המנות באתר הן להמחשה ועשויות להיות שונות במעט מהמנה בפועל.
      </Typography>

      <Typography component="h2">איך ההזמנה נוצרת ונשלחת</Typography>
      <Typography>
        האתר מאפשר לבנות הזמנה מהתפריט. בסיום התהליך, האתר יוצר עבורכם הודעת WhatsApp מסודרת הכוללת את פרטי ההזמנה
        ופרטי הקשר שהזנתם, ופותח את WhatsApp כדי שתוכלו לשלוח אותה לבית העסק.
      </Typography>
      <Typography>
        <strong>פתיחת WhatsApp בלבד אינה מהווה הוכחה לכך שההזמנה נשלחה.</strong> יש ללחוץ בפועל על &quot;שליחה&quot;
        בתוך WhatsApp כדי שההודעה תגיע לבית העסק. הזמנה שנוצרה באתר אך לא נשלחה בפועל ב-WhatsApp אינה מתקבלת ואינה
        ידועה לבית העסק.
      </Typography>
      <Typography>
        <strong>הזמנה תיחשב מאושרת רק לאחר קבלת אישור מפורש מבית העסק</strong>, בין אם בהודעה חוזרת ב-WhatsApp ובין אם
        בשיחת טלפון. יצירת ההזמנה באתר, כשלעצמה, אינה מהווה קיבול או אישור של ההזמנה על ידי בית העסק.
      </Typography>

      <Typography component="h2">תשלום</Typography>
      <Typography>
        אין צורך בתשלום באתר. לאחר שליחת ההזמנה, בית העסק יצור איתכם קשר לצורך אישור ההזמנה והסדרת התשלום. באתר אין
        סליקת כרטיסי אשראי ולא נאספים פרטי אמצעי תשלום כלשהם.
      </Typography>

      <Typography component="h2">יצירת קשר, שינויים וחוסרים</Typography>
      <Typography>
        בית העסק עשוי ליצור עמכם קשר, בטלפון או ב-WhatsApp, בנוגע להחלפות, מנה חסרה, תיאום משלוח, תיאום תשלום, או כל
        הבהרה אחרת הנדרשת לשם ביצוע ההזמנה כראוי.
      </Typography>

      <Typography component="h2">אחריות הלקוח לפרטים שנמסרו</Typography>
      <Typography>
        הלקוח אחראי להזין פרטי קשר, פרטי הזמנה וכתובת נכונים ומדויקים. אי-דיוק בפרטים עלול לעכב את ההזמנה או למנוע
        את ביצועה.
      </Typography>

      <Typography component="h2">טעויות סבירות</Typography>
      <Typography>
        במקרה של טעות סבירה במחיר או בתיאור מנה שהתגלתה בטרם אישור ההזמנה, בית העסק יפעל ליידע את הלקוח ולתאם עמו
        את המשך ההזמנה בהתאם.
      </Typography>

      <Typography component="h2">שינויים בתנאים</Typography>
      <Typography>
        תנאים אלה עשויים להתעדכן מעת לעת בהתאם לשינויים באתר או בתהליך ההזמנה.
      </Typography>

      <Typography component="h2">יצירת קשר</Typography>
      <Typography>
        לשאלות בנוגע לתנאים אלה ניתן לפנות בטלפון{' '}
        <Box component="a" href={`tel:${BUSINESS.phone}`}>
          {BUSINESS.phoneDisplay}
        </Box>{' '}
        או ב-WhatsApp.
      </Typography>
    </LegalLayout>
  );
}

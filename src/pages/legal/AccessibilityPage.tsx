import { Typography, Box } from '@mui/material';
import { LegalLayout } from './LegalLayout';
import { BUSINESS } from '../../data/business';

export function AccessibilityPage() {
  return (
    <LegalLayout
      title="הצהרת נגישות"
      description={`הצהרת הנגישות של ${BUSINESS.name} — מה יושם באתר וכיצד לדווח על בעיית נגישות.`}
    >
      <Typography>
        אנו פועלים להנגשת האתר ולאפשר חוויית שימוש נוחה ככל האפשר לכלל המשתמשים, לרבות משתמשים המסתייעים בטכנולוגיות
        מסייעות. האתר לא עבר עדיין ביקורת נגישות פורמלית חיצונית, ולכן איננו מצהירים על עמידה מלאה בתקן כלשהו — אלא
        מתארים בשקיפות את הצעדים שכבר יושמו.
      </Typography>

      <Typography component="h2">ניווט במקלדת</Typography>
      <Typography>
        האפשרויות המרכזיות באתר — כולל ניווט בתפריט, הוספת מנות להזמנה, פתיחת עגלת ההזמנה ומילוי פרטי הזמנה — ניתנות
        לתפעול גם באמצעות מקלדת בלבד, ללא צורך בעכבר או במסך מגע.
      </Typography>

      <Typography component="h2">מבנה סמנטי</Typography>
      <Typography>
        האתר בנוי מתוך אלמנטים סמנטיים (כותרות, ניווט, כפתורים, טפסים) כדי לאפשר לטכנולוגיות מסייעות, כגון קוראי מסך,
        להבין את מבנה הדף ולנווט בו בצורה הגיונית.
      </Typography>

      <Typography component="h2">ניגודיות וקריאוּת</Typography>
      <Typography>
        עיצוב האתר משתמש בטקסט בהיר על רקע כהה עם ניגודיות גבוהה, במטרה לשמור על טקסט קריא ככל הניתן, כולל במסכי
        מובייל ובתנאי תאורה משתנים.
      </Typography>

      <Typography component="h2">טפסים ותוויות</Typography>
      <Typography>
        שדות הטופס בתהליך ההזמנה (כגון שם מלא, טלפון, כתובת והערות) מסומנים בתוויות טקסט אמיתיות ולא רק בטקסט מרומז
        (placeholder), כך שניתן להבין כל שדה גם באמצעות קורא מסך.
      </Typography>

      <Typography component="h2">מצבי פוקוס</Typography>
      <Typography>
        אלמנטים אינטראקטיביים באתר מציגים מסגרת פוקוס נראית לעין בעת ניווט במקלדת, כדי לסייע להתמצא באתר מבלי
        להשתמש בעכבר.
      </Typography>

      <Typography component="h2">טקסט חלופי לתמונות</Typography>
      <Typography>
        לתמונות בעלות משמעות מידעית (כגון תמונות מנות) מוצג טקסט חלופי מתאים. תמונות עיטוריות בלבד, שאין להן תרומה
        מידעית נוספת מעבר לטקסט הסמוך להן, מסומנות ככאלה כך שקוראי מסך לא יקריאו אותן מיותר לצורך.
      </Typography>

      <Typography component="h2">שימוש במובייל</Typography>
      <Typography>
        האתר מיועד בראש ובראשונה לשימוש בטלפון נייד, עם אזורי לחיצה בגודל נוח ופריסה המתאימה את עצמה לגודל המסך.
      </Typography>

      <Typography component="h2">תנועה מופחתת</Typography>
      <Typography>
        משתמשים שהגדירו במכשיר שלהם העדפה להפחתת אנימציות (prefers-reduced-motion) יקבלו באתר גרסה עם פחות תנועה
        ומעברים.
      </Typography>

      <Typography component="h2">מגבלות ידועות</Typography>
      <Typography>
        האתר לא עבר עדיין ביקורת נגישות פורמלית על ידי גורם חיצוני מוסמך, וייתכנו בו חוסרים שטרם זוהו. אנו ממשיכים
        לעבוד על שיפור הנגישות באופן שוטף.
      </Typography>

      <Typography component="h2">פנייה בנושא נגישות</Typography>
      <Typography>
        אם נתקלתם בבעיה בנושא נגישות, נשמח לקבל פנייה ולנסות לסייע. ניתן לפנות בטלפון{' '}
        <Box component="a" href={`tel:${BUSINESS.phone}`}>
          {BUSINESS.phoneDisplay}
        </Box>{' '}
        או ב-WhatsApp.
      </Typography>
    </LegalLayout>
  );
}

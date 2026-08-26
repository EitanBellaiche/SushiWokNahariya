import { Typography, Box } from '@mui/material';
import { LegalLayout } from './LegalLayout';
import { BUSINESS } from '../../data/business';

export function CancellationsPage() {
  return (
    <LegalLayout
      title="מדיניות ביטולים ושינויים"
      description={`מדיניות הביטולים והשינויים של ${BUSINESS.name} להזמנות שנשלחות דרך האתר.`}
    >
      <Typography>
        אנו מבינים שלעיתים יש צורך לשנות או לבטל הזמנה. מכיוון שהמנות מוכנות טריות ולעיתים מותאמות אישית ללקוח,
        הפעולה הבטוחה והמהירה ביותר היא יצירת קשר ישיר עם בית העסק.
      </Typography>

      <Box
        sx={{
          border: '1px solid',
          borderColor: 'rgba(185, 28, 31, 0.5)',
          borderRadius: 2,
          p: 2,
          bgcolor: 'rgba(185, 28, 31, 0.08)',
        }}
      >
        <Typography sx={{ fontWeight: 700, color: '#f7f4ef' }}>
          לבקשת שינוי או ביטול, יש ליצור קשר עם בית העסק בהקדם האפשרי — בטלפון{' '}
          <Box component="a" href={`tel:${BUSINESS.phone}`} sx={{ color: 'inherit' }}>
            {BUSINESS.phoneDisplay}
          </Box>{' '}
          או ב-WhatsApp.
        </Typography>
      </Box>

      <Typography component="h2">מתי ניתן לבטל או לשנות</Typography>
      <Typography>
        ככל שההכנה של ההזמנה טרם החלה, בדרך כלל ניתן לבטל או לשנות אותה ללא בעיה. פנייה מוקדמת ככל האפשר מגדילה
        משמעותית את הסיכוי שהבקשה תיענה.
      </Typography>

      <Typography component="h2">לאחר שההכנה החלה</Typography>
      <Typography>
        לאחר שהכנת ההזמנה החלה, ייתכן שלא ניתן עוד לבטלה או לשנותה — בפרט כאשר מדובר במנות שהוכנו או הותאמו במיוחד
        עבור הלקוח, או במוצרים פריכים/מתכלים שאינם ניתנים להחזרה למלאי. במקרים כאלה בית העסק יעדכן את הלקוח לגבי
        האפשרויות הקיימות בפועל.
      </Typography>

      <Typography component="h2">החזרים כספיים</Typography>
      <Typography>
        מאחר שהתשלום אינו מתבצע באתר, כל נושא הקשור להחזר כספי או לתשלום ייבחן ויסודר ישירות מול בית העסק, בהתאם
        לנסיבות ההזמנה הספציפית ולהוראות הדין החל.
      </Typography>

      <Typography component="h2">יצירת קשר</Typography>
      <Typography>
        לכל בקשת ביטול, שינוי, או בירור לגבי הזמנה קיימת — ניתן לפנות בטלפון{' '}
        <Box component="a" href={`tel:${BUSINESS.phone}`}>
          {BUSINESS.phoneDisplay}
        </Box>{' '}
        או ב-WhatsApp, בהקדם האפשרי.
      </Typography>
    </LegalLayout>
  );
}

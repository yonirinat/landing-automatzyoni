import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';

const chatbotFlow = {
  WELCOME: {
    messages: [
      "היי! אני העוזר הדיגיטלי של יונתן. אני כאן כדי לעזור לך לגלות איך אוטומציה יכולה לשחרר לך זמן בעסק ולהקל עליך את החיים.",
      "כדי שיונתן יוכל להבין הכי טוב איך לעזור לך ואיך בדיוק אוטומציה יכולה להשתלב אצלך, יש לי כמה שאלות קצרות. זה ייקח רק כמה דקות :)"
    ],
    options: [
      { text: "בטח, בוא נתחיל!", nextBlock: "STEP_2_BUSINESS" },
      { text: "מה זה אוטומציה?", nextBlock: "EXPLAIN_AUTOMATION" },
      { text: "לא עכשיו, אולי אחר כך", nextBlock: "EXIT" }
    ]
  },
  EXPLAIN_AUTOMATION: {
    messages: [
      "בגדול, אוטומציה זה לגרום למחשב (או לתוכנות שאתה משתמש בהן) לעשות בשבילך פעולות שחוזרות על עצמן באופן אוטומטי. כמו שיש לך עוזר שעושה משימות שגרתיות, רק שהוא דיגיטלי, מהיר ומדויק :)"
    ],
    options: [
      { text: "בטח, בוא נתחיל!", nextBlock: "STEP_2_BUSINESS" },
      { text: "לא עכשיו, אולי אחר כך", nextBlock: "EXIT" }
    ]
  },
  EXIT: {
    messages: [
      "בסדר גמור. אם תרצה לחזור ולשוחח איתי מאוחר יותר, אני כאן. בהצלחה עם העסק!"
    ]
  },
  STEP_2_BUSINESS: {
    messages: [
      "באיזה תחום העסק שלך פועל?"
    ],
    options: [
      { text: "מסחר / חנות", value: "מסחר / חנות", nextBlock: "STEP_2_BUSINESS_SUBTYPE" },
      { text: "שירותים מקצועיים", value: "שירותים מקצועיים", nextBlock: "STEP_2_BUSINESS_SUBTYPE" },
      { text: "טיפולים / רפואה משלימה", value: "טיפולים / רפואה משלימה", nextBlock: "STEP_2_BUSINESS_SUBTYPE" },
      { text: "מזון / הסעדה", value: "מזון / הסעדה", nextBlock: "STEP_2_BUSINESS_SUBTYPE" },
      { text: "חינוך / הדרכה", value: "חינוך / הדרכה", nextBlock: "STEP_2_BUSINESS_SUBTYPE" },
      { text: "טכנולוגיה / תוכנה", value: "טכנולוגיה / תוכנה", nextBlock: "STEP_2_BUSINESS_SUBTYPE" },
      { text: "אחר", value: "אחר", nextBlock: "STEP_2_BUSINESS_OTHER" }
    ]
  },
  STEP_2_BUSINESS_OTHER: {
    messages: [
      "ספר לי בקצרה על העסק שלך. באיזה תחום אתה עוסק ומה אתה מציע ללקוחות?"
    ],
    input: {
      type: "text",
      variable: "business_description",
      nextBlock: "STEP_2_EMPLOYEES"
    }
  },
  STEP_2_BUSINESS_SUBTYPE: {
    messages: [
      "ספר לי קצת יותר על העסק שלך - במה אתה מתמחה?"
    ],
    input: {
      type: "text",
      variable: "business_specialty",
      nextBlock: "STEP_2_EMPLOYEES"
    }
  },
  STEP_2_EMPLOYEES: {
    messages: [
      "כמה אנשים עובדים בעסק (כולל אותך)?"
    ],
    options: [
      { text: "אני לבד", value: "אני לבד", nextBlock: "STEP_3_PAIN" },
      { text: "2-5 אנשים", value: "2-5", nextBlock: "STEP_3_PAIN" },
      { text: "6-15 אנשים", value: "6-15", nextBlock: "STEP_3_PAIN" },
      { text: "יותר מ-15 אנשים", value: "15+", nextBlock: "STEP_3_PAIN" }
    ]
  },
  STEP_3_PAIN: {
    messages: [
      "מהו הדבר שגוזל לך הכי הרבה זמן בעסק?"
    ],
    checkboxes: {
      options: [
        { text: "שיווק ופרסום", value: "שיווק ופרסום" },
        { text: "ניהול לקוחות", value: "ניהול לקוחות" },
        { text: "הנהלת חשבונות", value: "הנהלת חשבונות" },
        { text: "גביית תשלומים", value: "גביית תשלומים" },
        { text: "ניהול מלאי", value: "ניהול מלאי" },
        { text: "ניהול זמנים ותורים", value: "ניהול זמנים ותורים" },
        { text: "תקשורת עם לקוחות", value: "תקשורת עם לקוחות" }
      ],
      variable: "main_pain_areas",
      nextBlock: "STEP_4_CRM",
      includeOther: true
    }
  },
  STEP_3_PAIN_OTHER: {
    messages: [
      "ספר לי יותר על הדבר שגוזל לך הכי הרבה זמן או שגורם לך הכי הרבה כאב ראש בעסק היום"
    ],
    input: {
      type: "text",
      variable: "main_pain",
      nextBlock: "STEP_4_CRM"
    }
  },
  STEP_4_CRM: {
    messages: [
      "איך אתה מנהל את הלקוחות שלך כיום?"
    ],
    options: [
      { text: "בקובץ אקסל", value: "אקסל", nextBlock: "STEP_4_INVOICES" },
      { text: "בתוכנת CRM ייעודית", value: "CRM", nextBlock: "STEP_4_CRM_TYPE" },
      { text: "ברשימות ופתקים", value: "רשימות ופתקים", nextBlock: "STEP_4_INVOICES" },
      { text: "בלקוחות קבועים בטלפון", value: "טלפון וקשר אישי", nextBlock: "STEP_4_INVOICES" },
      { text: "וואטסאפ", value: "וואטסאפ", nextBlock: "STEP_4_INVOICES" },
      { text: "אחר", value: "אחר", nextBlock: "STEP_4_CRM_OTHER" }
    ]
  },
  STEP_4_CRM_OTHER: {
    messages: [
      "ספר לי איך אתה מנהל את הלקוחות שלך"
    ],
    input: {
      type: "text",
      variable: "crm_method",
      nextBlock: "STEP_4_INVOICES"
    }
  },
  STEP_4_CRM_TYPE: {
    messages: [
      "באיזו תוכנת CRM אתה משתמש?"
    ],
    options: [
      { text: "Salesforce", value: "Salesforce", nextBlock: "STEP_4_INVOICES" },
      { text: "HubSpot", value: "HubSpot", nextBlock: "STEP_4_INVOICES" },
      { text: "Monday", value: "Monday", nextBlock: "STEP_4_INVOICES" },
      { text: "ActiveTrail", value: "ActiveTrail", nextBlock: "STEP_4_INVOICES" },
      { text: "Priority", value: "Priority", nextBlock: "STEP_4_INVOICES" },
      { text: "Zoho CRM", value: "Zoho CRM", nextBlock: "STEP_4_INVOICES" },
      { text: "Fireberry", value: "Fireberry", nextBlock: "STEP_4_INVOICES" },
      { text: "Powerlink CRM", value: "Powerlink CRM", nextBlock: "STEP_4_INVOICES" },
      { text: "Pipedrive", value: "Pipedrive", nextBlock: "STEP_4_INVOICES" },
      { text: "אחר", value: "אחר", nextBlock: "STEP_4_CRM_TYPE_OTHER" }
    ]
  },
  STEP_4_CRM_TYPE_OTHER: {
    messages: [
      "באיזו תוכנת CRM אתה משתמש?"
    ],
    input: {
      type: "text",
      variable: "crm_software",
      nextBlock: "STEP_4_INVOICES"
    }
  },
  STEP_4_INVOICES: {
    messages: [
      "באיזו תוכנה אתה מוציא חשבוניות?"
    ],
    options: [
      { text: "חשבשבת", value: "חשבשבת", nextBlock: "STEP_4_SCHEDULING" },
      { text: "חשבונית ירוקה", value: "חשבונית ירוקה", nextBlock: "STEP_4_SCHEDULING" },
      { text: "EZCount", value: "EZCount", nextBlock: "STEP_4_SCHEDULING" },
      { text: "Invoice4U", value: "Invoice4U", nextBlock: "STEP_4_SCHEDULING" },
      { text: "iCount", value: "iCount", nextBlock: "STEP_4_SCHEDULING" },
      { text: "ריווחית", value: "ריווחית", nextBlock: "STEP_4_SCHEDULING" },
      { text: "פריוריטי זום", value: "פריוריטי זום", nextBlock: "STEP_4_SCHEDULING" },
      { text: "חשבונית אונליין", value: "חשבונית אונליין", nextBlock: "STEP_4_SCHEDULING" },
      { text: "רואה חשבון מטפל בזה", value: "רואה חשבון", nextBlock: "STEP_4_SCHEDULING" },
      { text: "אחר", value: "אחר", nextBlock: "STEP_4_INVOICES_OTHER" }
    ]
  },
  STEP_4_INVOICES_OTHER: {
    messages: [
      "באיזו תוכנה אתה מוציא חשבוניות?"
    ],
    input: {
      type: "text",
      variable: "invoice_software",
      nextBlock: "STEP_4_SCHEDULING"
    }
  },
  STEP_4_SCHEDULING: {
    messages: [
      "איך אתה מנהל את לוח הזמנים והפגישות שלך?"
    ],
    options: [
      { text: "יומן גוגל", value: "יומן גוגל", nextBlock: "STEP_4_MARKETING" },
      { text: "אאוטלוק / יומן מיקרוסופט", value: "אאוטלוק", nextBlock: "STEP_4_MARKETING" },
      { text: "מערכת תורים ייעודית", value: "מערכת תורים", nextBlock: "STEP_4_SCHEDULING_SYSTEM" },
      { text: "יומן פיזי / מחברת", value: "יומן פיזי", nextBlock: "STEP_4_MARKETING" },
      { text: "אחר", value: "אחר", nextBlock: "STEP_4_SCHEDULING_OTHER" }
    ]
  },
  STEP_4_SCHEDULING_SYSTEM: {
    messages: [
      "באיזו מערכת תורים אתה משתמש?"
    ],
    options: [
      { text: "Calendly", value: "Calendly", nextBlock: "STEP_4_MARKETING" },
      { text: "Setmore", value: "Setmore", nextBlock: "STEP_4_MARKETING" },
      { text: "Simply Book", value: "Simply Book", nextBlock: "STEP_4_MARKETING" },
      { text: "10bis / רסטי", value: "10bis / רסטי", nextBlock: "STEP_4_MARKETING" },
      { text: "SpotOn", value: "SpotOn", nextBlock: "STEP_4_MARKETING" },
      { text: "אחר", value: "אחר", nextBlock: "STEP_4_SCHEDULING_SYSTEM_OTHER" }
    ]
  },
  STEP_4_SCHEDULING_SYSTEM_OTHER: {
    messages: [
      "באיזו מערכת תורים אתה משתמש?"
    ],
    input: {
      type: "text",
      variable: "scheduling_system",
      nextBlock: "STEP_4_MARKETING"
    }
  },
  STEP_4_SCHEDULING_OTHER: {
    messages: [
      "איך אתה מנהל את לוח הזמנים והפגישות שלך?"
    ],
    input: {
      type: "text",
      variable: "scheduling_method",
      nextBlock: "STEP_4_MARKETING"
    }
  },
  STEP_4_MARKETING: {
    messages: [
      "באילו פלטפורמות אתה מפרסם את העסק?"
    ],
    checkboxes: {
      options: [
        { text: "פייסבוק", value: "פייסבוק" },
        { text: "אינסטגרם", value: "אינסטגרם" },
        { text: "גוגל (קידום אורגני/ממומן)", value: "גוגל" },
        { text: "לינקדאין", value: "לינקדאין" },
        { text: "טיקטוק", value: "טיקטוק" },
        { text: "דיוור במייל", value: "דיוור במייל" },
        { text: "וואטסאפ", value: "וואטסאפ" },
        { text: "אתר אינטרנט", value: "אתר אינטרנט" }
      ],
      variable: "marketing_platforms",
      nextBlock: "STEP_4_MARKETING_OTHER",
      includeOther: true
    }
  },
  STEP_4_MARKETING_OTHER: {
    messages: [
      "האם יש פלטפורמות פרסום נוספות שאתה משתמש בהן?"
    ],
    input: {
      type: "text",
      variable: "marketing_platforms_other",
      nextBlock: "STEP_4_WEBSITE"
    }
  },
  STEP_4_WEBSITE: {
    messages: [
      "האם יש לך אתר אינטרנט?"
    ],
    options: [
      { text: "כן", value: "כן", nextBlock: "STEP_4_WEBSITE_PLATFORM" },
      { text: "לא", value: "לא", nextBlock: "STEP_5_TASKS" }
    ]
  },
  STEP_4_WEBSITE_PLATFORM: {
    messages: [
      "באיזו פלטפורמה האתר שלך נבנה?"
    ],
    options: [
      { text: "WordPress", value: "WordPress", nextBlock: "STEP_4_WEBSITE_URL" },
      { text: "Wix", value: "Wix", nextBlock: "STEP_4_WEBSITE_URL" },
      { text: "רב מסר", value: "רב מסר", nextBlock: "STEP_4_WEBSITE_URL" },
      { text: "Shopify", value: "Shopify", nextBlock: "STEP_4_WEBSITE_URL" },
      { text: "אחר", value: "אחר", nextBlock: "STEP_4_WEBSITE_PLATFORM_OTHER" }
    ]
  },
  STEP_4_WEBSITE_PLATFORM_OTHER: {
    messages: [
      "באיזו פלטפורמה האתר שלך נבנה?"
    ],
    input: {
      type: "text",
      variable: "website_platform",
      nextBlock: "STEP_4_WEBSITE_URL"
    }
  },
  STEP_4_WEBSITE_URL: {
    messages: [
      "מה כתובת האתר שלך? (אם אינך רוצה לשתף כרגע, ניתן לכתוב 'לא עכשיו')"
    ],
    input: {
      type: "text",
      variable: "website_url",
      nextBlock: "STEP_5_TASKS"
    }
  },
  STEP_5_TASKS: {
    messages: [
      "באילו תחומים אתה מרגיש שאתה מבזבז הכי הרבה זמן על משימות שחוזרות על עצמן?"
    ],
    checkboxes: {
      options: [
        { text: "מענה ללקוחות", value: "מענה ללקוחות" },
        { text: "תזכורות ומעקב", value: "תזכורות ומעקב" },
        { text: "הוצאת הצעות מחיר", value: "הוצאת הצעות מחיר" },
        { text: "הוצאת חשבוניות", value: "הוצאת חשבוניות" },
        { text: "קביעת פגישות", value: "קביעת פגישות" },
        { text: "עדכון מלאי", value: "עדכון מלאי" },
        { text: "דיווחים וסטטיסטיקות", value: "דיווחים וסטטיסטיקות" },
        { text: "הזנת נתונים", value: "הזנת נתונים" }
      ],
      variable: "repetitive_tasks",
      nextBlock: "STEP_5_TASKS_OTHER",
      includeOther: true
    }
  },
  STEP_5_TASKS_OTHER: {
    messages: [
      "האם יש תחומים נוספים שגוזלים ממך זמן רב?"
    ],
    input: {
      type: "text",
      variable: "repetitive_tasks_other",
      nextBlock: "STEP_5_VOLUME"
    }
  },
  STEP_5_VOLUME: {
    messages: [
      "כמה פעולות חוזרות כאלה אתה מבצע בחודש בערך?"
    ],
    options: [
      { text: "פחות מ-10", value: "Less than 10", nextBlock: "STEP_6_RESULTS" },
      { text: "10-50", value: "10-50", nextBlock: "STEP_6_RESULTS" },
      { text: "50-100", value: "50-100", nextBlock: "STEP_6_RESULTS" },
      { text: "100-500", value: "100-500", nextBlock: "STEP_6_RESULTS" },
      { text: "יותר מ-500", value: "More than 500", nextBlock: "STEP_6_RESULTS" }
    ]
  },
  STEP_6_RESULTS: {
    messages: [
      "מה הכי חשוב לך להשיג באמצעות שיפור התהליכים והאוטומציה?"
    ],
    checkboxes: {
      options: [
        { text: "לחסוך זמן", value: "לחסוך זמן" },
        { text: "להגדיל הכנסות", value: "להגדיל הכנסות" },
        { text: "לשפר את השירות ללקוחות", value: "לשפר את השירות ללקוחות" },
        { text: "להקטין טעויות אנוש", value: "להקטין טעויות אנוש" },
        { text: "לשפר את המעקב והבקרה", value: "לשפר את המעקב והבקרה" },
        { text: "להתפנות לדברים אחרים", value: "להתפנות לדברים אחרים" }
      ],
      variable: "desired_outcomes",
      nextBlock: "STEP_6_DESIRED_OUTCOME",
      includeOther: true
    }
  },
  STEP_6_DESIRED_OUTCOME_OTHER: {
    messages: [
      "ספר לי מה הכי חשוב לך להשיג"
    ],
    input: {
      type: "text",
      variable: "desired_outcome",
      nextBlock: "STEP_6_DESIRED_OUTCOME"
    }
  },
  STEP_6_DESIRED_OUTCOME: {
    messages: [
      "מה החזון שלך לעסק כשהכל ירוץ באופן חלק יותר?"
    ],
    input: {
      type: "text",
      variable: "business_vision",
      nextBlock: "STEP_7_BUDGET"
    }
  },
  STEP_7_BUDGET: {
    messages: [
      "מה התקציב שאתה מוכן להשקיע בשיפור התהליכים בעסק?"
    ],
    options: [
      { text: "עד 1,000 ₪", value: "עד 1,000 ₪", nextBlock: "STEP_7_CONTACT" },
      { text: "1,000-5,000 ₪", value: "1,000-5,000 ₪", nextBlock: "STEP_7_CONTACT" },
      { text: "5,000-15,000 ₪", value: "5,000-15,000 ₪", nextBlock: "STEP_7_CONTACT" },
      { text: "יותר מ-15,000 ₪", value: "יותר מ-15,000 ₪", nextBlock: "STEP_7_CONTACT" },
      { text: "תלוי בהצעה", value: "תלוי בהצעה", nextBlock: "STEP_7_CONTACT" }
    ]
  },
  STEP_7_CONTACT: {
    messages: [
      "מה השם המלא שלך?"
    ],
    input: {
      type: "text",
      variable: "full_name",
      validation: {
        pattern: "^[\\u0590-\\u05FF\\s]{2,50}$|^[a-zA-Z\\s]{2,50}$",
        errorMessage: "נא להזין שם מלא תקין (2-50 תווים)"
      },
      nextBlock: "STEP_7_PHONE"
    }
  },
  STEP_7_PHONE: {
    messages: [
      "כדי שנוכל לחזור אליך עם הצעה שתסדר לך את העסק, נשמח לקבל את המספר הטלפון שלך"
    ],
    input: {
      type: "text",
      variable: "phone",
      validation: {
        pattern: "^0[2-9]\\d{7,8}$",
        errorMessage: "נא להזין מספר טלפון ישראלי תקין (לדוגמה: 0501234567)"
      },
      nextBlock: "STEP_7_SUMMARY"
    }
  },
  STEP_7_SUMMARY: {
    messages: [
      "האם תרצה לקבל סיכום של השיחה לכתובת האימייל שלך?"
    ],
    options: [
      { text: "כן, אשמח לקבל סיכום", value: "Yes", nextBlock: "STEP_7_EMAIL" },
      { text: "לא, תודה", value: "No", nextBlock: "STEP_7_FINAL" }
    ]
  },
  STEP_7_EMAIL: {
    messages: [
      "ומה כתובת האימייל שלך?"
    ],
    input: {
      type: "text",
      variable: "email",
      validation: {
        pattern: "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$",
        errorMessage: "נא להזין כתובת אימייל תקינה"
      },
      nextBlock: "STEP_7_FINAL"
    }
  },
  STEP_7_FINAL: {
    messages: [
      "יש עוד משהו שתרצה להוסיף?"
    ],
    input: {
      type: "text",
      variable: "final_note",
      nextBlock: "STEP_7_END"
    }
  },
  STEP_7_END: {
    messages: [
      "תודה רבה על הזמן והמידע! יונתן יעבור על הפרטים שלך ויחזור אליך בהקדם האפשרי כדי לדבר על איך אוטומציה יכולה לעזור לעסק שלך לצמוח ולחסוך לך זמן.",
      "בינתיים, אתה מוזמן לקרוא עוד תוכן מעניין בבלוג שלנו או להתנסות בכלים החינמיים שלנו באתר [link]לבדיקת העסק(/tools)[/link]."
    ]
  }
};

const MessageBubble = ({ message, isBot, delay = 0, onAnimationComplete }) => {
  const [visible, setVisible] = useState(false);
  const [typing, setTyping] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      if (isBot) {
        let i = 0;
        const speed = 15;
        const typeWriter = setInterval(() => {
          if (i < message.length) {
            setDisplayedText(message.substring(0, i + 1));
            i++;
          } else {
            clearInterval(typeWriter);
            setTyping(false);
          }
        }, speed);
        return () => clearInterval(typeWriter);
      } else {
        setDisplayedText(message);
        setTyping(false);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [message, isBot, delay]);
  
  if (!visible) return null;

  // בדיקה אם ההודעה מכילה [link] syntax
  const hasLink = message.includes('[link]') && message.includes('[/link]');
  
  const renderTextWithLinks = () => {
    if (!hasLink) return displayedText;

    // פיצול הטקסט וייצור אלמנטים עם לינקים
    const parts = [];
    let currentText = displayedText;
    let linkStartIndex, linkEndIndex, urlStartIndex, urlEndIndex;

    while (
      (linkStartIndex = currentText.indexOf('[link]')) !== -1 &&
      (linkEndIndex = currentText.indexOf('[/link]')) !== -1 &&
      (urlStartIndex = currentText.indexOf('(')) !== -1 &&
      (urlEndIndex = currentText.indexOf(')')) !== -1 &&
      urlStartIndex < urlEndIndex &&
      linkStartIndex < urlStartIndex &&
      urlEndIndex < linkEndIndex
    ) {
      // טקסט לפני הלינק
      if (linkStartIndex > 0) {
        parts.push(currentText.substring(0, linkStartIndex));
      }

      const linkText = currentText.substring(linkStartIndex + 6, urlStartIndex);
      const url = currentText.substring(urlStartIndex + 1, urlEndIndex);

      // הוספת הלינק עצמו
      parts.push(
        <a 
          key={parts.length} 
          href={url} 
          className="text-[#1E5FA8] hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkText}
        </a>
      );

      // המשך לחלק הבא של הטקסט
      currentText = currentText.substring(linkEndIndex + 7);
    }

    // הוספת שארית הטקסט אם קיימת
    if (currentText) {
      parts.push(currentText);
    }

    return parts;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={onAnimationComplete}
      className={`max-w-[80%] rounded-lg py-2 px-4 mb-3 flex-shrink-0 ${
        isBot
          ? 'bg-white text-gray-800 self-start'
          : 'bg-[#1E5FA8] text-white self-end'
      }`}
    >
      <div>
        {isBot && typing ? displayedText + '|' : (
          hasLink ? renderTextWithLinks() : displayedText
        )}
        {isBot && typing && <span className="animate-pulse">|</span>}
      </div>
    </motion.div>
  );
};

MessageBubble.propTypes = {
  message: PropTypes.string.isRequired,
  isBot: PropTypes.bool.isRequired,
  delay: PropTypes.number,
  onAnimationComplete: PropTypes.func
};

MessageBubble.defaultProps = {
  delay: 0,
  onAnimationComplete: () => {}
};

const CheckboxGroup = ({ options, onSubmit, includeOther = false }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [otherValue, setOtherValue] = useState('');
  const [otherSelected, setOtherSelected] = useState(false);

  const handleCheckboxChange = (value) => {
    if (value === 'other') {
      setOtherSelected(!otherSelected);
      return;
    }

    setSelectedOptions(prev => {
      if (prev.includes(value)) {
        return prev.filter(opt => opt !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleSubmit = () => {
    const results = [...selectedOptions];
    if (otherSelected && otherValue.trim()) {
      results.push(otherValue.trim());
    }
    onSubmit(results);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-2">
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
            <Checkbox 
              id={`checkbox-${index}`} 
              checked={selectedOptions.includes(option.value)}
              onCheckedChange={() => handleCheckboxChange(option.value)}
              className="h-5 w-5"
            />
            <Label htmlFor={`checkbox-${index}`} className="text-gray-800">
              {option.text}
            </Label>
          </div>
        ))}
        
        {includeOther && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox 
                id="checkbox-other" 
                checked={otherSelected}
                onCheckedChange={() => handleCheckboxChange('other')}
                className="h-5 w-5"
              />
              <Label htmlFor="checkbox-other" className="text-gray-800">
                אחר
              </Label>
            </div>
            
            {otherSelected && (
              <input
                type="text"
                value={otherValue}
                onChange={(e) => setOtherValue(e.target.value)}
                placeholder="נא לפרט..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            )}
          </div>
        )}
      </div>
      
      <Button 
        onClick={handleSubmit}
        disabled={selectedOptions.length === 0 && !otherSelected}
        className="w-full bg-[#1E5FA8]"
      >
        שלח
      </Button>
    </div>
  );
};

CheckboxGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  includeOther: PropTypes.bool
};

export default function Chatbot({ isOpen, onClose }) {
  const [currentBlock, setCurrentBlock] = useState('WELCOME');
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);
  const [isUserScrolledUp, setIsUserScrolledUp] = useState(false);
  const [webhookSent, setWebhookSent] = useState(false);
  
  const currentBlockInfo = chatbotFlow[currentBlock];
  const hasOptions = currentBlockInfo && currentBlockInfo.options;
  const hasInput = currentBlockInfo && currentBlockInfo.input;
  const hasCheckboxes = currentBlockInfo && currentBlockInfo.checkboxes;
  const isEndBlock = currentBlock === 'STEP_7_END' || currentBlock === 'EXIT';

  const sendToMakeWebhook = async () => {
    try {
      console.log('מתחיל שליחה ל-Webhook...');
      setLoading(true);
      const webhookUrl = 'https://automatzyoni.app.n8n.cloud/webhook/a0193da1-8ffa-414e-a634-3d6293568b99';
      
      // מיפוי הכלים שבשימוש העסק
      const toolsMapping = {
        crm: responses.STEP_4_CRM_TYPE || responses.crm_software || responses.crm_method,
        invoices: responses.STEP_4_INVOICES || responses.invoice_software,
        scheduling: responses.STEP_4_SCHEDULING || responses.scheduling_system || responses.scheduling_method,
        marketing: responses.marketing_platforms,
        website: responses.website_platform
      };
      
      const payload = {
        name: responses.full_name || 'לא צוין',
        phone: responses.phone || 'לא צוין',
        email: responses.email || 'לא צוין',
        business_description: responses.business_specialty || responses.business_description || 'לא צוין',
        employees: responses.STEP_2_EMPLOYEES || 'לא צוין',
        main_pain: responses.main_pain_areas || responses.main_pain || 'לא צוין',
        task_areas: responses.repetitive_tasks || responses.repetitive_tasks_other || 'לא צוין',
        current_tools: JSON.stringify(toolsMapping) || 'לא צוין',
        volume: responses.STEP_5_VOLUME || 'לא צוין',
        desired_outcome: responses.desired_outcomes || responses.business_vision || responses.desired_outcome || 'לא צוין',
        want_summary: responses.STEP_7_SUMMARY || 'לא',
        final_note: responses.final_note || '',
        full_conversation: JSON.stringify(conversation)
      };
      
      console.log('נתונים שנשלחים:', payload);
      
      // שימוש ישיר ב-XMLHttpRequest במקום fetch
      const xhr = new XMLHttpRequest();
      xhr.open('POST', webhookUrl, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          console.log('תגובה מה-Webhook:', xhr.status, xhr.responseText);
          if (xhr.status >= 200 && xhr.status < 300) {
            console.log('שליחה הצליחה!');
            setWebhookSent(true);
          } else {
            console.log('שגיאה בשליחה:', xhr.responseText);
          }
        }
      };
      xhr.send(JSON.stringify(payload));
    } catch (error) {
      console.error('שגיאה בשליחת נתוני השיחה:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = (force = false) => {
    const el = chatContainerRef.current;
    if (!el) return;
    if (force || !isUserScrolledUp) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    const el = chatContainerRef.current;
    if (!el) return;
    const threshold = 50;
    const position = el.scrollTop + el.clientHeight;
    setIsUserScrolledUp(el.scrollHeight - position > threshold);
  };

  const resetChat = () => {
    setCurrentBlock('WELCOME');
    setConversation([]);
    setUserInput('');
    setResponses({});
    setError(null);
    setWebhookSent(false);
  };

  const handleClose = () => {
    resetChat();
    onClose();
  };

  useEffect(() => {
    if (isOpen && chatbotFlow[currentBlock]) {
      const messages = chatbotFlow[currentBlock].messages;
      messages.forEach((msg, idx) => {
        setTimeout(() => {
          setConversation(prev => [...prev, { text: msg, isBot: true }]);
        }, idx * 800);
      });
      
      if (currentBlock === 'STEP_7_END' && !webhookSent) {
        console.log('הגענו לסוף השיחה, שולחים נתונים ל-Webhook...');
        setTimeout(() => {
          sendToMakeWebhook();
        }, messages.length * 800 + 500);
      }
    }
  }, [currentBlock, isOpen, webhookSent]);

  useEffect(() => {
    scrollToBottom();
  }, [conversation, hasOptions, hasInput]);

  // Auto-grow textarea on input change
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = `${ta.scrollHeight}px`;
      scrollToBottom();
    }
  }, [userInput]);

  const handleOptionSelect = (option) => {
    setConversation(prev => [...prev, { text: option.text, isBot: false }]);
    if (option.value) {
      setResponses(prev => ({ ...prev, [currentBlock]: option.value }));
    }
    setError(null);
    setTimeout(() => setCurrentBlock(option.nextBlock), 500);
  };

  const validateInput = (input, validation) => {
    if (!validation) return true;
    const regex = new RegExp(validation.pattern);
    return regex.test(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleInputSubmit(e);
    }
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    const blockInfo = chatbotFlow[currentBlock];
    if (blockInfo.input?.validation) {
      const valid = validateInput(userInput, blockInfo.input.validation);
      if (!valid) {
        setError(blockInfo.input.validation.errorMessage);
        return;
      }
    }
    setConversation(prev => [...prev, { text: userInput, isBot: false }]);
    setResponses(prev => ({ ...prev, [blockInfo.input.variable]: userInput }));
    setUserInput('');
    setError(null);
    setTimeout(() => setCurrentBlock(blockInfo.input.nextBlock), 500);
  };

  const handleCheckboxSubmit = (selected) => {
    const blockInfo = chatbotFlow[currentBlock];
    const displayText = selected.join(', ');
    
    setConversation(prev => [...prev, { text: displayText, isBot: false }]);
    setResponses(prev => ({ ...prev, [blockInfo.checkboxes.variable]: selected }));
    setTimeout(() => setCurrentBlock(blockInfo.checkboxes.nextBlock), 500);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="chat-container bg-gray-100 rounded-xl shadow-2xl w-full max-w-md h-[80vh] flex flex-col overflow-hidden"
      >
        {/* Chat Header */}
        <header className="chat-header bg-[#1E5FA8] text-white p-4 flex justify-between items-center flex-shrink-0">
          <h3 className="font-bold text-lg">העוזר האוטומטי של יונתן</h3>
          <button onClick={handleClose} className="text-white hover:text-gray-200">
            <X size={20} />
          </button>
        </header>

        {/* Chat Body */}
        <section
          ref={chatContainerRef}
          onScroll={handleScroll}
          className="chat-body flex-1 overflow-y-auto p-4 flex flex-col pb-36"
        >
          <AnimatePresence>
            {conversation.map((msg, idx) => (
              <MessageBubble
                key={idx}
                message={msg.text}
                isBot={msg.isBot}
                onAnimationComplete={scrollToBottom}
              />
            ))}
          </AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white self-start rounded-lg py-2 px-4 mb-3 flex-shrink-0"
            >
              <Loader2 className="w-5 h-5 animate-spin" />
            </motion.div>
          )}
        </section>

        {/* Chat Input */}
        <footer className="chat-input flex-shrink-0 p-4 border-t border-gray-200 bg-white">
          {hasOptions && (
            <div className="grid grid-cols-1 gap-2">
              {currentBlockInfo.options.map((opt, i) => (
                <Button
                  key={i}
                  onClick={() => handleOptionSelect(opt)}
                  className="w-full justify-start bg-gray-100 hover:bg-gray-200 text-gray-800"
                  variant="outline"
                >
                  {opt.text}
                </Button>
              ))}
            </div>
          )}

          {hasInput && (
            <form onSubmit={handleInputSubmit} className="space-y-2">
              <div className="flex gap-2">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={userInput}
                  onChange={e => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="הקלד את תשובתך כאן..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E5FA8] resize-none overflow-y-auto min-h-8 max-h-32"
                  disabled={loading}
                  autoFocus
                />
                <Button
                  type="submit"
                  disabled={loading || !userInput.trim()}
                  className="bg-[#1E5FA8] flex-shrink-0"
                >
                  <Send size={18} />
                </Button>
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {error}
                </motion.div>
              )}
            </form>
          )}

          {hasCheckboxes && (
            <CheckboxGroup 
              options={currentBlockInfo.checkboxes.options}
              onSubmit={handleCheckboxSubmit}
              includeOther={currentBlockInfo.checkboxes.includeOther}
            />
          )}

          {isEndBlock && (
            <Button onClick={handleClose} className="w-full mt-2 bg-[#1E5FA8]">
              סגור
            </Button>
          )}
        </footer>
      </motion.div>
    </motion.div>
  );
}

Chatbot.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
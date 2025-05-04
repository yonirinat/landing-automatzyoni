export function createPageUrl(pageName) {
  return '/' + pageName.toLowerCase().replace(/ /g, '-');
} 

/**
 * פונקציה שממירה מזהה כתבה או טקסט עברי לסלאג לטיני לשימוש ב-URL
 * @param {string} text - טקסט עברי או מזהה קובץ
 * @returns {string} - סלאג באנגלית לשימוש ב-URL
 */
export function toSeoFriendlySlug(text) {
  // אם זה כבר נראה כמו סלאג, נשתמש בו כמו שהוא
  if (/^[a-z0-9-]+$/.test(text)) {
    return text;
  }
  
  // טבלת המרה בסיסית מעברית לאותיות לטיניות
  const hebrewToLatinMap = {
    'א': 'a', 'ב': 'b', 'ג': 'g', 'ד': 'd', 'ה': 'h', 'ו': 'v',
    'ז': 'z', 'ח': 'ch', 'ט': 't', 'י': 'y', 'כ': 'k', 'ל': 'l',
    'מ': 'm', 'נ': 'n', 'ס': 's', 'ע': 'a', 'פ': 'p', 'צ': 'ts',
    'ק': 'k', 'ר': 'r', 'ש': 'sh', 'ת': 't',
    // סופיות
    'ך': 'k', 'ם': 'm', 'ן': 'n', 'ף': 'f', 'ץ': 'ts'
  };
  
  // המרה לאותיות לטיניות
  let latinized = text.split('').map(char => {
    return hebrewToLatinMap[char] || char;
  }).join('');
  
  // ניקוי והמרה לפורמט סלאג
  return latinized
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // מסיר תווים מיוחדים
    .replace(/\s+/g, '-')     // מחליף רווחים ב-
    .replace(/-+/g, '-')      // מונע כפילויות של -
    .replace(/^-+|-+$/g, ''); // מסיר - בהתחלה ובסוף
} 
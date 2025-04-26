// scripts/md2json.js
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import matter from 'gray-matter';
import slugify from 'slugify';
import process from 'node:process';
import path from 'path';

const [,, mdPath] = process.argv;
if (!mdPath) {
  console.error('❌  יש לציין קובץ .md כארגומנט');
  process.exit(1);
}

console.log(`🔍 ניסיון לקרוא קובץ מנתיב: ${mdPath}`);
let raw;
try {
  raw = readFileSync(mdPath, 'utf8');
  console.log(`✅ קובץ נקרא בהצלחה`);
  console.log(`📝 תוכן הקובץ (50 תווים ראשונים): ${raw.substring(0, 50)}`);
} catch (error) {
  console.error(`❌ שגיאה בקריאת הקובץ: ${error.message}`);
  process.exit(1);
}

let data, content;
try {
  const result = matter(raw);
  data = result.data;
  content = result.content;
  console.log(`✅ נתוני Front Matter נקראו: `, data);
} catch (error) {
  console.error(`❌ שגיאה בעיבוד Front Matter: ${error.message}`);
  process.exit(1);
}

const required = ['title','description','image','date','readTime','category','tags'];
for (const f of required) {
  if (!data[f]) {
    console.error(`❌ חסר שדה ${f} ב-front-matter. ערכים שנמצאו:`, Object.keys(data));
    process.exit(1);
  }
}

// המר מארקדאון ל-HTML ושמור כמחרוזת עם תגיות HTML
let htmlContent = '';
const lines = content.split('\n');

// פונקציה עזר להמרת טקסט עם עיצוב מארקדאון לHTML
function processInlineMarkdown(text) {
  // המרת טקסט מודגש
  let processedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // המרת טקסט מוטה
  processedText = processedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // המרת קישורים
  processedText = processedText.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  return processedText;
}

let inList = false;
let listType = '';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  if (line.startsWith('## ')) {
    // כותרת רמה 2
    if (inList) {
      htmlContent += `</${listType}>\n`;
      inList = false;
    }
    htmlContent += `<h2>${processInlineMarkdown(line.substring(3))}</h2>\n`;
  } else if (line.startsWith('### ')) {
    // כותרת רמה 3
    if (inList) {
      htmlContent += `</${listType}>\n`;
      inList = false;
    }
    htmlContent += `<h3>${processInlineMarkdown(line.substring(4))}</h3>\n`;
  } else if (line.startsWith('- ')) {
    // רשימה לא ממוספרת
    if (!inList || listType !== 'ul') {
      if (inList) {
        htmlContent += `</${listType}>\n`;
      }
      htmlContent += '<ul>\n';
      inList = true;
      listType = 'ul';
    }
    htmlContent += `<li>${processInlineMarkdown(line.substring(2))}</li>\n`;
  } else if (/^\d+\.\s/.test(line)) {
    // רשימה ממוספרת
    if (!inList || listType !== 'ol') {
      if (inList) {
        htmlContent += `</${listType}>\n`;
      }
      htmlContent += '<ol>\n';
      inList = true;
      listType = 'ol';
    }
    const itemText = line.substring(line.indexOf(' ') + 1);
    htmlContent += `<li>${processInlineMarkdown(itemText)}</li>\n`;
  } else if (line.startsWith('**') && line.endsWith('**') && !line.includes(' ')) {
    // טקסט מודגש בשורה משלו
    if (inList) {
      htmlContent += `</${listType}>\n`;
      inList = false;
    }
    htmlContent += `<strong>${line.substring(2, line.length - 2)}</strong>\n`;
  } else if (line.length > 0) {
    // פסקה רגילה
    if (inList) {
      htmlContent += `</${listType}>\n`;
      inList = false;
    }
    htmlContent += `<p>${processInlineMarkdown(line)}</p>\n`;
  }
}

// סגור רשימה פתוחה אם נשארה
if (inList) {
  htmlContent += `</${listType}>\n`;
}

// הסר ID או השתמש בשם הקובץ כ-ID
const fileName = path.basename(mdPath, '.md');
// אם השם מתחיל בספרה, נוכל להסיק מספר ID מהספרות הראשונות
const idMatch = fileName.match(/^(\d+)/);
const id = idMatch ? parseInt(idMatch[1]) : Date.now();

// פורמט התאריך כמחרוזת YYYY-MM-DD
let dateString = "";
if (data.date instanceof Date) {
  const year = data.date.getFullYear();
  const month = String(data.date.getMonth() + 1).padStart(2, '0');
  const day = String(data.date.getDate()).padStart(2, '0');
  dateString = `${year}-${month}-${day}`;
} else if (typeof data.date === 'string') {
  dateString = data.date;
} else {
  // אם התאריך הוא בפורמט אחר או לא מוגדר, השתמש בתאריך הנוכחי
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  dateString = `${year}-${month}-${day}`;
}

// עיבוד התוכן HTML
const htmlContentFormatted = htmlContent.replace(/\n/g, '\\n');

// ודא שהתיקייה קיימת
try {
  mkdirSync('src/data/blog', { recursive: true });
  console.log(`✅ ודאתי שתיקיית src/data/blog קיימת`);
} catch (error) {
  console.error(`❌ שגיאה ביצירת תיקיה: ${error.message}`);
}

const outputFileName = slugify(data.title, { lower: true, strict: true }) + '.json';
const outPath = `src/data/blog/${outputFileName}`;
console.log(`✍️ מנסה ליצור קובץ JSON בנתיב: ${outPath}`);

try {
  // יצירת מחרוזת JSON ידנית
  const jsonText = `{
  "id": ${id},
  "title": "${data.title.replace(/"/g, '\\"')}",
  "description": "${data.description.replace(/"/g, '\\"')}",
  "image": "${data.image.replace(/"/g, '\\"')}",
  "date": "${dateString}",
  "readTime": ${data.readTime},
  "category": "${data.category.replace(/"/g, '\\"')}",
  "author": "${(data.author || 'יונתן רינת').replace(/"/g, '\\"')}",
  "authorImage": "${(data.authorImage || '/images/headshot.avif').replace(/"/g, '\\"')}",
  "tags": ${JSON.stringify(data.tags)},
  "featured": ${data.featured !== undefined ? data.featured : true},
  "content": "${htmlContentFormatted.replace(/"/g, '\\"')}"
}`;

  writeFileSync(outPath, jsonText, 'utf8');
  console.log(`✅ JSON נוצר ב-${outPath}`);
} catch (error) {
  console.error(`❌ שגיאה ביצירת קובץ JSON: ${error.message}`);
}

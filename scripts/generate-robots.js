import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// נתיבים חשובים
const PUBLIC_DIR = path.join(__dirname, '../public');
const SITE_URL = 'https://automatzyoni.co.il';

// יצירת קובץ robots.txt
function generateRobots() {
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# קובץ sitemap
Sitemap: ${SITE_URL}/sitemap.xml
`;

  try {
    fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robotsTxt);
    console.log('קובץ ה-robots.txt נוצר בהצלחה:', path.join(PUBLIC_DIR, 'robots.txt'));
  } catch (error) {
    console.error('שגיאה בשמירת קובץ ה-robots.txt:', error);
  }
}

// הרצת הסקריפט
generateRobots(); 
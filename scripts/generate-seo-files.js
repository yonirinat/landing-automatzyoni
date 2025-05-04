import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// נתיבים חשובים
const CONTENT_DIR = path.join(__dirname, '../src/content/articles');
const PUBLIC_DIR = path.join(__dirname, '../public');
const SITE_URL = 'https://automatzyoni.co.il';

// עמודים סטטיים
const STATIC_PAGES = [
  { url: '', changefreq: 'daily', priority: '1.0' },
  { url: 'home', changefreq: 'daily', priority: '0.8' },
  { url: 'tools', changefreq: 'weekly', priority: '0.8' },
  { url: 'blog', changefreq: 'weekly', priority: '0.8' },
  { url: 'about', changefreq: 'monthly', priority: '0.5' },
];

// פונקציה לקריאת כל קבצי המאמרים
function getAllBlogPosts() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.warn(`תיקיית התוכן לא נמצאה: ${CONTENT_DIR}`);
    return [];
  }

  try {
    const files = fs.readdirSync(CONTENT_DIR);
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const filePath = path.join(CONTENT_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(content);
        const id = file.replace(/\.md$/, '');
        
        return {
          id,
          date: data.date instanceof Date ? data.date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
        };
      });
  } catch (error) {
    console.error('שגיאה בקריאת קבצי הבלוג:', error);
    return [];
  }
}

// ייצור קובץ ה-sitemap
function generateSitemap() {
  const blogPosts = getAllBlogPosts();
  
  const today = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // הוספת עמודים סטטיים
  STATIC_PAGES.forEach(page => {
    sitemap += `  <url>
    <loc>${SITE_URL}/${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${today}</lastmod>
  </url>
`;
  });

  // הוספת עמודי הבלוג
  blogPosts.forEach(post => {
    sitemap += `  <url>
    <loc>${SITE_URL}/blogpost?id=${post.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <lastmod>${post.date || today}</lastmod>
  </url>
`;
  });

  sitemap += `</urlset>`;

  // שמירת הקובץ
  try {
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
    console.log('קובץ ה-sitemap נוצר בהצלחה:', path.join(PUBLIC_DIR, 'sitemap.xml'));
  } catch (error) {
    console.error('שגיאה בשמירת קובץ ה-sitemap:', error);
  }
}

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

// יצירת כל קבצי ה-SEO
async function generateSeoFiles() {
  console.log('מתחיל ביצירת קבצי SEO...');
  generateSitemap();
  generateRobots();
  console.log('סיים ביצירת קבצי SEO.');
}

// הרצת הסקריפט
generateSeoFiles(); 
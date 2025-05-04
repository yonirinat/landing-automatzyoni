// blogLoader.js - טוען את כל פוסטי הבלוג מתיקיית src/content/articles

import matter from 'gray-matter';

/**
 * פונקציה להמרת קובץ מרקדאון ל-JavaScript object
 * @param {string} filePath נתיב הקובץ
 * @param {string} content תוכן הקובץ
 * @returns {Object} אובייקט הפוסט
 */
function parseMarkdownPost(filePath, content) {
  try {
    // משתמשים ב-gray-matter להפרדת הפרונטמאטר מתוכן המרקדאון
    const { data, content: markdownContent } = matter(content);
    
    // מחלצים את ה-id מנתיב הקובץ
    const filename = filePath.split('/').pop().replace(/\.md$/, '');
    const id = filename;
    
    // בונים את אובייקט הפוסט
    return {
      id,
      title: data.title,
      date: data.date.toString(),
      image: data.cover,
      description: data.excerpt,
      content: markdownContent,
      category: "אוטומציה עסקית", // קטגוריה דיפולטיבית אם לא מוגדרת
      readTime: Math.ceil(markdownContent.length / 2000), // אומדן זמן קריאה בדקות
      tags: ["אוטומציה", "עסקים"], // תגיות דיפולטיביות אם לא מוגדרות
      featured: false, // דיפולטיבי - אפשר לשנות לפי לוגיקה מסוימת
      ...data // מוסיף את כל שאר השדות מה-frontmatter
    };
  } catch (error) {
    console.error(`שגיאה בעיבוד קובץ ${filePath}:`, error);
    return null;
  }
}

/**
 * פונקציה שטוענת את כל פוסטי הבלוג
 * @returns {Promise<Array>} מערך של כל הפוסטים 
 */
export async function getAllBlogPosts() {
  try {
    // נטען את רשימת כל קבצי ה-Markdown מהתיקייה
    const blogFiles = import.meta.glob('/src/content/articles/*.md', { query: '?raw', import: 'default' });
    
    // מערך שיכיל את כל הפוסטים
    const allPosts = [];
    
    // מבצעים import לכל קובץ
    for (const path in blogFiles) {
      try {
        // טוען את תוכן הקובץ כטקסט
        const content = await blogFiles[path]();
        
        // מעבד את הקובץ ומחלץ את המידע
        const post = parseMarkdownPost(path, content);
        
        if (post) {
          allPosts.push(post);
        }
      } catch (error) {
        console.error(`שגיאה בטעינת קובץ ${path}:`, error);
      }
    }
    
    // ממיינים לפי תאריך (מהחדש לישן)
    return allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('שגיאה בטעינת פוסטים:', error);
    return [];
  }
}

/**
 * פונקציה לקבלת פוסט בודד לפי מזהה
 * @param {string|number} id מזהה הפוסט 
 * @returns {Promise<Object|null>} אובייקט הפוסט או null אם לא נמצא
 */
export async function getBlogPostById(id) {
  try {
    const posts = await getAllBlogPosts();
    return posts.find(post => post.id.toString() === id.toString()) || null;
  } catch (error) {
    console.error('שגיאה בטעינת פוסט:', error);
    return null;
  }
}

/**
 * פונקציה לקבלת פוסטים מובחרים (featured)
 * @returns {Promise<Array>} מערך של הפוסטים המובחרים
 */
export async function getFeaturedPosts() {
  try {
    const posts = await getAllBlogPosts();
    // בוחר את שלושת הפוסטים העדכניים ביותר כמובחרים אם אין הגדרה אחרת
    const featured = posts.filter(post => post.featured);
    if (featured.length === 0) {
      return posts.slice(0, 3);
    }
    return featured;
  } catch (error) {
    console.error('שגיאה בטעינת פוסטים מובחרים:', error);
    return [];
  }
}

/**
 * פונקציה להשגת כל הקטגוריות הקיימות
 * @returns {Promise<Array>} מערך של כל הקטגוריות 
 */
export async function getAllCategories() {
  try {
    const posts = await getAllBlogPosts();
    const categories = new Set();
    
    posts.forEach(post => {
      if (post.category) {
        categories.add(post.category);
      }
    });
    
    return Array.from(categories);
  } catch (error) {
    console.error('שגיאה בטעינת קטגוריות:', error);
    return [];
  }
}

/**
 * פונקציה להשגת התגיות הנפוצות ביותר
 * @param {number} limit מספר התגיות שיוחזרו 
 * @returns {Promise<Array>} מערך של התגיות הנפוצות ביותר
 */
export async function getPopularTags(limit = 7) {
  try {
    const posts = await getAllBlogPosts();
    const tagCounts = {};
    
    // סופרים את התדירות של כל תגית
    posts.forEach(post => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });
    
    // ממיינים את התגיות לפי התדירות (מהגבוה לנמוך)
    const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]);
    
    // מחזירים את מספר התגיות המבוקש
    return sortedTags.slice(0, limit);
  } catch (error) {
    console.error('שגיאה בטעינת תגיות:', error);
    return [];
  }
} 
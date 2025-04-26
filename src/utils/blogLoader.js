// blogLoader.js - טוען את כל פוסטי הבלוג מתיקיית data/blog

/**
 * פונקציה שטוענת את כל פוסטי הבלוג
 * @returns {Promise<Array>} מערך של כל הפוסטים 
 */
export async function getAllBlogPosts() {
  try {
    // נטען את רשימת כל קבצי ה-JSON מהתיקייה
    const blogFiles = import.meta.glob('/src/data/blog/*.json');
    
    // מערך שיכיל את כל הפוסטים
    const allPosts = [];
    
    // מבצעים import לכל קובץ
    const imports = await Promise.all(
      Object.keys(blogFiles).map(async (path) => {
        // טוען את הקובץ
        const module = await blogFiles[path]();
        // מחזיר את תוכן הפוסט
        return module.default;
      })
    );
    
    // מוסיפים כל פוסט למערך
    imports.forEach(post => {
      if (post) {
        allPosts.push(post);
      }
    });
    
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
    return posts.filter(post => post.featured);
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
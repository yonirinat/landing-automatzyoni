
export interface BlogPost {
  id: number;                // מזהה ייחודי
  title: string;             // כותרת ראשית
  description: string;       // תקציר (SEO / Card)
  image: string;             // URL לתמונה ראשית
  date: string;              // ISO-8601  YYYY-MM-DD
  readTime: number;          // דקות קריאה משוערות
  category: string;
  tags: string[];
  featured: boolean;         // true = מאמר "מוביל"
  author: string;
  authorImage: string;
  content: string;           // HTML (מרונדר מ-Markdown)
}

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useSearchParams, useParams } from "react-router-dom";
import { createPageUrl, toSeoFriendlySlug } from "@/utils";
import Markdown from 'markdown-to-jsx';
import { Helmet } from 'react-helmet-async';

import { useChatbot } from "@/context/ChatbotContext";
import { 
  Calendar, 
  Clock,
  User,
  Tag as TagIcon,
  ArrowLeft,
  MessageCircle,
  Facebook,
  Linkedin,
  Twitter,
  Copy,
  Loader2
} from "lucide-react";
import { getBlogPostById, getAllBlogPosts } from "@/utils/blogLoader";

// CSS עבור תוכן המאמר
import "./BlogPost.css";

export default function BlogPost() {
  const navigate = useNavigate();
  const { openChat } = useChatbot();
  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  const postId = slug || searchParams.get('id');
  
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [canonicalUrl, setCanonicalUrl] = useState("");
  
  // יצירת הקישור הקנוני לכתבה (בפורמט SEO-friendly)
  useEffect(() => {
    if (post) {
      // יצירת סלאג באנגלית מתוך כותרת הכתבה או מזהה הכתבה
      const slug = toSeoFriendlySlug(post.title) || post.id;
      // ייצור URL קנוני בפורמט ידידותי ל-SEO
      const canonical = `${window.location.origin}/blog/${slug}`;
      setCanonicalUrl(canonical);
    }
  }, [post]);
  
  useEffect(() => {
    const loadPostData = async () => {
      try {
        setIsLoading(true);
        
        if (!postId) {
          navigate(createPageUrl("Blog"));
          return;
        }
        
        // טוען את הפוסט לפי המזהה
        const postData = await getBlogPostById(postId);
        
        if (!postData) {
          setError("המאמר המבוקש לא נמצא");
          setIsLoading(false);
          return;
        }
        
        setPost(postData);
        
        // טוען פוסטים קשורים
        // במקרה הזה נטען 3 פוסטים אקראיים שאינם הפוסט הנוכחי
        const allPosts = await getAllBlogPosts();
        const otherPosts = allPosts.filter(p => p.id !== postData.id);
        // בוחר 3 פוסטים אקראיים או פחות אם אין מספיק
        const randomPosts = otherPosts
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.min(3, otherPosts.length));
        
        setRelatedPosts(randomPosts);
        setIsLoading(false);
      } catch (err) {
        console.error("שגיאה בטעינת המאמר:", err);
        setError("אירעה שגיאה בטעינת המאמר");
        setIsLoading(false);
      }
    };
    
    loadPostData();
  }, [postId, navigate]);
  
  // מציג מסך טעינה
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-12 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 mx-auto animate-spin text-[#1E5FA8]" />
          <p className="mt-4 text-xl">טוען את המאמר...</p>
        </div>
      </div>
    );
  }
  
  // מציג הודעת שגיאה
  if (error) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">שגיאה בטעינת המאמר</h2>
          <p className="mb-6">{error}</p>
          <Link to={createPageUrl("Blog")}>
            <Button>
              חזרה לבלוג
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return null;
  }
  
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("הקישור הועתק ללוח!");
  };
  
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <Helmet>
        <title>{post.title} - מאמרים</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.image} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={post.image} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* סכמת JSON-LD לפי Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": canonicalUrl
            },
            "headline": post.title,
            "description": post.description,
            "image": post.image,
            "author": {
              "@type": "Person",
              "name": post.author || "יונתן רינת"
            },
            "publisher": {
              "@type": "Organization",
              "name": "יונתן רינת - אוטומציה לעסקים",
              "logo": {
                "@type": "ImageObject",
                "url": `${window.location.origin}/src/images/logo.webp`
              }
            },
            "datePublished": post.date,
            "dateModified": post.date
          })}
        </script>
      </Helmet>
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-500">
            <Link to={createPageUrl("Home")} className="hover:text-gray-800">
              ראשי
            </Link>
            <span className="mx-2">›</span>
            <Link to={createPageUrl("Blog")} className="hover:text-gray-800">
              בלוג
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800">{post.title}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Featured Image */}
              <div className="relative h-64 md:h-96">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute top-4 right-4 bg-[#1E5FA8] text-white py-1 px-4 rounded-full text-sm font-medium">
                  {post.category}
                </div>
              </div>
              
              {/* Article Header */}
              <div className="p-6 md:p-8 border-b">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {post.title}
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  {post.description}
                </p>
                
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-gray-400 ml-2" />
                    <span className="text-gray-700">{post.author || "יונתן רינת"}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 ml-1" />
                      <span className="text-gray-700">
                        {new Date(post.date).toLocaleDateString('he-IL')}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 ml-1" />
                      <span className="text-gray-700">
                        {post.readTime} דקות קריאה
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Article Content - הטמעת Markdown */}
              <div className="p-6 md:p-8">
                <div className="prose prose-lg max-w-none article-content">
                  <Markdown>
                    {post.content}
                  </Markdown>
                </div>
                
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <div 
                        key={index}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center"
                      >
                        <TagIcon className="w-3 h-3 ml-1" />
                        {tag}
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Share */}
                <nav aria-label="שיתוף ברשתות חברתיות" className="mt-8 pt-6 border-t">
                  <h3 className="text-lg font-bold mb-4">שתף את המאמר</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                      className="flex items-center"
                      aria-label="שתף בפייסבוק"
                    >
                      <Facebook className="w-4 h-4 ml-2" aria-hidden="true" />
                      פייסבוק
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}
                      className="flex items-center"
                      aria-label="שתף בטוויטר"
                    >
                      <Twitter className="w-4 h-4 ml-2" aria-hidden="true" />
                      טוויטר
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`, '_blank')}
                      className="flex items-center"
                      aria-label="שתף בלינקדאין"
                    >
                      <Linkedin className="w-4 h-4 ml-2" aria-hidden="true" />
                      לינקדאין
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={copyLinkToClipboard}
                      className="flex items-center"
                      aria-label="העתק קישור"
                    >
                      <Copy className="w-4 h-4 ml-2" aria-hidden="true" />
                      העתק קישור
                    </Button>
                  </div>
                </nav>
              </div>
            </article>
            
            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-6">מאמרים נוספים שיעניינו אותך</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map(relatedPost => (
                    <Link 
                      key={relatedPost.id}
                      to={`/blog/${relatedPost.id}`}
                      className="block group"
                    >
                      <div className="bg-white rounded-xl shadow-md overflow-hidden h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                        <div className="h-48 overflow-hidden">
                          <img
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-bold mb-2 line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                            {relatedPost.description}
                          </p>
                          <div className="text-[#1E5FA8] text-sm font-medium flex items-center">
                            קרא עוד
                            <ArrowLeft className="w-4 h-4 mr-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="order-last">
            <div className="sticky top-6 space-y-6">
              {/* Call to Action */}
              <div className="bg-[#1E5FA8] text-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold mb-3">
                  איך אוטומציה יכולה לסייע לעסק שלך?
                </h3>
                <p className="mb-4">
                  אני כאן לעזור לך למצוא את הדרך הטובה ביותר להגדיל יעילות, לחסוך זמן ולהגדיל רווחים.
                </p>
                <Button 
                  onClick={openChat}
                  variant="secondary"
                  className="w-full bg-white text-[#1E5FA8] hover:bg-gray-100"
                >
                  <MessageCircle className="w-4 h-4 ml-2" />
                  בוא נדבר
                </Button>
              </div>
              
              {/* Author */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold mb-4">על הכותב</h3>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={post.authorImage || "https://automatzyoni.co.il/images/yoni-pic-sm.webp"}
                      alt={`${post.author || "יונתן רינת"}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{post.author || "יונתן רינת"}</h4>
                    <p className="text-gray-600 text-sm">
                      יונתן הוא מומחה אוטומציה עסקית, מפתח תהליכים ויועץ אופטימיזציה. מסייע לעסקים קטנים ובינוניים להגדיל רווחים באמצעות אוטומציה חכמה.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Newsletter */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold mb-3">רוצה לקבל טיפים וכלים ישירות למייל?</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  הרשם לניוזלטר השבועי וקבל עדכונים וטיפים שימושיים לשיפור העסק.
                </p>
                <Link to={createPageUrl("Newsletter")}>
                  <Button className="w-full">
                    להרשמה לניוזלטר
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

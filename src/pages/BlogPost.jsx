import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { createPageUrl } from "@/utils";

import { useChatbot } from "@/context/ChatbotContext";
import { 
  Calendar, 
  Clock,
  User,
  Tag as TagIcon,
  ArrowRight,
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
  const postId = searchParams.get('id');
  
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
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
                    <div className="w-10 h-10 rounded-full overflow-hidden ml-3">
                      <img
                        src={post.authorImage}
                        alt={post.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 text-gray-400 ml-1" />
                        <span className="text-gray-700">{post.author}</span>
                      </div>
                    </div>
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
              
              {/* Article Content */}
              <div className="p-6 md:p-8">
                <div className="prose prose-lg max-w-none text-right article-content">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
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
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-lg font-bold mb-4">שתף את המאמר</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                      className="flex items-center"
                    >
                      <Facebook className="w-4 h-4 ml-2" />
                      פייסבוק
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}
                      className="flex items-center"
                    >
                      <Twitter className="w-4 h-4 ml-2" />
                      טוויטר
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`, '_blank')}
                      className="flex items-center"
                    >
                      <Linkedin className="w-4 h-4 ml-2" />
                      לינקדאין
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={copyLinkToClipboard}
                      className="flex items-center"
                    >
                      <Copy className="w-4 h-4 ml-2" />
                      העתק קישור
                    </Button>
                  </div>
                </div>
                
                {/* CTA */}
                <div className="mt-12 bg-gradient-to-r from-[#1E5FA8] to-[#13386B] text-white p-8 rounded-xl">
                  <h3 className="text-2xl font-bold mb-4">
                    רוצה לדעת איך אוטומציה יכולה לעזור לעסק שלך?
                  </h3>
                  <p className="mb-6">
                    בוא נדבר על התהליכים הספציפיים בעסק שלך שאפשר לאטמץ ולחסוך לך זמן וכסף.
                  </p>
                  <Button
                    onClick={openChat}
                    size="lg"
                    className="bg-white text-[#1E5FA8] hover:bg-gray-100"
                  >
                    <MessageCircle className="w-5 h-5 ml-2" />
                    בוא נדבר
                  </Button>
                </div>
              </div>
            </article>
            
            {/* Back to Blog */}
            <div className="mt-6">
              <Link to={createPageUrl("Blog")}>
                <Button variant="ghost" className="flex items-center">
                  <ArrowRight className="w-4 h-4 ml-2" />
                  חזרה לבלוג
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {relatedPosts.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-bold mb-4">
                    מאמרים קשורים
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <div key={relatedPost.id} className="flex gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={relatedPost.image}
                            alt="תמונת מאמר"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1 line-clamp-2">
                            <Link to={createPageUrl(`BlogPost?id=${relatedPost.id}`)} className="hover:text-[#1E5FA8]">
                              {relatedPost.title}
                            </Link>
                          </h4>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="w-3 h-3 ml-1" />
                            {relatedPost.readTime} דקות קריאה
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="bg-[#1E5FA8] text-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-bold mb-4">
                  צריך עזרה אישית?
                </h3>
                <p className="mb-4">
                  אני יכול לעזור לך לזהות את התהליכים בעסק שלך שכדאי לאטמץ ראשונים.
                </p>
                <Button
                  onClick={openChat}
                  className="w-full bg-white text-[#1E5FA8] hover:bg-gray-100"
                >
                  <MessageCircle className="w-4 h-4 ml-2" />
                  קבע שיחת ייעוץ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

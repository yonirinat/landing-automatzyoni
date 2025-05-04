import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useChatbot } from "@/context/ChatbotContext";
import { 
  Search, 
  Tag, 
  Clock, 
  Calendar,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  Loader2
} from "lucide-react";
import { getAllBlogPosts, getFeaturedPosts, getAllCategories, getPopularTags } from "@/utils/blogLoader";

export default function Blog() {
  const { openChat } = useChatbot();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("הכל");
  const [blogPosts, setBlogPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [popularTags, setPopularTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // טוען את הנתונים בטעינת הדף
  useEffect(() => {
    const loadBlogData = async () => {
      try {
        setIsLoading(true);
        
        // טוען את כל הפוסטים
        const posts = await getAllBlogPosts();
        setBlogPosts(posts);
        
        // טוען את הפוסטים המובחרים
        const featured = await getFeaturedPosts();
        setFeaturedPosts(featured);
        
        // טוען את הקטגוריות
        const cats = await getAllCategories();
        setCategories(cats);
        
        // טוען את התגיות הפופולריות
        const tags = await getPopularTags();
        setPopularTags(tags);
        
        setIsLoading(false);
      } catch (err) {
        console.error("שגיאה בטעינת נתוני הבלוג:", err);
        setError("אירעה שגיאה בטעינת נתוני הבלוג");
        setIsLoading(false);
      }
    };
    
    loadBlogData();
  }, []);
  
  // מסנן את הפוסטים לפי החיפוש והקטגוריה
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchTerm === "" || 
      post.title.includes(searchTerm) || 
      post.description.includes(searchTerm) ||
      (post.tags && post.tags.some(tag => tag.includes(searchTerm)));
    
    const matchesCategory = selectedCategory === "הכל" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // מציג מסך טעינה
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-12 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 mx-auto animate-spin text-[#1E5FA8]" />
          <p className="mt-4 text-xl">טוען את הבלוג...</p>
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
          <h2 className="text-2xl font-bold mb-2">שגיאה בטעינת הבלוג</h2>
          <p className="mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>
            נסה שוב
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            הבלוג: תוכן, טיפים וכלים לאוטומציה עסקית
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center">
            תוכן מקצועי שיעזור לך לשפר את העסק, לחסוך זמן ולהתייעל
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="חפש בבלוג..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-4 pr-12 py-6 text-lg rounded-xl shadow-sm"
          />
        </div>
        
        {/* Featured Posts */}
        {searchTerm === "" && selectedCategory === "הכל" && featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">מאמרים מובילים</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map(post => (
                <Card key={post.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={`תמונה למאמר: ${post.title}`}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-0 right-0 bg-[#1E5FA8] text-white py-1 px-3 text-sm font-medium">
                      {post.category}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription className="text-base">{post.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 ml-1" />
                      {new Date(post.date).toLocaleDateString('he-IL')}
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4 ml-1" />
                      {post.readTime} דקות קריאה
                    </div>
                    <Link to={createPageUrl(`BlogPost?id=${post.id}`)}>
                      <Button variant="ghost" className="text-[#1E5FA8]">
                        קרא עוד
                        <ArrowLeft className="w-4 h-4 mr-2" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="order-2 lg:order-1 lg:col-span-1">
            <div className="sticky top-6 space-y-8" role="complementary" aria-label="סרגל צד">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>קטגוריות</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div 
                    className={`px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 ${
                      selectedCategory === "הכל" ? "bg-blue-50 text-[#1E5FA8] font-medium" : ""
                    }`}
                    onClick={() => setSelectedCategory("הכל")}
                  >
                    הכל
                  </div>
                  
                  {categories.map((category, index) => (
                    <div 
                      key={index}
                      className={`px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 ${
                        selectedCategory === category ? "bg-blue-50 text-[#1E5FA8] font-medium" : ""
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>תגיות פופולריות</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
                        onClick={() => setSearchTerm(tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-[#1E5FA8] text-white border-none shadow-md">
                <CardHeader>
                  <CardTitle>רוצה עזרה אישית?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">בוא נדבר על איך אוטומציה יכולה לחסוך לך זמן וכסף בעסק.</p>
                  <Button 
                    onClick={openChat}
                    className="w-full bg-white text-[#1E5FA8] hover:bg-gray-100"
                  >
                    <MessageCircle className="w-4 h-4 ml-2" />
                    בוא נדבר
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Blog Posts */}
          <div className="order-1 lg:order-2 lg:col-span-3">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {selectedCategory === "הכל" ? "כל המאמרים" : selectedCategory}
              </h2>
              <div className="text-sm text-gray-500">
                מציג {filteredPosts.length} מאמרים
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map(post => (
                <Card key={post.id} className="border-none shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={post.image}
                      alt={`תמונה למאמר: ${post.title}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-0 right-0 bg-[#1E5FA8] text-white py-1 px-3 text-sm font-medium">
                      {post.category}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <CardDescription>{post.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 ml-1" />
                      {post.readTime} דקות קריאה
                    </div>
                    <Link to={createPageUrl(`BlogPost?id=${post.id}`)}>
                      <Button variant="ghost" className="text-[#1E5FA8]">
                        קרא עוד
                        <ArrowLeft className="w-4 h-4 mr-2" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <Tag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-600 mb-2">לא נמצאו מאמרים</h3>
                <p className="text-gray-500 mb-6">נסה לחפש מונחים אחרים או לבחור קטגוריה אחרת</p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("הכל");
                  }}
                >
                  הצג את כל המאמרים
                </Button>
              </div>
            )}
            
            {filteredPosts.length > 0 && filteredPosts.length > 6 && (
              <nav aria-label="ניווט בין עמודים" className="flex justify-center mt-8">
                <div className="flex gap-2">
                  <Button variant="outline" disabled aria-label="לעמוד הקודם">
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    הקודם
                  </Button>
                  <Button className="bg-[#1E5FA8]" aria-current="page">1</Button>
                  <Button variant="ghost" aria-label="לעמוד 2">2</Button>
                  <Button variant="ghost" aria-label="לעמוד 3">3</Button>
                  <Button variant="outline" aria-label="לעמוד הבא">
                    הבא
                    <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                  </Button>
                </div>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
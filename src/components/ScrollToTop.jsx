import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// קומפוננטה שמגלגלת לראש הדף בכל ניווט באתר
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // גלילה לראש הדף כאשר משתנה הנתיב
    window.scrollTo({
      top: 0,
      behavior: "smooth" // גלילה חלקה
    });
  }, [pathname]);

  // קומפוננטה זו אינה מרנדרת דבר בדף
  return null;
} 
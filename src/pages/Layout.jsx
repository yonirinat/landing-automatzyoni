import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.webp";

import { createPageUrl } from "@/utils";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Chatbot from "@/components/Chatbot";
import { useChatbot } from "@/context/ChatbotContext";

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { chatOpen, openChat, closeChat } = useChatbot();

  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-['Assistant']">
      {/* RTL and Hebrew font styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;500;600;700;800&display=swap');
        
        html, body {
          direction: rtl;
          text-align: right;
        }
        
        :root {
          --primary: #1E5FA8;
          --secondary: #FF9900;
          --background: #f8f9fc;
          --text-primary: #1a202c;
          --text-secondary: #4a5568;
        }

        p {
          text-align: justify;
          direction: rtl;
          margin-bottom: 1em;
        }

        p + p {
          margin-top: 1em;
        }
      `}</style>

      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 relative z-50 sticky top-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to={createPageUrl("Home")} className="text-2xl font-bold text-primary flex items-center gap-2">
            <img src={logo} alt="לוגו אוטומציה עסקית" className="h-10 w-10" />
            <span className="text-[#1E5FA8]">יונתן רינת - אוטומציה לעסקים</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to={createPageUrl("Home")} className="font-medium hover:text-[#1E5FA8] transition-colors">
              ראשי
            </Link>
            <Link to={createPageUrl("Tools")} className="font-medium hover:text-[#1E5FA8] transition-colors">
              כלים חינמיים
            </Link>
            <Link to={createPageUrl("Blog")} className="font-medium hover:text-[#1E5FA8] transition-colors">
              בלוג
            </Link>
            <Link to={createPageUrl("About")} className="font-medium hover:text-[#1E5FA8] transition-colors">
              אודות
            </Link>

            <Button 
              className="bg-[#FF9900] hover:bg-[#E68A00] text-white" 
              onClick={openChat}
            >
              בוא נדבר
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "סגור תפריט" : "פתח תפריט"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full right-0 left-0 bg-white shadow-md transition-all duration-300 ${menuOpen ? 'max-h-screen py-4' : 'max-h-0 overflow-hidden'}`}>
          <div className="max-w-7xl mx-auto px-6 flex flex-col gap-4">
            <Link 
              to={createPageUrl("Home")} 
              className="py-2 font-medium hover:text-[#1E5FA8]"
              onClick={() => setMenuOpen(false)}
            >
              ראשי
            </Link>
            <Link 
              to={createPageUrl("Tools")} 
              className="py-2 font-medium hover:text-[#1E5FA8]"
              onClick={() => setMenuOpen(false)}
            >
              כלים חינמיים
            </Link>
            <Link 
              to={createPageUrl("Blog")} 
              className="py-2 font-medium hover:text-[#1E5FA8]"
              onClick={() => setMenuOpen(false)}
            >
              בלוג
            </Link>
            <Link 
              to={createPageUrl("About")} 
              className="py-2 font-medium hover:text-[#1E5FA8]"
              onClick={() => setMenuOpen(false)}
            >
              אודות
            </Link>

            <Button 
              className="bg-[#FF9900] hover:bg-[#E68A00] text-white w-full"
              onClick={() => {
                openChat();
                setMenuOpen(false);
              }}
            >
              בוא נדבר
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-[--background]">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#1E5FA8] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">אוטומציה עסקית</h3>
            <p className="text-blue-100">שחרר את הזמן שלך. תן לעסק לעבוד בשבילך.</p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-white hover:text-blue-200">
                <span className="sr-only">פייסבוק</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-blue-200">
                <span className="sr-only">לינקדאין</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">קישורים מהירים</h3>
            <ul className="space-y-2">
              <li>
                <Link to={createPageUrl("Home")} className="text-blue-100 hover:text-white transition-colors">דף הבית</Link>
              </li>
              <li>
                <Link to={createPageUrl("Tools")} className="text-blue-100 hover:text-white transition-colors">כלים חינמיים</Link>
              </li>
              <li>
                <Link to={createPageUrl("Blog")} className="text-blue-100 hover:text-white transition-colors">בלוג</Link>
              </li>
              <li>
                <Link to={createPageUrl("About")} className="text-blue-100 hover:text-white transition-colors">אודות</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">נושאי מפתח</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">אוטומציה עסקית</a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">חיסכון בזמן</a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">ייעול תהליכים</a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">אוטומציה שיווקית</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">צור קשר</h3>
            <p className="text-blue-100">השאר פרטים ונחזור אליך בהקדם.</p>
            <form className="mt-4 space-y-3">
              <input 
                type="email" 
                placeholder="מייל" 
                className="px-3 py-2 w-full text-sm rounded-md text-gray-900 bg-white" 
              />
              <Button type="submit" className="w-full bg-[#FF9900] hover:bg-[#E68A00]">
                הרשמה לעדכונים
              </Button>
            </form>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-blue-400 text-sm text-blue-200">
          <p>© 2024 יונתן רינת - אוטומציה לעסקים. כל הזכויות שמורות.</p>
        </div>
      </footer>

      {/* Chatbot Widget */}
      {!chatOpen && (
        <button 
          className="fixed z-40 bottom-6 left-6 bg-[#FF9900] text-white p-4 rounded-full shadow-lg hover:bg-[#E68A00] transition-colors"
          onClick={openChat}
          aria-label="פתח צ'אט"
        >
          <MessageCircle size={24} />
        </button>
      )}
      
      <Chatbot isOpen={chatOpen} onClose={closeChat} />
    </div>
  );
}


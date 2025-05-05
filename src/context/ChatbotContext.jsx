import React, {
  createContext, useState, useContext, useCallback
} from 'react';
import { useLocation } from 'react-router-dom';   // ★

const ChatbotContext = createContext(null);

export function ChatbotProvider({ children }) {
  const [chatOpen, setChatOpen] = useState(false);
  const location   = useLocation();              // נתיב נוכחי באפליקציית SPA

  /** פתיחת צ'אט — דוחפת אירוע GTM עם פרטי הדף הנוכחי */
  const openChat = useCallback(() => {
    setChatOpen(true);

    const pagePath  = `${location.pathname}${location.search || ''}`;
    const pageTitle = document.title || '';

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event:        'chat_open',
      chat_page:    pagePath,   // /hometoolsblogpost?id=…
      chat_title:   pageTitle,  // כותרת הדף (SEO‑title)
      timestamp:    Date.now()
    });
  }, [location]);

  const closeChat = useCallback(() => setChatOpen(false), []);

  return (
    <ChatbotContext.Provider value={{ chatOpen, openChat, closeChat }}>
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbot() {
  const ctx = useContext(ChatbotContext);
  if (!ctx) throw new Error('useChatbot must be used within ChatbotProvider');
  return ctx;
}

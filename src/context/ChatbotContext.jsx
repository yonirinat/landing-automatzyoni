import React, { createContext, useState, useContext } from 'react';

// יצירת הקונטקסט
const ChatbotContext = createContext();

// קומפוננטת Provider שתספק את הקונטקסט לכל האפליקציה
export function ChatbotProvider({ children }) {
  const [chatOpen, setChatOpen] = useState(false);

  // פונקציה לפתיחת הצ'אט
  const openChat = () => setChatOpen(true);
  
  // פונקציה לסגירת הצ'אט
  const closeChat = () => setChatOpen(false);

  // הערכים שנספק לכל הקומפוננטות
  const value = {
    chatOpen,
    openChat,
    closeChat
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
}

// הוק מותאם לשימוש בקונטקסט
export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
} 
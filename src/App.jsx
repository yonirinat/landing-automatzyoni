import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Blog from './pages/Blog';
import About from './pages/About';
import BlogPost from './pages/BlogPost';
import { ChatbotProvider } from './context/ChatbotContext';

function App() {
  return (
    <HelmetProvider>
      <ChatbotProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/about" element={<About />} />
              <Route path="/blogpost" element={<BlogPost />} />
            </Routes>
          </Layout>
        </Router>
      </ChatbotProvider>
    </HelmetProvider>
  );
}

export default App; 
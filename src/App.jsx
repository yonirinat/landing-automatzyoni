import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Blog from './pages/Blog';
import About from './pages/About';
import BlogPost from './pages/BlogPost';
import { ChatbotProvider } from './context/ChatbotContext';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
    <ChatbotProvider>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/blogpost" element={<BlogPost />} />
          </Routes>
        </Layout>
    </ChatbotProvider>
    </Router>
  );
}

export default App; 
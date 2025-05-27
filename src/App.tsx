import { registerLayoutComponents } from './components/builder-registration';
import { BUILDER_API_KEY } from './builder-config';
import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import BookPage from './pages/BookPage';
import PricingPage from './pages/PricingPage';

import ScrollToTop from './components/ScrollToTop';

// Initialize Builder with your API key
builder.init(BUILDER_API_KEY);

// Register all components with Builder.io
registerLayoutComponents();

// BuilderPage component to handle Builder.io content
function BuilderPage() {
  const location = useLocation();
  const [content, setContent] = useState(null);
  const isPreviewing = useIsPreviewing();
  
  useEffect(() => {
    // Fetch Builder.io content for the current URL
    async function fetchContent() {
      const content = await builder
        .get('page', {
          url: location.pathname || '/'
        })
        .promise();
      
      setContent(content);
    }
    
    fetchContent();
  }, [location.pathname]);
  
  // Show default page if no Builder content is found and not in preview mode
  if (!content && !isPreviewing) {
    return null;
  }
  
  // Show Builder.io content
  return (
    <BuilderComponent
      model="page"
      content={content}
      options={{ includeRefs: true }}
    />
  );
}

// Main App component
function App() {
  return (
    <Router>
      <div className="app bg-black text-white min-h-screen">
        <Navbar />
        
        <Routes>
          {/* Default routes with Builder.io fallback */}
          <Route path="/" element={
            <>
              <BuilderPage />
              <HomePage />
            </>
          } />
          <Route path="/about" element={
            <>
              <BuilderPage />
              <AboutPage />
            </>
          } />
          <Route path="/services" element={
            <>
              <BuilderPage />
              <ServicesPage />
            </>
          } />
          <Route path="/book" element={
            <>
              <BuilderPage />
              <BookPage />
            </>
          } />
          <Route path="/pricing" element={
            <>
              <BuilderPage />
              <PricingPage />
            </>
          } />
          
          {/* Catch-all route for any other paths */}
          <Route path="*" element={
            <>
              <BuilderPage />
              <HomePage />
            </>
          } />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;

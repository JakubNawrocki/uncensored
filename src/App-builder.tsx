import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react';
import { useEffect, useState } from 'react';
import { BUILDER_API_KEY } from '../builder-config';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HomePage from '../pages/HomePage';

// Register your Builder.io space
builder.init(BUILDER_API_KEY);

export default function App() {
  const [builderContentJson, setBuilderContentJson] = useState(null);
  const isPreviewing = useIsPreviewing();
  
  useEffect(() => {
    // Fetch the content from Builder.io for the current URL
    async function fetchContent() {
      const content = await builder
        .get('page', {
          url: window.location.pathname
        })
        .promise();
      
      setBuilderContentJson(content);
    }
    
    fetchContent();
  }, []);
  
  // If we're previewing in Builder.io, show the BuilderComponent
  // Otherwise, show the default page content
  return (
    <div className="app">
      <Navbar />
      
      {isPreviewing || builderContentJson ? (
        <BuilderComponent
          model="page"
          content={builderContentJson}
          options={{ includeRefs: true }}
        />
      ) : (
        <HomePage />
      )}
      
      <Footer />
    </div>
  );
}

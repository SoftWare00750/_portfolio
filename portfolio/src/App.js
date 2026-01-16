import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import useScrollAnimation from "./hooks/useScrollAnimation";

function App() {
  const [loading, setLoading] = useState(true);

  // Initialize scroll animations
  useScrollAnimation();

  useEffect(() => {
    // Reduced loading time to 2 seconds for faster experience
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Changed from 3500ms to 2000ms (2 seconds)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="site">
      {/* Show loading screen as overlay when loading */}
      {loading && <LoadingScreen />}
      
      {/* Main content is always rendered but visible after loading */}
      <div style={{ 
        opacity: loading ? 0 : 1, 
        transition: 'opacity 0.5s ease-in-out',
        pointerEvents: loading ? 'none' : 'auto'
      }}>
        <Navbar />
        <main>
          <Hero />
          <Projects />
          <About />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
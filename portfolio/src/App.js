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
    // Set minimum loading time to 3 seconds
    const minLoadTime = 3000;
    const startTime = Date.now();

    // Function to check if everything is ready
    const checkIfReady = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsed);

      // Wait for minimum time AND document ready
      setTimeout(() => {
        setLoading(false);
      }, remainingTime);
    };

    // Check document ready state
    if (document.readyState === 'complete') {
      // Already loaded
      checkIfReady();
    } else {
      // Wait for load event
      window.addEventListener('load', checkIfReady);
      
      // Fallback: force show after max 5 seconds
      const maxWaitTimer = setTimeout(() => {
        setLoading(false);
      }, 5000);

      return () => {
        window.removeEventListener('load', checkIfReady);
        clearTimeout(maxWaitTimer);
      };
    }
  }, []);

  // CRITICAL: Show loading screen FIRST, before any content
  if (loading) {
    return <LoadingScreen />;
  }

  // Only show main content after loading completes
  return (
    <div className="site">
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
  );
}

export default App;
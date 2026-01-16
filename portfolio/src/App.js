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
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  // Initialize scroll animations
  useScrollAnimation();

  useEffect(() => {
    // Track when all assets are loaded
    const handleLoad = () => {
      setAssetsLoaded(true);
    };

    // Wait for window to fully load
    if (document.readyState === 'complete') {
      setAssetsLoaded(true);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  useEffect(() => {
    if (assetsLoaded) {
      // Minimum display time: 3.5 seconds
      // Add 0.5s buffer to ensure loading screen is visible
      const minDisplayTime = 3500;
      const bufferTime = 500;
      
      const timer = setTimeout(() => {
        setLoading(false);
      }, minDisplayTime + bufferTime);

      return () => clearTimeout(timer);
    }
  }, [assetsLoaded]);

  // ALWAYS show loading screen first
  if (loading) {
    return <LoadingScreen />;
  }

  // Show main content after loading
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
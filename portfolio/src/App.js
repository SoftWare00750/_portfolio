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

  // Pass loading state into the hook so it knows when to initialize
  useScrollAnimation(loading);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="site">
      {loading && <LoadingScreen />}
      
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
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
    // Simulate loading time - adjust duration as needed
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500); // Shows loading screen for 3.5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Show loading screen while loading
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
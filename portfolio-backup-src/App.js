import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import useScrollAnimation from "./hooks/useScrollAnimation";

function App() {
  // Initialize scroll animations
  useScrollAnimation();

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
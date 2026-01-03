import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const scrollToSection = (sectionId) => {
    setOpen(false);
    
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      section.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      
      setTimeout(() => {
        const navbarHeight = 90;
        const currentScroll = window.pageYOffset;
        window.scrollTo({
          top: currentScroll - navbarHeight,
          behavior: 'smooth'
        });
      }, 100);
    }, 150);
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <div 
          className="brand" 
          onClick={() => scrollToSection("home")}
          style={{ cursor: 'pointer' }}
        >
          <div className="logo-circle">
            <p>O</p>
          </div>
        </div>

        <div
          className={`hamburger ${open ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`nav ${open ? "open" : ""}`}>
          <button 
            className="nav-link" 
            onClick={() => scrollToSection("home")}
          >
            Home
          </button>
          <button 
            className="nav-link" 
            onClick={() => scrollToSection("projects")}
          >
            Projects
          </button>
          <button 
            className="nav-link" 
            onClick={() => scrollToSection("about")}
          >
            About
          </button>
          <button 
            className="nav-link" 
            onClick={() => scrollToSection("skills")}
          >
            Skills
          </button>
          <button 
            className="contact-button" 
            onClick={() => scrollToSection("contact")}
          >
            Contact Me
          </button>
        </nav>
      </div>
    </header>
  );
}
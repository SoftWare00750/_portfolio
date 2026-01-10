import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    console.log("🔵 Clicked:", sectionId);
    
    // Close menu first
    setOpen(false);
    console.log("🔵 Menu closed, open state:", false);
    
    // Wait for menu to close, then scroll
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      console.log("🔵 Section found:", section);
      
      if (!section) {
        console.error("❌ Section not found:", sectionId);
        return;
      }

      // Scroll to section
      section.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      
      // Adjust for navbar after scroll
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

  // Add console log for hamburger clicks
  const toggleMenu = () => {
    console.log("🍔 Hamburger clicked! Current state:", open);
    setOpen(!open);
    console.log("🍔 New state will be:", !open);
  };

  // Debug: Log whenever 'open' state changes
  useEffect(() => {
    console.log("📱 Menu open state changed to:", open);
    console.log("📱 Nav element classes:", document.querySelector('.nav')?.className);
  }, [open]);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        {/* Logo */}
        <div 
          className="brand" 
          onClick={() => scrollToSection("home")}
          style={{ cursor: 'pointer' }}
        >
          <div className="logo-circle">
            <p>O</p>
          </div>
        </div>

        {/* Hamburger - with debug logging */}
        <div
          className={`hamburger ${open ? "active" : ""}`}
          onClick={toggleMenu}
          style={{ cursor: 'pointer' }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation - with conditional 'open' class */}
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
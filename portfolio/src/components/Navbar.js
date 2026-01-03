import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && !event.target.closest('.navbar')) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [open]);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const scrollToSection = (sectionId) => {
    // Close menu first
    setOpen(false);
    
    // Small delay to let menu close
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      
      if (!section) {
        console.error("Section not found:", sectionId);
        return;
      }

      // Scroll to section
      section.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      
      // Adjust for navbar height
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

        {/* Hamburger */}
        <div
          className={`hamburger ${open ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation */}
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